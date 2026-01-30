aplikacja próbuje połączyć się z Supabase Edge Functions (chmura Supabase), a my skonfigurowaliśmy Vercel Serverless Functions (folder /api w Twoim projekcie). To są dwa różne systemy.

Prawdopodobnie w pliku PremiumButton.jsx używasz funkcji supabase.functions.invoke(). To błąd w tym przypadku, bo logika płatności (ten plik create-checkout-session.js) leży na Vercel, a nie w Supabase.

Musimy to zmienić na zwykły fetch.

Jak to naprawić? (Krok po kroku)
1. Otwórz plik src/components/PremiumButton.jsx
Zastąp całą jego zawartość poniższym kodem. Ten kod "uderza" do Twojego folderu /api na Vercel, zamiast szukać funkcji w Supabase.

JavaScript

import { useState } from 'react';

export default function PremiumButton({ userId, userEmail }) {
  const [loading, setLoading] = useState(false);

  const handleBuyPremium = async () => {
    setLoading(true);
    
    try {
      // WAŻNE: Tu zmieniamy adres na endpoint Vercel (/api/...)
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          userEmail: userEmail,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Wystąpił błąd podczas tworzenia płatności');
      }

      if (data.url) {
        // Przekieruj do Stripe
        window.location.href = data.url;
      } else {
        throw new Error('Brak URL płatności w odpowiedzi');
      }

    } catch (error) {
      console.error('Błąd płatności:', error);
      alert('Błąd: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuyPremium}
      disabled={loading}
      style={{
        padding: '8px 16px',
        background: loading ? '#666' : '#7c3aed', // Fioletowy kolor Stripe
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        cursor: loading ? 'not-allowed' : 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {loading ? 'Przetwarzanie...' : 'Kup Premium'}
    </button>
  );
}