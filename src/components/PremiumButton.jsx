import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function PremiumButton() {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Musisz być zalogowany!');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          email: user.email,
priceId: 'price_1SuGxAKVfmca1FhPAq8krAPQ'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data?.url) {
        throw new Error('Brak URL w odpowiedzi');
      }

      // Przekieruj na Stripe Checkout (NOWA METODA)
      window.location.href = data.url;
      
    } catch (err) {
      console.error('Error:', err);
      alert('Błąd: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      style={{
        padding: '12px 24px',
        background: loading ? '#666' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 600,
        cursor: loading ? 'not-allowed' : 'pointer',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (!loading) e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
      }}
    >
      {loading ? '⏳ Przekierowywanie...' : ' Kup Premium za 49 PLN'}
    </button>
  );
}
