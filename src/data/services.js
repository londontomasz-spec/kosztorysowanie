// ============================================
// KATALOG USŁUG REMONTOWYCH
// 548 pozycji pogrupowanych według faz prac
// ============================================

export const WORK_PHASES = {
  preparation: { order: 1, name: "Przygotowanie, pomiary i zabezpieczenia" },
  demolition: { order: 2, name: "Demontaż i rozbiórka" },
  transport: { order: 3, name: "Transport i logistyka odpadów" },
  masonry: { order: 4, name: "Roboty murarskie i konstrukcyjne" },
  electrical: { order: 5, name: "Instalacje elektryczne" },
  plumbing: { order: 6, name: "Instalacje hydrauliczne" },
  heating: { order: 7, name: "Ogrzewanie i wentylacja" },
  plaster: { order: 8, name: "Tynki, gładzie i wyrównywanie" },
  flooring: { order: 9, name: "Podłogi i schody" },
  ceiling: { order: 10, name: "Sufity i zabudowy G-K" },
  tiles: { order: 11, name: "Glazura i terakota" },
  painting: { order: 12, name: "Malowanie i gruntowanie" },
  decor: { order: 13, name: "Dekoracje i wykończenia" },
  carpentry: { order: 14, name: "Stolarka okienna i drzwiowa" },
  bathroom: { order: 15, name: "Biały montaż - łazienka" },
  furniture: { order: 16, name: "Meble i zabudowy" },
  handyman: { order: 17, name: "Złota rączka i drobne prace" },
  cleaning: { order: 18, name: "Sprzątanie i odbiór końcowy" }
};

