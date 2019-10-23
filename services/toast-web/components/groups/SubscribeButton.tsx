import React, { FC, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useAuth } from 'contexts/AuthContext';
import { useStripe } from 'hooks/useStripe';
import { ButtonProps } from '@material-ui/core/Button';

export interface SubscribeButtonProps extends ButtonProps {
  onCheckoutCanceled?: () => any;
  onCheckoutComplete: () => any;
}

const basePath = typeof window !== 'undefined' ? window.location.origin : '';
const successUrl = `${basePath}/subscription`;
const cancelUrl = `${basePath}/subscription`;

export const SubscribeButton: FC<SubscribeButtonProps> = ({
  onCheckoutCanceled,
  onCheckoutComplete,
  ...rest
}) => {
  const { user } = useAuth();
  const stripe = useStripe();

  const checkout = async () => {
    const result = await stripe.redirectToCheckout({
      items: [{ plan: process.env.STRIPE_PLAN_ID, quantity: 1 }],
      successUrl,
      cancelUrl,
      clientReferenceId: user.uid,
    });

    console.log(result);

    if (!result) {
      // user canceled the checkout
      onCheckoutCanceled && onCheckoutCanceled();
    } else {
      // checkout success
      onCheckoutComplete();
    }
  };

  return (
    <Button {...rest} onClick={checkout}>
      Subscribe for $5 / month
    </Button>
  );
};
