import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ 
        error: 'Missing userId',
        isPremium: false,
        maxItems: 3
      });
    }

    // Sprawdź w bazie Supabase czy użytkownik ma Premium
    const { data, error } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Database error:', error);
      // W razie błędu bazy, daj użytkownikowi benefit of doubt
      // ale zaloguj błąd do monitorowania
      return res.status(200).json({
        isPremium: false,
        maxItems: 3,
        error: 'Database error - defaulting to free tier'
      });
    }

    const isPremium = data?.is_premium || false;
    const maxItems = isPremium ? 999 : 3;

    return res.status(200).json({
      isPremium,
      maxItems,
      message: isPremium ? 'Premium active' : 'Free tier'
    });

  } catch (error) {
    console.error('Validation error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      isPremium: false,
      maxItems: 3
    });
  }
}
