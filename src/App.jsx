import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import PremiumButton from "./components/PremiumButton";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { SERVICES } from "./data/services";

// ============================================
// KONWERSJA POLSKICH ZNAKÓW DLA PDF
// ============================================
const replacePolishChars = (text) => {
  const map = {
    'ą': 'a', 'Ą': 'A',
    'ć': 'c', 'Ć': 'C',
    'ę': 'e', 'Ę': 'E',
    'ł': 'l', 'Ł': 'L',
    'ń': 'n', 'Ń': 'N',
    'ó': 'o', 'Ó': 'O',
    'ś': 's', 'Ś': 'S',
    'ź': 'z', 'Ź': 'Z',
    'ż': 'z', 'Ż': 'Z'
  };
  return text.replace(/[ąĄćĆęĘłŁńŃóÓśŚźŹżŻ]/g, m => map[m] || m);
};
// Formatowanie daty po polsku
const formatPolishDate = (date) => {
  const months = [
    'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
    'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
  ];
  const d = new Date(date);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};
const getServiceDisplayName = (service) => {
  if (!service) return "";
  return service.cleanName || service.name;
};


// ============================================
// PARSOWANIE TEKSTOWYCH OPISÓW PRAC
// ============================================
const parseWorkDescription = (text) => {
  const patterns = [
    { regex: /(.+?)\s+(\d+(?:[.,]\d+)?)\s*(m2|m²|m3|m³|mb|metr|metry|metrów|szt|sztuk|komp|komplet)/i, nameIdx: 1, qtyIdx: 2, unitIdx: 3 },
    { regex: /(\d+(?:[.,]\d+)?)\s*(m2|m²|m3|m³|mb|metr|metry|metrów|szt|sztuk|komp|komplet)\s+(.+)/i, nameIdx: 3, qtyIdx: 1, unitIdx: 2 },
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern.regex);
    if (match) {
      const qty = parseFloat(match[pattern.qtyIdx].replace(',', '.'));
      const unitRaw = match[pattern.unitIdx].toLowerCase();
      let unit = 'm2';
      if (unitRaw.includes('m3') || unitRaw.includes('³')) unit = 'm3';
      else if (unitRaw.includes('mb')) unit = 'mb';
      else if (unitRaw.includes('szt')) unit = 'szt';
      else if (unitRaw.includes('komp')) unit = 'komp';
      else if (unitRaw.includes('m2') || unitRaw.includes('²')) unit = 'm2';
      return { name: match[pattern.nameIdx].trim(), qty, unit };
    }
  }
  return null;
};

// ============================================
// FAZY ROBÓT BUDOWLANYCH
// ============================================
const WORK_PHASES = {
  demolition: { order: 1, name: 'Rozbiórka i demontaż', keywords: ['skuwanie', 'demontaż', 'wyburzenie', 'zrywanie', 'usuniecie'] },
  masonry: { order: 2, name: 'Roboty murowe', keywords: ['murowanie', 'zamurowanie', 'scianki'] },
  installations: { order: 3, name: 'Instalacje', keywords: ['instalacja', 'podejscia', 'bruzd', 'wod-kan', 'elektryczna', 'gniazd', 'wylacznikow'] },
  plaster: { order: 4, name: 'Tynki i wyrównywanie', keywords: ['tynk', 'wyrownywanie', 'gladz', 'szpachlowanie'] },
  flooring: { order: 5, name: 'Podłogi', keywords: ['wylewka', 'panel', 'parkiet', 'cyklinowanie', 'podlog'] },
  tiles: { order: 6, name: 'Płytki', keywords: ['plyt', 'glazur', 'terakot', 'ukladanie', 'fugowanie', 'oplytkowanie'] },
  plumbing: { order: 7, name: 'Armatura i wyposażenie', keywords: ['montaz', 'wanna', 'kabina', 'umywalka', 'bateria', 'zlew'] },
  carpentry: { order: 8, name: 'Stolarka', keywords: ['drzwi', 'okien', 'parapetow'] },
  ceiling: { order: 9, name: 'Sufity', keywords: ['sufit'] },
  painting: { order: 10, name: 'Malowanie i wykończenia', keywords: ['malowanie', 'gruntowanie', 'tapetowanie', 'listew', 'sztukateria'] },
  electrical: { order: 11, name: 'Montaż urządzeń elektrycznych', keywords: ['oswietlen', 'halogen', 'oczka'] },
  heating: { order: 12, name: 'Ogrzewanie', keywords: ['grzejnik', 'c.o.', 'piec'] },
  cleaning: { order: 13, name: 'Sprzątanie', keywords: ['sprzatanie', 'utylizacja'] }
};

const detectWorkPhase = (workName) => {
  const nameLower = workName.toLowerCase();
  for (const [key, phase] of Object.entries(WORK_PHASES)) {
    if (phase.keywords.some(kw => nameLower.includes(kw))) {
      return { key, ...phase };
    }
  }
  return { key: 'other', order: 99, name: 'Inne prace' };
};

// ============================================
// WALIDACJA KOLEJNOŚCI LOGICZNEJ
// ============================================
const validateWorkOrder = (items) => {
  const warnings = [];
  const phases = items.map((item, idx) => (
    {
      ...detectWorkPhase(item.name),
      originalIndex: idx,
      name: item.name
    }
  ));

  for (let i = 1; i < phases.length; i++) {
    if (phases[i].order < phases[i - 1].order) {
      warnings.push({
        index: phases[i].originalIndex,
        message: `"${phases[i].name}" powinno być wykonane przed "${phases[i - 1].name}"`
      });
    }
  }

  const hasGrounding = items.some(item => item.name.toLowerCase().includes('gruntowanie'));
  const hasPainting = items.some(item => item.name.toLowerCase().includes('malowanie'));
  if (hasPainting && !hasGrounding) {
    warnings.push({
      index: -1,
      message: 'Sugerujemy dodanie gruntowania przed malowaniem'
    });
  }

  return warnings;
};

// ============================================
// SUGEROWANIE BRAKUJĄCYCH POZYCJI
// ============================================
const suggestMissingWorks = (items) => {
  const suggestions = [];
  const workNames = items.map(i => i.name.toLowerCase()).join(' ');

  const rules = [
    {
      condition: () => workNames.includes('glazur') && !workNames.includes('fugowanie'),
      suggestion: 'Fugowanie nowych plytek (osobno)'
    },
    {
      condition: () => workNames.includes('panel') && !workNames.includes('listew'),
      suggestion: 'Montaz listew przypodlogowych MDF'
    },
    {
      condition: () => workNames.includes('wylewka') && !workNames.includes('panel') && !workNames.includes('parkiet'),
      suggestion: 'Rozważ dodanie montażu paneli podłogowych'
    },
    {
      condition: () => workNames.includes('tynk') && !workNames.includes('gladz'),
      suggestion: 'Gladz gipsowa na scianach'
    }
  ];

  rules.forEach(rule => {
    if (rule.condition()) {
      suggestions.push(rule.suggestion);
    }
  });

  return suggestions;
};

