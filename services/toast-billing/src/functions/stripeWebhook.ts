import { Handler } from 'express';
import { Stripe } from 'stripe';
import { stripe } from '../stripe';
import { Session } from '../types';
import { ApiError, aqlQuery, aql, logger } from 'toast-common';

export const stripeWebhook: Handler = async (req, res) => {
  logger.debug(req.body);

  const sig = req.headers['stripe-signature'];

  let event: Stripe.events.IEvent;

  try {
    event = stripe.webhooks.constructEvent(
      req['rawBody'],
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    await handleCheckoutCompleted(event);
  } else if (event.type === 'invoice.payment_succeeded') {
    await handlePaymentSucceeded(event);
  } else if (event.type === 'customer.subscription.deleted') {
    await handleSubscriptionDeleted(event);
  } else if (event.type === 'invoice.payment_failed') {
    await handlePaymentFailed(event);
  } else {
    logger.warn(`Got unrecognized event for checkoutCompleted: ${event.type}`);
  }
};

const handleCheckoutCompleted = async (event: Stripe.events.IEvent) => {
  const {
    customer: customerId,
    subscription: subscriptionId,
    client_reference_id: userId,
  } = event.data.object as Session;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const periodEnd = convertExpirationTime(subscription.current_period_end);

  // add subscription info to the Group and customer info to the User.
  let result;
  try {
    result = await aqlQuery(aql`
      LET user = DOCUMENT(Users, ${userId})
      LET group = FIRST(
        FOR group IN OUTBOUND user MemberOf
        LIMIT 1
        RETURN group
      )
      UPDATE { _key: user._key, stripeCustomerId: ${customerId} } IN Users
      UPDATE { _key: group._key, stripeSubscriptionId: ${subscriptionId}, subscriptionExpiresAt: ${periodEnd} } IN Groups
      RETURN {
        user,
        group
      }
    `);
  } catch (err) {
    logger.fatal(err);
  }

  const firstValue = await result.next();
  if (!firstValue.user) {
    throw new ApiError(`The user was not found`, 500);
  }
  if (!firstValue.group) {
    throw new ApiError(`The user doesn't have a group`, 500);
  }

  logger.info(
    `New subscription complete for user ${userId}, group ${
      firstValue.group._key
    }, subscription ${subscriptionId}`,
  );
};

const handlePaymentSucceeded = async (event: Stripe.events.IEvent) => {
  const { subscription: subscriptionId } = event.data.object;
  logger.info(`Payment succeeded on subscription ${subscriptionId}`);

  const groupResult = await aqlQuery(aql`
    RETURN FIRST(
      FOR group IN Groups
        FILTER group.stripeSubscriptionId == ${subscriptionId}
        RETURN group
    )
  `);

  if (!groupResult.hasNext()) {
    throw new ApiError(`The subscriber group was not found`, 500);
  }
  const group = await groupResult.next();

  if (!group) {
    throw new ApiError(`The subscriber group was not found`, 500);
  }

  const { _key: groupKey } = group;

  // fetch the subscription info
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const periodEnd = convertExpirationTime(subscription.current_period_end);

  await aqlQuery(aql`
    UPDATE { _key: ${groupKey}, subscriptionExpiresAt: ${periodEnd}} IN Groups
  `);
};

const handleSubscriptionDeleted = async (event: Stripe.events.IEvent) => {
  const { id: subscriptionId } = event.data.object; // Subscription

  await expireSubscription(subscriptionId);
};

const handlePaymentFailed = async (event: Stripe.events.IEvent) => {
  const { subscription: subscriptionId } = event.data.object;

  await expireSubscription(subscriptionId);
};

const expireSubscription = async (subscriptionId: string) => {
  // immediately expire subscription
  await aqlQuery(aql`
    LET group = FIRST(
      FOR group IN Groups
        FILTER group.stripeSubscriptionId == ${subscriptionId}
        RETURN group
    )
    UPDATE {
      _key: group._key,
      subscriptionExpiresAt: ${new Date().getTime()}
    } IN Groups
  `);
};

/**
 * ArangoDB uses millisecond precision, so we must convert the Unix timestamp from Stripe
 */
const convertExpirationTime = (time: number) => time * 1000;
