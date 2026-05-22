// Basic facts for the seven countries Ozge operates in.
// Centroid x/y are in the world-ca.svg coordinate space
// (viewBox 614.12 88.58 136.96 99.34, equirectangular).

export type CountryInfo = {
  code: "KZ" | "UZ" | "KG" | "TJ" | "TM" | "AF" | "IR";
  flag: string; // /flags/<flag>.svg
  name: string; // common name
  official: string;
  capital: string;
  population: string;
  area: string;
  currency: string;
  languages: string;
  ethnicGroups: string;
  religions: string;
  destinations: string[];
  unesco: string[];
  cx: number;
  cy: number;
  hasRegions?: boolean;
};

export const countryInfo: CountryInfo[] = [
  {
    code: "KZ",
    flag: "kz",
    name: "Kazakhstan",
    official: "Republic of Kazakhstan",
    capital: "Astana",
    population: "≈ 20.3 million",
    area: "2,724,900 km² (9th largest)",
    currency: "Kazakhstani tenge (₸, KZT)",
    languages: "Kazakh (state) · Russian (official)",
    ethnicGroups: "Kazakh ~71% · Russian ~15%",
    religions: "Islam (Sunni) ~70% · Christianity ~26%",
    destinations: ["Almaty", "Charyn Canyon", "Burabay", "Mangystau", "Kolsai Lakes"],
    unesco: [
      "Mausoleum of Khoja Ahmed Yasawi",
      "Petroglyphs of Tamgaly",
      "Saryarka — Steppe & Lakes",
      "Western Tien-Shan",
      "Silk Roads: Tian-Shan Corridor",
    ],
    cx: 681.3,
    cy: 118.7,
    hasRegions: true,
  },
  {
    code: "UZ",
    flag: "uz",
    name: "Uzbekistan",
    official: "Republic of Uzbekistan",
    capital: "Tashkent",
    population: "≈ 36 million",
    area: "448,978 km²",
    currency: "Uzbekistani soʻm (UZS)",
    languages: "Uzbek (official)",
    ethnicGroups: "Uzbek ~84% · Tajik · Kazakh · Russian",
    religions: "Islam (Sunni) ~88% · Eastern Orthodox",
    destinations: ["Samarkand", "Bukhara", "Khiva", "Registan", "Tashkent"],
    unesco: [
      "Itchan Kala (Khiva)",
      "Historic Centre of Bukhara",
      "Samarkand — Crossroads of Cultures",
      "Historic Centre of Shakhrisyabz",
      "Western Tien-Shan",
    ],
    cx: 681.4,
    cy: 135.7,
  },
  {
    code: "KG",
    flag: "kg",
    name: "Kyrgyzstan",
    official: "Kyrgyz Republic",
    capital: "Bishkek",
    population: "≈ 7 million",
    area: "199,951 km²",
    currency: "Kyrgyzstani som (KGS)",
    languages: "Kyrgyz (state) · Russian (official)",
    ethnicGroups: "Kyrgyz ~73% · Uzbek · Russian",
    religions: "Islam (Sunni) ~90% · Russian Orthodox",
    destinations: ["Issyk-Kul", "Song-Kul", "Ala-Archa", "Tash Rabat", "Bishkek"],
    unesco: [
      "Sulaiman-Too Sacred Mountain",
      "Silk Roads: Tian-Shan Corridor",
      "Western Tien-Shan",
    ],
    cx: 705.5,
    cy: 135.1,
  },
  {
    code: "TJ",
    flag: "tj",
    name: "Tajikistan",
    official: "Republic of Tajikistan",
    capital: "Dushanbe",
    population: "≈ 10 million",
    area: "143,100 km²",
    currency: "Tajikistani somoni (TJS)",
    languages: "Tajik (state) · Russian (inter-ethnic)",
    ethnicGroups: "Tajik ~84% · Uzbek",
    religions: "Islam (Sunni) ~95%",
    destinations: ["Pamir Highway", "Iskanderkul", "Wakhan Valley", "Fann Mountains", "Dushanbe"],
    unesco: [
      "Proto-urban site of Sarazm",
      "Tajik National Park (Pamirs)",
      "Silk Roads: Zarafshan-Karakum",
    ],
    cx: 696.6,
    cy: 143.0,
  },
  {
    code: "TM",
    flag: "tm",
    name: "Turkmenistan",
    official: "Turkmenistan",
    capital: "Ashgabat",
    population: "≈ 7 million",
    area: "491,210 km²",
    currency: "Turkmenistani manat (TMT)",
    languages: "Turkmen (official)",
    ethnicGroups: "Turkmen ~85% · Uzbek · Russian",
    religions: "Islam (Sunni) ~89% · Eastern Orthodox",
    destinations: ["Ashgabat", "Darvaza Gas Crater", "Ancient Merv", "Konye-Urgench", "Karakum Desert"],
    unesco: [
      "Ancient Merv",
      "Kunya-Urgench",
      "Parthian Fortresses of Nisa",
      "Silk Roads: Zarafshan-Karakum",
    ],
    cx: 662.4,
    cy: 140.7,
  },
  {
    code: "AF",
    flag: "af",
    name: "Afghanistan",
    official: "Afghanistan",
    capital: "Kabul",
    population: "≈ 42 million",
    area: "652,230 km²",
    currency: "Afghan afghani (AFN)",
    languages: "Pashto · Dari (Persian)",
    ethnicGroups: "Pashtun · Tajik · Hazara · Uzbek",
    religions: "Islam (Sunni ~85% · Shia ~14%)",
    destinations: ["Band-e-Amir", "Bamiyan Valley", "Wakhan Corridor", "Herat", "Kabul"],
    unesco: [
      "Minaret & Remains of Jam",
      "Cultural Landscape of Bamiyan Valley",
    ],
    cx: 688.2,
    cy: 153.3,
  },
  {
    code: "IR",
    flag: "ir",
    name: "Iran",
    official: "Islamic Republic of Iran",
    capital: "Tehran",
    population: "≈ 89 million",
    area: "1,648,195 km² (17th largest)",
    currency: "Iranian rial (IRR)",
    languages: "Persian / Farsi (official)",
    ethnicGroups: "Persian · Azeri · Kurd · Lur · Arab",
    religions: "Islam (Shia ~90% · Sunni ~9%)",
    destinations: ["Isfahan", "Persepolis", "Shiraz", "Yazd", "Tehran"],
    unesco: [
      "Persepolis",
      "Naqsh-e Jahan Square, Isfahan",
      "Pasargadae",
      "Historic City of Yazd",
      "Golestan Palace",
    ],
    cx: 648.2,
    cy: 157.5,
  },
];

export const countryByCode = Object.fromEntries(
  countryInfo.map((c) => [c.code, c])
) as Record<CountryInfo["code"], CountryInfo>;
