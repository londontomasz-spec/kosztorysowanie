import { useState } from "react";

const SERVICES = [
  "Malowanie ścian 1x (biała)",
  "Malowanie ścian 2x (biała)",
  "Malowanie ścian 1x (kolor)",
  "Malowanie sufitów",
  "Gładź gipsowa ścian",
  "Gładź gipsowa sufitów",
  "Układanie paneli podłogowych",
  "Układanie płytek ściennych w łazience",
  "Układanie płytek podłogowych w łazience",
  "Gruntowanie ścian",
  "Gruntowanie sufitów",
];

function App() {
  const [items, setItems] = useState([
    { name: "Malowanie ścian 2x (biała)", unit: "m²", qty: 50, price: 32 },
    { name: "Gładź gipsowa ścian", unit: "m²", qty: 30, price: 45 },
  ]);

  const [openIndex, setOpenIndex] = useState(null); // która pozycja ma otwartą listę
  const maxItems = 3;

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    if (field === "qty" || field === "price") {
      newItems[index][field] = Number(value) || 0;
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
  };

  const addItem = () => {
    if (items.length >= maxItems) return;
    setItems([
      ...items,
      { name: "", unit: "m²", qty: 0, price: 0 },
    ]);
  };

  const filteredServices = (text) => {
    if (!text) return [];
    const t = text.toLowerCase();
    return SERVICES.filter((s) => s.toLowerCase().startsWith(t)).slice(0, 5);
  };

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#111", color: "#fff", fontFamily: "sans-serif" }}>
      <h1>Kosztorys remontowy 2026 – DEMO</h1>
      <p>Maksymalnie {maxItems} pozycje w wersji demo.</p>

      <table style={{ width: "100%", marginTop: 24, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #555", textAlign: "left" }}>Pozycja</th>
            <th style={{ borderBottom: "1px solid #555" }}>Ilość</th>
            <th style={{ borderBottom: "1px solid #555" }}>Jednostka</th>
            <th style={{ borderBottom: "1px solid #555" }}>Cena / jedn.</th>
            <th style={{ borderBottom: "1px solid #555" }}>Wartość</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, idx) => {
            const suggestions = filteredServices(i.name);
            return (
              <tr key={idx} style={{ position: "relative" }}>
                <td style={{ padding: "4px 0" }}>
                  <input
                    style={{ width: "100%" }}
                    value={i.name}
                    onChange={(e) => {
                      handleChange(idx, "name", e.target.value);
                      setOpenIndex(idx);
                    }}
                    onFocus={() => setOpenIndex(idx)}
                    onBlur={() => {
                      // lekkie opóźnienie, żeby kliknięcie w sugestię zdążyło zadziałać
                      setTimeout(() => setOpenIndex(null), 150);
                    }}
                    placeholder="Wpisz np. 'm' dla malowania"
                  />
                  {openIndex === idx && suggestions.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        background: "#222",
                        border: "1px solid #555",
                        zIndex: 10,
                        maxHeight: 150,
                        overflowY: "auto",
                      }}
                    >
                      {suggestions.map((s) => (
                        <div
                          key={s}
                          style={{ padding: "4px 8px", cursor: "pointer" }}
                          onMouseDown={() => {
                            handleChange(idx, "name", s);
                            setOpenIndex(null);
                          }}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <input
                    style={{ width: "70px", textAlign: "right" }}
                    type="number"
                    value={i.qty}
                    onChange={(e) => handleChange(idx, "qty", e.target.value)}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <input
                    style={{ width: "60px", textAlign: "center" }}
                    value={i.unit}
                    onChange={(e) => handleChange(idx, "unit", e.target.value)}
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <input
                    style={{ width: "90px", textAlign: "right" }}
                    type="number"
                    value={i.price}
                    onChange={(e) => handleChange(idx, "price", e.target.value)}
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  {(i.qty * i.price).toFixed(2)} zł
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        onClick={addItem}
        disabled={items.length >= maxItems}
        style={{
          marginTop: 16,
          padding: "8px 16px",
          background: items.length >= maxItems ? "#444" : "#0f766e",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: items.length >= maxItems ? "not-allowed" : "pointer",
        }}
      >
        Dodaj pozycję
      </button>

      <h2 style={{ marginTop: 16 }}>Suma: {total.toFixed(2)} zł</h2>
    </div>
  );
}

export default App;
