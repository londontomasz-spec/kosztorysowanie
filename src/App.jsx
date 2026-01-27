import { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Poprawne przypisanie czcionek (kompatybilność z różnymi wersjami)
if (pdfFonts && pdfFonts.pdfMake) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else if (pdfFonts && pdfFonts.vfs) {
  pdfMake.vfs = pdfFonts.vfs;
} else if (typeof pdfFonts === "object") {
  pdfMake.vfs = pdfFonts;
}

// Definicja czcionek - Roboto obsługuje polskie znaki
pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

const SERVICES = [
  { name: "Malowanie ścian jednokrotne (farba biała)", rhPerUnit: 0.15 },
  { name: "Malowanie ścian dwukrotne (farba biała)", rhPerUnit: 0.25 },
  { name: "Malowanie ścian jednokrotne (farba kolor)", rhPerUnit: 0.18 },
  { name: "Malowanie sufitów farbą białą", rhPerUnit: 0.22 },
  { name: "Malowanie drzwi", rhPerUnit: 0.8 },
  { name: "Malowanie rur wod-kan / c.o.", rhPerUnit: 0.25 },
  { name: "Gruntowanie ścian przed malowaniem", rhPerUnit: 0.1 },
  { name: "Gruntowanie sufitów", rhPerUnit: 0.1 },
  { name: "Gładź gipsowa na ścianach", rhPerUnit: 0.3 },
  { name: "Gładź gipsowa na sufitach", rhPerUnit: 0.35 },
  { name: "Wyrównywanie ścian tynkiem gipsowym", rhPerUnit: 0.35 },
  { name: "Wyrównywanie ścian tynkiem cementowo-wapiennym", rhPerUnit: 0.4 },
  { name: "Docieplanie ścian wewnętrznych", rhPerUnit: 0.25 },
  { name: "Wylewka samopoziomująca na podłodze", rhPerUnit: 0.35 },
  { name: "Wylewki na trudnych podłożach", rhPerUnit: 0.45 },
  { name: "Tapetowanie tapetą papierową", rhPerUnit: 0.35 },
  { name: "Tapetowanie tapetą winylową/flizelinową", rhPerUnit: 0.4 },
  { name: "Zrywanie starej tapety", rhPerUnit: 0.2 },
  { name: "Montaż paneli podłogowych", rhPerUnit: 0.25 },
  { name: "Montaż paneli winylowych (LVT)", rhPerUnit: 0.35 },
  { name: "Montaż listew przypodłogowych MDF", rhPerUnit: 0.15 },
  { name: "Montaż listew przysufitowych (sztukateria styro)", rhPerUnit: 0.2 },
  { name: "Podcinanie drzwi", rhPerUnit: 0.25 },
  { name: "Montaż deski Barlineckiej", rhPerUnit: 0.3 },
  { name: "Montaż podłogi drewnianej (parkiet/Finish Parkiet)", rhPerUnit: 0.45 },
  { name: "Cyklinowanie parkietu", rhPerUnit: 0.4 },
  { name: "Cyklinowanie + 3-krotne lakierowanie", rhPerUnit: 0.6 },
  { name: "Cyklinowanie desek Barlineckich", rhPerUnit: 0.45 },
  { name: "Skuwanie starych tynków", rhPerUnit: 0.3 },
  { name: "Demontaż starej glazury/terakoty", rhPerUnit: 0.35 },
  { name: "Układanie płytek ściennych w łazience", rhPerUnit: 0.6 },
  { name: "Układanie płytek podłogowych w łazience", rhPerUnit: 0.6 },
  { name: "Układanie płytek w kuchni nad blatem", rhPerUnit: 0.55 },
  { name: "Fugowanie nowych płytek (osobno)", rhPerUnit: 0.2 },
  { name: "Usunięcie starej fugi i położenie nowej", rhPerUnit: 0.35 },
  { name: "Montaż cokołów gotowych (glazura/terakota)", rhPerUnit: 0.25 },
  { name: "Montaż drzwiczek rewizyjnych", rhPerUnit: 0.4 },
  { name: "Opłytkowanie zabudowy geberitu", rhPerUnit: 1.5 },
  { name: "Montaż brodzika prysznicowego", rhPerUnit: 1.2 },
  { name: "Montaż kabiny prysznicowej", rhPerUnit: 1.5 },
  { name: "Montaż wanny", rhPerUnit: 1.8 },
  { name: "Montaż miski WC kompakt", rhPerUnit: 0.8 },
  { name: "Montaż WC podwieszanego na stelażu (geberit)", rhPerUnit: 1.2 },
  { name: "Montaż umywalki", rhPerUnit: 0.7 },
  { name: "Montaż szafki pod umywalkę", rhPerUnit: 0.5 },
  { name: "Montaż lustra łazienkowego", rhPerUnit: 0.4 },
  { name: "Montaż baterii wannowej", rhPerUnit: 0.4 },
  { name: "Montaż baterii kuchennej", rhPerUnit: 0.4 },
  { name: "Montaż baterii umywalkowej", rhPerUnit: 0.4 },
  { name: "Wymiana syfonu i podłączenie odpływu umywalki", rhPerUnit: 0.5 },
  { name: "Montaż zlewozmywaka na szafce", rhPerUnit: 0.5 },
  { name: "Montaż zlewozmywaka wpuszczanego w blat", rhPerUnit: 0.8 },
  { name: "Wykonanie nowych podejść wod-kan do umywalki/pralki", rhPerUnit: 1.2 },
  { name: "Przesunięcie przyłącza wod-kan", rhPerUnit: 1.5 },
  { name: "Montaż kratki ściekowej", rhPerUnit: 0.3 },
  { name: "Nowa kompleksowa instalacja hydrauliczna łazienki", rhPerUnit: 6 },
  { name: "Montaż drzwi wewnętrznych", rhPerUnit: 1.2 },
  { name: "Montaż drzwi zewnętrznych z demontażem starej ościeżnicy", rhPerUnit: 2 },
  { name: "Obróbka otworów drzwiowych (tynk/wykończenie)", rhPerUnit: 0.4 },
  { name: "Wyburzenie ścianki działowej", rhPerUnit: 0.6 },
  { name: "Murowanie ścianki działowej", rhPerUnit: 0.7 },
  { name: "Zamurowanie otworu drzwiowego", rhPerUnit: 1 },
  { name: "Wykonanie otworu drzwiowego w ściance g-k", rhPerUnit: 0.8 },
  { name: "Wykonanie otworu drzwiowego w ścianie murowanej", rhPerUnit: 2 },
  { name: "Dwustronne obrobienie glifów przy drzwiach", rhPerUnit: 0.5 },
  { name: "Montaż okien zespolonych", rhPerUnit: 0.8 },
  { name: "Demontaż okien", rhPerUnit: 0.6 },
  { name: "Wymiana klamek i szyldów okiennych", rhPerUnit: 0.2 },
  { name: "Montaż parapetów wewnętrznych", rhPerUnit: 0.3 },
  { name: "Montaż parapetów zewnętrznych", rhPerUnit: 0.35 },
  { name: "Montaż oświetlenia sufitowego (lampy, plafony)", rhPerUnit: 0.4 },
  { name: "Montaż halogenów / oczka wpuszczane", rhPerUnit: 0.3 },
  { name: "Wykonanie kanału telewizyjnego pod kable", rhPerUnit: 1.5 },
  { name: "Montaż wyłączników", rhPerUnit: 0.08 },
  { name: "Montaż gniazd wtykowych", rhPerUnit: 0.1 },
  { name: "Wykonanie punktu gniazda siłowego", rhPerUnit: 0.8 },
  { name: "Wykonanie bruzd pod instalację elektryczną", rhPerUnit: 0.25 },
  { name: "Montaż sufitu podwieszanego prostego", rhPerUnit: 0.45 },
  { name: "Montaż sufitu podwieszanego wielopoziomowego", rhPerUnit: 0.7 },
  { name: "Podcięcie zabudowy przy suficie (g-k)", rhPerUnit: 0.4 },
  { name: "Montaż sztukaterii (listwy, rozety)", rhPerUnit: 0.25 },
  { name: "Wyszpachlowanie siatki zbrojącej na pęknięciach", rhPerUnit: 0.25 },
  { name: "Demontaż gazowego pieca c.o.", rhPerUnit: 0.8 },
  { name: "Zawieszenie grzejnika", rhPerUnit: 0.4 },
  { name: "Przesunięcie przyłącza do grzejnika", rhPerUnit: 1.2 },
  { name: "Sprzątanie poremontowe mieszkania (podstawowe)", rhPerUnit: 0.2 },
  { name: "Utylizacja gruzu / odpadów (worki)", rhPerUnit: 0.1 },
];

function App() {
  const [items, setItems] = useState([
    {
      name: "Malowanie ścian dwukrotne (farba biała)",
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

  const totalLabor = items.reduce((sum, i) => sum + i.qty * i.laborPrice, 0);
  const totalMaterials = items.reduce(
    (sum, i) => sum + i.qty * i.materialPrice,
    0
  );
  const totalRH = items.reduce((sum, i) => sum + i.qty * (i.rhPerUnit || 0), 0);
  const hoursWithWorkers = workers > 0 ? totalRH / workers : 0;

  const totalForClient =
    totalLabor + (materialsBy === "contractor" ? totalMaterials : 0);
  const vatAmount = (totalForClient * vatRate) / 100;
  const totalBrutto = totalForClient + vatAmount;

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    if (["qty", "laborPrice", "materialPrice", "rhPerUnit"].includes(field)) {
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

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const filteredServices = (text) => {
    if (!text) return [];
    const t = text.toLowerCase();
    return SERVICES.filter((s) => s.name.toLowerCase().startsWith(t)).slice(
      0,
      5
    );
  };

  const pickService = (idx, service) => {
    const newItems = [...items];
    newItems[idx].name = service.name;
    if (!newItems[idx].rhPerUnit || newItems[idx].rhPerUnit === 0) {
      newItems[idx].rhPerUnit = service.rhPerUnit;
    }
    setItems(newItems);
    setOpenIndex(null);
  };

  const handleDownloadPdf = () => {
    // Tabela z pozycjami
    const tableBody = [
      [
        { text: "Lp.", style: "tableHeader" },
        { text: "Nazwa usługi", style: "tableHeader" },
        { text: "Ilość", style: "tableHeader" },
        { text: "Jm.", style: "tableHeader" },
        { text: "Cena/jm.", style: "tableHeader" },
        { text: "Wartość", style: "tableHeader" },
      ],
      ...items.map((item, idx) => [
        { text: (idx + 1).toString(), alignment: "center" },
        { text: item.name },
        { text: item.qty.toString(), alignment: "center" },
        { text: item.unit, alignment: "center" },
        { text: `${item.laborPrice.toFixed(2)} ${currency}`, alignment: "right" },
        {
          text: `${(item.qty * item.laborPrice).toFixed(2)} ${currency}`,
          alignment: "right",
        },
      ]),
    ];

    const docDefinition = {
      pageSize: "A4",
      pageMargins: [40, 60, 40, 60],

      // Domyślny styl z czcionką Roboto
      defaultStyle: {
        font: "Roboto",
        fontSize: 10,
      },

      // Style
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          fillColor: "#2563eb",
          color: "white",
          alignment: "center",
        },
        totalLabel: {
          fontSize: 11,
          bold: true,
        },
        totalValue: {
          fontSize: 11,
          bold: true,
          alignment: "right",
        },
      },

      content: [
        // Nagłówek
        { text: "KOSZTORYS REMONTOWY", style: "header", alignment: "center" },
        {
          text: `Data: ${new Date().toLocaleDateString("pl-PL")}`,
          alignment: "right",
          margin: [0, 0, 0, 20],
        },

        // Informacje ogólne
        {
          columns: [
            { text: `Waluta: ${currency}`, width: "auto" },
            { text: `Stawka VAT: ${vatRate}%`, width: "auto" },
            { text: `Liczba pracowników: ${workers}`, width: "auto" },
          ],
          columnGap: 20,
          margin: [0, 0, 0, 15],
        },

        // Tabela pozycji
        { text: "Wykaz prac:", style: "subheader" },
        {
          table: {
            headerRows: 1,
            widths: [25, "*", 40, 30, 70, 80],
            body: tableBody,
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: () => "#cccccc",
            vLineColor: () => "#cccccc",
            paddingLeft: () => 4,
            paddingRight: () => 4,
            paddingTop: () => 3,
            paddingBottom: () => 3,
          },
        },

        // Podsumowanie
        { text: "", margin: [0, 20, 0, 0] },
        {
          table: {
            widths: ["*", 120],
            body: [
              [
                { text: "Suma robocizny (netto):", style: "totalLabel" },
                {
                  text: `${totalLabor.toFixed(2)} ${currency}`,
                  style: "totalValue",
                },
              ],
              [
                {
                  text: `Materiały (${materialsBy === "contractor" ? "wykonawca" : "klient"}):`,
                  style: "totalLabel",
                },
                {
                  text: `${(materialsBy === "contractor" ? totalMaterials : 0).toFixed(2)} ${currency}`,
                  style: "totalValue",
                },
              ],
              [
                { text: "Razem netto:", style: "totalLabel" },
                {
                  text: `${totalForClient.toFixed(2)} ${currency}`,
                  style: "totalValue",
                },
              ],
              [
                { text: `VAT ${vatRate}%:`, style: "totalLabel" },
                {
                  text: `${vatAmount.toFixed(2)} ${currency}`,
                  style: "totalValue",
                },
              ],
              [
                {
                  text: "RAZEM BRUTTO:",
                  style: "totalLabel",
                  fillColor: "#f0f9ff",
                },
                {
                  text: `${totalBrutto.toFixed(2)} ${currency}`,
                  style: "totalValue",
                  fillColor: "#f0f9ff",
                  bold: true,
                  fontSize: 12,
                },
              ],
            ],
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0,
            hLineColor: () => "#cccccc",
          },
        },

        // Informacje o czasie pracy
        { text: "", margin: [0, 20, 0, 0] },
        {
          text: `Łącznie roboczogodzin (RH): ${totalRH.toFixed(2)} godz.`,
          fontSize: 10,
        },
        {
          text: `Szacowany czas pracy przy ${workers} pracownikach: ${hoursWithWorkers.toFixed(1)} godz.`,
          fontSize: 10,
        },

        // Stopka
        {
          text: "\n\n___________________________\nPodpis wykonawcy",
          fontSize: 9,
          margin: [0, 40, 0, 0],
        },
      ],

      // Stopka strony
      footer: (currentPage, pageCount) => ({
        text: `Strona ${currentPage} z ${pageCount}`,
        alignment: "center",
        fontSize: 8,
        margin: [0, 20, 0, 0],
      }),
    };

    pdfMake.createPdf(docDefinition).download("kosztorys-remontowy.pdf");
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
              setWorkers(Math.max(1, Number(e.target.value) || 1))
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
            onChange={(e) => setVatRate(Number(e.target.value) || 0)}
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
        style={{ width: "100%", marginTop: 8, borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #555", textAlign: "left" }}>
              Pozycja
            </th>
            <th style={{ borderBottom: "1px solid #555" }}>Ilość</th>
            <th style={{ borderBottom: "1px solid #555" }}>Jm</th>
            <th style={{ borderBottom: "1px solid #555" }}>Cena robocizny</th>
            <th style={{ borderBottom: "1px solid #555" }}>Cena materiału</th>
            <th style={{ borderBottom: "1px solid #555" }}>RH/jedn.</th>
            <th style={{ borderBottom: "1px solid #555" }}>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const suggestions = filteredServices(item.name);
            return (
              <tr key={idx}>
                <td style={{ padding: "4px 0", position: "relative" }}>
                  <input
                    style={{ width: "100%" }}
                    value={item.name}
                    onChange={(e) => {
                      handleChange(idx, "name", e.target.value);
                      setOpenIndex(idx);
                    }}
                    onFocus={() => setOpenIndex(idx)}
                    onBlur={() => setTimeout(() => setOpenIndex(null), 150)}
                    placeholder="Wpisz np. 'm' dla malowania"
                  />
                  {openIndex === idx && suggestions.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: "100%",
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
                          style={{ padding: "4px 8px", cursor: "pointer" }}
                          onMouseDown={() => pickService(idx, s)}
                        >
                          {s.name}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <input
                    style={{ width: 70, textAlign: "right" }}
                    type="number"
                    min={0}
                    value={item.qty}
                    onChange={(e) => handleChange(idx, "qty", e.target.value)}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <input
                    style={{ width: 60, textAlign: "center" }}
                    value={item.unit}
                    onChange={(e) => handleChange(idx, "unit", e.target.value)}
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <input
                    style={{ width: 90, textAlign: "right" }}
                    type="number"
                    step="0.01"
                    min={0}
                    value={item.laborPrice}
                    onChange={(e) =>
                      handleChange(idx, "laborPrice", e.target.value)
                    }
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <input
                    style={{ width: 90, textAlign: "right" }}
                    type="number"
                    step="0.01"
                    min={0}
                    value={item.materialPrice}
                    onChange={(e) =>
                      handleChange(idx, "materialPrice", e.target.value)
                    }
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <input
                    style={{ width: 80, textAlign: "right" }}
                    type="number"
                    step="0.01"
                    min={0}
                    value={item.rhPerUnit}
                    onChange={(e) =>
                      handleChange(idx, "rhPerUnit", e.target.value)
                    }
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => removeItem(idx)}
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 8px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: 16 }}>
        <button
          onClick={addItem}
          disabled={items.length >= maxItems}
          style={{
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

        <button
          onClick={handleDownloadPdf}
          style={{
            marginLeft: 12,
            padding: "8px 16px",
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          📄 Pobierz PDF
        </button>
      </div>

      <h2 style={{ marginTop: 24 }}>
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