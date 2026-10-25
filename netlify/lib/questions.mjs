// Spillinnhold. Ligger på serveren (ikke i /public), slik at fasiten ikke kan leses av publikum.
// ⚠️ AI-GENERERT – IKKE VERIFISERT. Spørsmål og fasit er hentet fra manuset til Agne,
// men svaralternativene (feilsvarene) er laget som utkast. Verifiser alle fasiter før kvelden.

export const game = {
  title: 'Trainee Pursuit',
  event: 'Høstbord 2026',
  categories: [
    { id: 'sport', name: 'Sport og fritid', color: '#F07F2E' },
    { id: 'geo', name: 'Geografi', color: '#3D8FE0' },
    { id: 'hist', name: 'Historie', color: '#F4C430' },
    { id: 'und', name: 'Underholdning', color: '#E8589C' },
    { id: 'kunst', name: 'Kunst og litteratur', color: '#B0703F' },
    { id: 'natur', name: 'Naturfag', color: '#42B35E' },
  ],
  // Lagene på scenen (kakene)
  teams: [
    { id: 'trainee', name: 'Traineene' },
    { id: 'alumni', name: 'Alumni' },
    { id: 'bedrift', name: 'Medlemsbedriftene' },
  ],
  // Gruppene publikum velger mellom (statistikk per gruppe)
  groups: [
    { id: 'trainee', name: 'Trainee' },
    { id: 'alumni', name: 'Alumni' },
    { id: 'bedrift', name: 'Medlemsbedrift' },
  ],
  duration: 20, // sekunder per spørsmål
};

// type 'mc' = fire alternativer (answer = indeks 0–3)
// type 'number' = tallsvar, nærmest vinner (finalen)
export const questions = [
  {
    id: 'r1-sport', round: 'Runde 1', cat: 'sport', type: 'mc',
    text: 'Hva bestemte det internasjonale friidrettsforbundet (IAAF) i 1921 at standardlengden på en maraton skal være?',
    options: ['40,000 km', '42,000 km', '42,195 km', '42,750 km'],
    answer: 2,
  },
  {
    id: 'r1-geo', round: 'Runde 1', cat: 'geo', type: 'mc',
    text: 'Hvor mange kommuner har vi i Agder i dag?',
    options: ['18', '21', '25', '30'],
    answer: 2,
  },
  {
    id: 'r1-hist', round: 'Runde 1', cat: 'hist', type: 'mc',
    text: 'I hvilket år skal Norge feire 1000 år for slaget som regnes som en milepæl for samlingen av Norge?',
    options: ['2028', '2030', '2032', '2036'],
    answer: 1,
  },
  {
    id: 'r1-und', round: 'Runde 1', cat: 'und', type: 'mc',
    text: 'Hvilken sang vant Norge Eurovision Song Contest med den første gangen?',
    options: ['«Nocturne» – Secret Garden', '«La det swinge» – Bobbysocks', '«Fairytale» – Alexander Rybak', '«Voi Voi» – Nora Brockstedt'],
    answer: 1,
  },
  {
    id: 'r1-kunst', round: 'Runde 1', cat: 'kunst', type: 'mc',
    text: 'Denne norske forfatteren er mest kjent for sine dikt og skuespill, men han var også apotekerlærling i Grimstad. Hva het han?',
    options: ['Bjørnstjerne Bjørnson', 'Knut Hamsun', 'Henrik Wergeland', 'Henrik Ibsen'],
    answer: 3,
  },
  {
    id: 'r1-natur', round: 'Runde 1', cat: 'natur', type: 'mc',
    text: 'Vi kan få det fra tran, men kroppen kan også produsere det selv når huden får sollys. Hvilket vitamin snakker vi om?',
    options: ['A-vitamin', 'B12-vitamin', 'C-vitamin', 'D-vitamin'],
    answer: 3,
  },
  {
    id: 'f-sport', round: 'Finale', cat: 'sport', type: 'number',
    text: 'I hvilket år ble IK Start stiftet?',
    unit: 'årstall', answer: 1905,
  },
  {
    id: 'f-geo', round: 'Finale', cat: 'geo', type: 'number',
    text: 'Ved Lindesnes fyr står et skilt som viser avstanden til Nordkapp. Hvor mange kilometer står det på skiltet?',
    unit: 'km', answer: 2518,
  },
  {
    id: 'f-hist', round: 'Finale', cat: 'hist', type: 'number',
    text: 'Hvor mange eidsvollsmenn var det i 1814?',
    unit: 'personer', answer: 112,
  },
  {
    id: 'f-und', round: 'Finale', cat: 'und', type: 'number',
    text: 'Hvor lang er «Bohemian Rhapsody»? Svar i sekunder.',
    unit: 'sekunder', answer: 355, answerLabel: '5:55 (355 sekunder)',
  },
  {
    id: 'f-kunst', round: 'Finale', cat: 'kunst', type: 'number',
    text: 'Hvor gammel var Mozart da han døde?',
    unit: 'år', answer: 35,
  },
  {
    id: 'f-natur', round: 'Finale', cat: 'natur', type: 'number',
    text: 'Hvor mange grunnstoffer er offisielt godkjent i det periodiske systemet i dag?',
    unit: 'grunnstoffer', answer: 118,
  },
];
