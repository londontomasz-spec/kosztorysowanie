import { useState } from "react";

const SERVICES = [
  { name: "Malowanie ścian 1x (biała)", rhPerUnit: 0.15 },
  { name: "Malowanie ścian 2x (biała)", rhPerUnit: 0.25 },
  { name: "Malowanie ścian 1x (kolor)", rhPerUnit: 0.18 },
  { name: "Malowanie sufitów farbą białą", rhPerUnit: 0.22 },
  { name: "Gładź gipsowa na ścianach", rhPerUnit: 0.3 },
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
      name: "Gładź gipsowa na ścianach",
      unit: "m²",
      qty: 30,
      laborPrice: 45,
      materialPrice: 10,
      rhPerUnit: 0.3,
    },
  ]);

  const [workers, setWorkers] = useState(1);
  const [openIndex, setOpenIndex] = useState(null);
  const [materialsBy, setMaterialsBy] = useState("contractor");
  const [vatRate, setVatRate] = useState(23);
  const [currency, setCurrency] = useState("PLN");
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

  const handleDownloadPdf = () => {
    alert("Tu będzie generowanie PDF (demo).");
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
            <th style={{ borderBottom: "1px solid #555" }}>Jm<
