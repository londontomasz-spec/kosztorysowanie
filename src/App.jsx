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
    {
      name: "Malowanie ścian 2x (biała)",
      unit: "m²",
      qty: 50,
      laborPrice: 32,
      materialPrice: 8,
      rhPerUnit: 0.25,
    },
    {
      name: "Gładź gipsowa ścian",
      unit: "m²",
      qty: 30,
      laborPrice: 45,
      materialPrice: 10,
      rhPerUnit: 0.3,
    },
  ]);

  const [workers, setWorkers] = useState(1);
  const [openIndex, setOpenIndex] = useState(null);
  const [materialsBy, setMaterialsBy] = useState("contractor"); // wykonawca / klient
  const [vatRate, setVatRate] = useState(23);                   // % VAT
  const [currency, setCurrency] = useState("PLN");              // waluta
  const maxItems = 3;

  const totalLabor = items.reduce(
    (sum, i) => sum + i.qty * i.laborPrice,
    0
  );
  const totalMaterials = items.reduce(
    (sum, i) => sum + i.qty * i.materialPrice,
    0
  );
  const totalRH = items.reduce(
    (sum, i) => sum + i.qty * (i.rhPerUnit || 0),
    0
  );
  const hoursWithWorkers = workers > 0 ? totalRH / workers : 0;

  const totalForClient =
    totalLabor + (materialsBy === "contractor" ? totalMaterials : 0);
  const vatAmount = (totalForClient * vatRate) / 100;
  const totalBrutto = totalForClient + vatAmount;

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    if (
      field === "qty" ||
      field === "laborPrice" ||
      field === "materialPrice" ||
      field === "rhPerUnit"
    ) {
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
      {
        name: "",
        unit: "m²",
        qty: 0,
        laborPrice: 0,
        materialPrice: 0,
        rhPerUnit: 0,
      },
    ]);
  };

  const filteredServices = (text) => {
    if (!text) return [];
    const t = text.toLowerCase();
    return SERVICES.filter((s) =>
      s.name.toLowerCase().startsWith(t)
    ).slice(0, 5);
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
    <div
      style={{
        padding: 24,
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Kosztorys remontowy 2026 – DEMO</h1>
      <p>Maksymalnie {maxItems} pozycje w wersji demo.</p>

      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <label>
          Liczba pracowników:{" "}
          <input
            type="number"
            min={1}
            value={workers}
            onChange={(e) =>
              setWorkers(Number(e.target.value) || 1)
            }
            style={{ width: 60, textAlign: "right" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 16 }}>
        Materiał opłaca:{" "}
        <label style={{ marginRight: 12 }}>
          <input
            type="radio"
            checked={materialsBy === "contractor"}
            onChange={() => setMaterialsBy("contractor")}
          />{" "}
          wykonawca
        </label>
        <label>
          <input
            type="radio"
            checked={materialsBy === "client"}
            onChange={() => setMaterialsBy("client")}
          />{" "}
          klient
        </label>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 16 }}>
          Stawka VAT (%):{" "}
          <input
            type="number"
            min={0}
            max={23}
            value={vatRate}
            onChange={(e) =>
              setVatRate(Number(e.target.value) || 0)
            }
            style={{ width: 60, textAlign: "right" }}
          />
        </label>

        <label>
          Waluta:{" "}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{ padding: "2px 6px" }}
          >
            <option value="PLN">PLN</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </label>
      </div>

      <table
        style={{
          width: "100%",
          marginTop: 8,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                borderBottom: "1px solid #555",
                textAlign: "left",
              }}
            >
              Pozycja
            </th>
            <th style={{ borderBottom: "1px solid #555" }}>Ilość</th>
            <th style={{ borderBottom: "1px solid #555" }}>Jm</th>
            <th style={{ borderBottom: "1px solid #555" }}>
              Cena robocizny
            </th>
            <th style={{ borderBottom: "1px solid #555" }}>
              Cena materiału
            </th>
            <th style={{ borderBottom: "1px solid #555" }}>
              RH / jedn.
            </th>
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
                      setTimeout(
                        () => setOpenIndex(null),
                        150
                      );
                    }}
                    placeholder="Wpisz np. 'm' dla malowania"
                  />
                  {openIndex === idx &&
                    suggestions.length > 0 && (
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
                            key={s.name}
                            style={{
                              padding: "4px 8px",
                              cursor: "pointer",
                            }}
                            onMouseDown={() => {
                              pickService(idx, s);
                              setOpenIndex(null);
                            }}
                          >
                            {s.name}
                          </div>
                        ))}
                      </div>
                    )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <input
                    style={{
                      width: "70px",
                      textAlign: "right",
                    }}
                    type="number"
                    value={i.qty}
                    onChange={(e) =>
                      handleChange(idx, "qty", e.target.value)
                    }
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <input
                    style={{
                      width: "60px",
                      textAlign: "center",
                    }}
                    value={i.unit}
                    onChange={(e) =>
                      handleChange(idx, "unit", e.target.value)
                    }
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <input
                    style={{
                      width: "90px",
                      textAlign: "right",
                    }}
                    type="number"
                    value={i.laborPrice}
                    onChange={(e) =>
                      handleChange(
                        idx,
                        "laborPrice",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <input
                    style={{
                      width: "90px",
                      textAlign: "right",
                    }}
                    type="number"
                    value={i.materialPrice}
                    onChange={(e) =>
                      handleChange(
                        idx,
                        "materialPrice",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <input
                    style={{
                      width: "80px",
                      textAlign: "right",
                    }}
                    type="number"
                    value={i.rhPerUnit}
                    onChange={(e) =>
                      handleChange(
                        idx,
                        "rhPerUnit",
                        e.target.value
                      )
                    }
                  />
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
          background:
            items.length >= maxItems ? "#444" : "#0f766e",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor:
            items.length >= maxItems ? "not-allowed" : "pointer",
        }}
      >
        Dodaj pozycję
      </button>

      <h2 style={{ marginTop: 16 }}>
        Suma robocizny: {totalLabor.toFixed(2)} {currency}
      </h2>
      <h2>
        Suma materiałów:{" "}
        {materialsBy === "contractor"
          ? `${totalMaterials.toFixed(2)} ${currency} (po stronie wykonawcy)`
          : `0 ${currency} (materiał klienta)`}
      </h2>

      <h3 style={{ marginTop: 16 }}>Podsumowanie dla klienta:</h3>
      <p>
        Razem netto: {totalForClient.toFixed(2)} {currency}
      </p>
      <p>
        VAT {vatRate}%: {vatAmount.toFixed(2)} {currency}
      </p>
      <p>
        Razem brutto: {totalBrutto.toFixed(2)} {currency}
      </p>

      <p style={{ marginTop: 16 }}>
        Łącznie roboczogodzin (RH): {totalRH.toFixed(2)}
      </p>
      <p>
        Szacowany czas pracy przy {workers} pracownikach:{" "}
        {hoursWithWorkers.toFixed(1)} godz.
      </p>
    </div>
  );
}

export default App;
