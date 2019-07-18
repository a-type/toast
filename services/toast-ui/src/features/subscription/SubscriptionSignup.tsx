import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { useAuth } from 'contexts/AuthContext';
import { useLoadStripe } from 'features/subscription/useLoadStripe';

export interface SubscriptionSignupProps {}

const successUrl = `${window.location.origin}/success`;
const cancelUrl = `${window.location.origin}/canceled`;

export const SubscriptionSignup: FC<SubscriptionSignupProps> = ({}) => {
  const { user } = useAuth();
  const stripe = useLoadStripe();

  const checkout = async () => {
    const result = await stripe.redirectToCheckout({
      items: [{ plan: CONFIG.stripe.planId, quantity: 1 }],
      successUrl,
      cancelUrl,
      clientReferenceId: user.uid,
    });

    console.log(result);

    if (!result) {
      // user canceled the checkout
    } else {
      // checkout success
    }
  };

  if (!stripe) {
    return null;
  }

  return (
    <Box p={3}>
      <Typography variant="h1" gutterBottom>
        Complete your subscription
      </Typography>
      <Typography gutterBottom>
        To start using Toast, you need to sign up for a plan.
      </Typography>
      <Button onClick={checkout}>Subscribe</Button>
    </Box>
  );
};
