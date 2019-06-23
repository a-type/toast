import { Handler } from 'express';
import Stripe from 'stripe';
import { stripe } from '../stripe';
import { Session } from '../types';
import { neo4j, ApiError } from 'toast-common';

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
    const session = neo4j.session();
    await session.writeTransaction(async tx => {
      const result = await tx.run(
        `
      MATCH (user:User{id: $userId})-[:BELONGS_TO]->(group:Group)
      SET user.stripeCustomerId = $customerId
      SET group.stripeSubscriptionId = $subscriptionId
      RETURN group {.id}
      `,
        {
          userId,
          customerId,
          subscriptionId,
        },
      );

      if (!result.records.length) {
        throw new ApiError("The user doesn't have a group", 400);
      }
      if (result.records.length > 1) {
        console.error(
          `Paid subscription applied to multiple groups due to user being a member of multiple groups. Group IDs are [${result.records
            .map(r => r.get('group').id)
            .join(',')}]`,
        );
      }
    });
  } else {
    console.warn(`Got unrecognized event for checkoutCompleted: ${event.type}`);
  }
};
