import { useState } from 'react';

export default function PremiumButton({ userId, userEmail }) {
  const [loading, setLoading] = useState(false);

  const handleBuyPremium = async () => {
    setLoading(true);
    
    try {
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
        background: loading ? '#666' : '#7c3aed',
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