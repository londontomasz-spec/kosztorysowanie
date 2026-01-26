import { useState } from "react";

const SERVICES = [
  { name: "Malowanie ścian 1x (biała)", rhPerUnit: 0.15 },
  { name: "Malowanie ścian 2x (biała)", rhPerUnit: 0.25 },
  { name: "Malowanie ścian 1x (kolor)", rhPerUnit: 0.18 },
  { name: "Malowanie sufitów", rhPerUnit: 0.2 },
  { name: "Gładź gipsowa ścian", rhPerUnit: 0.3 },
  { name: "Gładź gipsowa sufitów", rhPerUnit: 0.35 },
  { name: "Układanie paneli podłogowych", rhPerUnit: 0.25 },
  { name: "Układanie płytek ściennych w łazience", rhPerUnit: 0.5 },
  { name: "Układanie płytek podłogowych w łazience", rhPerUnit: 0.5 },
  { name: "Gruntowanie ścian", rhPerUnit: 0.1 },
  { name: "Gruntowanie sufitów", rhPerUnit: 0.1 },
];

function App() {
  const [items, setItems] = useState([
    { name: "Malowanie ścian 2x (biała)", unit: "m²", qty: 50, price: 32, rhPerUnit: 0.25 },
    { name: "Gładź gipsowa ścian", unit: "m²", qty: 30, price: 45, rhPerUnit: 0.3 },
  ]);

  const [workers, setWorkers] = useState(1);
  const [openIndex, setOpenIndex] = useState(null);
  const maxItems = 3;

  const totalValue = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const totalRH = items.reduce((sum, i) => sum + i.qty * (i.rhPerUnit || 0), 0);
  const hoursWithWorkers = workers > 0 ? totalRH / workers : 0;

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    if (field === "qty" || field === "price" || field === "rhPerUnit") {
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
      { name: "", unit: "m²", qty: 0, price: 0, rhPerUnit: 0 },
    ]);
  };

  const filteredServices = (text) => {
    if (!text) return [];
    const t = text.toLowerCase();
    return SERVICES.filter((s) => s.name.toLowerCase().startsWith(t)).slice(0, 5);
  };

  const pickService = (idx, service) => {
    const newItems = [...items];
    newItems[idx].name = service.name;
    if (!newItems[idx].rhPerUnit || newItems[idx].rhPerUnit === 0) {
      newItems[idx].rhPerUnit = service.rhPerUnit;
    }
    setItems(newItems);
  };

  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#111", color: "#fff", fontFamily: "sans-serif" }}>
      <h1>Kosztorys remontowy 2026 – DEMO</h1>
      <p>Maksymalnie {maxItems} pozycje w wersji demo.</p>

      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <label>
          Liczba pracowników:{" "}
          <input
            type="number"
            min={1}
            value={workers}
            onChange={(e) => setWorkers(Number(e.target.value) || 1)}
            style={{ width: 60, textAlign: "right" }}
          />
        </label>
      </div>

      <table style={{ width: "100%", marginTop: 8, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #555", textAlign: "left" }}>Pozycja</th>
            <th style={{ borderBottom: "1px solid #555" }}>Ilość</th>
            <th style={{ borderBottom: "1px solid #555" }}>Jednostka</th>
            <th style={{ borderBottom: "1px solid #555" }}>Cena / jedn.</th>
            <th style={{ borderBottom: "1px solid #555" }}>RH / jedn.</th>
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
                      handleChange(idx, "na
