import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Auth({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      }
    });

    if (error) {
      setMessage('❌ Błąd: ' + error.message);
    } else {
      setMessage('✅ Sprawdź swoją skrzynkę e-mail!');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#111', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 24
    }}>
      <div style={{ 
        maxWidth: 400, 
        width: '100%',
        padding: 32, 
        background: '#222', 
        borderRadius: 8,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ color: '#fff', marginBottom: 8, fontSize: 24 }}>
          Kosztorys Remontowy 2026
        </h1>
        <p style={{ color: '#888', marginBottom: 24, fontSize: 14 }}>
          Zaloguj się przez e-mail (bez hasła)
        </p>
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="twoj@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: 12, 
              marginBottom: 12, 
              borderRadius: 4, 
              border: '1px solid #444',
              background: '#333',
              color: '#fff',
              fontSize: 16
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: 12, 
              background: loading ? '#444' : '#0f766e', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 4, 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            {loading ? 'Wysyłanie...' : '📧 Wyślij link logowania'}
          </button>
        </form>
        
        {message && (
          <p style={{ 
            marginTop: 16, 
            padding: 12,
            borderRadius: 4,
            background: message.includes('❌') ? '#7f1d1d' : '#064e3b',
            color: '#fff',
            fontSize: 14
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