// ============================================
// MOTYWY KOLORYSTYCZNE
// ============================================
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
    warning: '#f59e0b',
    warningBg: '#78350f22',
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
    warning: '#f59e0b',
    warningBg: '#fef3c7',
  }
};

// ============================================
// KOMPONENT GŁÓWNY
// ============================================
function App() {
  // ========== STANY (useState) ==========
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [documentCity, setDocumentCity] = useState("");
const [documentDate, setDocumentDate] = useState(formatPolishDate(new Date()));
const [validityMonths, setValidityMonths] = useState(3);

const [items, setItems] = useState([]);

  
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

  const [workDescription, setWorkDescription] = useState("");
  const [savedEstimates, setSavedEstimates] = useState([]);
  const [currentEstimateId, setCurrentEstimateId] = useState(null);
  const [currentEstimateName, setCurrentEstimateName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [logicWarnings, setLogicWarnings] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [groupByPhase, setGroupByPhase] = useState(false);

  // ========== REFY (useRef) ==========
  const inputRefs = useRef([]);

  // ========== OBLICZENIA (computed values) ==========
  const theme = isDarkMode ? themes.dark : themes.light;
const maxItems = (session && profile?.is_premium) ? 999 : 3;
  const totalLabor = items.reduce((sum, i) => sum + i.qty * i.laborPrice, 0);
  const totalMaterials = items.reduce((sum, i) => sum + i.qty * i.materialPricePerUnit, 0);
  const totalRH = items.reduce((sum, i) => sum + i.qty * (i.rhPerUnit || 0), 0);
  const hoursWithWorkers = workers > 0 ? totalRH / workers : 0;

  const totalForClient = totalLabor + (materialsBy === "contractor" ? totalMaterials : 0);
  const vatAmount = (totalForClient * vatRate) / 100;
  const totalBrutto = totalForClient + vatAmount;

  // ========== EFEKTY (useEffect) ==========
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
        loadSavedEstimates(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
        loadSavedEstimates(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const warnings = validateWorkOrder(items);
    setLogicWarnings(warnings);
    
    const newSuggestions = suggestMissingWorks(items);
    setSuggestions(newSuggestions);
  }, [items]);
  useEffect(() => {
  const handleScroll = () => {
    if (openIndex !== null && inputRefs.current[openIndex]) {
      updateDropdownPosition(openIndex);
    }
  };
  
  window.addEventListener('scroll', handleScroll, true);
  return () => window.removeEventListener('scroll', handleScroll, true);
}, [openIndex]);

  // ========== FUNKCJE POMOCNICZE ==========
  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error) setProfile(data);
    setLoading(false);
  };

  const loadSavedEstimates = async (userId) => {
    const { data, error } = await supabase
      .from('estimates')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setSavedEstimates(data);
    }
  };

  const saveEstimate = async () => {
    if (!currentEstimateName.trim()) {
      alert('Wprowadź nazwę kosztorysu');
      return;
    }

    const estimateData = {
  user_id: session.user.id,
  name: currentEstimateName,
  client_name: clientName,
  client_address: clientAddress,
  client_phone: clientPhone,
  client_email: clientEmail,
  document_city: documentCity,
  document_date: documentDate,
  validity_months: validityMonths,
  items: items,
  workers: workers,
  materials_by: materialsBy,
  vat_rate: vatRate,
  currency: currency,
  total_labor: totalLabor,
  total_materials: totalMaterials,
  total_rh: totalRH,
  total_brutto: totalBrutto
};

    if (currentEstimateId) {
      const { error } = await supabase
        .from('estimates')
        .update(estimateData)
        .eq('id', currentEstimateId);
      
      if (!error) {
        alert('Kosztorys zaktualizowany!');
        loadSavedEstimates(session.user.id);
      }
    } else {
      const { data, error } = await supabase
        .from('estimates')
        .insert([estimateData])
        .select();
      
      if (!error && data) {
        setCurrentEstimateId(data[0].id);
        alert('Kosztorys zapisany!');
        loadSavedEstimates(session.user.id);
      }
    }
    setShowSaveDialog(false);
  };

  const loadEstimate = (estimate) => {
  setCurrentEstimateId(estimate.id);
  setCurrentEstimateName(estimate.name);
  setClientName(estimate.client_name || '');
  setClientAddress(estimate.client_address || '');
  setClientPhone(estimate.client_phone || '');
  setClientEmail(estimate.client_email || '');
  setDocumentCity(estimate.document_city || '');
  setDocumentDate(estimate.document_date || formatPolishDate(new Date()));
  setValidityMonths(estimate.validity_months || 3);
  setItems(estimate.items || []);
  setWorkers(estimate.workers || 1);
  setMaterialsBy(estimate.materials_by || 'contractor');
  setVatRate(estimate.vat_rate || 23);
  setCurrency(estimate.currency || 'PLN');
  setShowLoadDialog(false);
};

  const deleteEstimate = async (estimateId) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten kosztorys?')) {
      const { error } = await supabase
        .from('estimates')
        .delete()
        .eq('id', estimateId);
      
      if (!error) {
        loadSavedEstimates(session.user.id);
        if (currentEstimateId === estimateId) {
          setCurrentEstimateId(null);
          setCurrentEstimateName('');
        }
      }
    }
  };

  const generateEstimateFromDescription = () => {
    const lines = workDescription.split('\n').filter(line => line.trim());
    const newItems = [];

    lines.forEach(line => {
      const parsed = parseWorkDescription(line);
      if (parsed) {
        const matchingService = SERVICES.find(s => 
          s.name.toLowerCase().includes(parsed.name.toLowerCase()) ||
          parsed.name.toLowerCase().includes(s.name.toLowerCase().split(' ')[0])
        );

        newItems.push({
          name: matchingService ? matchingService.name : parsed.name,
          unit: parsed.unit,
          qty: parsed.qty,
          laborPrice: matchingService ? 32 : 0,
          materialPricePerUnit: matchingService ? matchingService.suggestedMaterial : 0,
          rhPerUnit: matchingService ? matchingService.rhPerUnit : 0,
        });
      }
    });

    if (newItems.length > 0) {
      const sortedItems = newItems.sort((a, b) => {
        const phaseA = detectWorkPhase(a.name);
        const phaseB = detectWorkPhase(b.name);
        return phaseA.order - phaseB.order;
      });

      setItems([...items, ...sortedItems]);
      setWorkDescription('');
      alert(`Dodano ${newItems.length} pozycji z opisu`);
    } else {
      alert('Nie rozpoznano żadnych prac. Użyj formatu: "malowanie 50 m2" lub "50 m2 malowania"');
    }
  };

  const sortItemsByPhase = () => {
    const sorted = [...items].sort((a, b) => {
      const phaseA = detectWorkPhase(a.name);
      const phaseB = detectWorkPhase(b.name);
      return phaseA.order - phaseB.order;
    });
    setItems(sorted);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  };

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    if (["qty", "laborPrice", "materialPricePerUnit", "rhPerUnit"].includes(field)) {
      newItems[index][field] = Number(value) || 0;
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
  };
  const updateDropdownPosition = (idx) => {
  if (inputRefs.current[idx]) {
    const rect = inputRefs.current[idx].getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 2,
      left: rect.left,
      width: rect.width * 2.5
    });
  }
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

