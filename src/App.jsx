import { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  const totalMaterials = items.reduce((sum, i) => sum + i.qty * i.materialPrice, 0);
  const totalRH = items.reduce((sum, i) => sum + i.qty * (i.rhPerUnit || 0), 0);
  const hoursWithWorkers = workers > 0 ? totalRH / workers : 0;

  const totalForClient = totalLabor + (materialsBy === "contractor" ? totalMaterials : 0);
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
      { name: "", unit: "m²", qty: 0, laborPrice: 0, materialPrice: 0, rhPerUnit: 0 },
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
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
    setOpenIndex(null);
  };

  const handleDownloadPdf = () => {
    const itemsContent = items.map((item, idx) => ({
      text: `${idx + 1}. ${item.name} - ${item.qty} ${item.unit} x ${item.laborPrice} ${currency} = ${(item.qty * item.laborPrice).toFixed(2)} ${currency}`,
      fontSize: 10,
      margin: [0, 2],
    }));

    const docDefinition = {
      con
