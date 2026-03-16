export type Recommendation = {
  id: string;
  title: string;
  description: string;
  reason: string;
  type: 'primary' | 'secondary' | 'habit';
  matchScore: number;
  url?: string;
};

export const generateRecommendations = (answers: Record<string, string | string[]>): { score: number, recs: Recommendation[] } => {
  const recs: Recommendation[] = [];
  let baseScore = 70; // Start with a high base score for personalization feel

  // 1. Primary Product Recommendation based on Form & Goal
  const form = answers['form'] as string;
  const goal = answers['goal'] as string;
  const industry = answers['industry'] as string;
  const experience = answers['experience'] as string;
  const additional = (answers['additional'] as string[]) || [];

  if (form === 'coffee') {
    recs.push({
      id: 'prod_coffee',
      title: "Kawa Grzybowa z Lion's Mane",
      description: 'Połączenie wysokiej jakości kawy z ekstraktem z soplówki jeżowatej. Idealne zastępstwo dla porannego rytuału.',
      reason: `Wybrałeś formę kawy. To idealne rozwiązanie, by uzyskać ${goal === 'focus' ? 'głębokie skupienie' : 'zastrzyk energii'} bez efektu "zjazdu" kofeinowego.`,
      type: 'primary',
      matchScore: 95,
      url: 'https://7nutrition.pl/kategoria/grzyby-witalne/',
    });
    baseScore += 5;
  } else if (form === 'capsules') {
    recs.push({
      id: 'prod_caps',
      title: "Lion's Mane Ekstrakt w Kapsułkach (Wysoka Standaryzacja)",
      description: 'Czysty ekstrakt z owocników, gwarantujący precyzyjną dawkę beta-glukanów i hericenonów.',
      reason: `Preferujesz kapsułki. To najwygodniejsza i najszybsza forma suplementacji, idealna dla Twojego intensywnego trybu pracy.`,
      type: 'primary',
      matchScore: 98,
      url: 'https://7nutrition.pl/kategoria/grzyby-witalne/',
    });
    baseScore += 8;
  } else if (form === 'powder') {
    recs.push({
      id: 'prod_powder',
      title: "Czysty Ekstrakt Lion's Mane w Proszku",
      description: 'Wszechstronny proszek do dodawania do ulubionych napojów, smoothies lub owsianki.',
      reason: `Wybrałeś proszek, co daje Ci pełną kontrolę nad dawką i sposobem przyjmowania w ciągu dnia.`,
      type: 'primary',
      matchScore: 92,
      url: 'https://7nutrition.pl/kategoria/grzyby-witalne/',
    });
    baseScore += 4;
  } else {
    recs.push({
      id: 'prod_caps_any',
      title: "Lion's Mane Ekstrakt w Kapsułkach (Wysoka Standaryzacja)",
      description: 'Czysty ekstrakt z owocników, gwarantujący precyzyjną dawkę beta-glukanów i hericenonów.',
      reason: `Skoro forma nie ma dla Ciebie znaczenia, polecamy kapsułki jako najwygodniejszą i najbardziej precyzyjną formę suplementacji.`,
      type: 'primary',
      matchScore: 98,
      url: 'https://7nutrition.pl/kategoria/grzyby-witalne/',
    });
    baseScore += 8;
  }

  // 2. Secondary Recommendation based on Goal & Industry
  if (goal === 'memory' || industry === 'student') {
    recs.push({
      id: 'sec_memory',
      title: 'Protokół Długofalowej Neurogenezy',
      description: "Stosuj Lion's Mane codziennie rano przez minimum 8 tygodni. Hericenony potrzebują czasu, by stymulować czynnik wzrostu nerwów (NGF).",
      reason: `Zależy Ci na pamięci i nauce. Badania pokazują, że soplówka działa najlepiej przy regularnym, długoterminowym stosowaniu.`,
      type: 'secondary',
      matchScore: 90,
    });
  } else if (goal === 'stress' || industry === 'management') {
    recs.push({
      id: 'sec_stress',
      title: 'Wieczorna Suplementacja (Opcjonalnie)',
      description: "Rozważ przyjmowanie mniejszej dawki Lion's Mane po południu, aby wyciszyć układ nerwowy po ciężkim dniu.",
      reason: `Jako osoba na stanowisku zarządczym lub szukająca redukcji stresu, docenisz stabilizujące właściwości tego grzyba.`,
      type: 'secondary',
      matchScore: 88,
    });
  } else if (goal === 'focus' || industry === 'it') {
    recs.push({
      id: 'sec_focus',
      title: 'Stackowanie z L-Teaniną',
      description: "Połącz Lion's Mane z L-teaniną (lub zieloną herbatą), aby wejść w stan głębokiego \"flow\" bez rozproszeń.",
      reason: `W branży IT/Analitycznej kluczowe jest nieprzerwane skupienie. Ten stack to "złoty standard" w biohackingu.`,
      type: 'secondary',
      matchScore: 96,
    });
    baseScore += 3;
  } else {
    recs.push({
      id: 'sec_creative',
      title: 'Rytuał Pracy Twórczej',
      description: 'Przyjmuj suplement na 30 minut przed rozpoczęciem bloku pracy kreatywnej, najlepiej na pusty żołądek.',
      reason: "Dla branży kreatywnej ważne jest przełamywanie schematów. Lion's Mane wspiera elastyczność poznawczą.",
      type: 'secondary',
      matchScore: 85,
    });
  }

  // 3. Habit/Lifestyle Recommendation based on Experience
  if (experience === 'beginner') {
    recs.push({
      id: 'hab_beginner',
      title: 'Zacznij od połowy dawki',
      description: 'Przez pierwsze 3-4 dni stosuj połowę zalecanej porcji, aby obserwować reakcję organizmu.',
      reason: `Jako osoba początkująca, ważne jest, by powoli adaptować organizm do nowych substancji aktywnych.`,
      type: 'habit',
      matchScore: 100,
    });
  } else if (experience === 'expert') {
    recs.push({
      id: 'hab_expert',
      title: 'Zaawansowane Cyklowanie (5 dni on / 2 dni off)',
      description: 'Stosuj protokół Paula Stametsa lub cykluj suplementację, aby uniknąć budowania tolerancji.',
      reason: `Jako biohacker wiesz, że cyklowanie pozwala utrzymać maksymalną wrażliwość receptorów.`,
      type: 'habit',
      matchScore: 94,
    });
    baseScore += 2;
  } else {
    recs.push({
      id: 'hab_inter',
      title: 'Konsekwencja to klucz',
      description: 'Ustaw przypomnienie w telefonie. Najlepsze efekty nootropowe pojawiają się po 2-3 tygodniach.',
      reason: `Masz już doświadczenie, więc wiesz, że adaptogeny wymagają czasu. Utrzymaj rutynę.`,
      type: 'habit',
      matchScore: 89,
    });
  }

  // 4. Additional criteria handling
  if (additional.includes('decaf') && form === 'coffee') {
    recs.push({
      id: 'add_decaf',
      title: 'Wybierz wersję bezkofeinową lub kapsułki',
      description: 'Zaznaczyłeś chęć unikania kofeiny. Upewnij się, że wybierasz czysty ekstrakt, a nie mieszankę z kawą.',
      reason: `Dostosowujemy się do Twojej preferencji unikania stymulantów.`,
      type: 'secondary',
      matchScore: 100,
    });
  }

  if (additional.includes('high_extract')) {
    recs.push({
      id: 'add_extract',
      title: 'Szukaj standaryzacji DER 10:1 lub wyższej',
      description: 'Zwróć uwagę na etykietę. Wybieraj produkty z widoczną zawartością polisacharydów (min. 30%).',
      reason: `Zależy Ci na sile działania. To kluczowy parametr przy wyborze suplementu premium.`,
      type: 'habit',
      matchScore: 95,
    });
  }

  // Ensure score is between 85 and 99 for realism
  const finalScore = Math.min(Math.max(baseScore + Math.floor(Math.random() * 10), 85), 99);

  return { score: finalScore, recs };
};
