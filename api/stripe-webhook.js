import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Wyłączamy domyślne parsowanie body przez Vercel
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Funkcja pomocnicza do odczytu surowego body
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (!sig || !webhookSecret) {
      console.error('Brak podpisu lub sekretu webhooka');
      return res.status(400).send('Missing signature or secret');
    }
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error(`Błąd weryfikacji webhooka: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Logowanie typu zdarzenia
  console.log('Otrzymano zdarzenie:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    
    console.log('Webhook przetwarza userId:', userId);

    if (userId) {
      // Inicjalizacja Supabase
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Aktualizacja bazy
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          is_premium: true,
          stripe_customer_id: session.customer
        })
        .eq('id', userId)
        .select();

      if (error) {
        console.error('Błąd Supabase:', error);
        return res.status(500).send('Database Error');
      }
      
      console.log('Sukces! Zaktualizowano profil:', data);
    } else {
      console.error('BŁĄD: Brak userId w metadanych sesji!');
    }
  }

  res.status(200).json({ received: true });
}