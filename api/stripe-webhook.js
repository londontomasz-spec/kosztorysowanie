import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POPRAWKA: użyj VITE_SUPABASE_URL i SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Funkcja do odczytu body
async function buffer(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];

  let event;
  try {
    const body = await buffer(req);
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('✅ Webhook verified:', event.type);
  } catch (err) {
    console.error('❌ Webhook error:', err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId; // POPRAWKA: userId nie user_id

    console.log('User ID:', userId);

    if (userId) {
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          is_premium: true,
          stripe_customer_id: session.customer 
        })
        .eq('id', userId)
        .select();

      if (error) {
        console.error('❌ Supabase error:', error);
        return res.status(500).json({ error: 'Database error' });
      }

      console.log('✅ Updated:', data);
    }
  }

  res.json({ received: true });
}