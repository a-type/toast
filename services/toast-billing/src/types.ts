export type Session = {
  id: string;
  object: 'checkout.session';
  billing_address_collection: 'auto' | 'required';
  cancel_url: string;
  client_reference_id: string;
  customer: string;
  customer_email: string;
  display_items: {
    amount: number;
    currency: string;
    custom: {
      description: string | null;
      images: string[] | null;
      name: string | null;
    };
    quantity: number;
    type: 'custom' | 'plan' | 'sku';
    sku?: any;
    plan?: {
      id: string;
      object: 'plan';
      active: boolean;
      aggregate_usage: string;
      amount: number;
      billing_schema: 'per_unit' | 'tiered';
      created: number;
      currenty: string;
      interval: string;
      interval_count: number;
      livemode: boolean;
      metadata: any;
      nickname: string;
      product: string;
      tiers: any;
      tiers_mode: any;
      transform_usage: any;
      trial_period_days: number;
      usage_type: string;
    };
  }[];

  livemode: boolean;
  locale: string | null;
  payment_intent: string;
  payment_method_types: string[];
  submit_type: 'auto' | 'book' | 'donate' | 'pay';
  subscription: string;
  success_url: string;
};
