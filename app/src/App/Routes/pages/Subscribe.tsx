import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@material-ui/core';

export interface SubscribePageProps {}

const basePath = `${window.location.protocol}//${window.location.origin}${
  window.location.port ? `:${window.location.port}` : ''
}`;
const successUrl = `${basePath}/success`;
const cancelUrl = `${basePath}/canceled`;

export const SubscribePage: FC<SubscribePageProps> = ({}) => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const stripeKey = CONFIG.stripe.key;
    const stripeUrl = 'https://js.stripe.com/v3/';
    if (!document.querySelector('#stripe-js')) {
      const script = document.createElement('script');
      script.async = true;
      script.id = 'stripe-js';
      script.onload = () => {
        if (!window['Stripe']) {
          throw new Error('Stripe failed to load');
        }
        const stripe = window['Stripe'](stripeKey);
        setStripe(stripe);
      };
      document.head.appendChild(script);
      script.src = stripeUrl;
    } else if (window['Stripe']) {
      const stripe = window['Stripe'](stripeKey);
      setStripe(stripe);
    }
  }, []);

  const checkout = async () => {
    const result = await stripe.redirectToCheckout({
      items: [{ plan: CONFIG.stripe.planId, quantity: 1 }],
      successUrl,
      cancelUrl,
    });

    console.log(result);

    if (!result) {
      // user canceled the checkout
    } else {
      // send token to core API
    }
  };

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