export const SERVICES = [
  // ==========================================
  // FAZA 1: Przygotowanie, Pomiary i Zabezpieczenia
  // ==========================================
  {
    name: "1. Przygotowanie dokumentacji projektowej",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "2. Wstępne pomiary pomieszczeń",
    rhPerUnit: 0.25,
    phase: "preparation",
    prerequisites: ["1. Przygotowanie dokumentacji projektowej"]
  },
  {
    name: "3. Ochrona podłóg folią ochronną",
    rhPerUnit: 0.2,
    phase: "preparation",
    prerequisites: ["2. Wstępne pomiary pomieszczeń"]
  },
  {
    name: "4. Ochrona drzwi wejściowych folią",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "5. Zabezpieczenie parapetów folią",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "6. Zabezpieczenie grzejników folią",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "7. Zabezpieczenie okien folią lub kartonem",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "8. Zabezpieczenie mebli w pomieszczeniu",
    rhPerUnit: 0.2,
    phase: "preparation",
    prerequisites: ["9. Przesunięcie mebli na czas remontu"]
  },
  {
    name: "9. Przesunięcie mebli na czas remontu",
    rhPerUnit: 0.35,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "10. Oznakowanie stref niebezpiecznych",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "11. Wstępne sprzątanie pomieszczeń",
    rhPerUnit: 0.35,
    phase: "preparation",
    prerequisites: ["3. Ochrona podłóg folią ochronną"]
  },
  {
    name: "12. Wydzielenie stref pracy dla ekip",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: ["11. Wstępne sprzątanie pomieszczeń"]
  },
  {
    name: "13. Przygotowanie miejsca na odpady budowlane",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "14. Organizacja kontenera na gruz",
    rhPerUnit: 0.2,
    phase: "preparation",
    prerequisites: ["13. Przygotowanie miejsca na odpady budowlane"]
  },
  {
    name: "15. Zabezpieczenie instalacji elektrycznej głównej",
    rhPerUnit: 0.2,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "16. Zabezpieczenie instalacji wod-kan głównej",
    rhPerUnit: 0.2,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "17. Zabezpieczenie systemu CO",
    rhPerUnit: 0.2,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "18. Przygotowanie narzędzi i materiałów na miejscu",
    rhPerUnit: 0.25,
    phase: "preparation",
    prerequisites: ["12. Wydzielenie stref pracy dla ekip"]
  },
  {
    name: "19. Organizacja parkingu dla ekip",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "20. Oznaczenie miejsc składowania materiałów",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "21. Ochrona rur i instalacji na czas remontu",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "22. Zabezpieczenie elementów dekoracyjnych",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "23. Przygotowanie punktu poboru wody dla ekip",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: ["16. Zabezpieczenie instalacji wod-kan głównej"]
  },
  {
    name: "24. Przygotowanie punktu prądu dla ekip",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: ["15. Zabezpieczenie instalacji elektrycznej głównej"]
  },
  {
    name: "25. Oznaczenie miejsc montażu kontenerów transportowych",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: ["14. Organizacja kontenera na gruz"]
  },
  {
    name: "26. Zabezpieczenie rur i przewodów po remoncie",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "27. Oznakowanie niebezpiecznych miejsc po remoncie",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "28. Zabezpieczenie mebli do transportu",
    rhPerUnit: 0.2,
    phase: "preparation",
    prerequisites: ["9. Przesunięcie mebli na czas remontu"]
  },
  {
    name: "29. Zakładanie mat ochronnych",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: ["3. Ochrona podłóg folią ochronną"]
  },
  {
    name: "30. Montaż barier ochronnych dla dzieci/zwierząt",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "31. Zabezpieczenie roślin",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "32. Przygotowanie narzędzi dla złotej rączki",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "33. Przygotowanie materiałów malarskich",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "34. Przygotowanie chemii do sprzątania",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },
  {
    name: "35. Przygotowanie środków ochrony osobistej",
    rhPerUnit: 0.1,
    phase: "preparation",
    prerequisites: []
  },

  // ==========================================
  // FAZA 2: Demontaż i Rozbiórka
  // ==========================================
  {
    name: "36. Zrywanie tapet",
    rhPerUnit: 0.35,
    phase: "demolition",
    prerequisites: ["3. Ochrona podłóg folią ochronną", "8. Zabezpieczenie mebli w pomieszczeniu"]
  },
  {
    name: "37. Zrywanie paneli podłogowych",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["14. Organizacja kontenera na gruz"]
  },
  {
    name: "38. Usunięcie starego parkietu",
    rhPerUnit: 0.65,
    phase: "demolition",
    prerequisites: ["14. Organizacja kontenera na gruz"]
  },
  {
    name: "39. Demontaż starych drzwi wewnętrznych",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: []
  },
  {
    name: "40. Demontaż drzwi zewnętrznych",
    rhPerUnit: 0.6,
    phase: "demolition",
    prerequisites: ["10. Oznakowanie stref niebezpiecznych"]
  },
  {
    name: "41. Demontaż parapetów wewnętrznych",
    rhPerUnit: 0.35,
    phase: "demolition",
    prerequisites: ["6. Zabezpieczenie grzejników folią"]
  },
  {
    name: "42. Demontaż parapetów zewnętrznych",
    rhPerUnit: 0.45,
    phase: "demolition",
    prerequisites: []
  },
  {
    name: "43. Demontaż grzejników",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["17. Zabezpieczenie systemu CO"]
  },
  {
    name: "44. Demontaż bojlera/ogrzewacza",
    rhPerUnit: 0.65,
    phase: "demolition",
    prerequisites: ["16. Zabezpieczenie instalacji wod-kan głównej"]
  },
  {
    name: "45. Demontaż wanny",
    rhPerUnit: 0.7,
    phase: "demolition",
    prerequisites: ["16. Zabezpieczenie instalacji wod-kan głównej"]
  },
  {
    name: "46. Demontaż brodzika prysznicowego",
    rhPerUnit: 0.6,
    phase: "demolition",
    prerequisites: ["16. Zabezpieczenie instalacji wod-kan głównej"]
  },
  {
    name: "47. Demontaż kabiny prysznicowej",
    rhPerUnit: 0.6,
    phase: "demolition",
    prerequisites: ["46. Demontaż brodzika prysznicowego"]
  },
  {
    name: "48. Demontaż umywalki",
    rhPerUnit: 0.45,
    phase: "demolition",
    prerequisites: ["16. Zabezpieczenie instalacji wod-kan głównej"]
  },
  {
    name: "49. Demontaż WC kompakt",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["16. Zabezpieczenie instalacji wod-kan głównej"]
  },
  {
    name: "50. Demontaż stelaża WC podtynkowego",
    rhPerUnit: 0.6,
    phase: "demolition",
    prerequisites: ["49. Demontaż WC kompakt"]
  },
  {
    name: "51. Demontaż szafek kuchennych",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["28. Zabezpieczenie mebli do transportu"]
  },
  {
    name: "52. Demontaż mebli w pokojach",
    rhPerUnit: 0.45,
    phase: "demolition",
    prerequisites: ["28. Zabezpieczenie mebli do transportu"]
  },
  {
    name: "53. Wyburzenie ścianek działowych",
    rhPerUnit: 1.1,
    phase: "demolition",
    prerequisites: ["15. Zabezpieczenie instalacji elektrycznej głównej", "14. Organizacja kontenera na gruz"]
  },
  {
    name: "54. Skuwanie tynków",
    rhPerUnit: 0.65,
    phase: "demolition",
    prerequisites: ["7. Zabezpieczenie okien folią lub kartonem"]
  },
  {
    name: "55. Usunięcie starej glazury/terakoty",
    rhPerUnit: 0.75,
    phase: "demolition",
    prerequisites: ["14. Organizacja kontenera na gruz"]
  },
  {
    name: "56. Usunięcie starej fugi",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["55. Usunięcie starej glazury/terakoty"]
  },
  {
    name: "57. Wyburzenie otworów drzwiowych",
    rhPerUnit: 1.0,
    phase: "demolition",
    prerequisites: ["65. Demontaż ościeżnic drzwiowych"]
  },
  {
    name: "58. Usunięcie starych instalacji elektrycznych",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["15. Zabezpieczenie instalacji elektrycznej głównej"]
  },
  {
    name: "59. Usunięcie starych instalacji wod-kan",
    rhPerUnit: 0.6,
    phase: "demolition",
    prerequisites: ["16. Zabezpieczenie instalacji wod-kan głównej"]
  },
  {
    name: "60. Demontaż sufitu podwieszanego",
    rhPerUnit: 0.65,
    phase: "demolition",
    prerequisites: ["62. Usunięcie starych halogenów/lamp"]
  },
  {
    name: "61. Demontaż listew przysufitowych/sztukaterii",
    rhPerUnit: 0.45,
    phase: "demolition",
    prerequisites: []
  },
  {
    name: "62. Usunięcie starych halogenów/lamp",
    rhPerUnit: 0.35,
    phase: "demolition",
    prerequisites: ["15. Zabezpieczenie instalacji elektrycznej głównej"]
  },
  {
    name: "63. Zrywanie wykładzin PCV/dywanów",
    rhPerUnit: 0.65,
    phase: "demolition",
    prerequisites: []
  },
  {
    name: "64. Usunięcie pozostałości po klejach i zaprawach",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["38. Usunięcie starego parkietu"]
  },
  {
    name: "65. Demontaż ościeżnic drzwiowych",
    rhPerUnit: 0.45,
    phase: "demolition",
    prerequisites: ["39. Demontaż starych drzwi wewnętrznych"]
  },
  {
    name: "66. Demontaż rur grzewczych",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["43. Demontaż grzejników"]
  },
  {
    name: "67. Demontaż rur kanalizacyjnych",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["59. Usunięcie starych instalacji wod-kan"]
  },
  {
    name: "68. Demontaż osprzętu elektrycznego",
    rhPerUnit: 0.35,
    phase: "demolition",
    prerequisites: ["15. Zabezpieczenie instalacji elektrycznej głównej"]
  },
  {
    name: "69. Zrywanie starej tapety (Powt.)",
    rhPerUnit: 0.35,
    phase: "painting",
    prerequisites: ["36. Zrywanie tapet"]
  },
  {
    name: "70. Wyburzenie ścianka działowej (Element konstr.)",
    rhPerUnit: 1.0,
    phase: "carpentry",
    prerequisites: ["53. Wyburzenie ścianek działowych"]
  },
  {
    name: "71. Skuwanie starych tynków",
    rhPerUnit: 0.5,
    phase: "tiles",
    prerequisites: ["54. Skuwanie tynków"]
  },
  {
    name: "72. Demontaż starej glazury/terakoty",
    rhPerUnit: 0.6,
    phase: "tiles",
    prerequisites: ["55. Usunięcie starej glazury/terakoty"]
  },
  {
    name: "73. Usunięcie starej fugi i położenie nowej (Etap dem.)",
    rhPerUnit: 0.6,
    phase: "tiles",
    prerequisites: ["56. Usunięcie starej fugi"]
  },
  {
    name: "74. Demontaż okien",
    rhPerUnit: 1.0,
    phase: "carpentry",
    prerequisites: ["7. Zabezpieczenie okien folią lub kartonem"]
  },
  {
    name: "75. Demontaż gazowego pieca c.o.",
    rhPerUnit: 1.3,
    phase: "heating",
    prerequisites: ["17. Zabezpieczenie systemu CO"]
  },
  {
    name: "76. Wykonanie otworu drzwiowego w ściance g-k",
    rhPerUnit: 1.2,
    phase: "masonry",
    prerequisites: ["60. Demontaż sufitu podwieszanego"]
  },
  {
    name: "77. Wykonanie otworu drzwiowego w ścianie murowanej",
    rhPerUnit: 3.0,
    phase: "masonry",
    prerequisites: ["100. Wykonanie nadproży"]
  },

  // ==========================================
  // FAZA 3: Transport i Logistyka Odpadów
  // ==========================================
  {
    name: "78. Wywóz gruzu do kontenera",
    rhPerUnit: 0.8,
    phase: "demolition",
    prerequisites: ["53. Wyburzenie ścianek działowych", "14. Organizacja kontenera na gruz"]
  },
  {
    name: "79. Czyszczenie powierzchni po rozbiórce",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["78. Wywóz gruzu do kontenera"]
  },
  {
    name: "80. Utylizacja gruzu/odpadów (worki)",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["79. Czyszczenie powierzchni po rozbiórce"]
  },
  {
    name: "81. Wywóz odpadów do kontenera",
    rhPerUnit: 0.3,
    phase: "cleaning",
    prerequisites: ["80. Utylizacja gruzu/odpadów (worki)"]
  },
  {
    name: "82. Wywóz resztek materiałów",
    rhPerUnit: 0.3,
    phase: "cleaning",
    prerequisites: ["11. Wstępne sprzątanie pomieszczeń"]
  },
  {
    name: "83. Utylizacja gruzu/odpadów (worki)",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["81. Wywóz odpadów do kontenera"]
  },
  {
    name: "84. Wywóz gruzu z mieszkania",
    rhPerUnit: 0.8,
    phase: "transport",
    prerequisites: ["78. Wywóz gruzu do kontenera"]
  },
  {
    name: "85. Wywóz odpadów biodegradowalnych",
    rhPerUnit: 0.5,
    phase: "transport",
    prerequisites: ["31. Zabezpieczenie roślin"]
  },
  {
    name: "86. Wywóz opakowań i folii",
    rhPerUnit: 0.35,
    phase: "transport",
    prerequisites: ["11. Wstępne sprzątanie pomieszczeń"]
  },
  {
    name: "87. Wynajem kontenera na gruz",
    rhPerUnit: 0.1,
    phase: "transport",
    prerequisites: ["14. Organizacja kontenera na gruz"]
  },
  {
    name: "88. Załadunek gruzu do kontenera",
    rhPerUnit: 0.5,
    phase: "transport",
    prerequisites: ["84. Wywóz gruzu z mieszkania"]
  },
  {
    name: "89. Rozładunek kontenera po remoncie (Etap log.)",
    rhPerUnit: 0.35,
    phase: "transport",
    prerequisites: ["88. Załadunek gruzu do kontenera"]
  },
  {
    name: "90. Transport materiałów budowlanych na miejsce",
    rhPerUnit: 0.2,
    phase: "transport",
    prerequisites: []
  },
  {
    name: "91. Transport narzędzi",
    rhPerUnit: 0.1,
    phase: "transport",
    prerequisites: ["18. Przygotowanie narzędzi i materiałów na miejscu"]
  },
  {
    name: "92. Odbiór odpadów budowlanych",
    rhPerUnit: 0.3,
    phase: "cleaning",
    prerequisites: ["89. Rozładunek kontenera po remoncie (Etap log.)"]
  },
  {
    name: "93. Wywóz resztek materiałów (Ponownie)",
    rhPerUnit: 0.3,
    phase: "cleaning",
    prerequisites: ["92. Odbiór odpadów budowlanych"]
  },

  // ==========================================
  // FAZA 4: Roboty Murarskie i Konstrukcyjne
  // ==========================================
  {
    name: "94. Murowanie ścianek działowych",
    rhPerUnit: 1.0,
    phase: "masonry",
    prerequisites: ["79. Czyszczenie powierzchni po rozbiórce", "2. Wstępne pomiary pomieszczeń"]
  },
  {
    name: "95. Zamurowanie otworów drzwiowych",
    rhPerUnit: 0.9,
    phase: "masonry",
    prerequisites: ["65. Demontaż ościeżnic drzwiowych", "79. Czyszczenie powierzchni po rozbiórce"]
  },
  {
    name: "96. Wykonanie nowych otworów drzwiowych w ścianie g-k",
    rhPerUnit: 0.75,
    phase: "masonry",
    prerequisites: ["94. Murowanie ścianek działowych"]
  },
  {
    name: "97. Wykonanie nowych otworów drzwiowych w ścianie murowanej",
    rhPerUnit: 1.1,
    phase: "masonry",
    prerequisites: ["100. Wykonanie nadproży"]
  },
  {
    name: "98. Wykonanie obróbek glifów przy drzwiach",
    rhPerUnit: 0.65,
    phase: "masonry",
    prerequisites: ["95. Zamurowanie otworów drzwiowych"]
  },
  {
    name: "99. Naprawa ubytków w ścianach murowanych",
    rhPerUnit: 0.55,
    phase: "masonry",
    prerequisites: ["54. Skuwanie tynków"]
  },
  {
    name: "100. Wykonanie nadproży",
    rhPerUnit: 0.8,
    phase: "masonry",
    prerequisites: ["57. Wyburzenie otworów drzwiowych"]
  },
  {
    name: "101. Wyrównywanie ścian bloczkami",
    rhPerUnit: 0.9,
    phase: "masonry",
    prerequisites: ["94. Murowanie ścianek działowych"]
  },
  {
    name: "102. Naprawa narożników ścian",
    rhPerUnit: 0.45,
    phase: "masonry",
    prerequisites: ["79. Czyszczenie powierzchni po rozbiórce"]
  },
  {
    name: "103. Uszczelnienie ścian wewnętrznych",
    rhPerUnit: 0.5,
    phase: "masonry",
    prerequisites: ["94. Murowanie ścianek działowych"]
  },
  {
    name: "104. Murowanie kominów",
    rhPerUnit: 1.2,
    phase: "masonry",
    prerequisites: ["79. Czyszczenie powierzchni po rozbiórce"]
  },
  {
    name: "105. Wykonanie podmurówki pod ściany działowe",
    rhPerUnit: 0.9,
    phase: "masonry",
    prerequisites: ["79. Czyszczenie powierzchni po rozbiórce"]
  },
  {
    name: "106. Montaż kotew i wzmocnień ścian",
    rhPerUnit: 0.75,
    phase: "masonry",
    prerequisites: ["94. Murowanie ścianek działowych"]
  },
  {
    name: "107. Naprawa pęknięć ścian",
    rhPerUnit: 0.55,
    phase: "masonry",
    prerequisites: ["54. Skuwanie tynków"]
  },
  {
    name: "108. Wyrównanie podłoża pod tynki",
    rhPerUnit: 0.65,
    phase: "masonry",
    prerequisites: ["99. Naprawa ubytków w ścianach murowanych"]
  },
  {
    name: "109. Murowanie ścianki działowej",
    rhPerUnit: 1.0,
    phase: "carpentry",
    prerequisites: ["79. Czyszczenie powierzchni po rozbiórce"]
  },
  {
    name: "110. Zamurowanie otworu drzwiowego",
    rhPerUnit: 1.5,
    phase: "masonry",
    prerequisites: ["65. Demontaż ościeżnic drzwiowych"]
  },
  {
    name: "111. Dwustronne obrobienie glifów przy drzwiach",
    rhPerUnit: 0.8,
    phase: "masonry",
    prerequisites: ["110. Zamurowanie otworu drzwiowego"]
  },
  {
    name: "112. Naprawa drobnych pęknięć w ścianach",
    rhPerUnit: 0.25,
    phase: "handyman",
    prerequisites: []
  },
  {
    name: "113. Naprawa pęknięć ścian (Powtórzenie)",
    rhPerUnit: 0.55,
    phase: "masonry",
    prerequisites: ["107. Naprawa pęknięć ścian"]
  },

  // ==========================================
  // FAZA 5: Instalacje Podtynkowe
  // ==========================================
  {
    name: "114. Wykonanie bruzd pod instalacje elektryczne",
    rhPerUnit: 0.4,
    phase: "electrical",
    prerequisites: ["94. Murowanie ścianek działowych", "101. Wyrównywanie ścian bloczkami"]
  },
  {
    name: "115. Wykonanie bruzd pod instalację elektryczną",
    rhPerUnit: 0.4,
    phase: "electrical",
    prerequisites: ["94. Murowanie ścianek działowych"]
  },
  {
    name: "116. Montaż przewodów elektrycznych w ścianach",
    rhPerUnit: 0.6,
    phase: "electrical",
    prerequisites: ["114. Wykonanie bruzd pod instalacje elektryczne"]
  },
  {
    name: "117. Montaż przewodów podtynkowych",
    rhPerUnit: 0.5,
    phase: "electrical",
    prerequisites: ["115. Wykonanie bruzd pod instalację elektryczną"]
  },
  {
    name: "118. Montaż puszek podtynkowych",
    rhPerUnit: 0.1,
    phase: "electrical",
    prerequisites: ["114. Wykonanie bruzd pod instalacje elektryczne"]
  },
  {
    name: "119. Montaż przewodów do TV/internetu",
    rhPerUnit: 0.35,
    phase: "electrical",
    prerequisites: ["114. Wykonanie bruzd pod instalacje elektryczne"]
  },
  {
    name: "120. Montaż kanałów TV/kablowych",
    rhPerUnit: 0.35,
    phase: "electrical",
    prerequisites: ["114. Wykonanie bruzd pod instalacje elektryczne"]
  },
  {
    name: "121. Wykonanie punktu gniazda siłowego",
    rhPerUnit: 0.25,
    phase: "electrical",
    prerequisites: ["116. Montaż przewodów elektrycznych w ścianach"]
  },
  {
    name: "122. Wykonanie kanału telewizyjnego pod kable",
    rhPerUnit: 2.1,
    phase: "electrical",
    prerequisites: ["114. Wykonanie bruzd pod instalacje elektryczne"]
  },
  {
    name: "123. Wykonanie punktu gniazda siłowego",
    rhPerUnit: 1.2,
    phase: "electrical",
    prerequisites: ["116. Montaż przewodów elektrycznych w ścianach"]
  },
  {
    name: "124. Montaż przewodów pod system alarmowy",
    rhPerUnit: 0.45,
    phase: "electrical",
    prerequisites: ["114. Wykonanie bruzd pod instalacje elektryczne"]
  },
  {
    name: "125. Montaż przewodów pod wideodomofon",
    rhPerUnit: 0.45,
    phase: "electrical",
    prerequisites: ["114. Wykonanie bruzd pod instalacje elektryczne"]
  },
  {
    name: "126. Montaż przewodów pod czujniki ruchu",
    rhPerUnit: 0.35,
    phase: "electrical",
    prerequisites: ["114. Wykonanie bruzd pod instalacje elektryczne"]
  },
  {
    name: "127. Montaż rur miedzianych do klimatyzacji",
    rhPerUnit: 0.4,
    phase: "heating",
    prerequisites: ["114. Wykonanie bruzd pod instalacje elektryczne"]
  },
  {
    name: "128. Montaż nowych rur wod-kan",
    rhPerUnit: 0.9,
    phase: "plumbing",
    prerequisites: ["59. Usunięcie starych instalacji wod-kan", "94. Murowanie ścianek działowych"]
  },
  {
    name: "129. Wymiana pionów wodnych",
    rhPerUnit: 1.1,
    phase: "plumbing",
    prerequisites: ["59. Usunięcie starych instalacji wod-kan"]
  },
  {
    name: "130. Montaż stelaża WC podtynkowego",
    rhPerUnit: 0.6,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "131. Montaż stelaża WC podtynkowego (Powtórzenie)",
    rhPerUnit: 0.6,
    phase: "bathroom",
    prerequisites: ["130. Montaż stelaża WC podtynkowego"]
  },
  {
    name: "132. Montaż stelaża WC podtynkowego Geberit",
    rhPerUnit: 1.8,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan", "94. Murowanie ścianek działowych"]
  },
  {
    name: "133. Przesunięcie podejść wod-kan",
    rhPerUnit: 0.55,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "134. Przesunięcie przyłącza wod-kan",
    rhPerUnit: 2.5,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "135. Nowe podejścia wod-kan (umywalka/pralka)",
    rhPerUnit: 2.0,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "136. Montaż odpływów liniowych",
    rhPerUnit: 0.25,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "137. Montaż odpływów punktowych",
    rhPerUnit: 0.25,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "138. Montaż kratki ściekowej",
    rhPerUnit: 0.25,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "139. Montaż kratki ściekowej",
    rhPerUnit: 0.55,
    phase: "plumbing",
    prerequisites: ["138. Montaż kratki ściekowej"]
  },
  {
    name: "140. Montaż zaworów kulowych i trójników",
    rhPerUnit: 0.2,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "141. Montaż filtrów wody",
    rhPerUnit: 0.2,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "142. Montaż rur miedzianych do klimatyzacji",
    rhPerUnit: 0.4,
    phase: "heating",
    prerequisites: ["127. Montaż rur miedzianych do klimatyzacji"]
  },
  {
    name: "143. Montaż rur grzewczych (Etap inst.)",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["43. Demontaż grzejników"]
  },
  {
    name: "144. Montaż rur kanalizacyjnych (Etap inst.)",
    rhPerUnit: 0.5,
    phase: "demolition",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "145. Przesunięcie przyłącza do grzejnika",
    rhPerUnit: 0.55,
    phase: "heating",
    prerequisites: ["143. Montaż rur grzewczych (Etap inst.)"]
  },
  {
    name: "146. Przesunięcie przyłącza do grzejnika",
    rhPerUnit: 1.9,
    phase: "heating",
    prerequisites: ["145. Przesunięcie przyłącza do grzejnika"]
  },
  {
    name: "147. Montaż wężownic grzewczych w podłodze",
    rhPerUnit: 0.55,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "148. Montaż ogrzewania podłogowego",
    rhPerUnit: 0.85,
    phase: "heating",
    prerequisites: ["147. Montaż wężownic grzewczych w podłodze"]
  },
  {
    name: "149. Montaż ogrzewania podłogowego w łazience",
    rhPerUnit: 0.85,
    phase: "bathroom",
    prerequisites: ["147. Montaż wężownic grzewczych w podłodze"]
  },
  {
    name: "150. Nowa kompleksowa instalacja hydrauliczna łazienki (12.0 BUFOR KRYTYCZNY)",
    rhPerUnit: 12.0,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan", "135. Nowe podejścia wod-kan (umywalka/pralka)"]
  },
  {
    name: "151. Test szczelności instalacji",
    rhPerUnit: 0.5,
    phase: "plumbing",
    prerequisites: ["150. Nowa kompleksowa instalacja hydrauliczna łazienki (12.0 BUFOR KRYTYCZNY)"]
  },
  {
    name: "152. Uszczelnianie przyłączy",
    rhPerUnit: 0.3,
    phase: "plumbing",
    prerequisites: ["151. Test szczelności instalacji"]
  },
  {
    name: "153. Test instalacji elektrycznej",
    rhPerUnit: 0.35,
    phase: "electrical",
    prerequisites: ["116. Montaż przewodów elektrycznych w ścianach", "118. Montaż puszek podtynkowych"]
  },

  // ==========================================
  // FAZA 6: Prace Mokre - Tynki i Wylewki
  // ==========================================
  {
    name: "154. Nakładanie tynku cementowo-wapiennego",
    rhPerUnit: 0.65,
    phase: "plaster",
    prerequisites: ["151. Test szczelności instalacji", "153. Test instalacji elektrycznej", "108. Wyrównanie podłoża pod tynki"]
  },
  {
    name: "155. Nakładanie tynku gipsowego",
    rhPerUnit: 0.55,
    phase: "plaster",
    prerequisites: ["151. Test szczelności instalacji", "153. Test instalacji elektrycznej"]
  },
  {
    name: "156. Wyrównywanie ścian tynkiem gipsowym",
    rhPerUnit: 0.55,
    phase: "plaster",
    prerequisites: ["155. Nakładanie tynku gipsowego"]
  },
  {
    name: "157. Wyrównywanie ścian tynkiem cem-wap",
    rhPerUnit: 0.65,
    phase: "plaster",
    prerequisites: ["154. Nakładanie tynku cementowo-wapiennego"]
  },
  {
    name: "158. Szpachlowanie ścian",
    rhPerUnit: 0.4,
    phase: "plaster",
    prerequisites: ["156. Wyrównywanie ścian tynkiem gipsowym"]
  },
  {
    name: "159. Szpachlowanie sufitów",
    rhPerUnit: 0.4,
    phase: "plaster",
    prerequisites: ["156. Wyrównywanie ścian tynkiem gipsowym"]
  },
  {
    name: "160. Wyrównywanie ścian",
    rhPerUnit: 0.45,
    phase: "plaster",
    prerequisites: ["157. Wyrównywanie ścian tynkiem cem-wap"]
  },
  {
    name: "161. Wyrównywanie sufitów",
    rhPerUnit: 0.45,
    phase: "plaster",
    prerequisites: ["157. Wyrównywanie ścian tynkiem cem-wap"]
  },
  {
    name: "162. Wyrównanie ubytków po rozbiórce",
    rhPerUnit: 0.45,
    phase: "plaster",
    prerequisites: ["79. Czyszczenie powierzchni po rozbiórce"]
  },
  {
    name: "163. Wypełnianie szczelin dylatacyjnych",
    rhPerUnit: 0.25,
    phase: "plaster",
    prerequisites: ["154. Nakładanie tynku cementowo-wapiennego"]
  },
  {
    name: "164. Obróbka otworów drzwiowych (tynk)",
    rhPerUnit: 0.65,
    phase: "carpentry",
    prerequisites: ["154. Nakładanie tynku cementowo-wapiennego"]
  },
  {
    name: "165. Wylewka samopoziomująca",
    rhPerUnit: 0.6,
    phase: "flooring",
    prerequisites: ["172. Naprawa ubytków podłogowych", "173. Usuwanie nierówności podłóg", "11. Wstępne sprzątanie pomieszczeń"]
  },
  {
    name: "166. Wylewka pod panele/parkiet",
    rhPerUnit: 0.65,
    phase: "flooring",
    prerequisites: ["165. Wylewka samopoziomująca"]
  },
  {
    name: "167. Wylewka samopoziomująca na podłodze",
    rhPerUnit: 0.6,
    phase: "flooring",
    prerequisites: ["165. Wylewka samopoziomująca"]
  },
  {
    name: "168. Wylewki na trudnych podłożach",
    rhPerUnit: 0.75,
    phase: "flooring",
    prerequisites: ["165. Wylewka samopoziomująca"]
  },
  {
    name: "169. Wyrównanie podłoża pod panele",
    rhPerUnit: 0.5,
    phase: "flooring",
    prerequisites: ["165. Wylewka samopoziomująca"]
  },
  {
    name: "170. Wyrównanie podłoża pod parkiet",
    rhPerUnit: 0.55,
    phase: "flooring",
    prerequisites: ["165. Wylewka samopoziomująca"]
  },
  {
    name: "171. Wyrównanie podłoża pod tynki",
    rhPerUnit: 0.65,
    phase: "masonry",
    prerequisites: ["79. Czyszczenie powierzchni po rozbiórce"]
  },
  {
    name: "172. Naprawa ubytków podłogowych",
    rhPerUnit: 0.4,
    phase: "flooring",
    prerequisites: ["64. Usunięcie pozostałości po klejach i zaprawach"]
  },
  {
    name: "173. Usuwanie nierówności podłóg",
    rhPerUnit: 0.4,
    phase: "flooring",
    prerequisites: ["64. Usunięcie pozostałości po klejach i zaprawach"]
  },

  // ==========================================
  // FAZA 7: Zabudowy Lekkie G-K i Gładzie
  // ==========================================
  {
    name: "174. Montaż sufitu podwieszanego prostego",
    rhPerUnit: 0.75,
    phase: "ceiling",
    prerequisites: ["153. Test instalacji elektrycznej", "181. Wyrównanie powierzchni pod sufit"]
  },
  {
    name: "175. Montaż sufitu podwieszanego prostego",
    rhPerUnit: 0.75,
    phase: "electrical",
    prerequisites: ["174. Montaż sufitu podwieszanego prostego"]
  },
  {
    name: "176. Montaż sufitu wielopoziomowego",
    rhPerUnit: 1.1,
    phase: "ceiling",
    prerequisites: ["153. Test instalacji elektrycznej", "181. Wyrównanie powierzchni pod sufit"]
  },
  {
    name: "177. Montaż sufitu wielopoziomowego",
    rhPerUnit: 1.1,
    phase: "electrical",
    prerequisites: ["176. Montaż sufitu wielopoziomowego"]
  },
  {
    name: "178. Podcięcie zabudowy przy suficie g-k",
    rhPerUnit: 0.65,
    phase: "ceiling",
    prerequisites: ["174. Montaż sufitu podwieszanego prostego"]
  },
  {
    name: "179. Podcięcie zabudowy przy suficie g-k",
    rhPerUnit: 0.65,
    phase: "electrical",
    prerequisites: ["178. Podcięcie zabudowy przy suficie g-k"]
  },
  {
    name: "180. Szpachlowanie styków płyt g-k",
    rhPerUnit: 0.4,
    phase: "ceiling",
    prerequisites: ["174. Montaż sufitu podwieszanego prostego"]
  },
  {
    name: "181. Wyrównanie powierzchni pod sufit",
    rhPerUnit: 0.5,
    phase: "ceiling",
    prerequisites: ["161. Wyrównywanie sufitów"]
  },
  {
    name: "182. Wyszpachlowanie siatki zbrojącej",
    rhPerUnit: 0.4,
    phase: "plaster",
    prerequisites: ["154. Nakładanie tynku cementowo-wapiennego"]
  },
  {
    name: "183. Wyszpachlowanie siatki na pęknięciach",
    rhPerUnit: 0.4,
    phase: "plaster",
    prerequisites: ["182. Wyszpachlowanie siatki zbrojącej"]
  },
  {
    name: "184. Szpachlowanie narożników",
    rhPerUnit: 0.35,
    phase: "plaster",
    prerequisites: ["154. Nakładanie tynku cementowo-wapiennego"]
  },
  {
    name: "185. Nakładanie gładzi gipsowej na ściany",
    rhPerUnit: 0.55,
    phase: "plaster",
    prerequisites: ["154. Nakładanie tynku cementowo-wapiennego", "184. Szpachlowanie narożników"]
  },
  {
    name: "186. Nakładanie gładzi gipsowej na sufity",
    rhPerUnit: 0.55,
    phase: "plaster",
    prerequisites: ["181. Wyrównanie powierzchni pod sufit", "184. Szpachlowanie narożników"]
  },
  {
    name: "187. Gładź gipsowa na ścianach",
    rhPerUnit: 0.5,
    phase: "plaster",
    prerequisites: ["185. Nakładanie gładzi gipsowej na ściany"]
  },
  {
    name: "188. Gładź gipsowa na sufitach",
    rhPerUnit: 0.55,
    phase: "plaster",
    prerequisites: ["186. Nakładanie gładzi gipsowej na sufity"]
  },
  {
    name: "189. Szlifowanie gładzi",
    rhPerUnit: 0.35,
    phase: "plaster",
    prerequisites: ["187. Gładź gipsowa na ścianach", "188. Gładź gipsowa na sufitach"]
  },
  {
    name: "190. Docieplanie ścian wewnętrznych",
    rhPerUnit: 0.45,
    phase: "plaster",
    prerequisites: ["154. Nakładanie tynku cementowo-wapiennego"]
  },
  {
    name: "191. Montaż paneli sufitowych",
    rhPerUnit: 0.55,
    phase: "ceiling",
    prerequisites: ["174. Montaż sufitu podwieszanego prostego"]
  },
  {
    name: "192. Drobne naprawy sufitów",
    rhPerUnit: 0.2,
    phase: "handyman",
    prerequisites: []
  },
  {
    name: "193. Drobne naprawy ścian i tynków",
    rhPerUnit: 0.2,
    phase: "handyman",
    prerequisites: []
  },

  // ==========================================
  // FAZA 8: Glazura i Wykończenie Łazienki/Kuchni
  // ==========================================
  {
    name: "194. Przygotowanie podłoża pod płytki",
    rhPerUnit: 0.5,
    phase: "flooring",
    prerequisites: ["165. Wylewka samopoziomująca"]
  },
  {
    name: "195. Wyrównanie podłoża pod płytki",
    rhPerUnit: 0.45,
    phase: "tiles",
    prerequisites: ["194. Przygotowanie podłoża pod płytki"]
  },
  {
    name: "196. Hydrofobizacja (Bezpieczeństwo)",
    rhPerUnit: 0.25,
    phase: "plumbing",
    prerequisites: ["154. Nakładanie tynku cementowo-wapiennego", "195. Wyrównanie podłoża pod płytki"]
  },
  {
    name: "197. Układanie płytek ściennych",
    rhPerUnit: 0.85,
    phase: "tiles",
    prerequisites: ["196. Hydrofobizacja (Bezpieczeństwo)"]
  },
  {
    name: "198. Układanie płytek podłogowych",
    rhPerUnit: 0.85,
    phase: "tiles",
    prerequisites: ["196. Hydrofobizacja (Bezpieczeństwo)", "195. Wyrównanie podłoża pod płytki"]
  },
  {
    name: "199. Układanie płytek ściennych łazienka",
    rhPerUnit: 0.85,
    phase: "tiles",
    prerequisites: ["196. Hydrofobizacja (Bezpieczeństwo)"]
  },
  {
    name: "200. Układanie płytek podłogowych łazienka",
    rhPerUnit: 0.85,
    phase: "tiles",
    prerequisites: ["196. Hydrofobizacja (Bezpieczeństwo)"]
  },
  {
    name: "201. Układanie płytek kuchnia nad blatem",
    rhPerUnit: 0.8,
    phase: "tiles",
    prerequisites: ["196. Hydrofobizacja (Bezpieczeństwo)"]
  },
  {
    name: "202. Układanie płytek kuchnia nad blatem",
    rhPerUnit: 0.8,
    phase: "tiles",
    prerequisites: ["201. Układanie płytek kuchnia nad blatem"]
  },
  {
    name: "203. Przycięcie płytek",
    rhPerUnit: 0.3,
    phase: "tiles",
    prerequisites: ["195. Wyrównanie podłoża pod płytki"]
  },
  {
    name: "204. Optykowanie zabudowy geberitu",
    rhPerUnit: 2.1,
    phase: "tiles",
    prerequisites: ["132. Montaż stelaża WC podtynkowego Geberit", "196. Hydrofobizacja (Bezpieczeństwo)"]
  },
  {
    name: "205. Opłytkowanie zabudowy geberitu",
    rhPerUnit: 2.1,
    phase: "tiles",
    prerequisites: ["132. Montaż stelaża WC podtynkowego Geberit", "196. Hydrofobizacja (Bezpieczeństwo)"]
  },
  {
    name: "206. Montaż cokołów gotowych",
    rhPerUnit: 0.4,
    phase: "tiles",
    prerequisites: ["198. Układanie płytek podłogowych"]
  },
  {
    name: "207. Montaż cokołów gotowych (glazura/ter.)",
    rhPerUnit: 0.4,
    phase: "tiles",
    prerequisites: ["198. Układanie płytek podłogowych"]
  },
  {
    name: "208. Montaż listew przy płytkach",
    rhPerUnit: 0.2,
    phase: "tiles",
    prerequisites: ["197. Układanie płytek ściennych"]
  },
  {
    name: "209. Fugowanie nowych płytek",
    rhPerUnit: 0.35,
    phase: "tiles",
    prerequisites: ["197. Układanie płytek ściennych", "200. Układanie płytek podłogowych łazienka"]
  },
  {
    name: "210. Fugowanie nowych płytek (osobno)",
    rhPerUnit: 0.35,
    phase: "tiles",
    prerequisites: ["209. Fugowanie nowych płytek"]
  },
  {
    name: "211. Usunięcie starej fugi i położenie nowej",
    rhPerUnit: 0.55,
    phase: "tiles",
    prerequisites: ["56. Usunięcie starej fugi"]
  },
  {
    name: "212. Usunięcie starej fugi i położenie nowej",
    rhPerUnit: 0.55,
    phase: "tiles",
    prerequisites: ["211. Usunięcie starej fugi i położenie nowej"]
  },
  {
    name: "213. Montaż drzwiczek rewizyjnych",
    rhPerUnit: 0.65,
    phase: "tiles",
    prerequisites: ["199. Układanie płytek ściennych łazienka"]
  },
  {
    name: "214. Montaż drzwiczek rewizyjnych",
    rhPerUnit: 0.65,
    phase: "tiles",
    prerequisites: ["213. Montaż drzwiczek rewizyjnych"]
  },
  {
    name: "215. Czyszczenie fug i glazury (Etap glaz.)",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["209. Fugowanie nowych płytek"]
  },
  {
    name: "216. Montaż brodzika wpuszczanego w posadzkę",
    rhPerUnit: 0.45,
    phase: "tiles",
    prerequisites: ["136. Montaż odpływów liniowych", "196. Hydrofobizacja (Bezpieczeństwo)"]
  },

  // ==========================================
  // FAZA 9: Malowanie i Dekoracje Ścienne
  // ==========================================
  {
    name: "217. Gruntowanie ścian",
    rhPerUnit: 0.2,
    phase: "painting",
    prerequisites: ["189. Szlifowanie gładzi", "79. Czyszczenie powierzchni po rozbiórce"]
  },
  {
    name: "218. Gruntowanie sufitów",
    rhPerUnit: 0.2,
    phase: "painting",
    prerequisites: ["189. Szlifowanie gładzi"]
  },
  {
    name: "219. Gruntowanie ścian przed malowaniem",
    rhPerUnit: 0.2,
    phase: "painting",
    prerequisites: ["217. Gruntowanie ścian"]
  },
  {
    name: "220. Gruntowanie sufitów",
    rhPerUnit: 0.2,
    phase: "painting",
    prerequisites: ["218. Gruntowanie sufitów"]
  },
  {
    name: "221. Przygotowanie pod malowanie/tapetowanie",
    rhPerUnit: 0.3,
    phase: "plaster",
    prerequisites: ["189. Szlifowanie gładzi"]
  },
  {
    name: "222. Malowanie ścian farbą białą 1x",
    rhPerUnit: 0.25,
    phase: "painting",
    prerequisites: ["219. Gruntowanie ścian przed malowaniem"]
  },
  {
    name: "223. Malowanie ścian farbą białą 1x",
    rhPerUnit: 0.25,
    phase: "painting",
    prerequisites: ["222. Malowanie ścian farbą białą 1x"]
  },
  {
    name: "224. Malowanie sufitów farbą białą",
    rhPerUnit: 0.35,
    phase: "painting",
    prerequisites: ["220. Gruntowanie sufitów"]
  },
  {
    name: "225. Malowanie sufitów farbą białą",
    rhPerUnit: 0.35,
    phase: "painting",
    prerequisites: ["224. Malowanie sufitów farbą białą"]
  },
  {
    name: "226. Malowanie ścian farbą kolor 1x",
    rhPerUnit: 0.3,
    phase: "painting",
    prerequisites: ["222. Malowanie ścian farbą białą 1x"]
  },
  {
    name: "227. Malowanie ścian farbą kolor 1x",
    rhPerUnit: 0.3,
    phase: "painting",
    prerequisites: ["226. Malowanie ścian farbą kolor 1x"]
  },
  {
    name: "228. Malowanie ścian farbą białą 2x",
    rhPerUnit: 0.4,
    phase: "painting",
    prerequisites: ["222. Malowanie ścian farbą białą 1x"]
  },
  {
    name: "229. Malowanie ścian farbą białą 2x",
    rhPerUnit: 0.4,
    phase: "painting",
    prerequisites: ["228. Malowanie ścian farbą białą 2x"]
  },
  {
    name: "230. Malowanie ścian farbą kolor 2x",
    rhPerUnit: 0.4,
    phase: "painting",
    prerequisites: ["226. Malowanie ścian farbą kolor 1x"]
  },
  {
    name: "231. Tapetowanie (tapeta papierowa)",
    rhPerUnit: 0.55,
    phase: "painting",
    prerequisites: ["221. Przygotowanie pod malowanie/tapetowanie", "219. Gruntowanie ścian przed malowaniem"]
  },
  {
    name: "232. Tapetowanie (tapeta papierowa)",
    rhPerUnit: 0.55,
    phase: "painting",
    prerequisites: ["231. Tapetowanie (tapeta papierowa)"]
  },
  {
    name: "233. Tapetowanie (tapeta winylowa/fliz.)",
    rhPerUnit: 0.6,
    phase: "painting",
    prerequisites: ["221. Przygotowanie pod malowanie/tapetowanie", "219. Gruntowanie ścian przed malowaniem"]
  },
  {
    name: "234. Tapetowanie (tapeta winylowa/fliz.)",
    rhPerUnit: 0.6,
    phase: "painting",
    prerequisites: ["233. Tapetowanie (tapeta winylowa/fliz.)"]
  },
  {
    name: "235. Montaż tapet winylowych",
    rhPerUnit: 0.6,
    phase: "decor",
    prerequisites: ["233. Tapetowanie (tapeta winylowa/fliz.)"]
  },
  {
    name: "236. Montaż tapet papierowych",
    rhPerUnit: 0.55,
    phase: "decor",
    prerequisites: ["231. Tapetowanie (tapeta papierowa)"]
  },
  {
    name: "237. Nakładanie farb strukturalnych",
    rhPerUnit: 0.5,
    phase: "decor",
    prerequisites: ["219. Gruntowanie ścian przed malowaniem"]
  },
  {
    name: "238. Nakładanie tynku dekoracyjnego",
    rhPerUnit: 0.55,
    phase: "decor",
    prerequisites: ["219. Gruntowanie ścian przed malowaniem"]
  },
  {
    name: "239. Montaż paneli ściennych 3D",
    rhPerUnit: 0.65,
    phase: "decor",
    prerequisites: ["222. Malowanie ścian farbą białą 1x"]
  },
  {
    name: "240. Montaż paneli 3D ściennych",
    rhPerUnit: 0.65,
    phase: "decor",
    prerequisites: ["239. Montaż paneli ściennych 3D"]
  },
  {
    name: "241. Montaż paneli drewnianych (dekor.)",
    rhPerUnit: 0.55,
    phase: "decor",
    prerequisites: ["222. Malowanie ścian farbą białą 1x"]
  },
  {
    name: "242. Montaż paneli dekoracyjnych ściennych",
    rhPerUnit: 0.55,
    phase: "decor",
    prerequisites: ["241. Montaż paneli drewnianych (dekor.)"]
  },
  {
    name: "243. Malowanie dekoracyjne ścian",
    rhPerUnit: 0.5,
    phase: "decor",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "244. Malowanie pasów dekoracyjnych",
    rhPerUnit: 0.45,
    phase: "decor",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "245. Malowanie pasów dekor. na ścianach",
    rhPerUnit: 0.45,
    phase: "decor",
    prerequisites: ["244. Malowanie pasów dekoracyjnych"]
  },
  {
    name: "246. Malowanie dekoracyjne sufitów",
    rhPerUnit: 0.5,
    phase: "painting",
    prerequisites: ["225. Malowanie sufitów farbą białą"]
  },
  {
    name: "247. Malowanie sufitów dekoracyjnych",
    rhPerUnit: 0.45,
    phase: "decor",
    prerequisites: ["246. Malowanie dekoracyjne sufitów"]
  },
  {
    name: "248. Malowanie sufitów dekoracyjnych",
    rhPerUnit: 0.45,
    phase: "decor",
    prerequisites: ["247. Malowanie sufitów dekoracyjnych"]
  },
  {
    name: "249. Malowanie dekoracyjne (pasy, kontrasty)",
    rhPerUnit: 0.5,
    phase: "painting",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "250. Dekoracyjne gzymsy z gipsu",
    rhPerUnit: 0.5,
    phase: "plaster",
    prerequisites: ["186. Nakładanie gładzi gipsowej na sufity"]
  },
  {
    name: "251. Montaż sztukaterii (listwy, rozety)",
    rhPerUnit: 0.4,
    phase: "decor",
    prerequisites: ["225. Malowanie sufitów farbą białą"]
  },
  {
    name: "252. Montaż sztukaterii (listwy, rozety)",
    rhPerUnit: 0.4,
    phase: "ceiling",
    prerequisites: ["251. Montaż sztukaterii (listwy, rozety)"]
  },
  {
    name: "253. Montaż elementów dekoracyjnych",
    rhPerUnit: 0.35,
    phase: "ceiling",
    prerequisites: ["252. Montaż sztukaterii (listwy, rozety)"]
  },
  {
    name: "254. Montaż listew dekoracyjnych sufit.",
    rhPerUnit: 0.25,
    phase: "decor",
    prerequisites: ["251. Montaż sztukaterii (listwy, rozety)"]
  },
  {
    name: "255. Montaż rozet sufitowych",
    rhPerUnit: 0.25,
    phase: "decor",
    prerequisites: ["251. Montaż sztukaterii (listwy, rozety)"]
  },
  {
    name: "256. Montaż rozet sufitowych",
    rhPerUnit: 0.25,
    phase: "decor",
    prerequisites: ["255. Montaż rozet sufitowych"]
  },
  {
    name: "257. Montaż gzymsów",
    rhPerUnit: 0.25,
    phase: "decor",
    prerequisites: ["251. Montaż sztukaterii (listwy, rozety)"]
  },
  {
    name: "258. Montaż gzymsów",
    rhPerUnit: 0.25,
    phase: "decor",
    prerequisites: ["257. Montaż gzymsów"]
  },
  {
    name: "259. Malowanie elementów dekoracyjnych",
    rhPerUnit: 0.4,
    phase: "decor",
    prerequisites: ["253. Montaż elementów dekoracyjnych"]
  },
  {
    name: "260. Malowanie elementów dekoracyjnych",
    rhPerUnit: 0.4,
    phase: "painting",
    prerequisites: ["259. Malowanie elementów dekoracyjnych"]
  },
  {
    name: "261. Malowanie dekoracyjne paneli",
    rhPerUnit: 0.4,
    phase: "decor",
    prerequisites: ["240. Montaż paneli 3D ściennych"]
  },
  {
    name: "262. Malowanie dekoracyjne listew",
    rhPerUnit: 0.35,
    phase: "decor",
    prerequisites: ["254. Montaż listew dekoracyjnych sufit."]
  },
  {
    name: "263. Malowanie gzymsów",
    rhPerUnit: 0.4,
    phase: "decor",
    prerequisites: ["258. Montaż gzymsów"]
  },
  {
    name: "264. Malowanie listew dekoracyjnych",
    rhPerUnit: 0.35,
    phase: "decor",
    prerequisites: ["254. Montaż listew dekoracyjnych sufit."]
  },
  {
    name: "265. Malowanie listew dekoracyjnych",
    rhPerUnit: 0.35,
    phase: "decor",
    prerequisites: ["264. Malowanie listew dekoracyjnych"]
  },
  {
    name: "266. Szpachlowanie cześci sztukaterii",
    rhPerUnit: 0.35,
    phase: "decor",
    prerequisites: ["251. Montaż sztukaterii (listwy, rozety)"]
  },
  {
    name: "267. Szpachlowanie cześci paneli",
    rhPerUnit: 0.35,
    phase: "decor",
    prerequisites: ["239. Montaż paneli ściennych 3D"]
  },
  {
    name: "268. Malowanie korytarzy",
    rhPerUnit: 0.4,
    phase: "painting",
    prerequisites: ["228. Malowanie ścian farbą białą 2x"]
  },

  {
    name: "269. Montaż paneli podłogowych",
    rhPerUnit: 0.4,
    phase: "flooring",
    prerequisites: ["165. Wylewka samopoziomująca", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "270. Montaż paneli podłogowych",
    rhPerUnit: 0.4,
    phase: "flooring",
    prerequisites: ["269. Montaż paneli podłogowych"]
  },
  {
    name: "271. Montaż paneli winylowych LVT",
    rhPerUnit: 0.45,
    phase: "flooring",
    prerequisites: ["165. Wylewka samopoziomująca", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "272. Montaż paneli winylowych LVT",
    rhPerUnit: 0.5,
    phase: "flooring",
    prerequisites: ["271. Montaż paneli winylowych LVT"]
  },
  {
    name: "273. Montaż parkietu drewnianego",
    rhPerUnit: 0.65,
    phase: "flooring",
    prerequisites: ["166. Wylewka pod panele/parkiet", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "274. Montaż deski Barlineckiej",
    rhPerUnit: 0.5,
    phase: "flooring",
    prerequisites: ["166. Wylewka pod panele/parkiet", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "275. Montaż deski Barlineckiej",
    rhPerUnit: 0.45,
    phase: "flooring",
    prerequisites: ["274. Montaż deski Barlineckiej"]
  },
  {
    name: "276. Montaż podłogi drewnianej (parkiet)",
    rhPerUnit: 0.65,
    phase: "flooring",
    prerequisites: ["273. Montaż parkietu drewnianego"]
  },
  {
    name: "277. Montaż podłogi drewnianej (sypialnia)",
    rhPerUnit: 0.6,
    phase: "flooring",
    prerequisites: ["170. Wyrównanie podłoża pod parkiet", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "278. Montaż podłogi drewnianej (salon)",
    rhPerUnit: 0.65,
    phase: "flooring",
    prerequisites: ["170. Wyrównanie podłoża pod parkiet", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "279. Montaż podłogi w kuchni",
    rhPerUnit: 0.5,
    phase: "flooring",
    prerequisites: ["169. Wyrównanie podłoża pod panele", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "280. Montaż podłogi w łazience",
    rhPerUnit: 0.6,
    phase: "flooring",
    prerequisites: ["200. Układanie płytek podłogowych łazienka"]
  },
  {
    name: "281. Montaż podłogi w korytarzu",
    rhPerUnit: 0.5,
    phase: "flooring",
    prerequisites: ["169. Wyrównanie podłoża pod panele", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "282. Montaż podłogi na tarasie/balkonie",
    rhPerUnit: 0.6,
    phase: "flooring",
    prerequisites: ["168. Wylewki na trudnych podłożach"]
  },
  {
    name: "283. Cyklinowanie parkietu",
    rhPerUnit: 0.6,
    phase: "flooring",
    prerequisites: ["273. Montaż parkietu drewnianego"]
  },
  {
    name: "284. Cyklinowanie parkietu",
    rhPerUnit: 0.6,
    phase: "flooring",
    prerequisites: ["283. Cyklinowanie parkietu"]
  },
  {
    name: "285. Cyklinowanie + lakierowanie 3x",
    rhPerUnit: 0.85,
    phase: "flooring",
    prerequisites: ["283. Cyklinowanie parkietu"]
  },
  {
    name: "286. Cyklinowanie 3-krotne + lakierowanie",
    rhPerUnit: 0.85,
    phase: "flooring",
    prerequisites: ["285. Cyklinowanie + lakierowanie 3x"]
  },
  {
    name: "287. Cyklinowanie desek Barlineckich",
    rhPerUnit: 0.65,
    phase: "flooring",
    prerequisites: ["274. Montaż deski Barlineckiej"]
  },
  {
    name: "288. Montaż wykładziny PCV",
    rhPerUnit: 0.45,
    phase: "flooring",
    prerequisites: ["165. Wylewka samopoziomująca"]
  },
  {
    name: "289. Montaż dywanu w pomieszczeniu",
    rhPerUnit: 0.35,
    phase: "flooring",
    prerequisites: ["11. Wstępne sprzątanie pomieszczeń"]
  },
  {
    name: "290. Montaż schodów drewnianych",
    rhPerUnit: 0.75,
    phase: "flooring",
    prerequisites: ["154. Nakładanie tynku cementowo-wapiennego"]
  },
  {
    name: "291. Montaż schodów metalowych",
    rhPerUnit: 0.75,
    phase: "flooring",
    prerequisites: ["154. Nakładanie tynku cementowo-wapiennego"]
  },
  {
    name: "292. Montaż schodów metalowych (wewn.)",
    rhPerUnit: 0.6,
    phase: "flooring",
    prerequisites: ["291. Montaż schodów metalowych"]
  },
  {
    name: "293. Montaż schodów betonowych",
    rhPerUnit: 0.75,
    phase: "flooring",
    prerequisites: ["105. Wykonanie podmurówki pod ściany działowe"]
  },
  {
    name: "294. Szlifowanie schodów",
    rhPerUnit: 0.4,
    phase: "flooring",
    prerequisites: ["290. Montaż schodów drewnianych"]
  },
  {
    name: "295. Szlifowanie schodów drewnianych",
    rhPerUnit: 0.4,
    phase: "flooring",
    prerequisites: ["294. Szlifowanie schodów"]
  },
  {
    name: "296. Montaż podstopnic",
    rhPerUnit: 0.25,
    phase: "flooring",
    prerequisites: ["290. Montaż schodów drewnianych"]
  },
  {
    name: "297. Montaż poręczy i balustrad",
    rhPerUnit: 0.35,
    phase: "flooring",
    prerequisites: ["290. Montaż schodów drewnianych"]
  },
  {
    name: "298. Montaż poręczy przy schodach",
    rhPerUnit: 0.35,
    phase: "flooring",
    prerequisites: ["297. Montaż poręczy i balustrad"]
  },
  {
    name: "299. Montaż balustrad przy schodach",
    rhPerUnit: 0.4,
    phase: "flooring",
    prerequisites: ["297. Montaż poręczy i balustrad"]
  },
  {
    name: "300. Malowanie stopni schodów",
    rhPerUnit: 0.35,
    phase: "flooring",
    prerequisites: ["294. Szlifowanie schodów"]
  },
  {
    name: "301. Lakierowanie stopni",
    rhPerUnit: 0.4,
    phase: "flooring",
    prerequisites: ["294. Szlifowanie schodów"]
  },
  {
    name: "302. Montaż okien zespolonych",
    rhPerUnit: 1.1,
    phase: "carpentry",
    prerequisites: ["74. Demontaż okien", "77. Wykonanie otworu drzwiowego w ścianie murowanej"]
  },
  {
    name: "303. Montaż okien zespolonych",
    rhPerUnit: 1.1,
    phase: "carpentry",
    prerequisites: ["302. Montaż okien zespolonych"]
  },
  {
    name: "304. Montaż parapetów zewnętrznych",
    rhPerUnit: 0.5,
    phase: "carpentry",
    prerequisites: ["302. Montaż okien zespolonych"]
  },
  {
    name: "305. Montaż parapetów zewnętrznych",
    rhPerUnit: 0.5,
    phase: "carpentry",
    prerequisites: ["304. Montaż parapetów zewnętrznych"]
  },
  {
    name: "306. Naprawa ubytków podłogowych",
    rhPerUnit: 0.4,
    phase: "flooring",
    prerequisites: ["64. Usunięcie pozostałości po klejach i zaprawach"]
  },
  {
    name: "307. Naprawa uszkodzonych paneli",
    rhPerUnit: 0.35,
    phase: "flooring",
    prerequisites: ["269. Montaż paneli podłogowych"]
  },
  {
    name: "308. Naprawa ubytków w parkiecie",
    rhPerUnit: 0.4,
    phase: "flooring",
    prerequisites: ["283. Cyklinowanie parkietu"]
  },

  // ==========================================
  // FAZA 11: Stolarka Wewnętrzna i Montaż Drzwi
  // ==========================================
  {
    name: "309. Montaż drzwi wewnętrznych",
    rhPerUnit: 1.6,
    phase: "carpentry",
    prerequisites: ["269. Montaż paneli podłogowych", "230. Malowanie ścian farbą kolor 2x", "314. Montaż ościeżnicy nowej"]
  },
  {
    name: "310. Montaż drzwi wewnętrznych",
    rhPerUnit: 1.6,
    phase: "carpentry",
    prerequisites: ["309. Montaż drzwi wewnętrznych"]
  },
  {
    name: "311. Montaż drzwi zewnętrznych",
    rhPerUnit: 2.8,
    phase: "carpentry",
    prerequisites: ["40. Demontaż drzwi zewnętrznych", "77. Wykonanie otworu drzwiowego w ścianie murowanej"]
  },
  {
    name: "312. Montaż drzwi zewn. z demontażem",
    rhPerUnit: 2.8,
    phase: "carpentry",
    prerequisites: ["311. Montaż drzwi zewnętrznych"]
  },
  {
    name: "313. Demontaż ościeżnicy starej",
    rhPerUnit: 0.45,
    phase: "carpentry",
    prerequisites: ["39. Demontaż starych drzwi wewnętrznych"]
  },
  {
    name: "314. Montaż ościeżnicy nowej",
    rhPerUnit: 0.7,
    phase: "carpentry",
    prerequisites: ["313. Demontaż ościeżnicy starej", "164. Obróbka otworów drzwiowych (tynk)"]
  },
  {
    name: "315. Montaż parapetów wewnętrznych",
    rhPerUnit: 0.45,
    phase: "carpentry",
    prerequisites: ["302. Montaż okien zespolonych", "164. Obróbka otworów drzwiowych (tynk)"]
  },
  {
    name: "316. Montaż parapetów wewnętrznych",
    rhPerUnit: 0.45,
    phase: "carpentry",
    prerequisites: ["315. Montaż parapetów wewnętrznych"]
  },
  {
    name: "317. Podcinanie drzwi",
    rhPerUnit: 0.4,
    phase: "carpentry",
    prerequisites: ["309. Montaż drzwi wewnętrznych"]
  },
  {
    name: "318. Montaż futryny",
    rhPerUnit: 0.45,
    phase: "carpentry",
    prerequisites: ["314. Montaż ościeżnicy nowej"]
  },
  {
    name: "319. Regulacja drzwi",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["309. Montaż drzwi wewnętrznych"]
  },
  {
    name: "320. Uszczelnienie drzwi zewnętrznych",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["311. Montaż drzwi zewnętrznych"]
  },
  {
    name: "321. Montaż listew dekor. drzwiowych",
    rhPerUnit: 0.25,
    phase: "carpentry",
    prerequisites: ["309. Montaż drzwi wewnętrznych"]
  },
  {
    name: "322. Montaż klamek i akcesoriów",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["309. Montaż drzwi wewnętrznych"]
  },
  {
    name: "323. Wymiana klamek",
    rhPerUnit: 0.3,
    phase: "carpentry",
    prerequisites: ["322. Montaż klamek i akcesoriów"]
  },
  {
    name: "324. Wymiana klamek i szyldów okiennych",
    rhPerUnit: 0.3,
    phase: "carpentry",
    prerequisites: ["302. Montaż okien zespolonych"]
  },
  {
    name: "325. Malowanie drzwi",
    rhPerUnit: 1.1,
    phase: "painting",
    prerequisites: ["309. Montaż drzwi wewnętrznych", "219. Gruntowanie ścian przed malowaniem"]
  },
  {
    name: "326. Malowanie drzwi",
    rhPerUnit: 0.35,
    phase: "painting",
    prerequisites: ["325. Malowanie drzwi"]
  },
  {
    name: "327. Malowanie okien i framug",
    rhPerUnit: 0.35,
    phase: "painting",
    prerequisites: ["302. Montaż okien zespolonych"]
  },
  {
    name: "328. Malowanie futryn drzwiowych",
    rhPerUnit: 0.3,
    phase: "painting",
    prerequisites: ["318. Montaż futryny"]
  },
  {
    name: "329. Malowanie futryn drz.",
    rhPerUnit: 0.3,
    phase: "painting",
    prerequisites: ["328. Malowanie futryn drzwiowych"]
  },
  {
    name: "330. Malowanie ram okiennych",
    rhPerUnit: 0.3,
    phase: "painting",
    prerequisites: ["302. Montaż okien zespolonych"]
  },
  {
    name: "331. Montaż rolety/aluzji",
    rhPerUnit: 0.3,
    phase: "carpentry",
    prerequisites: ["302. Montaż okien zespolonych", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "332. Montaż moskitier",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["302. Montaż okien zespolonych"]
  },
  {
    name: "333. Montaż drzwi przesuwnych (garderoba)",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x", "269. Montaż paneli podłogowych"]
  },
  {
    name: "334. Montaż drzwi przesuwnych",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["333. Montaż drzwi przesuwnych (garderoba)"]
  },
  {
    name: "335. Montaż drzwi harmonijkowych",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["309. Montaż drzwi wewnętrznych"]
  },

  // ==========================================
  // FAZA 12: Biały Montaż i Uzbrojenie
  // ==========================================
  {
    name: "336. Podłączenie umywalki",
    rhPerUnit: 0.25,
    phase: "plumbing",
    prerequisites: ["337. Montaż umywalki"]
  },
  {
    name: "337. Montaż umywalki",
    rhPerUnit: 1.1,
    phase: "plumbing",
    prerequisites: ["209. Fugowanie nowych płytek", "135. Nowe podejścia wod-kan (umywalka/pralka)"]
  },
  {
    name: "338. Montaż umywalki",
    rhPerUnit: 0.25,
    phase: "bathroom",
    prerequisites: ["337. Montaż umywalki"]
  },
  {
    name: "339. Podłączenie WC kompakt",
    rhPerUnit: 0.35,
    phase: "plumbing",
    prerequisites: ["340. Montaż miski WC kompakt"]
  },
  {
    name: "340. Montaż miski WC kompakt",
    rhPerUnit: 1.2,
    phase: "plumbing",
    prerequisites: ["200. Układanie płytek podłogowych łazienka", "209. Fugowanie nowych płytek", "151. Test szczelności instalacji"]
  },
  {
    name: "341. Montaż WC",
    rhPerUnit: 0.35,
    phase: "bathroom",
    prerequisites: ["340. Montaż miski WC kompakt"]
  },
  {
    name: "342. Montaż WC podwieszanego Geberit",
    rhPerUnit: 1.8,
    phase: "plumbing",
    prerequisites: ["205. Opłytkowanie zabudowy geberitu", "209. Fugowanie nowych płytek"]
  },
  {
    name: "343. Montaż wanny",
    rhPerUnit: 0.55,
    phase: "plumbing",
    prerequisites: ["150. Nowa kompleksowa instalacja hydrauliczna łazienki (12.0 BUFOR KRYTYCZNY)"]
  },
  {
    name: "344. Montaż wanny",
    rhPerUnit: 2.7,
    phase: "plumbing",
    prerequisites: ["343. Montaż wanny"]
  },
  {
    name: "345. Montaż wanny",
    rhPerUnit: 2.7,
    phase: "tiles",
    prerequisites: ["344. Montaż wanny"]
  },
  {
    name: "346. Montaż wanny",
    rhPerUnit: 0.55,
    phase: "bathroom",
    prerequisites: ["345. Montaż wanny"]
  },
  {
    name: "347. Montaż brodzika prysznicowego",
    rhPerUnit: 0.5,
    phase: "plumbing",
    prerequisites: ["150. Nowa kompleksowa instalacja hydrauliczna łazienki (12.0 BUFOR KRYTYCZNY)"]
  },
  {
    name: "348. Montaż brodzika prysznicowego",
    rhPerUnit: 1.8,
    phase: "plumbing",
    prerequisites: ["347. Montaż brodzika prysznicowego"]
  },
  {
    name: "349. Montaż brodzika prysznicowego",
    rhPerUnit: 1.8,
    phase: "tiles",
    prerequisites: ["348. Montaż brodzika prysznicowego"]
  },
  {
    name: "350. Montaż brodzika prysznicowego",
    rhPerUnit: 0.5,
    phase: "bathroom",
    prerequisites: ["349. Montaż brodzika prysznicowego"]
  },
  {
    name: "351. Montaż kabiny prysznicowej",
    rhPerUnit: 0.5,
    phase: "plumbing",
    prerequisites: ["348. Montaż brodzika prysznicowego", "199. Układanie płytek ściennych łazienka"]
  },
  {
    name: "352. Montaż kabiny prysznicowej",
    rhPerUnit: 2.2,
    phase: "plumbing",
    prerequisites: ["351. Montaż kabiny prysznicowej"]
  },
  {
    name: "353. Montaż kabiny prysznicowej",
    rhPerUnit: 0.5,
    phase: "bathroom",
    prerequisites: ["352. Montaż kabiny prysznicowej"]
  },
  {
    name: "354. Uszczelnienie kabiny prysznicowej",
    rhPerUnit: 0.5,
    phase: "tiles",
    prerequisites: ["352. Montaż kabiny prysznicowej"]
  },
  {
    name: "355. Montaż baterii umywalkowej",
    rhPerUnit: 0.2,
    phase: "plumbing",
    prerequisites: ["337. Montaż umywalki"]
  },
  {
    name: "356. Montaż baterii umywalkowej",
    rhPerUnit: 0.6,
    phase: "plumbing",
    prerequisites: ["355. Montaż baterii umywalkowej"]
  },
  {
    name: "357. Montaż baterii umywalkowej",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["356. Montaż baterii umywalkowej"]
  },
  {
    name: "358. Montaż baterii wannowej",
    rhPerUnit: 0.2,
    phase: "plumbing",
    prerequisites: ["344. Montaż wanny"]
  },
  {
    name: "359. Montaż baterii wannowej",
    rhPerUnit: 0.6,
    phase: "plumbing",
    prerequisites: ["358. Montaż baterii wannowej"]
  },
  {
    name: "360. Montaż baterii wannowej",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["359. Montaż baterii wannowej"]
  },
  {
    name: "361. Montaż baterii wannowej/prysz.",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["359. Montaż baterii wannowej"]
  },
  {
    name: "362. Montaż syfonów",
    rhPerUnit: 0.15,
    phase: "plumbing",
    prerequisites: ["337. Montaż umywalki", "344. Montaż wanny"]
  },
  {
    name: "363. Wymiana syfonu i pod. odpływu",
    rhPerUnit: 0.8,
    phase: "plumbing",
    prerequisites: ["48. Demontaż umywalki"]
  },
  {
    name: "364. Montaż syfonów brodzika i wanny",
    rhPerUnit: 0.2,
    phase: "tiles",
    prerequisites: ["344. Montaż wanny", "348. Montaż brodzika prysznicowego"]
  },
  {
    name: "365. Montaż odpływów podłogowych",
    rhPerUnit: 0.2,
    phase: "tiles",
    prerequisites: ["136. Montaż odpływów liniowych"]
  },
  {
    name: "366. Montaż systemu odpływowego łaz.",
    rhPerUnit: 0.25,
    phase: "bathroom",
    prerequisites: ["365. Montaż odpływów podłogowych"]
  },
  {
    name: "367. Podłączenie zlewu kuchennego",
    rhPerUnit: 0.25,
    phase: "plumbing",
    prerequisites: ["370. Montaż zlewozmywaka w blacie"]
  },
  {
    name: "368. Montaż zlewozmywaka na szafce",
    rhPerUnit: 0.75,
    phase: "plumbing",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "369. Montaż zlewozmywaka na szafce",
    rhPerUnit: 0.75,
    phase: "bathroom",
    prerequisites: ["368. Montaż zlewozmywaka na szafce"]
  },
  {
    name: "370. Montaż zlewozmywaka w blacie",
    rhPerUnit: 1.2,
    phase: "plumbing",
    prerequisites: ["424. Montaż blatów kuchennych"]
  },
  {
    name: "371. Montaż zlewozmywaka w blacie",
    rhPerUnit: 1.2,
    phase: "bathroom",
    prerequisites: ["370. Montaż zlewozmywaka w blacie"]
  },
  {
    name: "372. Montaż baterii kuchennej",
    rhPerUnit: 0.2,
    phase: "plumbing",
    prerequisites: ["370. Montaż zlewozmywaka w blacie"]
  },
  {
    name: "373. Montaż baterii kuchennej",
    rhPerUnit: 0.6,
    phase: "plumbing",
    prerequisites: ["372. Montaż baterii kuchennej"]
  },
  {
    name: "374. Montaż baterii kuchennej",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["373. Montaż baterii kuchennej"]
  },
  {
    name: "375. Podłączenie baterii kuchennej",
    rhPerUnit: 0.2,
    phase: "plumbing",
    prerequisites: ["373. Montaż baterii kuchennej"]
  },
  {
    name: "376. Montaż bojlera",
    rhPerUnit: 0.4,
    phase: "plumbing",
    prerequisites: ["150. Nowa kompleksowa instalacja hydrauliczna łazienki (12.0 BUFOR KRYTYCZNY)"]
  },
  {
    name: "377. Montaż ogrzewacza przepływowego",
    rhPerUnit: 0.3,
    phase: "plumbing",
    prerequisites: ["150. Nowa kompleksowa instalacja hydrauliczna łazienki (12.0 BUFOR KRYTYCZNY)"]
  },
  {
    name: "378. Podłączenie pralki",
    rhPerUnit: 0.2,
    phase: "plumbing",
    prerequisites: ["135. Nowe podejścia wod-kan (umywalka/pralka)"]
  },
  {
    name: "379. Montaż pralki",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["378. Podłączenie pralki"]
  },
  {
    name: "380. Podłączenie zmywarki",
    rhPerUnit: 0.2,
    phase: "plumbing",
    prerequisites: ["128. Montaż nowych rur wod-kan"]
  },
  {
    name: "381. Montaż zmywarki",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["380. Podłączenie zmywarki"]
  },
  {
    name: "382. Montaż suszarki elektrycznej",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["390. Montaż gniazd wtykowych"]
  },
  {
    name: "383. Montaż pralko-suszarki",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["378. Podłączenie pralki"]
  },
  {
    name: "384. Montaż piekarnika",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["390. Montaż gniazd wtykowych", "423. Montaż szafek kuchennych"]
  },
  {
    name: "385. Montaż płyty indukcyjnej",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["121. Wykonanie punktu gniazda siłowego", "424. Montaż blatów kuchennych"]
  },
  {
    name: "386. Montaż lodówki w zabudowie",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "387. Montaż mikrofalówki w zabudowie",
    rhPerUnit: 0.15,
    phase: "bathroom",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "388. Montaż okapów kuchennych",
    rhPerUnit: 0.25,
    phase: "furniture",
    prerequisites: ["423. Montaż szafek kuchennych", "390. Montaż gniazd wtykowych"]
  },
  {
    name: "389. Montaż okapu kuchennego",
    rhPerUnit: 0.25,
    phase: "bathroom",
    prerequisites: ["388. Montaż okapów kuchennych"]
  },
  {
    name: "390. Montaż gniazd wtykowych",
    rhPerUnit: 0.15,
    phase: "electrical",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x", "153. Test instalacji elektrycznej"]
  },
  {
    name: "391. Montaż gniazd wtykowych",
    rhPerUnit: 0.15,
    phase: "electrical",
    prerequisites: ["390. Montaż gniazd wtykowych"]
  },
  {
    name: "392. Montaż włączników",
    rhPerUnit: 0.15,
    phase: "electrical",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "393. Montaż wyłączników",
    rhPerUnit: 0.15,
    phase: "electrical",
    prerequisites: ["392. Montaż włączników"]
  },
  {
    name: "394. Montaż oświetlenia sufitowego",
    rhPerUnit: 0.45,
    phase: "electrical",
    prerequisites: ["225. Malowanie sufitów farbą białą"]
  },
  {
    name: "395. Montaż oświetlenia sufitowego",
    rhPerUnit: 0.6,
    phase: "electrical",
    prerequisites: ["394. Montaż oświetlenia sufitowego"]
  },
  {
    name: "396. Montaż halogenów (oczek)",
    rhPerUnit: 0.4,
    phase: "electrical",
    prerequisites: ["174. Montaż sufitu podwieszanego prostego"]
  },
  {
    name: "397. Montaż halogenów (oczka)",
    rhPerUnit: 0.45,
    phase: "electrical",
    prerequisites: ["396. Montaż halogenów (oczek)"]
  },
  {
    name: "398. Montaż oświetlenia w zabudowie",
    rhPerUnit: 0.4,
    phase: "ceiling",
    prerequisites: ["174. Montaż sufitu podwieszanego prostego"]
  },
  {
    name: "399. Podłączenie LED dekoracyjne",
    rhPerUnit: 0.4,
    phase: "electrical",
    prerequisites: ["174. Montaż sufitu podwieszanego prostego"]
  },
  {
    name: "400. Montaż podświetle LED w szafkach",
    rhPerUnit: 0.25,
    phase: "electrical",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "401. Montaż oświetlenia punktowego",
    rhPerUnit: 0.25,
    phase: "decor",
    prerequisites: ["390. Montaż gniazd wtykowych"]
  },
  {
    name: "402. Montaż kinkietów",
    rhPerUnit: 0.2,
    phase: "decor",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "403. Montaż żyrandoli",
    rhPerUnit: 0.25,
    phase: "decor",
    prerequisites: ["225. Malowanie sufitów farbą białą"]
  },
  {
    name: "404. Montaż paneli (inteligentny dom)",
    rhPerUnit: 0.5,
    phase: "electrical",
    prerequisites: ["153. Test instalacji elektrycznej", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "405. Podłączenie rolet elektrycznych",
    rhPerUnit: 0.25,
    phase: "electrical",
    prerequisites: ["331. Montaż rolety/aluzji"]
  },
  {
    name: "406. Montaż czujników dymu i CO",
    rhPerUnit: 0.2,
    phase: "electrical",
    prerequisites: ["153. Test instalacji elektrycznej"]
  },
  {
    name: "407. Montaż grzejnika",
    rhPerUnit: 0.4,
    phase: "heating",
    prerequisites: ["145. Przesunięcie przyłącza do grzejnika", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "408. Zawieszenie grzejnika",
    rhPerUnit: 0.35,
    phase: "heating",
    prerequisites: ["407. Montaż grzejnika"]
  },
  {
    name: "409. Zawieszenie grzejnika",
    rhPerUnit: 0.6,
    phase: "heating",
    prerequisites: ["408. Zawieszenie grzejnika"]
  },
  {
    name: "410. Podłączenie grzejnika do CO",
    rhPerUnit: 0.4,
    phase: "heating",
    prerequisites: ["407. Montaż grzejnika"]
  },
  {
    name: "411. Montaż grzejnika łazienkowego",
    rhPerUnit: 0.4,
    phase: "bathroom",
    prerequisites: ["199. Układanie płytek ściennych łazienka"]
  },
  {
    name: "412. Montaż termostatu grzejnika",
    rhPerUnit: 0.2,
    phase: "heating",
    prerequisites: ["407. Montaż grzejnika"]
  },
  {
    name: "413. Montaż zaworów termostatycznych",
    rhPerUnit: 0.2,
    phase: "heating",
    prerequisites: ["407. Montaż grzejnika"]
  },
  {
    name: "414. Montaż jedn. wewn. klimatyzatora",
    rhPerUnit: 0.5,
    phase: "heating",
    prerequisites: ["127. Montaż rur miedzianych do klimatyzacji", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "415. Montaż jedn. zewn. klimatyzatora",
    rhPerUnit: 0.5,
    phase: "heating",
    prerequisites: ["414. Montaż jedn. wewn. klimatyzatora"]
  },
  {
    name: "416. Montaż wentylatorów",
    rhPerUnit: 0.35,
    phase: "heating",
    prerequisites: ["174. Montaż sufitu podwieszanego prostego"]
  },
  {
    name: "417. Montaż wentylacji łazienkowej",
    rhPerUnit: 0.25,
    phase: "bathroom",
    prerequisites: ["199. Układanie płytek ściennych łazienka"]
  },
  {
    name: "418. Montaż przewodów wentylacyjnych",
    rhPerUnit: 0.4,
    phase: "heating",
    prerequisites: ["60. Demontaż sufitu podwieszanego"]
  },
  {
    name: "419. Test systemu grzewczego",
    rhPerUnit: 0.35,
    phase: "heating",
    prerequisites: ["410. Podłączenie grzejnika do CO"]
  },
  {
    name: "420. Test systemu klimatyzacji",
    rhPerUnit: 0.35,
    phase: "heating",
    prerequisites: ["415. Montaż jedn. zewn. klimatyzatora"]
  },
  {
    name: "421. Podłączanie sprzętu AGD",
    rhPerUnit: 0.2,
    phase: "handyman",
    prerequisites: ["390. Montaż gniazd wtykowych"]
  },
  {
    name: "422. Uszczelnienie połączeń grzewczych",
    rhPerUnit: 0.2,
    phase: "heating",
    prerequisites: ["419. Test systemu grzewczego"]
  },

  // ==========================================
  // FAZA 13: Meble i Wyposażenie
  // ==========================================
  {
    name: "423. Montaż szafek kuchennych",
    rhPerUnit: 0.75,
    phase: "furniture",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x", "279. Montaż podłogi w kuchni", "201. Układanie płytek kuchnia nad blatem"]
  },
  {
    name: "424. Montaż blatów kuchennych",
    rhPerUnit: 0.5,
    phase: "furniture",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "425. Montaż szafek wiszących",
    rhPerUnit: 0.4,
    phase: "furniture",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "426. Montaż szafek w zabudowie",
    rhPerUnit: 0.5,
    phase: "furniture",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "427. Montaż szafek pod blaty",
    rhPerUnit: 0.3,
    phase: "furniture",
    prerequisites: ["424. Montaż blatów kuchennych"]
  },
  {
    name: "428. Montaż szafek narożnych",
    rhPerUnit: 0.4,
    phase: "furniture",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "429. Montaż szafek narożnych (kuchnia)",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["428. Montaż szafek narożnych"]
  },
  {
    name: "430. Montaż szafek łazienkowych",
    rhPerUnit: 0.6,
    phase: "furniture",
    prerequisites: ["199. Układanie płytek ściennych łazienka", "200. Układanie płytek podłogowych łazienka"]
  },
  {
    name: "431. Montaż szafki pod umywalkę",
    rhPerUnit: 0.75,
    phase: "plumbing",
    prerequisites: ["430. Montaż szafek łazienkowych"]
  },
  {
    name: "432. Montaż szafki pod umywalkę",
    rhPerUnit: 0.4,
    phase: "furniture",
    prerequisites: ["431. Montaż szafki pod umywalkę"]
  },
  {
    name: "433. Montaż szafki pod umywalkę",
    rhPerUnit: 0.4,
    phase: "bathroom",
    prerequisites: ["432. Montaż szafki pod umywalkę"]
  },
  {
    name: "434. Montaż szaf wnękowych",
    rhPerUnit: 0.9,
    phase: "furniture",
    prerequisites: ["269. Montaż paneli podłogowych", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "435. Montaż szaf wnękowych (Powt.)",
    rhPerUnit: 0.9,
    phase: "furniture",
    prerequisites: ["434. Montaż szaf wnękowych"]
  },
  {
    name: "436. Montaż regałów i półek",
    rhPerUnit: 0.4,
    phase: "furniture",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "437. Montaż biurek i stołów",
    rhPerUnit: 0.35,
    phase: "furniture",
    prerequisites: ["269. Montaż paneli podłogowych"]
  },
  {
    name: "438. Montaż stołów kuchennych",
    rhPerUnit: 0.35,
    phase: "furniture",
    prerequisites: ["279. Montaż podłogi w kuchni"]
  },
  {
    name: "439. Montaż stołów warsztatowych",
    rhPerUnit: 0.35,
    phase: "furniture",
    prerequisites: ["269. Montaż paneli podłogowych"]
  },
  {
    name: "440. Montaż stołów i biurek",
    rhPerUnit: 0.25,
    phase: "handyman",
    prerequisites: ["437. Montaż biurek i stołów"]
  },
  {
    name: "441. Montaż łóżek",
    rhPerUnit: 0.4,
    phase: "furniture",
    prerequisites: ["269. Montaż paneli podłogowych"]
  },
  {
    name: "442. Montaż łóżek i szafek nocnych",
    rhPerUnit: 0.35,
    phase: "handyman",
    prerequisites: ["441. Montaż łóżek"]
  },
  {
    name: "443. Montaż szafek RTV",
    rhPerUnit: 0.4,
    phase: "furniture",
    prerequisites: ["269. Montaż paneli podłogowych", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "444. Montaż szafek RTV",
    rhPerUnit: 0.25,
    phase: "handyman",
    prerequisites: ["443. Montaż szafek RTV"]
  },
  {
    name: "445. Montaż zabudowy RTV",
    rhPerUnit: 0.4,
    phase: "furniture",
    prerequisites: ["443. Montaż szafek RTV"]
  },
  {
    name: "446. Montaż mebli w salonie",
    rhPerUnit: 0.55,
    phase: "furniture",
    prerequisites: ["269. Montaż paneli podłogowych", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "447. Montaż mebli w salonie",
    rhPerUnit: 0.4,
    phase: "handyman",
    prerequisites: ["446. Montaż mebli w salonie"]
  },
  {
    name: "448. Montaż mebli w sypialni",
    rhPerUnit: 0.5,
    phase: "furniture",
    prerequisites: ["269. Montaż paneli podłogowych", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "449. Montaż mebli modułowych",
    rhPerUnit: 0.4,
    phase: "furniture",
    prerequisites: ["269. Montaż paneli podłogowych"]
  },
  {
    name: "450. Montaż mebli na wymiar",
    rhPerUnit: 0.65,
    phase: "furniture",
    prerequisites: ["269. Montaż paneli podłogowych", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "451. Montaż frontów meblowych",
    rhPerUnit: 0.25,
    phase: "furniture",
    prerequisites: ["423. Montaż szafek kuchennych", "426. Montaż szafek w zabudowie"]
  },
  {
    name: "452. Montaż frontów meblowych",
    rhPerUnit: 0.25,
    phase: "handyman",
    prerequisites: ["451. Montaż frontów meblowych"]
  },
  {
    name: "453. Montaż frontów kuchennych",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "454. Montaż frontów łazienkowych",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["430. Montaż szafek łazienkowych"]
  },
  {
    name: "455. Montaż frontów szaf wnękowych",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["434. Montaż szaf wnękowych"]
  },
  {
    name: "456. Montaż frontów meblowych (salon)",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["446. Montaż mebli w salonie"]
  },
  {
    name: "457. Montaż frontów (sypialnia)",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["448. Montaż mebli w sypialni"]
  },
  {
    name: "458. Montaż frontów (łazienka)",
    rhPerUnit: 0.2,
    phase: "carpentry",
    prerequisites: ["430. Montaż szafek łazienkowych"]
  },
  {
    name: "459. Montaż drzwiczek szafek",
    rhPerUnit: 0.15,
    phase: "carpentry",
    prerequisites: ["451. Montaż frontów meblowych"]
  },
  {
    name: "460. Montaż szafek modułowych",
    rhPerUnit: 0.4,
    phase: "handyman",
    prerequisites: ["449. Montaż mebli modułowych"]
  },
  {
    name: "461. Montaż elementów dekor. mebli",
    rhPerUnit: 0.2,
    phase: "furniture",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "462. Transport mebli",
    rhPerUnit: 0.2,
    phase: "transport",
    prerequisites: []
  },

  // ==========================================
  // FAZA 14: Prace Końcowe - Złota Rączka
  // ==========================================
  {
    name: "463. Montaż listew przypodłogowych",
    rhPerUnit: 0.2,
    phase: "handyman",
    prerequisites: ["269. Montaż paneli podłogowych", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "464. Montaż listew MDF",
    rhPerUnit: 0.25,
    phase: "flooring",
    prerequisites: ["463. Montaż listew przypodłogowych"]
  },
  {
    name: "465. Montaż listew MDF",
    rhPerUnit: 0.25,
    phase: "flooring",
    prerequisites: ["464. Montaż listew MDF"]
  },
  {
    name: "466. Montaż listew przy poł. drewn.",
    rhPerUnit: 0.25,
    phase: "flooring",
    prerequisites: ["273. Montaż parkietu drewnianego", "286. Cyklinowanie 3-krotne + lakierowanie"]
  },
  {
    name: "467. Montaż listew przy panelach",
    rhPerUnit: 0.25,
    phase: "flooring",
    prerequisites: ["269. Montaż paneli podłogowych"]
  },
  {
    name: "468. Montaż listew przy wykładzinie",
    rhPerUnit: 0.2,
    phase: "flooring",
    prerequisites: ["288. Montaż wykładziny PCV"]
  },
  {
    name: "469. Malowanie listew przypodłogowych",
    rhPerUnit: 0.25,
    phase: "painting",
    prerequisites: ["463. Montaż listew przypodłogowych"]
  },
  {
    name: "470. Malowanie listew przypodłogowych",
    rhPerUnit: 0.25,
    phase: "painting",
    prerequisites: ["469. Malowanie listew przypodłogowych"]
  },
  {
    name: "471. Montaż listew przysufitowych",
    rhPerUnit: 0.3,
    phase: "flooring",
    prerequisites: ["225. Malowanie sufitów farbą białą"]
  },
  {
    name: "472. Montaż listew (sztukateria styro)",
    rhPerUnit: 0.3,
    phase: "painting",
    prerequisites: ["471. Montaż listew przysufitowych"]
  },
  {
    name: "473. Malowanie listew przysufitowych",
    rhPerUnit: 0.3,
    phase: "painting",
    prerequisites: ["471. Montaż listew przysufitowych"]
  },
  {
    name: "474. Malowanie listew przysufitowych",
    rhPerUnit: 0.3,
    phase: "painting",
    prerequisites: ["473. Malowanie listew przysufitowych"]
  },
  {
    name: "475. Malowanie rur wod-kan i CO",
    rhPerUnit: 0.4,
    phase: "painting",
    prerequisites: ["128. Montaż nowych rur wod-kan", "219. Gruntowanie ścian przed malowaniem"]
  },
  {
    name: "476. Malowanie rur wod-kan/c.o.",
    rhPerUnit: 0.4,
    phase: "painting",
    prerequisites: ["475. Malowanie rur wod-kan i CO"]
  },
  {
    name: "477. Malowanie grzejników",
    rhPerUnit: 0.4,
    phase: "painting",
    prerequisites: ["43. Demontaż grzejników"]
  },
  {
    name: "478. Malowanie grzejników",
    rhPerUnit: 0.4,
    phase: "painting",
    prerequisites: ["477. Malowanie grzejników"]
  },
  {
    name: "479. Malowanie elementów metalowych",
    rhPerUnit: 0.35,
    phase: "painting",
    prerequisites: ["291. Montaż schodów metalowych"]
  },
  {
    name: "480. Malowanie elementów metalowych",
    rhPerUnit: 0.35,
    phase: "painting",
    prerequisites: ["479. Malowanie elementów metalowych"]
  },
  {
    name: "481. Malowanie szafek meblowych",
    rhPerUnit: 0.25,
    phase: "painting",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "482. Malowanie szafek meblowych",
    rhPerUnit: 0.25,
    phase: "painting",
    prerequisites: ["481. Malowanie szafek meblowych"]
  },
  {
    name: "483. Akrylowanie styków (12.0 Utrzymany bufor architekta)",
    rhPerUnit: 12.0,
    phase: "handyman",
    prerequisites: ["463. Montaż listew przypodłogowych", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "484. Silikonowanie (15.0 Utrzymany bufor architekta)",
    rhPerUnit: 15.0,
    phase: "handyman",
    prerequisites: ["340. Montaż miski WC kompakt", "344. Montaż wanny", "352. Montaż kabiny prysznicowej", "370. Montaż zlewozmywaka w blacie"]
  },
  {
    name: "485. Wypełnianie szczelin silikonem",
    rhPerUnit: 0.2,
    phase: "tiles",
    prerequisites: ["484. Silikonowanie (15.0 Utrzymany bufor architekta)"]
  },
  {
    name: "486. Montaż listew dylatacyjnych",
    rhPerUnit: 0.1,
    phase: "handyman",
    prerequisites: ["269. Montaż paneli podłogowych"]
  },
  {
    name: "487. Montaż listew oświetleniowych LED",
    rhPerUnit: 0.1,
    phase: "handyman",
    prerequisites: ["399. Podłączenie LED dekoracyjne"]
  },
  {
    name: "488. Montaż listew LED",
    rhPerUnit: 0.1,
    phase: "handyman",
    prerequisites: ["487. Montaż listew oświetleniowych LED"]
  },
  {
    name: "489. Montaż lustra łazienkowego",
    rhPerUnit: 0.7,
    phase: "plumbing",
    prerequisites: ["199. Układanie płytek ściennych łazienka", "209. Fugowanie nowych płytek"]
  },
  {
    name: "490. Montaż lustra łazienkowego",
    rhPerUnit: 0.2,
    phase: "bathroom",
    prerequisites: ["489. Montaż lustra łazienkowego"]
  },
  {
    name: "491. Montaż szafek modułowych",
    rhPerUnit: 0.4,
    phase: "handyman",
    prerequisites: ["460. Montaż szafek modułowych"]
  },
  {
    name: "492. Montaż drzwi harmonijkowych",
    rhPerUnit: 0.2,
    phase: "handyman",
    prerequisites: ["309. Montaż drzwi wewnętrznych"]
  },
  {
    name: "493. Montaż dod. drzwi harmonijkowych",
    rhPerUnit: 0.2,
    phase: "handyman",
    prerequisites: ["492. Montaż drzwi harmonijkowych"]
  },
  {
    name: "494. Regulacja drzwi szaf",
    rhPerUnit: 0.1,
    phase: "carpentry",
    prerequisites: ["434. Montaż szaf wnękowych"]
  },
  {
    name: "495. Regulacja drzwi przesuwanych",
    rhPerUnit: 0.1,
    phase: "carpentry",
    prerequisites: ["333. Montaż drzwi przesuwnych (garderoba)"]
  },
  {
    name: "496. Regulacja zawiasów i prowadnic",
    rhPerUnit: 0.1,
    phase: "furniture",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "497. Naprawa zawiasów i prowadnic",
    rhPerUnit: 0.1,
    phase: "furniture",
    prerequisites: ["496. Regulacja zawiasów i prowadnic"]
  },
  {
    name: "498. Naprawa zawiasów meblowych",
    rhPerUnit: 0.1,
    phase: "handyman",
    prerequisites: ["497. Naprawa zawiasów i prowadnic"]
  },
  {
    name: "499. Montaż uchwytów meblowych",
    rhPerUnit: 0.1,
    phase: "furniture",
    prerequisites: ["451. Montaż frontów meblowych"]
  },
  {
    name: "500. Montaż uchwytów meblowych",
    rhPerUnit: 0.1,
    phase: "carpentry",
    prerequisites: ["499. Montaż uchwytów meblowych"]
  },
  {
    name: "501. Montaż uchwytów łazienkowych",
    rhPerUnit: 0.1,
    phase: "bathroom",
    prerequisites: ["199. Układanie płytek ściennych łazienka"]
  },
  {
    name: "502. Montaż półek łazienkowych",
    rhPerUnit: 0.1,
    phase: "bathroom",
    prerequisites: ["199. Układanie płytek ściennych łazienka"]
  },
  {
    name: "503. Montaż wieszaków na ręczniki",
    rhPerUnit: 0.1,
    phase: "bathroom",
    prerequisites: ["199. Układanie płytek ściennych łazienka"]
  },
  {
    name: "504. Montaż wieszaków łazienkowych",
    rhPerUnit: 0.1,
    phase: "furniture",
    prerequisites: ["503. Montaż wieszaków na ręczniki"]
  },
  {
    name: "505. Montaż wieszaków dekoracyjnych",
    rhPerUnit: 0.1,
    phase: "decor",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "506. Montaż wieszaków w przedpokoju",
    rhPerUnit: 0.1,
    phase: "carpentry",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "507. Podwieszanie obrazów/półek",
    rhPerUnit: 0.1,
    phase: "handyman",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "508. Wieszanie obrazów i luster",
    rhPerUnit: 0.1,
    phase: "handyman",
    prerequisites: ["507. Podwieszanie obrazów/półek"]
  },
  {
    name: "509. Montaż karniszy",
    rhPerUnit: 0.2,
    phase: "handyman",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "510. Montaż karniszy sufitowych",
    rhPerUnit: 0.2,
    phase: "handyman",
    prerequisites: ["225. Malowanie sufitów farbą białą"]
  },
  {
    name: "511. Montaż firan i zasłon",
    rhPerUnit: 0.15,
    phase: "handyman",
    prerequisites: ["509. Montaż karniszy"]
  },
  {
    name: "512. Konserwacja drzwi i okien",
    rhPerUnit: 0.15,
    phase: "handyman",
    prerequisites: ["309. Montaż drzwi wewnętrznych", "302. Montaż okien zespolonych"]
  },
  {
    name: "513. Czyszczenie fug",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["209. Fugowanie nowych płytek"]
  },
  {
    name: "514. Mycie okien",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["302. Montaż okien zespolonych"]
  },

  // ==========================================
  // FAZA 18: Sprzątanie i Odbiór Końcowy
  // ==========================================
  {
    name: "515. Sprzątanie mieszkania po remoncie",
    rhPerUnit: 0.4,
    phase: "cleaning",
    prerequisites: ["463. Montaż listew przypodłogowych", "230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "516. Sprzątanie poremontowe (podstawowe)",
    rhPerUnit: 0.3,
    phase: "cleaning",
    prerequisites: ["515. Sprzątanie mieszkania po remoncie"]
  },
  {
    name: "517. Mycie podłóg po remoncie",
    rhPerUnit: 0.25,
    phase: "cleaning",
    prerequisites: ["269. Montaż paneli podłogowych"]
  },
  {
    name: "518. Czyszczenie ścian",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "519. Mycie okien po remoncie",
    rhPerUnit: 0.25,
    phase: "cleaning",
    prerequisites: ["302. Montaż okien zespolonych"]
  },
  {
    name: "520. Czyszczenie glazury",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["209. Fugowanie nowych płytek"]
  },
  {
    name: "521. Czyszczenie glazury po remoncie",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["520. Czyszczenie glazury"]
  },
  {
    name: "522. Czyszczenie fug po remoncie",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["209. Fugowanie nowych płytek"]
  },
  {
    name: "523. Czyszczenie kabiny prysznicowej",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["352. Montaż kabiny prysznicowej"]
  },
  {
    name: "524. Czyszczenie armatur łazienkowych",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["356. Montaż baterii umywalkowej", "359. Montaż baterii wannowej"]
  },
  {
    name: "525. Mycie mebli kuchennych",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["423. Montaż szafek kuchennych"]
  },
  {
    name: "526. Czyszczenie szafek i blatów",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["424. Montaż blatów kuchennych"]
  },
  {
    name: "527. Mycie szafek łazienkowych",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["430. Montaż szafek łazienkowych"]
  },
  {
    name: "528. Sprzątanie balkonu/tarasu",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["282. Montaż podłogi na tarasie/balkonie"]
  },
  {
    name: "529. Odkurzanie mieszkania",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["515. Sprzątanie mieszkania po remoncie"]
  },
  {
    name: "530. Odkurzanie po remoncie",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["529. Odkurzanie mieszkania"]
  },
  {
    name: "531. Zmywanie kurzu po szlifowaniu",
    rhPerUnit: 0.25,
    phase: "cleaning",
    prerequisites: ["189. Szlifowanie gładzi"]
  },
  {
    name: "532. Czyszczenie po cyklowaniu",
    rhPerUnit: 0.25,
    phase: "cleaning",
    prerequisites: ["283. Cyklinowanie parkietu"]
  },
  {
    name: "533. Zmywanie plam z podłogi",
    rhPerUnit: 0.2,
    phase: "cleaning",
    prerequisites: ["517. Mycie podłóg po remoncie"]
  },
  {
    name: "534. Czyszczenie ram okiennych",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["302. Montaż okien zespolonych"]
  },
  {
    name: "535. Sprzątanie tarasu/balkonu",
    rhPerUnit: 0.25,
    phase: "cleaning",
    prerequisites: ["528. Sprzątanie balkonu/tarasu"]
  },
  {
    name: "536. Sprzątanie tarasu/balkonu",
    rhPerUnit: 0.25,
    phase: "cleaning",
    prerequisites: ["535. Sprzątanie tarasu/balkonu"]
  },
  {
    name: "537. Czyszczenie parapetów po malowaniu",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["230. Malowanie ścian farbą kolor 2x"]
  },
  {
    name: "538. Czyszczenie grzejników",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["407. Montaż grzejnika"]
  },
  {
    name: "539. Mycie grzejników po remoncie",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["538. Czyszczenie grzejników"]
  },
  {
    name: "540. Utylizacja folii i opakowań",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["515. Sprzątanie mieszkania po remoncie"]
  },
  {
    name: "541. Utylizacja folii i opakowań",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["540. Utylizacja folii i opakowań"]
  },
  {
    name: "542. Utylizacja resztek chemii",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["515. Sprzątanie mieszkania po remoncie"]
  },
  {
    name: "543. Czyszczenie sprzętu remontowego",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: []
  },
  {
    name: "544. Czyszczenie narzędzi i sprzętu",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["543. Czyszczenie sprzętu remontowego"]
  },
  {
    name: "545. Wywóz drobnych odpadów",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["541. Utylizacja folii i opakowań"]
  },
  {
    name: "546. Kontrola jakości sprzątania",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["517. Mycie podłóg po remoncie", "519. Mycie okien po remoncie"]
  },
  {
    name: "547. Kontrola jakości sprzątania",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["546. Kontrola jakości sprzątania"]
  },
  {
    name: "548. Kontrola i odbiór końcowy",
    rhPerUnit: 0.15,
    phase: "cleaning",
    prerequisites: ["546. Kontrola jakości sprzątania", "542. Utylizacja resztek chemii"]
  }
];
