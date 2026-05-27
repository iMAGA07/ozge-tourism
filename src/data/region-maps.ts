import geo from "./region_geo.json";

export type RegionGeo = {
  id: string;
  name: string;
  area: number;
  d: string;
  lx: number | null;
  ly: number | null;
};
type CountryGeo = { viewBox: string; regions: RegionGeo[] };

export type RegionFull = RegionGeo & {
  blurb: string;
  destinations: string[];
  unesco: string[];
  adventure: string[];
};

type Meta = {
  blurb?: string;
  destinations?: string[];
  unesco?: string[];
  adventure?: string[];
};

// Hand-authored info for the notable regions. Anything not listed falls
// back to the country defaults below (name + computed area still shown).
const meta: Record<string, Record<string, Meta>> = {
  UZ: {
    Samarkand: { blurb: "The Silk Road's crown jewel — Registan Square, Shah-i-Zinda and Gur-e-Amir.", destinations: ["Registan", "Shah-i-Zinda", "Gur-e-Amir"], unesco: ["Samarkand — Crossroads of Cultures"], adventure: ["Heritage tours", "Photography", "Bazaars"] },
    Bukhoro: { blurb: "A living medieval city — Po-i-Kalyan, the Ark Fortress and 140+ monuments.", destinations: ["Po-i-Kalyan", "Ark Fortress", "Lyab-i Hauz"], unesco: ["Historic Centre of Bukhara"], adventure: ["Heritage walks", "Caravanserai stays"] },
    Khorezm: { blurb: "Home to Khiva's walled old town, frozen in time amid the Kyzylkum sands.", destinations: ["Itchan Kala (Khiva)", "Kunya-Ark"], unesco: ["Itchan Kala"], adventure: ["Desert tours", "Heritage walks"] },
    Tashkent: { blurb: "Uzbekistan's capital — Chorsu Bazaar, Soviet-era metro and modern cafés.", destinations: ["Chorsu Bazaar", "Hazrati Imam", "Metro"], adventure: ["City tours", "Cuisine"] },
    Karakalpakstan: { blurb: "The vanished Aral Sea, the Savitsky 'desert Louvre', and ancient fortresses.", destinations: ["Aral Sea", "Savitsky Museum", "Mizdakhan"], adventure: ["Off-road safari", "Desert camping"] },
    Kashkadarya: { blurb: "Shakhrisabz — birthplace of Amir Timur and his soaring Ak-Saray palace.", destinations: ["Shakhrisabz", "Ak-Saray"], unesco: ["Historic Centre of Shakhrisyabz"], adventure: ["Heritage tours"] },
    Surkhandarya: { blurb: "Termez on the Amu Darya — Buddhist stupas and the gateway to Afghanistan.", destinations: ["Termez", "Fayaz-Tepe"], adventure: ["Heritage tours"] },
    Ferghana: { blurb: "The lush Ferghana Valley — silk weaving in Margilan and Rishtan ceramics.", destinations: ["Margilan silk", "Rishtan ceramics"], adventure: ["Craft workshops", "Valley tours"] },
    Navoi: { blurb: "Nurata's sacred spring, Aydarkul lake and yurt camps in the Kyzylkum.", destinations: ["Nurata", "Aydarkul Lake"], adventure: ["Yurt camps", "Desert trekking", "Camel rides"] },
  },
  KG: {
    "Ysyk-Köl": { blurb: "The world's second-largest alpine lake, ringed by snow peaks and beaches.", destinations: ["Issyk-Kul", "Jeti-Ögüz", "Cholpon-Ata petroglyphs"], adventure: ["Lake trekking", "Beaches", "Horse riding"] },
    Naryn: { blurb: "High pastures, the Tash Rabat caravanserai and the jewel-like Song-Kul lake.", destinations: ["Tash Rabat", "Song-Kul"], adventure: ["Yurt stays", "Horse trekking", "Eagle hunting"] },
    Osh: { blurb: "Central Asia's oldest city, crowned by the sacred Sulaiman-Too mountain.", destinations: ["Sulaiman-Too", "Osh Bazaar"], unesco: ["Sulaiman-Too Sacred Mountain"], adventure: ["Heritage walks", "Bazaars"] },
    Chuy: { blurb: "Bishkek's home region — Ala-Archa gorge and the Burana Tower minaret.", destinations: ["Ala-Archa", "Burana Tower"], adventure: ["Hiking", "Day trips"] },
    "Jalal-Abad": { blurb: "Walnut forests and the layered Sary-Chelek biosphere lake.", destinations: ["Sary-Chelek", "Arslanbob"], adventure: ["Trekking", "Forest walks"] },
    Talas: { blurb: "The Manas Ordo complex — heartland of the Kyrgyz national epic.", destinations: ["Manas Ordo"], adventure: ["Cultural tours", "Hiking"] },
    Bishkek: { blurb: "The leafy capital — Soviet squares, museums and mountain backdrops.", destinations: ["Ala-Too Square", "Osh Bazaar"], adventure: ["City tours"] },
  },
  TJ: {
    "Gorno-Badakhshan": { blurb: "The roof of the world — the Pamir Highway, the Wakhan and Bartang valleys.", destinations: ["Pamir Highway", "Wakhan Valley", "Bulunkul"], unesco: ["Tajik National Park (Pamirs)"], adventure: ["High-altitude road trips", "Trekking", "Homestays"] },
    Leninabad: { blurb: "Sughd — historic Khujand, turquoise Iskanderkul and the Fann Mountains.", destinations: ["Khujand", "Iskanderkul", "Fann Mountains"], unesco: ["Proto-urban site of Sarazm"], adventure: ["Mountain trekking", "Lake camping"] },
    Khatlon: { blurb: "Fertile southern plains, the Hulbuk fortress and the Vakhsh river.", destinations: ["Hulbuk Fortress"], adventure: ["Heritage tours", "River trips"] },
    Dushanbe: { blurb: "Tajikistan's capital and the ancient Hisor fortress on its doorstep.", destinations: ["Hisor Fortress", "Rudaki Park"], adventure: ["City tours"] },
  },
  TM: {
    Ahal: { blurb: "White-marble Ashgabat, the Parthian Nisa fortress and the Darvaza fire crater.", destinations: ["Ashgabat", "Nisa", "Darvaza Crater"], unesco: ["Parthian Fortresses of Nisa"], adventure: ["Desert camping", "City tours"] },
    Mary: { blurb: "Ancient Merv — once one of the largest cities on Earth on the Silk Road.", destinations: ["Ancient Merv", "Gonur Depe"], unesco: ["Ancient Merv"], adventure: ["Heritage tours", "Desert"] },
    Balkan: { blurb: "The Caspian shore, the candy-striped Yangykala canyon and Avaza resort.", destinations: ["Yangykala Canyon", "Avaza", "Caspian Sea"], adventure: ["Canyon tours", "Coast"] },
    Tashauz: { blurb: "Dashoguz — gateway to the mausoleums of Konye-Urgench.", destinations: ["Konye-Urgench"], unesco: ["Kunya-Urgench"], adventure: ["Heritage tours"] },
    Chardzhou: { blurb: "Lebap — the Amu Darya river and the Repetek desert reserve.", destinations: ["Repetek Reserve", "Amu Darya"], adventure: ["Desert", "River trips"] },
  },
  AF: {
    Bamyan: { blurb: "The Buddha cliffs and the six dazzling blue lakes of Band-e-Amir.", destinations: ["Band-e-Amir", "Buddha Niches", "Shahr-e Gholghola"], unesco: ["Cultural Landscape of the Bamiyan Valley"], adventure: ["Lake trekking", "Hiking"] },
    Badakhshan: { blurb: "The Wakhan Corridor and the high Pamirs — lapis lazuli country.", destinations: ["Wakhan Corridor", "Pamir", "Lake Shiveh"], adventure: ["High-altitude trekking", "Homestays"] },
    Balkh: { blurb: "Mazar-i-Sharif's Blue Mosque and the ruins of ancient Balkh.", destinations: ["Blue Mosque", "Ancient Balkh"], adventure: ["Heritage tours"] },
    Hirat: { blurb: "Herat — the citadel, the Friday Mosque and Timurid minarets.", destinations: ["Herat Citadel", "Friday Mosque", "Musalla Minarets"], adventure: ["Heritage walks"] },
    Kabul: { blurb: "The capital — Babur's Gardens, the bazaar and the National Museum.", destinations: ["Babur's Gardens", "National Museum"], adventure: ["City tours"] },
    Ghor: { blurb: "The remote, soaring Minaret of Jam in a deep river gorge.", destinations: ["Minaret of Jam"], unesco: ["Minaret and Remains of Jam"], adventure: ["Remote heritage"] },
  },
  IR: {
    Esfahan: { blurb: "'Half the world' — Naqsh-e Jahan Square, blue-tiled mosques and old bridges.", destinations: ["Naqsh-e Jahan", "Si-o-se-pol", "Grand Bazaar"], unesco: ["Meidan Emam, Esfahan"], adventure: ["Architecture tours", "Bazaars"] },
    Fars: { blurb: "Persepolis, Pasargadae and the gardens and poets of Shiraz.", destinations: ["Persepolis", "Pasargadae", "Shiraz"], unesco: ["Persepolis", "Pasargadae"], adventure: ["Heritage tours"] },
    Yazd: { blurb: "A golden adobe desert city of windcatchers and Zoroastrian fire temples.", destinations: ["Old City", "Windcatchers", "Fire Temple"], unesco: ["Historic City of Yazd"], adventure: ["Desert tours", "Heritage walks"] },
    Tehran: { blurb: "Iran's capital — the Golestan Palace, grand museums and Alborz peaks.", destinations: ["Golestan Palace", "Grand Bazaar", "Tochal"], unesco: ["Golestan Palace"], adventure: ["City tours", "Skiing"] },
    "Razavi Khorasan": { blurb: "Mashhad's Imam Reza shrine and the ancient gardens of Tus.", destinations: ["Imam Reza Shrine", "Tus", "Nishapur"], adventure: ["Pilgrimage", "Heritage"] },
    Kerman: { blurb: "The Bam citadel, the otherworldly Lut Desert and the Shazdeh Garden.", destinations: ["Bam Citadel", "Lut Desert", "Shazdeh Garden"], unesco: ["Bam & its Cultural Landscape", "Lut Desert"], adventure: ["Desert safari", "Heritage"] },
    Mazandaran: { blurb: "Lush Caspian coast, rice terraces and the Hyrcanian forests.", destinations: ["Caspian Coast", "Hyrcanian Forests"], unesco: ["Hyrcanian Forests"], adventure: ["Coast", "Forest hikes"] },
    Gilan: { blurb: "Caspian beaches, the Masuleh hill village and tea plantations.", destinations: ["Masuleh", "Caspian Coast"], adventure: ["Coast", "Village stays"] },
    Hormozgan: { blurb: "The rainbow island of Hormuz and the geopark of Qeshm in the Gulf.", destinations: ["Hormuz Island", "Qeshm Geopark"], adventure: ["Island hopping", "Beaches"] },
    "West Azarbaijan": { blurb: "Takht-e Soleyman's sacred crater lake and the shores of Lake Urmia.", destinations: ["Takht-e Soleyman", "Lake Urmia"], unesco: ["Takht-e Soleyman"], adventure: ["Heritage", "Nature"] },
    Kermanshah: { blurb: "The Bisotun reliefs and the rock sanctuary of Taq-e Bostan.", destinations: ["Bisotun", "Taq-e Bostan"], unesco: ["Bisotun"], adventure: ["Heritage"] },
    Khuzestan: { blurb: "The ziggurat of Chogha Zanbil and ancient Susa on the plains.", destinations: ["Chogha Zanbil", "Susa", "Shushtar"], unesco: ["Tchogha Zanbil", "Susa", "Shushtar Hydraulic System"], adventure: ["Ancient sites"] },
    Kordestan: { blurb: "The terraced Hawraman villages high in the Zagros mountains.", destinations: ["Uramanat", "Palangan"], unesco: ["Cultural Landscape of Hawraman/Uramanat"], adventure: ["Mountain villages", "Trekking"] },
  },
};

