// ============================================
// SZABLONY ŁAZIENEK
// ============================================

export const BATHROOM_TEMPLATES = {
    general_renovation: {
        name: "Łazienka - Generalny Remont (6m²)",
        description: "Kompleksowy remont łazienki ze starym wyposażeniem",
        items: [
            // DEMONTAŻ
            { name: "Demontaż starej glazury", qty: 20, unit: "m2", rhPerUnit: 0.5, materialPricePerUnit: 0 },
            { name: "Demontaż WC kompakt", qty: 1, unit: "szt", rhPerUnit: 0.5, materialPricePerUnit: 0 },
            { name: "Demontaż umywalki", qty: 1, unit: "szt", rhPerUnit: 0.45, materialPricePerUnit: 0 },
            { name: "Demontaż wanny", qty: 1, unit: "szt", rhPerUnit: 0.7, materialPricePerUnit: 0 },
            { name: "Wywóz gruzu", qty: 0.5, unit: "m3", rhPerUnit: 1.5, materialPricePerUnit: 0 },

            // INSTALACJE
            { name: "Wymiana rur wod-kan", qty: 8, unit: "mb", rhPerUnit: 0.8, materialPricePerUnit: 25 },
            { name: "Wykonanie podejść wod-kan", qty: 4, unit: "szt", rhPerUnit: 1.2, materialPricePerUnit: 15 },
            { name: "Wykonanie bruzd pod instalację elektryczną", qty: 10, unit: "mb", rhPerUnit: 0.4, materialPricePerUnit: 0 },
            { name: "Montaż przewodów elektrycznych", qty: 15, unit: "mb", rhPerUnit: 0.6, materialPricePerUnit: 8 },

            // TYNKI I WYRÓWNANIE
            { name: "Tynk cementowo-wapienny ścian", qty: 20, unit: "m2", rhPerUnit: 0.45, materialPricePerUnit: 12 },
            { name: "Hydroizolacja ścian i podłogi", qty: 8, unit: "m2", rhPerUnit: 0.35, materialPricePerUnit: 18 },
            { name: "Wylewka samopoziomująca", qty: 6, unit: "m2", rhPerUnit: 0.4, materialPricePerUnit: 25 },

            // PŁYTKI
            { name: "Układanie glazury na ścianach", qty: 20, unit: "m2", rhPerUnit: 0.55, materialPricePerUnit: 45 },
            { name: "Układanie terakoty na podłodze", qty: 6, unit: "m2", rhPerUnit: 0.5, materialPricePerUnit: 50 },
            { name: "Fugowanie płytek", qty: 26, unit: "m2", rhPerUnit: 0.25, materialPricePerUnit: 5 },

            // MONTAŻ WYPOSAŻENIA
            { name: "Montaż WC kompakt", qty: 1, unit: "szt", rhPerUnit: 1.2, materialPricePerUnit: 0 },
            { name: "Montaż umywalki z szafką", qty: 1, unit: "szt", rhPerUnit: 1.0, materialPricePerUnit: 0 },
            { name: "Montaż kabiny prysznicowej", qty: 1, unit: "szt", rhPerUnit: 2.5, materialPricePerUnit: 0 },
            { name: "Montaż kabiny typu Walk-in + odpływ liniowy", qty: 1, unit: "kpl", rhPerUnit: 4.0, materialPricePerUnit: 0 },
            { name: "Montaż baterii umywalkowej", qty: 1, unit: "szt", rhPerUnit: 0.6, materialPricePerUnit: 0 },
            { name: "Montaż baterii prysznicowej", qty: 1, unit: "szt", rhPerUnit: 0.7, materialPricePerUnit: 0 },
            { name: "Montaż lustra", qty: 1, unit: "szt", rhPerUnit: 0.4, materialPricePerUnit: 0 },
            { name: "Montaż wanny", qty: 1, unit: "szt", rhPerUnit: 2.5, materialPricePerUnit: 0 },
            { name: "Obudowa wanny (płytki)", qty: 1, unit: "kpl", rhPerUnit: 3.0, materialPricePerUnit: 100 },
            { name: "Montaż grzejnika łazienkowego", qty: 1, unit: "szt", rhPerUnit: 1.5, materialPricePerUnit: 0 },
            { name: "Montaż bidetki", qty: 1, unit: "szt", rhPerUnit: 0.8, materialPricePerUnit: 0 },

            // ELEKTRYKA
            { name: "Montaż opraw oświetleniowych", qty: 3, unit: "szt", rhPerUnit: 0.5, materialPricePerUnit: 0 },
            { name: "Montaż gniazd wtykowych", qty: 2, unit: "szt", rhPerUnit: 0.3, materialPricePerUnit: 0 },
            { name: "Montaż włączników/łączników", qty: 2, unit: "szt", rhPerUnit: 0.3, materialPricePerUnit: 0 },
            { name: "Montaż wentylatora łazienkowego", qty: 1, unit: "szt", rhPerUnit: 0.8, materialPricePerUnit: 0 },
            { name: "Podłączenie pralki", qty: 1, unit: "szt", rhPerUnit: 0.8, materialPricePerUnit: 15 },
            { name: "Podłączenie suszarki elektrycznej", qty: 1, unit: "szt", rhPerUnit: 0.5, materialPricePerUnit: 0 },
            { name: "Montaż ogrzewania podłogowego (maty)", qty: 4, unit: "m2", rhPerUnit: 0.6, materialPricePerUnit: 80 },

            // SUFIT I MALOWANIE
            { name: "Gruntowanie sufitu", qty: 6, unit: "m2", rhPerUnit: 0.15, materialPricePerUnit: 2 },
            { name: "Szpachlowanie ubytków na suficie", qty: 2, unit: "m2", rhPerUnit: 0.4, materialPricePerUnit: 5 },
            { name: "Dwukrotne malowanie sufitu", qty: 6, unit: "m2", rhPerUnit: 0.45, materialPricePerUnit: 8 },
            { name: "Malowanie całych ścian i sufitu", qty: 15, unit: "m2", rhPerUnit: 0.45, materialPricePerUnit: 8 },

            // WYKOŃCZENIE
            { name: "Montaż listew wykończeniowych", qty: 8, unit: "mb", rhPerUnit: 0.15, materialPricePerUnit: 8 },
            { name: "Uszczelnienie silikonem", qty: 10, unit: "mb", rhPerUnit: 0.2, materialPricePerUnit: 3 },
            { name: "Montaż uchwytów na ręczniki/papier", qty: 4, unit: "szt", rhPerUnit: 0.3, materialPricePerUnit: 0 },
            { name: "Sprzątanie końcowe", qty: 6, unit: "m2", rhPerUnit: 0.3, materialPricePerUnit: 0 }
        ]
    },

    developer_state: {
        name: "Łazienka - Od Stanu Deweloperskiego (6m²)",
        description: "Wykończenie łazienki od zera (stan surowy)",
        items: [
            // PRZYGOTOWANIE
            { name: "Wstępne pomiary i projekt", qty: 1, unit: "kpl", rhPerUnit: 2.0, materialPricePerUnit: 0 },
            { name: "Ochrona podłóg i drzwi", qty: 6, unit: "m2", rhPerUnit: 0.2, materialPricePerUnit: 2 },

            // INSTALACJE PODTYNKOWE
            { name: "Wykonanie bruzd pod instalację wod-kan", qty: 12, unit: "mb", rhPerUnit: 0.5, materialPricePerUnit: 0 },
            { name: "Montaż rur wod-kan", qty: 15, unit: "mb", rhPerUnit: 0.8, materialPricePerUnit: 25 },
            { name: "Montaż stelaża WC podtynkowego", qty: 1, unit: "szt", rhPerUnit: 1.5, materialPricePerUnit: 0 },
            { name: "Wykonanie podejść wod-kan", qty: 6, unit: "szt", rhPerUnit: 1.2, materialPricePerUnit: 15 },
            { name: "Wykonanie bruzd pod instalację elektryczną", qty: 15, unit: "mb", rhPerUnit: 0.4, materialPricePerUnit: 0 },
            { name: "Montaż przewodów elektrycznych", qty: 20, unit: "mb", rhPerUnit: 0.6, materialPricePerUnit: 8 },
            { name: "Montaż puszek podtynkowych", qty: 5, unit: "szt", rhPerUnit: 0.3, materialPricePerUnit: 3 },

            // TYNKI I WYRÓWNANIE
            { name: "Tynk cementowo-wapienny ścian", qty: 24, unit: "m2", rhPerUnit: 0.45, materialPricePerUnit: 12 },
            { name: "Gładź gipsowa na ścianach", qty: 24, unit: "m2", rhPerUnit: 0.35, materialPricePerUnit: 8 },
            { name: "Gruntowanie ścian", qty: 24, unit: "m2", rhPerUnit: 0.15, materialPricePerUnit: 3 },
            { name: "Hydroizolacja ścian i podłogi", qty: 10, unit: "m2", rhPerUnit: 0.35, materialPricePerUnit: 18 },
            { name: "Wylewka samopoziomująca", qty: 6, unit: "m2", rhPerUnit: 0.4, materialPricePerUnit: 25 },

            // PŁYTKI
            { name: "Układanie glazury na ścianach", qty: 24, unit: "m2", rhPerUnit: 0.55, materialPricePerUnit: 45 },
            { name: "Układanie terakoty na podłodze", qty: 6, unit: "m2", rhPerUnit: 0.5, materialPricePerUnit: 50 },
            { name: "Fugowanie płytek", qty: 30, unit: "m2", rhPerUnit: 0.25, materialPricePerUnit: 5 },
            { name: "Montaż listew wykończeniowych", qty: 10, unit: "mb", rhPerUnit: 0.15, materialPricePerUnit: 8 },

            // SUFIT
            { name: "Sufit podwieszany G-K", qty: 6, unit: "m2", rhPerUnit: 0.8, materialPricePerUnit: 35 },
            { name: "Szpachlowanie i malowanie sufitu", qty: 6, unit: "m2", rhPerUnit: 0.4, materialPricePerUnit: 8 },

            // MONTAŻ WYPOSAŻENIA
            { name: "Montaż WC podtynkowe", qty: 1, unit: "szt", rhPerUnit: 1.5, materialPricePerUnit: 0 },
            { name: "Montaż umywalki nablatowej", qty: 1, unit: "szt", rhPerUnit: 1.2, materialPricePerUnit: 0 },
            { name: "Montaż szafki pod umywalkę", qty: 1, unit: "szt", rhPerUnit: 0.8, materialPricePerUnit: 0 },
            { name: "Montaż kabiny prysznicowej typu walk-in", qty: 1, unit: "szt", rhPerUnit: 3.0, materialPricePerUnit: 0 },
            { name: "Montaż brodzika prysznicowego", qty: 1, unit: "szt", rhPerUnit: 1.5, materialPricePerUnit: 0 },
            { name: "Montaż odpływu liniowego", qty: 1, unit: "szt", rhPerUnit: 1.0, materialPricePerUnit: 0 },
            { name: "Montaż baterii umywalkowej podtynkowej", qty: 1, unit: "szt", rhPerUnit: 1.0, materialPricePerUnit: 0 },
            { name: "Montaż baterii prysznicowej podtynkowej", qty: 1, unit: "szt", rhPerUnit: 1.2, materialPricePerUnit: 0 },
            { name: "Montaż lustra z oświetleniem LED", qty: 1, unit: "szt", rhPerUnit: 0.8, materialPricePerUnit: 0 },
            { name: "Montaż grzejnika dekoracyjnego", qty: 1, unit: "szt", rhPerUnit: 1.5, materialPricePerUnit: 0 },

            // OPCJE KĄPIELOWE (Do wyboru)
            { name: "Montaż wanny z obudową", qty: 1, unit: "kpl", rhPerUnit: 4.5, materialPricePerUnit: 0 },
            { name: "Montaż kabiny z brodzikiem", qty: 1, unit: "kpl", rhPerUnit: 3.5, materialPricePerUnit: 0 },
            { name: "Montaż bidetki", qty: 1, unit: "szt", rhPerUnit: 0.8, materialPricePerUnit: 0 },

            // ELEKTRYKA
            { name: "Montaż opraw LED sufitowych", qty: 4, unit: "szt", rhPerUnit: 0.5, materialPricePerUnit: 0 },
            { name: "Montaż gniazd wtykowych", qty: 3, unit: "szt", rhPerUnit: 0.3, materialPricePerUnit: 0 },
            { name: "Montaż włączników/łączników", qty: 3, unit: "szt", rhPerUnit: 0.3, materialPricePerUnit: 0 },
            { name: "Montaż wentylatora z czujnikiem wilgotności", qty: 1, unit: "szt", rhPerUnit: 1.0, materialPricePerUnit: 0 },
            { name: "Montaż ogrzewania podłogowego (maty)", qty: 4, unit: "m2", rhPerUnit: 0.6, materialPricePerUnit: 80 },
            { name: "Podłączenie pralki", qty: 1, unit: "szt", rhPerUnit: 0.8, materialPricePerUnit: 15 },
            { name: "Podłączenie suszarki", qty: 1, unit: "szt", rhPerUnit: 0.5, materialPricePerUnit: 0 },

            // DODATKOWE MALOWANIE
            { name: "Malowanie ścian (powierzchnie bez płytek)", qty: 8, unit: "m2", rhPerUnit: 0.45, materialPricePerUnit: 8 },

            // WYKOŃCZENIE
            { name: "Uszczelnienie silikonem", qty: 12, unit: "mb", rhPerUnit: 0.2, materialPricePerUnit: 3 },
            { name: "Montaż akcesoriów łazienkowych (uchwyty, wieszaki)", qty: 5, unit: "szt", rhPerUnit: 0.3, materialPricePerUnit: 0 },
            { name: "Sprzątanie końcowe", qty: 6, unit: "m2", rhPerUnit: 0.3, materialPricePerUnit: 0 },
            { name: "Odbiór końcowy i instruktaż", qty: 1, unit: "kpl", rhPerUnit: 1.0, materialPricePerUnit: 0 }
        ]
    }
};
