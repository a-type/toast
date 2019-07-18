import { Handler } from 'express';
import Stripe from 'stripe';
import { stripe } from '../stripe';
import { Session } from '../types';
import { neo4j, ApiError, createId, logger } from 'toast-common';

export const checkoutCompleted: Handler = async (req, res) => {
  logger.info(`Processing checkout complete event`);
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
    const {
      customer: customerId,
      subscription: subscriptionId,
      client_reference_id: userId,
    } = event.data.object as Session;
    logger.info(
      `Customer checkout info: [id: ${userId}] [customer: ${customerId}] [sub: ${subscriptionId}]`,
    );
    // add subscription info to the Group and customer info to the User.
    const session = neo4j.session();
    await session.writeTransaction(async tx => {
      // this tx also creates a group if the user doesn't have one yet
      const result = await tx.run(
        `
      MATCH (user:User{id: $userId})
      MERGE (user)-[:MEMBER_OF]->(group:Group)
        ON CREATE SET group.id = $createGroupId
      SET user.stripeCustomerId = $customerId
      SET group.stripeSubscriptionId = $subscriptionId
      RETURN group {.id}
      `,
        {
          userId,
          customerId,
          subscriptionId,
          createGroupId: createId('group'),
        },
      );

      if (!result.records.length) {
        throw new ApiError(
          `The user ${userId} doesn't have a group and a group could not be created`,
          500,
        );
      }
      if (result.records.length > 1) {
        console.error(
          `Paid subscription applied to multiple groups due to user "${userId}" being a member of multiple groups. Group IDs are [${result.records
            .map(r => r.get('group').id)
            .join(',')}]`,
        );
      } else {
        console.info(
          `Success: User ${userId} paid for a subscription and it was applied to ${
            result.records[0].get('group').id
          }`,
        );
      }

      // TODO: sync plan immediately

      res.send('OK');
    });
  } else {
    console.warn(`Got unrecognized event for checkoutCompleted: ${event.type}`);
  }
};