const defaults: Record<
  string,
  { blurb: (n: string) => string; adventure: string[] }
> = {
  UZ: { blurb: (n) => `${n} — a region of Uzbekistan on the ancient Silk Road.`, adventure: ["Silk Road tours", "City visits", "Crafts"] },
  KG: { blurb: (n) => `${n} — a mountainous region of Kyrgyzstan in the Tian Shan.`, adventure: ["Trekking", "Horse riding", "Yurt stays"] },
  TJ: { blurb: (n) => `${n} — a region of Tajikistan amid soaring mountains.`, adventure: ["Trekking", "Mountain roads"] },
  TM: { blurb: (n) => `${n} — a region of Turkmenistan between desert and Silk Road.`, adventure: ["Desert tours", "Heritage"] },
  AF: { blurb: (n) => `${n} — a province of Afghanistan in the Hindu Kush region.`, adventure: ["Heritage", "Mountains"] },
  IR: { blurb: (n) => `${n} — a province of Iran rich in history and landscape.`, adventure: ["Heritage tours", "Nature"] },
};

function build(): Record<string, { viewBox: string; regions: RegionFull[] }> {
  const data = geo as unknown as Record<string, CountryGeo>;
  const out: Record<string, { viewBox: string; regions: RegionFull[] }> = {};
  for (const code of Object.keys(data)) {
    const cg = data[code];
    const cMeta = meta[code] ?? {};
    const def = defaults[code];
    out[code] = {
      viewBox: cg.viewBox,
      regions: cg.regions.map((r) => {
        const m = cMeta[r.name] ?? {};
        return {
          ...r,
          blurb: m.blurb ?? def.blurb(r.name),
          destinations: m.destinations ?? [],
          unesco: m.unesco ?? [],
          adventure: m.adventure ?? def.adventure,
        };
      }),
    };
  }
  return out;
}

export const regionMaps = build();
