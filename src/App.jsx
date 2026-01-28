import { useEffect, useState, useRef } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import PremiumButton from "./components/PremiumButton";
import { jsPDF } from "jspdf";

const SERVICES = [
  { name: "Malowanie scian jednokrotne (farba biala)", rhPerUnit: 0.15, suggestedMaterial: 5 },
  { name: "Malowanie scian dwukrotne (farba biala)", rhPerUnit: 0.25, suggestedMaterial: 8 },
  { name: "Malowanie scian jednokrotne (farba kolor)", rhPerUnit: 0.18, suggestedMaterial: 6 },
  { name: "Malowanie sufitow farba biala", rhPerUnit: 0.22, suggestedMaterial: 7 },
  { name: "Malowanie drzwi", rhPerUnit: 0.8, suggestedMaterial: 15 },
  { name: "Malowanie rur wod-kan / c.o.", rhPerUnit: 0.25, suggestedMaterial: 10 },
  { name: "Gruntowanie scian przed malowaniem", rhPerUnit: 0.1, suggestedMaterial: 3 },
  { name: "Gruntowanie sufitow", rhPerUnit: 0.1, suggestedMaterial: 3 },
  { name: "Gladz gipsowa na scianach", rhPerUnit: 0.3, suggestedMaterial: 10 },
  { name: "Gladz gipsowa na sufitach", rhPerUnit: 0.35, suggestedMaterial: 12 },
  { name: "Wyrownywanie scian tynkiem gipsowym", rhPerUnit: 0.35, suggestedMaterial: 15 },
  { name: "Wyrownywanie scian tynkiem cementowo-wapiennym", rhPerUnit: 0.4, suggestedMaterial: 18 },
  { name: "Docieplanie scian wewnetrznych", rhPerUnit: 0.25, suggestedMaterial: 25 },
  { name: "Wylewka samopoziomujaca na podlodze", rhPerUnit: 0.35, suggestedMaterial: 20 },
  { name: "Wylewki na trudnych podlozach", rhPerUnit: 0.45, suggestedMaterial: 25 },
  { name: "Tapetowanie tapeta papierowa", rhPerUnit: 0.35, suggestedMaterial: 12 },
  { name: "Tapetowanie tapeta winylowa/flizelinowa", rhPerUnit: 0.4, suggestedMaterial: 18 },
  { name: "Zrywanie starej tapety", rhPerUnit: 0.2, suggestedMaterial: 2 },
  { name: "Montaz paneli podlogowych", rhPerUnit: 0.25, suggestedMaterial: 45 },
  { name: "Montaz paneli winylowych (LVT)", rhPerUnit: 0.35, suggestedMaterial: 65 },
  { name: "Montaz listew przypodlogowych MDF", rhPerUnit: 0.15, suggestedMaterial: 8 },
  { name: "Montaz listew przysufitowych (sztukateria styro)", rhPerUnit: 0.2, suggestedMaterial: 6 },
  { name: "Podcinanie drzwi", rhPerUnit: 0.25, suggestedMaterial: 0 },
  { name: "Montaz deski Barlineckiej", rhPerUnit: 0.3, suggestedMaterial: 120 },
  { name: "Montaz podlogi drewnianej (parkiet)", rhPerUnit: 0.45, suggestedMaterial: 150 },
  { name: "Cyklinowanie parkietu", rhPerUnit: 0.4, suggestedMaterial: 15 },
  { name: "Cyklinowanie + 3-krotne lakierowanie", rhPerUnit: 0.6, suggestedMaterial: 25 },
  { name: "Cyklinowanie desek Barlineckich", rhPerUnit: 0.45, suggestedMaterial: 20 },
  { name: "Skuwanie starych tynkow", rhPerUnit: 0.3, suggestedMaterial: 5 },
  { name: "Demontaz starej glazury/terakoty", rhPerUnit: 0.35, suggestedMaterial: 8 },
  { name: "Ukladanie plytek sciennych w lazience", rhPerUnit: 0.6, suggestedMaterial: 80 },
  { name: "Ukladanie plytek podlogowych w lazience", rhPerUnit: 0.6, suggestedMaterial: 75 },
  { name: "Ukladanie plytek w kuchni nad blatem", rhPerUnit: 0.55, suggestedMaterial: 70 },
  { name: "Fugowanie nowych plytek (osobno)", rhPerUnit: 0.2, suggestedMaterial: 5 },
  { name: "Usuniecie starej fugi i polozenie nowej", rhPerUnit: 0.35, suggestedMaterial: 8 },
  { name: "Montaz cokolow gotowych (glazura/terakota)", rhPerUnit: 0.25, suggestedMaterial: 15 },
  { name: "Montaz drzwiczek rewizyjnych", rhPerUnit: 0.4, suggestedMaterial: 80 },
  { name: "Oplytkowanie zabudowy geberitu", rhPerUnit: 1.5, suggestedMaterial: 120 },
  { name: "Montaz brodzika prysznicowego", rhPerUnit: 1.2, suggestedMaterial: 350 },
  { name: "Montaz kabiny prysznicowej", rhPerUnit: 1.5, suggestedMaterial: 800 },
  { name: "Montaz wanny", rhPerUnit: 1.8, suggestedMaterial: 1200 },
  { name: "Montaz miski WC kompakt", rhPerUnit: 0.8, suggestedMaterial: 400 },
  { name: "Montaz WC podwieszanego na stelazu (geberit)", rhPerUnit: 1.2, suggestedMaterial: 1500 },
  { name: "Montaz umywalki", rhPerUnit: 0.7, suggestedMaterial: 300 },
  { name: "Montaz szafki pod umywalke", rhPerUnit: 0.5, suggestedMaterial: 600 },
  { name: "Montaz lustra lazienkowego", rhPerUnit: 0.4, suggestedMaterial: 150 },
  { name: "Montaz baterii wannowej", rhPerUnit: 0.4, suggestedMaterial: 250 },
  { name: "Montaz baterii kuchennej", rhPerUnit: 0.4, suggestedMaterial: 200 },
  { name: "Montaz baterii umywalkowej", rhPerUnit: 0.4, suggestedMaterial: 180 },
  { name: "Wymiana syfonu i podlaczenie odplywu umywalki", rhPerUnit: 0.5, suggestedMaterial: 40 },
  { name: "Montaz zlewozmywaka na szafce", rhPerUnit: 0.5, suggestedMaterial: 300 },
  { name: "Montaz zlewozmywaka wpuszczanego w blat", rhPerUnit: 0.8, suggestedMaterial: 400 },
  { name: "Wykonanie nowych podejsc wod-kan do umywalki/pralki", rhPerUnit: 1.2, suggestedMaterial: 120 },
  { name: "Przesuniecie przylacza wod-kan", rhPerUnit: 1.5, suggestedMaterial: 150 },
  { name: "Montaz kratki sciekowej", rhPerUnit: 0.3, suggestedMaterial: 45 },
  { name: "Nowa kompleksowa instalacja hydrauliczna lazienki", rhPerUnit: 6, suggestedMaterial: 800 },
  { name: "Montaz drzwi wewnetrznych", rhPerUnit: 1.2, suggestedMaterial: 450 },
  { name: "Montaz drzwi zewnetrznych z demontazem starej osciecznicy", rhPerUnit: 2, suggestedMaterial: 1200 },
  { name: "Obrobka otworow drzwiowych (tynk/wykonczenie)", rhPerUnit: 0.4, suggestedMaterial: 25 },
  { name: "Wyburzenie scianki dzialowej", rhPerUnit: 0.6, suggestedMaterial: 10 },
  { name: "Murowanie scianki dzialowej", rhPerUnit: 0.7, suggestedMaterial: 35 },
  { name: "Zamurowanie otworu drzwiowego", rhPerUnit: 1, suggestedMaterial: 50 },
  { name: "Wykonanie otworu drzwiowego w sciance g-k", rhPerUnit: 0.8, suggestedMaterial: 80 },
  { name: "Wykonanie otworu drzwiowego w scianie murowanej", rhPerUnit: 2, suggestedMaterial: 100 },
  { name: "Dwustronne obrobienie glifow przy drzwiach", rhPerUnit: 0.5, suggestedMaterial: 30 },
  { name: "Montaz okien zespolonych", rhPerUnit: 0.8, suggestedMaterial: 1500 },
  { name: "Demontaz okien", rhPerUnit: 0.6, suggestedMaterial: 20 },
  { name: "Wymiana klamek i szyldow okiennych", rhPerUnit: 0.2, suggestedMaterial: 80 },
  { name: "Montaz parapetow wewnetrznych", rhPerUnit: 0.3, suggestedMaterial: 120 },
  { name: "Montaz parapetow zewnetrznych", rhPerUnit: 0.35, suggestedMaterial: 150 },
  { name: "Montaz oswietlenia sufitowego (lampy, plafony)", rhPerUnit: 0.4, suggestedMaterial: 200 },
  { name: "Montaz halogenow / oczka wpuszczane", rhPerUnit: 0.3, suggestedMaterial: 60 },
  { name: "Wykonanie kanalu telewizyjnego pod kable", rhPerUnit: 1.5, suggestedMaterial: 80 },
  { name: "Montaz wylacznikow", rhPerUnit: 0.08, suggestedMaterial: 25 },
  { name: "Montaz gniazd wtykowych", rhPerUnit: 0.1, suggestedMaterial: 20 },
  { name: "Wykonanie punktu gniazda silowego", rhPerUnit: 0.8, suggestedMaterial: 150 },
  { name: "Wykonanie bruzd pod instalacje elektryczna", rhPerUnit: 0.25, suggestedMaterial: 15 },
  { name: "Montaz sufitu podwieszanego prostego", rhPerUnit: 0.45, suggestedMaterial: 40 },
  { name: "Montaz sufitu podwieszanego wielopoziomowego", rhPerUnit: 0.7, suggestedMaterial: 60 },
  { name: "Podciecie zabudowy przy suficie (g-k)", rhPerUnit: 0.4, suggestedMaterial: 25 },
  { name: "Montaz sztukaterii (listwy, rozety)", rhPerUnit: 0.25, suggestedMaterial: 35 },
  { name: "Wyszpachlowanie siatki zbrojącej na pęknięciach", rhPerUnit: 0.25, suggestedMaterial: 12 },
  { name: "Demontaz gazowego pieca c.o.", rhPerUnit: 0.8, suggestedMaterial: 50 },
  { name: "Zawieszenie grzejnika", rhPerUnit: 0.4, suggestedMaterial: 400 },
  { name: "Przesuniecie przylacza do grzejnika", rhPerUnit: 1.2, suggestedMaterial: 120 },
  { name: "Sprzatanie poremontowe mieszkania (podstawowe)", rhPerUnit: 0.2, suggestedMaterial: 30 },
  { name: "Utylizacja gruzu / odpadow (worki)", rhPerUnit: 0.1, suggestedMaterial: 15 },
];

