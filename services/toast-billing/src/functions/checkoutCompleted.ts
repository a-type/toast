import { Handler } from 'express';
import { Stripe } from 'stripe';
import { stripe } from '../stripe';
import { Session } from '../types';
import { ApiError, aqlQuery, aql } from 'toast-common';

export const checkoutCompleted: Handler = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event: Stripe.events.IEvent;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const {
      customer: customerId,
      subscription: subscriptionId,
      client_reference_id: userId,
    } = event.data.object as Session;
    // add subscription info to the Group and customer info to the User.
    const result = await aqlQuery(aql`
      LET user = DOCUMENT("Users", ${userId})
      LET group = FIRST(
        FOR group IN OUTBOUND user MemberOf
        LIMIT 1
        RETURN group
      )
      UPDATE { _key: user._key, stripeCustomerId: ${customerId} } IN Users
      UPDATE { _key: group._key, stripeSubscriptionId: ${subscriptionId} } IN Groups
      RETURN user, group
    `);

    const firstValue = await result.next();
    if (!firstValue.user) {
      throw new ApiError(`The user was not found`, 500);
    }
    if (!firstValue.group) {
      throw new ApiError(`The user doesn't have a group`, 500);
    }
  } else {
    console.warn(`Got unrecognized event for checkoutCompleted: ${event.type}`);
  }
};