// Normalizacja polskich znaków do wyszukiwania
const normalizePolish = (text) => {
  const map = {
    'ą': 'a', 'Ą': 'A',
    'ć': 'c', 'Ć': 'C',
    'ę': 'e', 'Ę': 'E',
    'ł': 'l', 'Ł': 'L',
    'ń': 'n', 'Ń': 'N',
    'ó': 'o', 'Ó': 'O',
    'ś': 's', 'Ś': 'S',
    'ź': 'z', 'Ź': 'Z',
    'ż': 'z', 'Ż': 'Z'
  };
  return text.toLowerCase().replace(/[ąĄćĆęĘłŁńŃóÓśŚźŹżŻ]/g, m => map[m] || m);
};

const filteredServices = (text) => {
  if (!text) return [];
  const normalizedSearch = normalizePolish(text);
  
  return SERVICES.filter((s) => {
    const displayName = s.cleanName || s.name;
    const normalizedName = normalizePolish(displayName);
    
    // Sprawdź czy którekolwiek słowo zaczyna się od szukanej frazy
    // LUB czy cała nazwa zawiera szukaną frazę
    const words = normalizedName.split(' ');
    const startsWithMatch = words.some(word => word.startsWith(normalizedSearch));
    const containsMatch = normalizedName.includes(normalizedSearch);
    
    return startsWithMatch || containsMatch;
  }).slice(0, 10);
};
const pickService = (idx, service) => {
  const newItems = [...items];

  // Zamiast brudnej nazwy z buforem zapisujemy wersję „dla człowieka”
  newItems[idx].name = getServiceDisplayName(service);

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

  const handleDownloadExcel = () => {
    const worksheetData = [
      ['KOSZTORYS REMONTOWY'],
      [`Data: ${new Date().toLocaleDateString('pl-PL')}`],
      [],
      ['DANE KLIENTA'],
      ['Nazwa:', clientName],
      ['Adres:', clientAddress],
      ['Telefon:', clientPhone],
      ['Email:', clientEmail],
      [],
      ['POZYCJE KOSZTORYSU'],
      ['Lp.', 'Nazwa', 'Ilość', 'Jm', 'Cena rob.', 'Rob. razem', 'Mat/jedn', 'Mat razem', 'RH/jedn', 'Suma RH'],
      ...items.map((item, idx) => [
        idx + 1,
        item.name,
        item.qty,
        item.unit,
        item.laborPrice.toFixed(2),
        (item.qty * item.laborPrice).toFixed(2),
        item.materialPricePerUnit.toFixed(2),
        (item.qty * item.materialPricePerUnit).toFixed(2),
        item.rhPerUnit.toFixed(2),
        (item.qty * item.rhPerUnit).toFixed(2)
      ]),
      [],
      ['PODSUMOWANIE'],
      ['Suma robocizny:', `${totalLabor.toFixed(2)} ${currency}`],
      ['Suma materiałów:', `${totalMaterials.toFixed(2)} ${currency}`],
      ['Razem netto:', `${totalForClient.toFixed(2)} ${currency}`],
      [`VAT ${vatRate}%:`, `${vatAmount.toFixed(2)} ${currency}`],
      ['RAZEM BRUTTO:', `${totalBrutto.toFixed(2)} ${currency}`],
      [],
      ['Łączne roboczogodziny:', `${totalRH.toFixed(2)} RH`],
      ['Czas realizacji:', `${hoursWithWorkers.toFixed(1)} godz. (${(hoursWithWorkers / 8).toFixed(1)} dni)`],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kosztorys");
    
    XLSX.writeFile(workbook, `kosztorys_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

const handleDownloadPdf = async () => {
  const doc = new jsPDF();

  // Załaduj czcionkę Roboto z obsługą polskich znaków
  try {
    const fontResponse = await fetch('/fonts/Roboto-Regular.ttf');
    const fontBuffer = await fontResponse.arrayBuffer();
    const fontBase64 = btoa(
      new Uint8Array(fontBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    doc.addFileToVFS('Roboto-Regular.ttf', fontBase64);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');
  } catch (error) {
    console.error('Błąd ładowania czcionki Roboto:', error);
  }

  const pageWidth = doc.internal.pageSize.getWidth();

    // Nagłówek - tytuł na środku
  doc.setFontSize(18);
  doc.setTextColor(15, 118, 110);
  doc.text("KOSZTORYS REMONTOWY", 105, 20, { align: "center" });

  let y = 35; // Początkowa wysokość sekcji danych
  
  // Dane klienta
  if (pdfOptions.includeClientData) {
    // 1. DANE KLIENTA (LEWA STRONA)
    doc.setFontSize(11);
    doc.setTextColor(0);
    
    // Zapamiętujemy Y nagłówka, żeby wyrównać datę do tej samej linii
    const headerY = y;
    
    doc.text("DANE KLIENTA:", 20, y);
    
    // 2. MIEJSCOWOŚĆ I DATA (PRAWA STRONA - ta sama wysokość co "DANE KLIENTA")
    doc.setFontSize(10);
    doc.setTextColor(100); // Szary kolor dla daty
    const locationDate = documentCity ? `${documentCity}, ${documentDate}` : documentDate;
    // pageWidth - 20 to margines prawy
    doc.text(locationDate, pageWidth - 20, headerY, { align: "right" });
    
    // Reset koloru na czarny dla reszty danych klienta
    doc.setTextColor(0);
    doc.setFontSize(11);
    
    y += 6;
    
    if (clientName) { doc.text(`Nazwa: ${clientName}`, 20, y); y += 5; }
    if (clientAddress) { doc.text(`Adres: ${clientAddress}`, 20, y); y += 5; }
    if (clientPhone) { doc.text(`Telefon: ${clientPhone}`, 20, y); y += 5; }
    if (clientEmail) { doc.text(`Email: ${clientEmail}`, 20, y); y += 5; }
    y += 5;
  } else {
    // Jeśli nie ma danych klienta, to data i tak powinna się gdzieś pokazać
    doc.setFontSize(10);
    doc.setTextColor(100);
    const locationDate = documentCity ? `${documentCity}, ${documentDate}` : documentDate;
    doc.text(locationDate, pageWidth - 20, y, { align: "right" });
    y += 10;
  }
  
  // Dane klienta
  if (pdfOptions.includeClientData && (clientName || clientAddress || clientPhone || clientEmail)) {
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text("DANE KLIENTA:", 20, y);
    y += 6;
    
    if (clientName) { doc.text(`Nazwa: ${clientName}`, 20, y); y += 5; }
    if (clientAddress) { doc.text(`Adres: ${clientAddress}`, 20, y); y += 5; }
    if (clientPhone) { doc.text(`Telefon: ${clientPhone}`, 20, y); y += 5; }
    if (clientEmail) { doc.text(`Email: ${clientEmail}`, 20, y); y += 5; }
    y += 5;
  }

  // Nagłówek tabeli
  doc.setFillColor(15, 118, 110);
  
  const headerX = 15;
  
  // Dynamiczne kolumny
  const colWidths = {
    no: pdfOptions.includeItemNumbers ? 8 : 0,
    name: 45,
    qty: 12,
    unit: 12,
    labor: pdfOptions.includeUnitPrices ? 15 : 0,
    materialUnit: (pdfOptions.includeMaterialPrices && pdfOptions.includeMaterialCosts) ? 14 : 0,
    materialTotal: (pdfOptions.includeMaterialPrices && pdfOptions.includeMaterialCosts) ? 18 : 0,
    rh: pdfOptions.includeRH ? 14 : 0,
    value: 20
  };
  
  const totalWidth = Object.values(colWidths).reduce((a, b) => a + b, 0);
  doc.rect(headerX, y - 5, totalWidth, 8, 'F');
  doc.setTextColor(255);
  doc.setFontSize(7);
  
  let currentX = headerX + 1;
  if (pdfOptions.includeItemNumbers) { 
    doc.text("Lp.", currentX + 2, y + 1); 
    currentX += colWidths.no; 
  }
  doc.text("Nazwa", currentX + 1, y + 1); 
  currentX += colWidths.name;
  doc.text("Ilość", currentX + 1, y + 1); 
  currentX += colWidths.qty;
  doc.text("Jm", currentX + 1, y + 1); 
  currentX += colWidths.unit;
  if (pdfOptions.includeUnitPrices) { 
    doc.text("Rob.", currentX + 1, y + 1); 
    currentX += colWidths.labor; 
  }
  if (pdfOptions.includeMaterialPrices && pdfOptions.includeMaterialCosts) {
    doc.text("Mat/jdn", currentX + 1, y + 1); 
    currentX += colWidths.materialUnit;
    doc.text("Mat razem", currentX + 1, y + 1); 
    currentX += colWidths.materialTotal;
  }
  if (pdfOptions.includeRH) { 
    doc.text("RH", currentX + 1, y + 1); 
    currentX += colWidths.rh; 
  }
  doc.text("Wartość", currentX + 1, y + 1);

  doc.setTextColor(0);
  y += 10;

  // Pozycje tabeli
  items.forEach((item, idx) => {
    const nameLines = doc.splitTextToSize(item.name, colWidths.name - 4);
    const lineHeight = 5;
    const nameHeight = Math.max(nameLines.length * lineHeight, 7);

    if (y + nameHeight > 270) {
      doc.addPage();
      y = 20;
    }

    if (idx % 2 === 0) {
      doc.setFillColor(243, 244, 246);
      doc.rect(headerX, y - 4, totalWidth, nameHeight, 'F');
    }

    let currentX = headerX + 2;
    if (pdfOptions.includeItemNumbers) {
      doc.text(`${idx + 1}.`, currentX, y);
      currentX += colWidths.no;
    }

    nameLines.forEach((line, lineIdx) => {
      doc.text(line, currentX, y + lineIdx * lineHeight);
    });
    currentX += colWidths.name;

    const dataY = y;

    doc.text(item.qty.toString(), currentX, dataY);
    currentX += colWidths.qty;

    doc.text(item.unit, currentX, dataY);
    currentX += colWidths.unit;

    if (pdfOptions.includeUnitPrices) {
      doc.text(item.laborPrice.toFixed(2), currentX, dataY);
      currentX += colWidths.labor;
    }

    if (pdfOptions.includeMaterialPrices && pdfOptions.includeMaterialCosts) {
      doc.text(item.materialPricePerUnit.toFixed(2), currentX, dataY);
      currentX += colWidths.materialUnit;
      doc.text((item.qty * item.materialPricePerUnit).toFixed(2), currentX, dataY);
      currentX += colWidths.materialTotal;
    }

    if (pdfOptions.includeRH) {
      doc.text((item.qty * item.rhPerUnit).toFixed(1), currentX, dataY);
      currentX += colWidths.rh;
    }

    const itemTotal =
      item.qty * item.laborPrice +
      (pdfOptions.includeMaterialCosts && materialsBy === 'contractor'
        ? item.qty * item.materialPricePerUnit
        : 0);
    doc.text(`${itemTotal.toFixed(2)}`, currentX, dataY);

    y += nameHeight;
  });

  // Podsumowanie - wyrównane do lewej
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(0);

  doc.text(`Suma robocizny: ${totalLabor.toFixed(2)} ${currency}`, 20, y); 
  y += 6;
  
  if (pdfOptions.includeMaterialCosts) {
    doc.text(`Suma materiałów: ${(materialsBy === "contractor" ? totalMaterials : 0).toFixed(2)} ${currency}`, 20, y); 
    y += 6;
  }
  
  doc.text(`Razem netto: ${totalForClient.toFixed(2)} ${currency}`, 20, y); 
  y += 6;
  
  doc.text(`VAT ${vatRate}%: ${vatAmount.toFixed(2)} ${currency}`, 20, y); 
  y += 6;
  
  doc.setFontSize(12);
  doc.setTextColor(15, 118, 110);
  doc.text(`RAZEM BRUTTO: ${totalBrutto.toFixed(2)} ${currency}`, 20, y);

  // Podsumowanie czasowe
  if (pdfOptions.includeTimeSummary) {
    y += 12;
    doc.setTextColor(0);
    doc.setFontSize(10);
    doc.setFillColor(240, 249, 255);
    doc.rect(20, y - 4, 170, 14, 'F');
    doc.text(`Łączny czas pracy: ${totalRH.toFixed(2)} roboczogodzin`, 25, y + 2);
    doc.text(`Szacowany czas przy ${workers} pracownikach: ${hoursWithWorkers.toFixed(1)} godzin`, 25, y + 8);
    y += 14;
  }

  // Stopka
  y += 10;
  doc.setFontSize(9);
  doc.setTextColor(80);
  doc.text(`Materiały opłaca: ${materialsBy === "contractor" ? "wykonawca" : "klient"}`, 20, y);
  y += 5;
  
  // Ważność kosztorysu
  const validityText = validityMonths === 1 
    ? "1 miesiąc" 
    : (validityMonths >= 2 && validityMonths <= 4) 
      ? `${validityMonths} miesiące` 
      : `${validityMonths} miesięcy`;
  doc.text(`Kosztorys ważny ${validityText} od daty wystawienia.`, 20, y);

  doc.save("kosztorys.pdf");
  setShowPdfOptions(false);
};
  // ========== GRUPOWANIE (przed return) ==========
  const groupedItems = groupByPhase ? items.reduce((acc, item, idx) => {
    const phase = detectWorkPhase(item.name);
    if (!acc[phase.name]) {
      acc[phase.name] = [];
    }
    acc[phase.name].push({ ...item, originalIndex: idx });
    return acc;
  }, {}) : { 'Wszystkie prace': items.map((item, idx) => ({ ...item, originalIndex: idx })) };

  // ========== EARLY RETURNS ==========
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.text, fontSize: 18 }}>
        Ładowanie...
      </div>
    );
  }


  // ========== GŁÓWNY RENDER ==========
  return (
    <div style={{ padding: 24, minHeight: "100vh", background: theme.bg, color: theme.text, fontFamily: "sans-serif", maxWidth: "100%", width: "100%", boxSizing: "border-box", transition: "background 0.3s, color 0.3s" }}>
      
      {/* NAGŁÓWEK */}
{/* NAGŁÓWEK */}
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
  <div>
    <h1 style={{ margin: 0 }}>Kosztorys remontowy 2026</h1>
    <p style={{ color: theme.textMuted, fontSize: 14, margin: '8px 0 0 0' }}>
      {session ? (
        <>
          {profile?.email} | {profile?.is_premium ? ' Premium (nielimitowane pozycje)' : ` Demo (max ${maxItems} pozycje)`}
          {currentEstimateName && ` | ${currentEstimateName}`}
        </>
      ) : (
        `Tryb demo (max ${maxItems} pozycje) - zaloguj się, aby zapisywać kosztorysy`
      )}
    </p>
  </div>
  
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    {session ? (
      <>
        <button onClick={() => setShowLoadDialog(true)} style={{ padding: '8px 16px', background: theme.accent, color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          📂 Wczytaj
        </button>
        <button onClick={() => setShowSaveDialog(true)} style={{ padding: '8px 16px', background: theme.accent, color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          💾 Zapisz
        </button>
        <button 
  onClick={() => { 
    setItems([]); 
    setClientName(''); 
    setClientAddress(''); 
    setClientPhone(''); 
    setClientEmail(''); 
    setDocumentCity('');
    setDocumentDate(formatPolishDate(new Date()));
    setValidityMonths(3);
    setCurrentEstimateId(null); 
    setCurrentEstimateName(''); 
  }} 
  style={{ padding: '8px 16px', background: theme.bgSecondary, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: 4, cursor: 'pointer' }}
>
  🆕 Nowy
</button>
      </>
    ) : (
      <button onClick={() => setShowLoginModal(true)} style={{ padding: '8px 16px', background: theme.accent, color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        🔐 Zaloguj się
      </button>
    )}
    <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ padding: '8px 16px', background: theme.bgSecondary, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s' }}>
      {isDarkMode ? '☀️ Jasny' : '🌙 Ciemny'}
    </button>
    {(!session || !profile?.is_premium) && <PremiumButton />}
    {session && (
      <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        Wyloguj
      </button>
    )}
  </div>
</div>
      {/* SORTOWANIE I GRUPOWANIE */}
      <div style={{ background: theme.bgSecondary, padding: 16, borderRadius: 8, marginBottom: 24, border: `1px solid ${theme.border}`, transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button 
            onClick={sortItemsByPhase} 
            disabled={items.length === 0} 
            style={{ 
              padding: '10px 20px', 
              background: items.length > 0 ? '#3b82f6' : theme.bgTertiary, 
              color: '#fff', 
              border: 'none', 
              borderRadius: 4, 
              cursor: items.length > 0 ? 'pointer' : 'not-allowed', 
              fontWeight: 'bold' 
            }}
          >
            🔄 Sortuj według etapów
          </button>
          <label 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              padding: '10px 20px', 
              background: theme.bgTertiary, 
              borderRadius: 4, 
              cursor: 'pointer' 
            }}
          >
            <input 
              type="checkbox" 
              checked={groupByPhase} 
              onChange={(e) => setGroupByPhase(e.target.checked)} 
            />
            <span>Grupuj według faz</span>
          </label>
        </div>
      </div>

      {/* OSTRZEŻENIA LOGICZNE */}
      {logicWarnings.length > 0 && (
        <div style={{ background: theme.warningBg, padding: 16, borderRadius: 8, marginBottom: 24, border: `2px solid ${theme.warning}` }}>
          <h4 style={{ marginTop: 0, color: theme.warning }}>⚠️ Ostrzeżenia</h4>
          {logicWarnings.map((w, idx) => (
            <p key={idx} style={{ margin: '8px 0', color: theme.text }}>• {w.message}</p>
          ))}
        </div>
      )}

      {/* SUGESTIE */}
      {suggestions.length > 0 && (
        <div style={{ background: theme.accentLight, padding: 16, borderRadius: 8, marginBottom: 24, border: `1px solid ${theme.accent}` }}>
          <h4 style={{ marginTop: 0, color: theme.accent }}>💡 Sugestie brakujących pozycji</h4>
          {suggestions.map((s, idx) => (
            <div key={idx} style={{ margin: '8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: theme.text }}>• {s}</span>
            </div>
          ))}
        </div>
      )}
      {/* DANE DOKUMENTU */}
<div style={{ background: theme.bgSecondary, padding: 16, borderRadius: 8, marginBottom: 24, border: `1px solid ${theme.border}`, transition: 'all 0.3s' }}>
  <h3 style={{ marginTop: 0, marginBottom: 16, color: theme.accent }}>Dane dokumentu</h3>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
    <div>
      <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>Miejscowość</label>
      <input 
        type="text" 
        value={documentCity} 
        onChange={(e) => setDocumentCity(e.target.value)} 
        placeholder="np. Warszawa" 
        style={{ width: '100%', padding: '8px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s' }} 
      />
    </div>
    <div>
      <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>Data wystawienia</label>
      <input 
        type="text" 
        value={documentDate} 
        onChange={(e) => setDocumentDate(e.target.value)} 
        placeholder="np. 15 stycznia 2025" 
        style={{ width: '100%', padding: '8px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s' }} 
      />
    </div>
    <div>
      <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>Ważność kosztorysu (miesiące)</label>
      <input 
        type="number" 
        min={1} 
        max={24} 
        value={validityMonths} 
        onChange={(e) => setValidityMonths(Number(e.target.value) || 3)} 
        style={{ width: '100%', padding: '8px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s' }} 
      />
    </div>
  </div>
</div>

      {/* DANE KLIENTA */}
      <div style={{ background: theme.bgSecondary, padding: 16, borderRadius: 8, marginBottom: 24, border: `1px solid ${theme.border}`, transition: 'all 0.3s' }}>
        <h3 style={{ marginTop: 0, marginBottom: 16, color: theme.accent }}>Dane klienta</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>Nazwa / Imię i nazwisko</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="np. Jan Kowalski" style={{ width: '100%', padding: '8px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>Adres</label>
            <input type="text" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} placeholder="np. ul. Kwiatowa 15, 00-001 Warszawa" style={{ width: '100%', padding: '8px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>Telefon</label>
            <input type="text" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="np. +48 123 456 789" style={{ width: '100%', padding: '8px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: theme.textSecondary }}>Email</label>
            <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="np. jan.kowalski@example.com" style={{ width: '100%', padding: '8px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s' }} />
          </div>
        </div>
      </div>

      {/* TABELA POZYCJI */}
      <div style={{ width: '100%', overflow: 'auto', marginBottom: 24, position: 'relative', zIndex: 100 }}>
        {Object.entries(groupedItems).map(([phaseName, phaseItems]) => (
          <div key={phaseName} style={{ marginBottom: 32 }}>
            {groupByPhase && (
              <h3 style={{ marginTop: 24, marginBottom: 12, color: theme.accent, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 8 }}>
                {phaseName}
              </h3>
            )}
            
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1400, tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "28%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "4%" }} />
              </colgroup>
              <thead>
                <tr style={{ background: theme.accent }}>
                  <th style={{ padding: '10px 4px', textAlign: "left", color: '#fff', fontSize: 12 }}>Pozycja</th>
                  <th style={{ padding: '10px 4px', color: '#fff', fontSize: 12 }}>Ilość</th>
                  <th style={{ padding: '10px 4px', color: '#fff', fontSize: 12 }}>Jm</th>
                  <th style={{ padding: '10px 4px', color: '#fff', fontSize: 12 }}>Cena rob.</th>
                  <th style={{ padding: '10px 4px', color: '#fff', fontSize: 12 }}>Rob. razem</th>
                  <th style={{ padding: '10px 4px', color: '#fff', fontSize: 12 }}>Mat./jdn.</th>
                  <th style={{ padding: '10px 4px', color: '#fff', fontSize: 12, background: '#0d5d58' }}>Mat. razem</th>
                  <th style={{ padding: '10px 4px', color: '#fff', fontSize: 12 }}>RH/jdn.</th>
                  <th style={{ padding: '10px 4px', color: '#fff', fontSize: 12 }}>Suma RH</th>
                  <th style={{ padding: '10px 4px', color: '#fff', fontSize: 12 }}>Usuń</th>
                </tr>
              </thead>
              <tbody>
                {phaseItems.map((item, localIdx) => {
                  const idx = item.originalIndex !== undefined ? item.originalIndex : localIdx;
                  const serviceSuggestions = filteredServices(item.name);
                  const itemRH = item.qty * (item.rhPerUnit || 0);
                  const itemMaterialTotal = item.qty * item.materialPricePerUnit;
                  const itemLaborTotal = item.qty * item.laborPrice;
                  const suggestedService = SERVICES.find(s => s.name === item.name);
                  
                  return (
                    <tr key={idx} style={{ background: localIdx % 2 === 0 ? theme.rowEven : theme.rowOdd, borderBottom: `1px solid ${theme.border}`, transition: 'all 0.3s' }}>
                      <td style={{ padding: "6px", position: "relative", zIndex: openIndex === idx ? 10000 : 1, overflow: 'visible' }}>
                        <input 
  ref={(el) => (inputRefs.current[idx] = el)} 
  style={{ width: "100%", maxWidth: "100%", minWidth: 0, padding: '6px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s', fontSize: 12 }} 
  value={item.name} 
  onChange={(e) => { handleChange(idx, "name", e.target.value); setOpenIndex(idx); updateDropdownPosition(idx); }} 
  onFocus={() => { setOpenIndex(idx); updateDropdownPosition(idx); }} 
  onBlur={() => setTimeout(() => setOpenIndex(null), 200)} 
  onKeyUp={() => updateDropdownPosition(idx)}
  placeholder="Wpisz..." 
/>
{openIndex === idx && serviceSuggestions.length > 0 && createPortal(
  <div style={{ 
    position: "fixed", 
    top: dropdownPosition.top,
    left: dropdownPosition.left,
    width: dropdownPosition.width,
    background: theme.dropdownBg, 
    border: `2px solid ${theme.accent}`, 
    borderRadius: 4, 
    zIndex: 999999, 
    maxHeight: 300, 
    overflowY: "auto", 
    boxShadow: `0 8px 24px ${theme.shadow}` 
  }}>
    {serviceSuggestions.map((s) => (
      <div key={s.name} style={{ padding: "8px 10px", cursor: "pointer", borderBottom: `1px solid ${theme.border}`, transition: "background 0.2s", color: theme.text, fontSize: 12 }} onMouseDown={() => pickService(idx, s)} onMouseEnter={(e) => e.currentTarget.style.background = theme.accent} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
        <div style={{ fontWeight: 500 }}>{getServiceDisplayName(s)}</div>
        <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>RH: {s.rhPerUnit} | Mat/jdn: ~{s.suggestedMaterial} {currency}</div>
      </div>
    ))}
  </div>,
  document.body
)}
            </td>
                      <td style={{ textAlign: "center", padding: "6px" }}>
                        <input style={{ width: '100%', maxWidth: '100%', minWidth: 0, textAlign: "center", padding: '6px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s', fontSize: 12 }} type="number" min={0} value={item.qty} onChange={(e) => handleChange(idx, "qty", e.target.value)} />
                      </td>
                      <td style={{ textAlign: "center", padding: "6px" }}>
                        <select style={{ width: '100%', maxWidth: '100%', minWidth: 0, textAlign: "center", padding: '6px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s', fontSize: 12, cursor: 'pointer' }} value={item.unit} onChange={(e) => handleChange(idx, "unit", e.target.value)}>
                          <option value="m2">m2</option>
                          <option value="m3">m3</option>
                          <option value="mb">mb</option>
                          <option value="szt">szt</option>
                          <option value="komp">komp</option>
                        </select>
                      </td>
                      <td style={{ textAlign: "right", padding: "6px" }}>
                        <input style={{ width: '100%', maxWidth: '100%', minWidth: 0, textAlign: "right", padding: '6px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s', fontSize: 12 }} type="number" step="0.01" min={0} value={item.laborPrice} onChange={(e) => handleChange(idx, "laborPrice", e.target.value)} />
                      </td>
                      <td style={{ textAlign: "right", padding: "6px" }}>
                        <div style={{ padding: '6px', borderRadius: 4, fontWeight: 500, color: theme.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{itemLaborTotal.toFixed(2)}</div>
                      </td>
                      <td style={{ textAlign: "right", padding: "6px" }}>
                        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <input style={{ width: '100%', maxWidth: '100%', minWidth: 0, textAlign: "right", padding: '6px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s', fontSize: 12 }} type="number" step="0.01" min={0} value={item.materialPricePerUnit} onChange={(e) => handleChange(idx, "materialPricePerUnit", e.target.value)} />
                          {suggestedService && suggestedService.suggestedMaterial > 0 && (
                            <button type="button" onClick={(e) => applySuggestedPrice(idx, e)} onMouseDown={(e) => e.preventDefault()} title={`Zastosuj: ${suggestedService.suggestedMaterial}`} style={{ background: theme.accent, color: '#fff', border: 'none', borderRadius: 4, padding: '6px 8px', cursor: 'pointer', fontSize: 10, fontWeight: 'bold', minWidth: 28, flexShrink: 0 }}>✓</button>
                          )}
                        </div>
                      </td>
                      <td style={{ textAlign: "right", padding: "6px" }}>
                        <div style={{ background: itemMaterialTotal > 0 ? '#3b82f622' : 'transparent', padding: '6px', borderRadius: 4, fontWeight: 600, color: itemMaterialTotal > 0 ? '#3b82f6' : theme.textMuted, transition: 'all 0.3s', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{itemMaterialTotal.toFixed(2)}</div>
                      </td>
                      <td style={{ textAlign: "right", padding: "6px" }}>
                        <input style={{ width: '100%', maxWidth: '100%', minWidth: 0, textAlign: "right", padding: '6px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, boxSizing: 'border-box', transition: 'all 0.3s', fontSize: 12 }} type="number" step="0.01" min={0} value={item.rhPerUnit} onChange={(e) => handleChange(idx, "rhPerUnit", e.target.value)} />
                      </td>
                      <td style={{ textAlign: "right", padding: "6px" }}>
                        <div style={{ background: itemRH > 0 ? theme.accentLight : 'transparent', padding: '6px', borderRadius: 4, fontWeight: 500, color: itemRH > 0 ? (isDarkMode ? '#5eead4' : '#0f766e') : theme.textMuted, transition: 'all 0.3s', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{itemRH.toFixed(2)}</div>
                      </td>
                      <td style={{ textAlign: "center", padding: "6px" }}>
                        <button onClick={() => removeItem(idx)} style={{ background: "#dc2626", color: "#fff", border: "none", borderRadius: 4, padding: "6px 8px", cursor: "pointer", fontWeight: 'bold', fontSize: 12 }}>X</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* PRZYCISKI AKCJI */}
      <div style={{ marginBottom: 24, position: 'relative', zIndex: 1 }}>
        <button onClick={addItem} disabled={items.length >= maxItems} style={{ padding: "12px 24px", background: items.length >= maxItems ? theme.bgTertiary : theme.accent, color: "#fff", border: "none", borderRadius: 4, cursor: items.length >= maxItems ? "not-allowed" : "pointer", fontSize: 16, fontWeight: 500 }}>
          Dodaj pozycje {!profile?.is_premium && `(${items.length}/${maxItems})`}
        </button>
        <button onClick={() => setShowPdfOptions(true)} style={{ marginLeft: 12, padding: "12px 24px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 16, fontWeight: 500 }}>
          📄 Pobierz PDF
        </button>
        <button onClick={handleDownloadExcel} style={{ marginLeft: 12, padding: "12px 24px", background: "#059669", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 16, fontWeight: 500 }}>
          📊 Eksport Excel
        </button>
      </div>

      {/* USTAWIENIA */}
      <div style={{ background: theme.bgSecondary, padding: 20, borderRadius: 8, border: `1px solid ${theme.border}`, marginBottom: 24, position: 'relative', zIndex: 1, transition: 'all 0.3s' }}>
        <h3 style={{ marginTop: 0, marginBottom: 16, color: theme.accent }}>Ustawienia kosztorysu</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: theme.textSecondary, fontSize: 13 }}>Liczba pracowników:</label>
            <input type="number" min={1} value={workers} onChange={(e) => setWorkers(Math.max(1, Number(e.target.value) || 1))} style={{ width: '30%', padding: '8px', textAlign: "right", background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, fontSize: 14, boxSizing: 'border-box', transition: 'all 0.3s' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: theme.textSecondary, fontSize: 13 }}>Materiał opłaca:</label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', height: '50%', flexWrap: 'wrap' }}>
              <label style={{ cursor: 'pointer', color: theme.text, fontSize: 13 }}>
                <input type="radio" checked={materialsBy === "contractor"} onChange={() => setMaterialsBy("contractor")} style={{ marginRight: 4 }} />Wykonawca
              </label>
              <label style={{ cursor: 'pointer', color: theme.text, fontSize: 13 }}>
                <input type="radio" checked={materialsBy === "client"} onChange={() => setMaterialsBy("client")} style={{ marginRight: 4 }} />Klient
              </label>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: theme.textSecondary, fontSize: 13 }}>VAT (%):</label>
            <input type="number" min={0} max={23} value={vatRate} onChange={(e) => setVatRate(Number(e.target.value) || 0)} style={{ width: '30%', padding: '8px', textAlign: "right", background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, fontSize: 14, boxSizing: 'border-box', transition: 'all 0.3s' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: theme.textSecondary, fontSize: 13 }}>Waluta:</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ width: '30%', padding: '8px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, fontSize: 14, boxSizing: 'border-box', cursor: 'pointer', transition: 'all 0.3s' }}>
              <option value="PLN">PLN</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
      </div>

      {/* MODAL OPCJI PDF */}
      {showPdfOptions && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ background: theme.bgSecondary, padding: 32, borderRadius: 8, maxWidth: 500, width: '90%', border: `2px solid ${theme.accent}`, color: theme.text, transition: 'all 0.3s' }}>
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
                <label key={option.key} style={{ display: 'block', marginBottom: 12, cursor: 'pointer', padding: '8px', background: pdfOptions[option.key] ? theme.accentLight : 'transparent', borderRadius: 4, transition: 'background 0.2s', color: theme.text }}>
                  <input type="checkbox" checked={pdfOptions[option.key]} onChange={(e) => setPdfOptions({ ...pdfOptions, [option.key]: e.target.checked })} style={{ marginRight: 8 }} />
                  {option.label}
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={handleDownloadPdf} style={{ flex: 1, padding: "10px 20px", background: theme.accent, color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 16, fontWeight: 500 }}>Generuj PDF</button>
              <button onClick={() => setShowPdfOptions(false)} style={{ flex: 1, padding: "10px 20px", background: theme.bgTertiary, color: theme.text, border: "none", borderRadius: 4, cursor: "pointer", fontSize: 16, fontWeight: 500 }}>Anuluj</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ZAPISYWANIA */}
      {showSaveDialog && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ background: theme.bgSecondary, padding: 32, borderRadius: 8, maxWidth: 500, width: '90%', border: `2px solid ${theme.accent}`, color: theme.text }}>
            <h2 style={{ marginTop: 0, color: theme.accent }}>{currentEstimateId ? 'Aktualizuj kosztorys' : 'Zapisz nowy kosztorys'}</h2>
            <label style={{ display: 'block', marginBottom: 8 }}>Nazwa kosztorysu:</label>
            <input type="text" value={currentEstimateName} onChange={(e) => setCurrentEstimateName(e.target.value)} placeholder="np. Remont mieszkania ul. Kwiatowa" style={{ width: '100%', padding: 12, background: theme.inputBg, border: `1px solid ${theme.borderLight}`, color: theme.text, borderRadius: 4, fontSize: 16, boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={saveEstimate} style={{ flex: 1, padding: "10px 20px", background: theme.accent, color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 16, fontWeight: 500 }}>{currentEstimateId ? 'Aktualizuj' : 'Zapisz'}</button>
              <button onClick={() => setShowSaveDialog(false)} style={{ flex: 1, padding: "10px 20px", background: theme.bgTertiary, color: theme.text, border: "none", borderRadius: 4, cursor: "pointer", fontSize: 16, fontWeight: 500 }}>Anuluj</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL WCZYTYWANIA */}
      {showLoadDialog && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ background: theme.bgSecondary, padding: 32, borderRadius: 8, maxWidth: 700, width: '90%', maxHeight: '80vh', overflow: 'auto', border: `2px solid ${theme.accent}`, color: theme.text }}>
            <h2 style={{ marginTop: 0, color: theme.accent }}>Wczytaj kosztorys</h2>
            {savedEstimates.length === 0 ? (
              <p>Brak zapisanych kosztorysów</p>
            ) : (
              <div>
                {savedEstimates.map(est => (
                  <div key={est.id} style={{ padding: 16, marginBottom: 12, background: theme.bgTertiary, borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: '0 0 8px 0' }}>{est.name}</h4>
                      <p style={{ margin: '4px 0', fontSize: 14, color: theme.textSecondary }}>{est.client_name || 'Brak klienta'} | {new Date(est.created_at).toLocaleDateString('pl-PL')}</p>
                      <p style={{ margin: '4px 0', fontSize: 14 }}>Wartość: {est.total_brutto?.toFixed(2) || '0.00'} {est.currency || 'PLN'}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => loadEstimate(est)} style={{ padding: "8px 16px", background: theme.accent, color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Wczytaj</button>
                      <button onClick={() => deleteEstimate(est.id)} style={{ padding: "8px 16px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Usuń</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setShowLoadDialog(false)} style={{ marginTop: 16, padding: "10px 20px", background: theme.bgTertiary, color: theme.text, border: "none", borderRadius: 4, cursor: "pointer", fontSize: 16, fontWeight: 500, width: '100%' }}>Zamknij</button>
          </div>
        </div>
      )}

      {/* PODSUMOWANIE */}
      <div style={{ background: theme.bgSecondary, padding: 20, borderRadius: 8, border: `1px solid ${theme.border}`, position: 'relative', zIndex: 1, transition: 'all 0.3s' }}>
        <h2 style={{ marginTop: 0 }}>Suma robocizny: {totalLabor.toFixed(2)} {currency}</h2>
        <h2 style={{ color: '#3b82f6' }}>Suma materiałów: {materialsBy === "contractor" ? `${totalMaterials.toFixed(2)} ${currency} (po stronie wykonawcy)` : `0 ${currency} (materiał klienta)`}</h2>
        <h3 style={{ marginTop: 24, color: theme.accent }}>Podsumowanie dla klienta:</h3>
        <p style={{ fontSize: 16 }}>Razem netto: <strong>{totalForClient.toFixed(2)} {currency}</strong></p>
        <p style={{ fontSize: 16 }}>VAT {vatRate}%: <strong>{vatAmount.toFixed(2)} {currency}</strong></p>
        <p style={{ fontSize: 20, color: theme.accent }}>Razem brutto: <strong>{totalBrutto.toFixed(2)} {currency}</strong></p>
        <div style={{ marginTop: 24, padding: 16, background: theme.accentLight, borderRadius: 6, borderLeft: `4px solid ${theme.accent}`, transition: 'all 0.3s' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: 16, color: theme.text }}>
            <strong>Łącznie roboczogodzin (RH):</strong> {totalRH.toFixed(2)}
          </p>
          <p style={{ margin: 0, fontSize: 16, color: theme.text }}>
            <strong>Szacowany czas przy {workers} pracownikach:</strong> {hoursWithWorkers.toFixed(1)} godz. ({(hoursWithWorkers / 8).toFixed(1)} dni roboczych)
          </p>
        </div>
      </div>
      {/* MODAL LOGOWANIA */}
{showLoginModal && (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
    <div style={{ background: theme.bgSecondary, padding: 32, borderRadius: 8, maxWidth: 450, width: '90%', border: `2px solid ${theme.accent}`, color: theme.text, position: 'relative' }}>
      <button 
        onClick={() => setShowLoginModal(false)} 
        style={{ position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', color: theme.textMuted, fontSize: 24, cursor: 'pointer' }}
      >
        ×
      </button>
      <Auth onSuccess={() => setShowLoginModal(false)} />
    </div>
  </div>
)}
    </div>
  );
}

export default App;
