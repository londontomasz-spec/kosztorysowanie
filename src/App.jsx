function App() {
  const items = [
    { name: "Malowanie ścian 2x (biała)", unit: "m²", qty: 50, price: 32 },
    { name: "Gładź gipsowa ścian", unit: "m²", qty: 30, price: 45 },
    { name: "Układanie paneli podłogowych", unit: "m²", qty: 20, price: 45 },
  ];

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#111", color: "#fff", fontFamily: "sans-serif" }}>
      <h1>Kosztorys remontowy 2026 – DEMO</h1>
      <table style={{ width: "100%", marginTop: 24, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #555", textAlign: "left" }}>Pozycja</th>
            <th style={{ borderBottom: "1px solid #555" }}>Ilość</th>
            <th style={{ borderBottom: "1px solid #555" }}>Cena / jednostkę</th>
            <th style={{ borderBottom: "1px solid #555" }}>Wartość</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, idx) => (
            <tr key={idx}>
              <td style={{ padding: "4px 0" }}>{i.name}</td>
              <td style={{ textAlign: "center" }}>{i.qty} {i.unit}</td>
              <td style={{ textAlign: "right" }}>{i.price} zł</td>
              <td style={{ textAlign: "right" }}>{(i.qty * i.price).toFixed(2)} zł</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ marginTop: 16 }}>Suma: {total.toFixed(2)} zł</h2>
    </div>
  );
}

export default App;
