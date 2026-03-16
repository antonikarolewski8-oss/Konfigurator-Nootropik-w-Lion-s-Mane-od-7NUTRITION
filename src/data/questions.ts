import { Briefcase, Brain, Target, Coffee, Clock, History, CheckSquare } from 'lucide-react';

export type Option = {
  id: string;
  label: string;
  description?: string;
  icon?: any;
};

export type Question = {
  id: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multi';
  icon: any;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: 'industry',
    title: 'W jakiej branży pracujesz?',
    subtitle: 'Pomoże nam to zrozumieć specyfikę Twojego obciążenia umysłowego.',
    type: 'single',
    icon: Briefcase,
    options: [
      { id: 'it', label: 'IT / Programowanie', description: 'Wymaga długotrwałego skupienia i rozwiązywania problemów.' },
      { id: 'creative', label: 'Branża kreatywna', description: 'Wymaga nieszablonowego myślenia i innowacyjności.' },
      { id: 'finance', label: 'Finanse / Analityka', description: 'Wymaga precyzji i pracy z dużą ilością danych.' },
      { id: 'student', label: 'Edukacja / Nauka', description: 'Wymaga przyswajania dużej ilości nowej wiedzy.' },
      { id: 'management', label: 'Zarządzanie', description: 'Wymaga podejmowania szybkich decyzji i odporności na stres.' },
      { id: 'other', label: 'Inna', description: 'Ogólne wsparcie funkcji poznawczych.' },
    ],
  },
  {
    id: 'experience',
    title: 'Twój poziom doświadczenia z nootropikami?',
    subtitle: 'Dostosujemy szczegółowość naszych rekomendacji.',
    type: 'single',
    icon: Brain,
    options: [
      { id: 'beginner', label: 'Początkujący', description: 'Dopiero zaczynam swoją przygodę z suplementacją.' },
      { id: 'intermediate', label: 'Średnio zaawansowany', description: 'Znam podstawy i stosowałem już niektóre adaptogeny.' },
      { id: 'expert', label: 'Ekspert (Biohacker)', description: 'Doskonale znam swoje ciało i szukam zaawansowanych rozwiązań.' },
    ],
  },
  {
    id: 'goal',
    title: 'Jaki jest Twój główny cel?',
    subtitle: 'Wybierz najważniejsze wyzwanie, z którym się mierzysz.',
    type: 'single',
    icon: Target,
    options: [
      { id: 'focus', label: 'Głębokie skupienie', description: 'Potrzebuję pracować w stanie "flow" przez wiele godzin.' },
      { id: 'memory', label: 'Lepsza pamięć', description: 'Chcę szybciej przyswajać informacje i łatwiej je przypominać.' },
      { id: 'stress', label: 'Redukcja stresu', description: 'Szukam spokoju umysłu i lepszego radzenia sobie z presją.' },
      { id: 'creativity', label: 'Kreatywność', description: 'Potrzebuję przełamać blokady twórcze i generować nowe pomysły.' },
    ],
  },
  {
    id: 'form',
    title: 'Preferowana forma podania?',
    subtitle: 'Jak najchętniej przyjmujesz suplementy?',
    type: 'single',
    icon: Coffee,
    options: [
      { id: 'coffee', label: 'Kawa grzybowa', description: 'Zastępstwo dla porannej kawy, rytuał i energia.' },
      { id: 'capsules', label: 'Kapsułki', description: 'Szybko, wygodnie i z precyzyjną dawką.' },
      { id: 'powder', label: 'Ekstrakt w proszku', description: 'Do dodawania do własnych napojów lub smoothies.' },
      { id: 'any', label: 'Bez znaczenia', description: 'Dostosuję się do najlepszej rekomendacji.' },
    ],
  },
  {
    id: 'timeline',
    title: 'Jakich efektów oczekujesz?',
    subtitle: "Lion's Mane działa najlepiej przy regularnym stosowaniu.",
    type: 'single',
    icon: Clock,
    options: [
      { id: 'immediate', label: 'Szybki zastrzyk energii', description: 'Potrzebuję wsparcia tu i teraz (np. przed ważnym zadaniem).' },
      { id: 'longterm', label: 'Długofalowe wsparcie', description: 'Zależy mi na trwałej neurogenezie i poprawie plastyczności mózgu.' },
      { id: 'balanced', label: 'Złoty środek', description: 'Trochę energii na co dzień, ale z myślą o przyszłości.' },
    ],
  },
  {
    id: 'past',
    title: 'Twoje dotychczasowe doświadczenia?',
    subtitle: 'Czy stosowałeś już podobne rozwiązania?',
    type: 'single',
    icon: History,
    options: [
      { id: 'none', label: 'Brak', description: 'To mój pierwszy raz z grzybami funkcjonalnymi.' },
      { id: 'coffee_only', label: 'Tylko zwykła kawa', description: 'Piję dużo kawy, ale szukam zdrowszej alternatywy.' },
      { id: 'other_mushrooms', label: 'Inne grzyby', description: 'Stosowałem np. Cordyceps, Reishi, Chaga.' },
      { id: 'lions_mane', label: "Lion's Mane", description: 'Stosowałem, ale szukam lepszej jakości lub innej formy.' },
    ],
  },
  {
    id: 'additional',
    title: 'Dodatkowe preferencje',
    subtitle: 'Zaznacz wszystko, co jest dla Ciebie ważne.',
    type: 'multi',
    icon: CheckSquare,
    options: [
      { id: 'vegan', label: 'Produkt w 100% wegański' },
      { id: 'decaf', label: 'Bez kofeiny' },
      { id: 'high_extract', label: 'Wysoka standaryzacja (silny ekstrakt)' },
      { id: 'budget', label: 'Rozwiązanie budżetowe' },
    ],
  },
];
