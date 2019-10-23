import { useState, useEffect } from 'react';

export const useStripe = () => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stripeKey = process.env.STRIPE_KEY;
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

  return stripe;
};