const themes = {
  dark: {
    bg: '#111',
    bgSecondary: '#1a1a1a',
    bgTertiary: '#222',
    text: '#fff',
    textSecondary: '#aaa',
    textMuted: '#888',
    border: '#333',
    borderLight: '#444',
    accent: '#0f766e',
    accentLight: '#0f766e33',
    rowEven: '#1a1a1a',
    rowOdd: '#111',
    inputBg: '#222',
    dropdownBg: '#1a1a1a',
    shadow: 'rgba(0,0,0,0.9)',
  },
  light: {
    bg: '#f5f5f5',
    bgSecondary: '#ffffff',
    bgTertiary: '#e5e5e5',
    text: '#111',
    textSecondary: '#444',
    textMuted: '#666',
    border: '#ddd',
    borderLight: '#ccc',
    accent: '#0f766e',
    accentLight: '#0f766e22',
    rowEven: '#ffffff',
    rowOdd: '#f9f9f9',
    inputBg: '#ffffff',
    dropdownBg: '#ffffff',
    shadow: 'rgba(0,0,0,0.3)',
  }
};

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = isDarkMode ? themes.dark : themes.light;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error) setProfile(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  };

  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [items, setItems] = useState([
    {
      name: "Malowanie scian dwukrotne (farba biala)",
      unit: "m2",
      qty: 50,
      laborPrice: 32,
      materialPricePerUnit: 8,
      rhPerUnit: 0.25,
    },
    {
      name: "Gladz gipsowa na scianach",
      unit: "m2",
      qty: 30,
      laborPrice: 45,
      materialPricePerUnit: 10,
      rhPerUnit: 0.3,
    },
  ]);

  const [workers, setWorkers] = useState(1);
  const [openIndex, setOpenIndex] = useState(null);
  const [materialsBy, setMaterialsBy] = useState("contractor");
  const [vatRate, setVatRate] = useState(23);
  const [currency, setCurrency] = useState("PLN");
  
  const [showPdfOptions, setShowPdfOptions] = useState(false);
  const [pdfOptions, setPdfOptions] = useState({
    includeClientData: true,
    includeMaterialPrices: true,
    includeRH: true,
    includeUnitPrices: true,
    includeTimeSummary: true,
    includeMaterialCosts: true,
    includeItemNumbers: true,
  });

  const inputRefs = useRef([]);
  
  const maxItems = profile?.is_premium ? 999 : 3;

  const totalLabor = items.reduce((sum, i) => sum + i.qty * i.laborPrice, 0);
  const totalMaterials = items.reduce((sum, i) => sum + i.qty * i.materialPricePerUnit, 0);
  const totalRH = items.reduce((sum, i) => sum + i.qty * (i.rhPerUnit || 0), 0);
  const hoursWithWorkers = workers > 0 ? totalRH / workers : 0;

  const totalForClient = totalLabor + (materialsBy === "contractor" ? totalMaterials : 0);
  const vatAmount = (totalForClient * vatRate) / 100;
  const totalBrutto = totalForClient + vatAmount;

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    if (["qty", "laborPrice", "materialPricePerUnit", "rhPerUnit"].includes(field)) {
      newItems[index][field] = Number(value) || 0;
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
  };

  const addItem = () => {
    if (items.length >= maxItems) return;
    const newItems = [
      ...items,
      { name: "", unit: "m2", qty: 0, laborPrice: 0, materialPricePerUnit: 0, rhPerUnit: 0 },
    ];
    setItems(newItems);
    
    setTimeout(() => {
      const lastIndex = newItems.length - 1;
      if (inputRefs.current[lastIndex]) {
        inputRefs.current[lastIndex].focus();
        setOpenIndex(lastIndex);
      }
    }, 0);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const filteredServices = (text) => {
    if (!text) return [];
    const t = text.toLowerCase();
    return SERVICES.filter((s) => s.name.toLowerCase().includes(t)).slice(0, 8);
  };

  const pickService = (idx, service) => {
    const newItems = [...items];
    newItems[idx].name = service.name;
    if (!newItems[idx].rhPerUnit || newItems[idx].rhPerUnit === 0) {
      newItems[idx].rhPerUnit = service.rhPerUnit;
    }
    if (!newItems[idx].materialPricePerUnit || newItems[idx].materialPricePerUnit === 0) {
      newItems[idx].materialPricePerUnit = service.suggestedMaterial;
    }
    setItems(newItems);
    setOpenIndex(null);
  };

  const applySuggestedPrice = (idx, e) => {
    e.preventDefault();
    e.stopPropagation();
    const service = SERVICES.find(s => s.name === items[idx].name);
    if (service && service.suggestedMaterial) {
      const newItems = [...items];
      newItems[idx].materialPricePerUnit = service.suggestedMaterial;
      setItems(newItems);
    }
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(15, 118, 110);
    doc.text("KOSZTORYS REMONTOWY", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Wygenerowano: ${new Date().toLocaleDateString('pl-PL')}`, 105, 28, { align: "center" });

    let y = 40;
    
    if (pdfOptions.includeClientData && (clientName || clientAddress || clientPhone || clientEmail)) {
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.setFont(undefined, 'bold');
      doc.text("DANE KLIENTA:", 20, y);
      doc.setFont(undefined, 'normal');
      y += 6;
      
      if (clientName) {
        doc.text(`Nazwa: ${clientName}`, 20, y);
        y += 5;
      }
      if (clientAddress) {
        doc.text(`Adres: ${clientAddress}`, 20, y);
        y += 5;
      }
      if (clientPhone) {
        doc.text(`Telefon: ${clientPhone}`, 20, y);
        y += 5;
      }
      if (clientEmail) {
        doc.text(`Email: ${clientEmail}`, 20, y);
        y += 5;
      }
      y += 5;
    }

    doc.setTextColor(0);
    doc.setFontSize(10);
    doc.text(`Waluta: ${currency}`, 20, y);
    doc.text(`VAT: ${vatRate}%`, 80, y);
    if (pdfOptions.includeTimeSummary) {
      doc.text(`Pracownicy: ${workers}`, 140, y);
    }

    y += 10;
    doc.setFillColor(15, 118, 110);
    
    let headerX = 20;
    const colWidths = {
      no: pdfOptions.includeItemNumbers ? 10 : 0,
      name: 50,
      qty: 15,
      unit: 12,
      labor: pdfOptions.includeUnitPrices ? 18 : 0,
      materialUnit: (pdfOptions.includeMaterialPrices && pdfOptions.includeMaterialCosts) ? 18 : 0,
      materialTotal: (pdfOptions.includeMaterialPrices && pdfOptions.includeMaterialCosts) ? 22 : 0,
      rh: pdfOptions.includeRH ? 15 : 0,
      value: 25
    };
    
    const totalWidth = Object.values(colWidths).reduce((a, b) => a + b, 0);
    doc.rect(headerX, y - 5, totalWidth, 8, 'F');
    doc.setTextColor(255);
    doc.setFontSize(8);
    
    let currentX = headerX + 2;
    if (pdfOptions.includeItemNumbers) {
      doc.text("Lp.", currentX, y);
      currentX += colWidths.no;
    }
    doc.text("Nazwa", currentX, y);
    currentX += colWidths.name;
    doc.text("Ilosc", currentX, y);
    currentX += colWidths.qty;
    doc.text("Jm", currentX, y);
    currentX += colWidths.unit;
    if (pdfOptions.includeUnitPrices) {
      doc.text("Robocizna", currentX, y);
      currentX += colWidths.labor;
    }
    if (pdfOptions.includeMaterialPrices && pdfOptions.includeMaterialCosts) {
      doc.text("Mat/jdn", currentX, y);
      currentX += colWidths.materialUnit;
      doc.text("Mat razem", currentX, y);
      currentX += colWidths.materialTotal;
    }
    if (pdfOptions.includeRH) {
      doc.text("RH", currentX, y);
      currentX += colWidths.rh;
    }
    doc.text("Wartosc", currentX, y);

    doc.setTextColor(0);
    y += 10;

    items.forEach((item, idx) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      if (idx % 2 === 0) {
        doc.setFillColor(243, 244, 246);
        doc.rect(headerX, y - 4, totalWidth, 7, 'F');
      }

      currentX = headerX + 2;
      
      if (pdfOptions.includeItemNumbers) {
        doc.text(`${idx + 1}.`, currentX, y);
        currentX += colWidths.no;
      }
      
      const name = item.name.length > 28 ? item.name.substring(0, 25) + "..." : item.name;
      doc.text(name, currentX, y);
      currentX += colWidths.name;
      
      doc.text(item.qty.toString(), currentX, y);
      currentX += colWidths.qty;
      
      doc.text(item.unit, currentX, y);
      currentX += colWidths.unit;
      
      if (pdfOptions.includeUnitPrices) {
        doc.text(item.laborPrice.toFixed(2), currentX, y);
        currentX += colWidths.labor;
      }
      
      if (pdfOptions.includeMaterialPrices && pdfOptions.includeMaterialCosts) {
        doc.text(item.materialPricePerUnit.toFixed(2), currentX, y);
        currentX += colWidths.materialUnit;
        doc.text((item.qty * item.materialPricePerUnit).toFixed(2), currentX, y);
        currentX += colWidths.materialTotal;
      }
      
      if (pdfOptions.includeRH) {
        doc.text((item.qty * item.rhPerUnit).toFixed(1), currentX, y);
        currentX += colWidths.rh;
      }
      
      const itemTotal = item.qty * item.laborPrice + (pdfOptions.includeMaterialCosts && materialsBy === "contractor" ? item.qty * item.materialPricePerUnit : 0);
      doc.text(`${itemTotal.toFixed(2)}`, currentX, y);
      
      y += 7;
    });

    y += 10;
    doc.setFontSize(10);
    doc.text(`Suma robocizny: ${totalLabor.toFixed(2)} ${currency}`, 120, y);
    y += 6;
    
    if (pdfOptions.includeMaterialCosts) {
      doc.text(`Suma materialow: ${(materialsBy === "contractor" ? totalMaterials : 0).toFixed(2)} ${currency}`, 120, y);
      y += 6;
    }
    
    doc.setFont(undefined, 'bold');
    doc.text(`Razem netto: ${totalForClient.toFixed(2)} ${currency}`, 120, y);
    y += 6;
    doc.setFont(undefined, 'normal');
    doc.text(`VAT ${vatRate}%: ${vatAmount.toFixed(2)} ${currency}`, 120, y);
    y += 6;
    doc.setFontSize(12);
    doc.setTextColor(15, 118, 110);
    doc.setFont(undefined, 'bold');
    doc.text(`RAZEM BRUTTO: ${totalBrutto.toFixed(2)} ${currency}`, 120, y);

    if (pdfOptions.includeTimeSummary) {
      y += 15;
      doc.setTextColor(0);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setFillColor(240, 249, 255);
      doc.rect(20, y - 4, 170, 14, 'F');
      doc.text(`Laczny czas pracy: ${totalRH.toFixed(2)} roboczogodzin`, 25, y + 2);
      doc.text(`Szacowany czas przy ${workers} pracownikach: ${hoursWithWorkers.toFixed(1)} godzin`, 25, y + 8);
    }

    y += 20;
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Materialy oplaca: ${materialsBy === "contractor" ? "wykonawca" : "klient"}`, 20, y);

    doc.save("kosztorys.pdf");
    setShowPdfOptions(false);
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: theme.bg, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: theme.text,
        fontSize: 18
      }}>
        Ladowanie...
      </div>
    );
  }

  if (!session) return <Auth />;

  return (
    <div
      style={{
        padding: 24,
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        fontFamily: "sans-serif",
        maxWidth: "100%",
        width: "100%",
        boxSizing: "border-box",
        transition: "background 0.3s, color 0.3s"
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Kosztorys remontowy 2026</h1>
          <p style={{ color: theme.textMuted, fontSize: 14, margin: '8px 0 0 0' }}>
            {profile?.email} | 
            {profile?.is_premium ? 
              ' Premium (nielimitowane pozycje)' : 
              ` Demo (max ${maxItems} pozycje)`
            }
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              padding: '8px 16px',
              background: theme.bgSecondary,
              color: theme.text,
              border: `1px solid ${theme.border}`,
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.3s'
            }}
          >
            {isDarkMode ? '☀️ Jasny' : '🌙 Ciemny'}
          </button>

          {!profile?.is_premium && <PremiumButton />}
          
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Wyloguj
          </button>
        </div>
      </div>

      <div style={{ 
        background: theme.bgSecondary, 
        padding: 16, 
        borderRadius: 8, 
        marginBottom: 24,
        border: `1px solid ${theme.border}`,
        transition: 'all 0.3s'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: 16, color: theme.accent }}>Dane klienta</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 12 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>
              Nazwa / Imię i nazwisko
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="np. Jan Kowalski"
              style={{ 
                width: '100%', 
                padding: '8px', 
                background: theme.inputBg, 
                border: `1px solid ${theme.borderLight}`,
                color: theme.text,
                borderRadius: 4,
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>
              Adres
            </label>
            <input
              type="text"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              placeholder="np. ul. Kwiatowa 15, 00-001 Warszawa"
              style={{ 
                width: '100%', 
                padding: '8px', 
                background: theme.inputBg, 
                border: `1px solid ${theme.borderLight}`,
                color: theme.text,
                borderRadius: 4,
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>
              Telefon
            </label>
            <input
              type="text"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="np. +48 123 456 789"
              style={{ 
                width: '100%', 
                padding: '8px', 
                background: theme.inputBg, 
                border: `1px solid ${theme.borderLight}`,
                color: theme.text,
                borderRadius: 4,
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>
              Email
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="np. jan.kowalski@example.com"
              style={{ 
                width: '100%', 
                padding: '8px', 
                background: theme.inputBg, 
                border: `1px solid ${theme.borderLight}`,
                color: theme.text,
                borderRadius: 4,
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
            />
          </div>
        </div>
      </div>

      {/* TABELA POZYCJI */}
      <div style={{ 
        width: '100%', 
        overflow: 'visible', 
        marginBottom: 24, 
        position: 'relative', 
        zIndex: 100 
      }}>
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse", 
          minWidth: 1400,
          tableLayout: "fixed"
        }}>
          <colgroup>
            <col style={{ width: "22%" }} />
            <col style={{ width: "6%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "6%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "6%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "6%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "4%" }} />
          </colgroup>
          <thead>
            <tr style={{ background: theme.accent }}>
              <th style={{ padding: '12px 8px', textAlign: "left", color: '#fff' }}>Pozycja</th>
              <th style={{ padding: '12px 8px', color: '#fff' }}>Ilość</th>
              <th style={{ padding: '12px 8px', color: '#fff' }}>Jm</th>
              <th style={{ padding: '12px 8px', color: '#fff' }}>Cena robocizny</th>
              <th style={{ padding: '12px 8px', color: '#fff' }}>Rob. razem</th>
              <th style={{ padding: '12px 8px', color: '#fff' }}>
                Mat./jedn.
                <div style={{ fontSize: 10, fontWeight: 'normal', opacity: 0.8 }}>cena za jednostkę</div>
              </th>
              <th style={{ padding: '12px 8px', color: '#fff', background: '#0d5d58' }}>
                Mat. razem
                <div style={{ fontSize: 10, fontWeight: 'normal', opacity: 0.8 }}>ilość × cena</div>
              </th>
              <th style={{ padding: '12px 8px', color: '#fff' }}>
                RH/jedn.
              </th>
              <th style={{ padding: '12px 8px', color: '#fff' }}>Suma RH</th>
              <th style={{ padding: '12px 8px', color: '#fff' }}>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              const suggestions = filteredServices(item.name);
              const itemRH = item.qty * (item.rhPerUnit || 0);
              const itemMaterialTotal = item.qty * item.materialPricePerUnit;
              const itemLaborTotal = item.qty * item.laborPrice;
              const suggestedService = SERVICES.find(s => s.name === item.name);
              
              return (
                <tr key={idx} style={{ 
                  background: idx % 2 === 0 ? theme.rowEven : theme.rowOdd, 
                  borderBottom: `1px solid ${theme.border}`,
                  transition: 'all 0.3s'
                }}>
                  <td style={{ 
                    padding: "8px", 
                    position: "relative",
                    zIndex: openIndex === idx ? 1000 : 1
                  }}>
                    <input
                      ref={(el) => (inputRefs.current[idx] = el)}
                      style={{ 
                        width: "100%", 
                        maxWidth: "100%",
                        minWidth: 0,
                        padding: '8px',
                        background: theme.inputBg,
                        border: `1px solid ${theme.borderLight}`,
                        color: theme.text,
                        borderRadius: 4,
                        boxSizing: 'border-box',
                        transition: 'all 0.3s'
                      }}
                      value={item.name}
                      onChange={(e) => {
                        handleChange(idx, "name", e.target.value);
                        setOpenIndex(idx);
                      }}
                      onFocus={() => setOpenIndex(idx)}
                      onBlur={() => setTimeout(() => setOpenIndex(null), 200)}
                      placeholder="Zacznij pisać aby wyszukać..."
                    />
                    {openIndex === idx && suggestions.length > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          width: "175%",
                          top: "100%",
                          background: theme.dropdownBg,
                          border: `2px solid ${theme.accent}`,
                          borderRadius: 4,
                          zIndex: 9999,
                          maxHeight: 300,
                          overflowY: "auto",
                          boxShadow: `0 8px 24px ${theme.shadow}`,
                          transition: 'all 0.3s'
                        }}
                      >
                        {suggestions.map((s) => (
                          <div
                            key={s.name}
                            style={{ 
                              padding: "10px 12px", 
                              cursor: "pointer",
                              borderBottom: `1px solid ${theme.border}`,
                              transition: "background 0.2s",
                              color: theme.text
                            }}
                            onMouseDown={() => pickService(idx, s)}
                            onMouseEnter={(e) => e.currentTarget.style.background = theme.accent}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            <div style={{ fontWeight: 500 }}>{s.name}</div>
                            <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 2 }}>
                              RH: {s.rhPerUnit} | Material/jedn.: ~{s.suggestedMaterial} {currency}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: "center", padding: "8px" }}>
                    <input
                      style={{ 
                        width: '100%', 
                        maxWidth: '100%',
                        minWidth: 0,
                        textAlign: "right", 
                        padding: '8px',
                        background: theme.inputBg,
                        border: `1px solid ${theme.borderLight}`,
                        color: theme.text,
                        borderRadius: 4,
                        boxSizing: 'border-box',
                        transition: 'all 0.3s'
                      }}
                      type="number"
                      min={0}
                      value={item.qty}
                      onChange={(e) => handleChange(idx, "qty", e.target.value)}
                    />
                  </td>
                  <td style={{ textAlign: "center", padding: "8px" }}>
                    <input
                      style={{ 
                        width: '100%', 
                        maxWidth: '100%',
                        minWidth: 0,
                        textAlign: "center", 
                        padding: '8px',
                        background: theme.inputBg,
                        border: `1px solid ${theme.borderLight}`,
                        color: theme.text,
                        borderRadius: 4,
                        boxSizing: 'border-box',
                        transition: 'all 0.3s'
                      }}
                      value={item.unit}
                      onChange={(e) => handleChange(idx, "unit", e.target.value)}
                    />
                  </td>
                  <td style={{ textAlign: "right", padding: "8px" }}>
                    <input
                      style={{ 
                        width: '100%', 
                        maxWidth: '100%',
                        minWidth: 0,
                        textAlign: "right", 
                        padding: '8px',
                        background: theme.inputBg,
                        border: `1px solid ${theme.borderLight}`,
                        color: theme.text,
                        borderRadius: 4,
                        boxSizing: 'border-box',
                        transition: 'all 0.3s'
                      }}
                      type="number"
                      step="0.01"
                      min={0}
                      value={item.laborPrice}
                      onChange={(e) => handleChange(idx, "laborPrice", e.target.value)}
                    />
                  </td>
                  <td style={{ textAlign: "right", padding: "8px" }}>
                    <div style={{
                      padding: '8px',
                      borderRadius: 4,
                      fontWeight: 500,
                      color: theme.text,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {itemLaborTotal.toFixed(2)} {currency}
                    </div>
                  </td>
                  <td style={{ textAlign: "right", padding: "8px" }}>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      <input
                        style={{ 
                          width: '100%',
                          maxWidth: '100%',
                          minWidth: 0,
                          textAlign: "right", 
                          padding: '8px',
                          background: theme.inputBg,
                          border: `1px solid ${theme.borderLight}`,
                          color: theme.text,
                          borderRadius: 4,
                          boxSizing: 'border-box',
                          transition: 'all 0.3s'
                        }}
                        type="number"
                        step="0.01"
                        min={0}
                        value={item.materialPricePerUnit}
                        onChange={(e) => handleChange(idx, "materialPricePerUnit", e.target.value)}
                      />
                      {suggestedService && suggestedService.suggestedMaterial > 0 && (
                        <button
                          type="button"
                          onClick={(e) => applySuggestedPrice(idx, e)}
                          onMouseDown={(e) => e.preventDefault()}
                          title={`Zastosuj sugerowaną cenę: ${suggestedService.suggestedMaterial} ${currency}/jedn.`}
                          style={{
                            background: theme.accent,
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 'bold',
                            minWidth: 30,
                            flexShrink: 0
                          }}
                        >
                          ✓
                        </button>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: "right", padding: "8px" }}>
                    <div style={{ 
                      background: itemMaterialTotal > 0 ? '#3b82f622' : 'transparent',
                      padding: '8px',
                      borderRadius: 4,
                      fontWeight: 600,
                      color: itemMaterialTotal > 0 ? '#3b82f6' : theme.textMuted,
                      transition: 'all 0.3s',
                      fontSize: 14,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {itemMaterialTotal.toFixed(2)} {currency}
                    </div>
                  </td>
                  <td style={{ textAlign: "right", padding: "8px" }}>
                    <input
                      style={{ 
                        width: '100%', 
                        maxWidth: '100%',
                        minWidth: 0,
                        textAlign: "right", 
                        padding: '8px',
                        background: theme.inputBg,
                        border: `1px solid ${theme.borderLight}`,
                        color: theme.text,
                        borderRadius: 4,
                        boxSizing: 'border-box',
                        transition: 'all 0.3s'
                      }}
                      type="number"
                      step="0.01"
                      min={0}
                      value={item.rhPerUnit}
                      onChange={(e) => handleChange(idx, "rhPerUnit", e.target.value)}
                    />
                  </td>
                  <td style={{ textAlign: "right", padding: "8px" }}>
                    <div style={{ 
                      background: itemRH > 0 ? theme.accentLight : 'transparent',
                      padding: '8px',
                      borderRadius: 4,
                      fontWeight: 500,
                      color: itemRH > 0 
                        ? (isDarkMode ? '#5eead4' : '#0f766e')
                        : theme.textMuted,
                      transition: 'all 0.3s',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {itemRH.toFixed(2)} RH
                    </div>
                  </td>
                  <td style={{ textAlign: "center", padding: "8px" }}>
                    <button
                      onClick={() => removeItem(idx)}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "8px 12px",
                        cursor: "pointer",
                        fontWeight: 'bold'
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: 24, position: 'relative', zIndex: 1 }}>
        <button
          onClick={addItem}
          disabled={items.length >= maxItems}
          style={{
            padding: "12px 24px",
            background: items.length >= maxItems ? theme.bgTertiary : theme.accent,
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: items.length >= maxItems ? "not-allowed" : "pointer",
            fontSize: 16,
            fontWeight: 500
          }}
        >
          Dodaj pozycje {!profile?.is_premium && `(${items.length}/${maxItems})`}
        </button>

        <button
          onClick={() => setShowPdfOptions(true)}
          style={{
            marginLeft: 12,
            padding: "12px 24px",
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 16,
            fontWeight: 500
          }}
        >
          Pobierz PDF
        </button>
      </div>

      {/* USTAWIENIA */}
      <div style={{ 
        background: theme.bgSecondary, 
        padding: 20, 
        borderRadius: 8,
        border: `1px solid ${theme.border}`,
        marginBottom: 24,
        position: 'relative',
        zIndex: 1,
        transition: 'all 0.3s'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: 16, color: theme.accent }}>Ustawienia kosztorysu</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 20 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: theme.textSecondary }}>
              Liczba pracowników:
            </label>
            <input
              type="number"
              min={1}
              value={workers}
              onChange={(e) => setWorkers(Math.max(1, Number(e.target.value) || 1))}
              style={{ 
                width: '100%', 
                padding: '8px',
                textAlign: "right",
                background: theme.inputBg,
                border: `1px solid ${theme.borderLight}`,
                color: theme.text,
                borderRadius: 4,
                fontSize: 16,
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, color: theme.textSecondary }}>
              Materiał opłaca:
            </label>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', height: '100%' }}>
              <label style={{ cursor: 'pointer', color: theme.text }}>
                <input
                  type="radio"
                  checked={materialsBy === "contractor"}
                  onChange={() => setMaterialsBy("contractor")}
                  style={{ marginRight: 6 }}
                />
                wykonawca
              </label>
              <label style={{ cursor: 'pointer', color: theme.text }}>
                <input
                  type="radio"
                  checked={materialsBy === "client"}
                  onChange={() => setMaterialsBy("client")}
                  style={{ marginRight: 6 }}
                />
                klient
              </label>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, color: theme.textSecondary }}>
              Stawka VAT (%):
            </label>
            <input
              type="number"
              min={0}
              max={23}
              value={vatRate}
              onChange={(e) => setVatRate(Number(e.target.value) || 0)}
              style={{ 
                width: '100%', 
                padding: '8px',
                textAlign: "right",
                background: theme.inputBg,
                border: `1px solid ${theme.borderLight}`,
                color: theme.text,
                borderRadius: 4,
                fontSize: 16,
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, color: theme.textSecondary }}>
              Waluta:
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px',
                background: theme.inputBg,
                border: `1px solid ${theme.borderLight}`,
                color: theme.text,
                borderRadius: 4,
                fontSize: 16,
                boxSizing: 'border-box',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <option value="PLN">PLN</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modal opcji PDF */}
      {showPdfOptions && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000
        }}>
          <div style={{
            background: theme.bgSecondary,
            padding: 32,
            borderRadius: 8,
            maxWidth: 500,
            width: '90%',
            border: `2px solid ${theme.accent}`,
            color: theme.text,
            transition: 'all 0.3s'
          }}>
            <h2 style={{ marginTop: 0, color: theme.accent }}>Opcje eksportu PDF</h2>
            <p style={{ color: theme.textSecondary, fontSize: 14 }}>Wybierz, które dane chcesz uwzględnić w dokumencie:</p>
            
            <div style={{ marginTop: 20 }}>
              {[
                { key: 'includeClientData', label: 'Dane klienta' },
                { key: 'includeItemNumbers', label: 'Numeracja pozycji (Lp.)' },
                { key: 'includeUnitPrices', label: 'Ceny jednostkowe robocizny' },
                { key: 'includeMaterialPrices', label: 'Ceny materiałów (za jednostkę i razem)' },
                { key: 'includeMaterialCosts', label: 'Wartość materiałów w sumie' },
                { key: 'includeRH', label: 'Roboczogodziny (RH)' },
                { key: 'includeTimeSummary', label: 'Podsumowanie czasowe' },
              ].map(option => (
                <label key={option.key} style={{ 
                  display: 'block', 
                  marginBottom: 12,
                  cursor: 'pointer',
                  padding: '8px',
                  background: pdfOptions[option.key] ? theme.accentLight : 'transparent',
                  borderRadius: 4,
                  transition: 'background 0.2s',
                  color: theme.text
                }}>
                  <input
                    type="checkbox"
                    checked={pdfOptions[option.key]}
                    onChange={(e) => setPdfOptions({
                      ...pdfOptions,
                      [option.key]: e.target.checked
                    })}
                    style={{ marginRight: 8 }}
                  />
                  {option.label}
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button
                onClick={handleDownloadPdf}
                style={{
                  flex: 1,
                  padding: "10px 20px",
                  background: theme.accent,
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 500
                }}
              >
                Generuj PDF
              </button>
              <button
                onClick={() => setShowPdfOptions(false)}
                style={{
                  flex: 1,
                  padding: "10px 20px",
                  background: theme.bgTertiary,
                  color: theme.text,
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 500
                }}
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PODSUMOWANIE */}
      <div style={{ 
        background: theme.bgSecondary, 
        padding: 20, 
        borderRadius: 8,
        border: `1px solid ${theme.border}`,
        position: 'relative',
        zIndex: 1,
        transition: 'all 0.3s'
      }}>
        <h2 style={{ marginTop: 0 }}>
          Suma robocizny: {totalLabor.toFixed(2)} {currency}
        </h2>
        <h2 style={{ color: '#3b82f6' }}>
          Suma materiałów:{" "}
          {materialsBy === "contractor"
            ? `${totalMaterials.toFixed(2)} ${currency} (po stronie wykonawcy)`
            : `0 ${currency} (materiał klienta)`}
        </h2>

        <h3 style={{ marginTop: 24, color: theme.accent }}>Podsumowanie dla klienta:</h3>
        <p style={{ fontSize: 16 }}>Razem netto: <strong>{totalForClient.toFixed(2)} {currency}</strong></p>
        <p style={{ fontSize: 16 }}>VAT {vatRate}%: <strong>{vatAmount.toFixed(2)} {currency}</strong></p>
        <p style={{ fontSize: 20, color: theme.accent }}>Razem brutto: <strong>{totalBrutto.toFixed(2)} {currency}</strong></p>

        <div style={{ 
          marginTop: 24, 
          padding: 16, 
          background: theme.accentLight, 
          borderRadius: 6,
          borderLeft: `4px solid ${theme.accent}`,
          transition: 'all 0.3s'
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: 16 }}>
            <strong>Łącznie roboczogodzin (RH):</strong> {totalRH.toFixed(2)}
          </p>
          <p style={{ margin: 0, fontSize: 16 }}>
            <strong>Szacowany czas przy {workers} pracownikach:</strong> {hoursWithWorkers.toFixed(1)} godz. 
            ({(hoursWithWorkers / 8).toFixed(1)} dni roboczych)
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;