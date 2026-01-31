import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function buffer(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function generatePassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
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
    const userId = session.metadata.userId;
    const customerEmail = session.customer_details.email;

    console.log('User ID:', userId);
    console.log('Email:', customerEmail);

    // Przypadek 1: Istniejący użytkownik
    if (userId && userId !== 'new_user') {
      const { error } = await supabase
        .from('profiles')
        .update({
          is_premium: true,
          stripe_customer_id: session.customer,
        })
        .eq('id', userId);

      if (error) {
        console.error('❌ Update error:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Wyślij email potwierdzający
      await resend.emails.send({
        from: 'Kosztorysowanie <onboarding@resend.dev>',
        to: customerEmail,
        subject: '✅ Premium aktywowane!',
        html: `
          <h1>Dziękujemy za zakup Premium!</h1>
          <p>Twoje konto zostało zaktualizowane.</p>
          <p><a href="https://kosztorysowanie.vercel.app">Przejdź do aplikacji</a></p>
        `
      });
      
      console.log('✅ Existing user updated');
    }

    // Przypadek 2: Nowy użytkownik - utwórz konto
    if (userId === 'new_user' && customerEmail) {
      const tempPassword = generatePassword();

      // Utwórz użytkownika w Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: customerEmail,
        password: tempPassword,
        email_confirm: true,
      });

      if (authError) {
        console.error('❌ Auth error:', authError);
        return res.status(500).json({ error: 'Auth error' });
      }

      console.log('✅ User created:', authData.user.id);

      // Utwórz profil
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          is_premium: true,
          stripe_customer_id: session.customer,
        });

      if (profileError) {
        console.error('❌ Profile error:', profileError);
      }

      // Wyślij email z danymi logowania
      await resend.emails.send({
        from: 'Kosztorysowanie <onboarding@resend.dev>',
        to: customerEmail,
        subject: '🎉 Twoje konto Premium jest gotowe!',
        html: `
          <h1>Witaj w Kosztorysowanie Premium!</h1>
          <p>Twoje konto zostało utworzone.</p>
          <hr>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Hasło:</strong> ${tempPassword}</p>
          <hr>
          <p><a href="https://kosztorysowanie.vercel.app">Zaloguj się teraz</a></p>
          <p><small>Zalecamy zmianę hasła po pierwszym logowaniu.</small></p>
        `
      });

      console.log('✅ New user created with premium');
    }
  }

  res.json({ received: true });
}