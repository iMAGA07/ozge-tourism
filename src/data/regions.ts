import paths from "./regions_paths.json";

export type Region = {
  id: string;
  name: string;
  d: string;
  blurb: string;
  highlights: string[];
  population?: string;
  area?: string;
  unesco?: string[];
  adventure?: string[];
};

// Region-level basic info (population, area, UNESCO, adventure).
const details: Record<
  string,
  { population: string; area: string; unesco?: string[]; adventure: string[] }
> = {
  KZ19: { population: "≈ 1.5M", area: "223,911 km²", unesco: ["Tamgaly Petroglyphs"], adventure: ["Hiking", "Skiing", "Lake trekking", "Horse riding"] },
  KZ75: { population: "≈ 2.2M", area: "682 km²", adventure: ["City tours", "Medeu & Shymbulak skiing", "Cable car"] },
  KZ47: { population: "≈ 780K", area: "165,642 km²", adventure: ["Desert trekking", "Off-road safari", "Canyoning", "Camping"] },
  KZ61: { population: "≈ 2.2M", area: "116,279 km²", unesco: ["Khoja Ahmed Yasawi Mausoleum"], adventure: ["Pilgrimage routes", "Desert tours", "Heritage walks"] },
  KZ71: { population: "≈ 1.4M", area: "722 km²", adventure: ["City & architecture tours", "Expo & Bayterek"] },
  KZ23: { population: "≈ 700K", area: "118,631 km²", adventure: ["Caspian coast", "Sturgeon waters", "Ural delta"] },
  KZ27: { population: "≈ 700K", area: "151,339 km²", adventure: ["Steppe rides", "River trips", "Cossack heritage"] },
  KZ15: { population: "≈ 930K", area: "300,629 km²", adventure: ["Steppe trails", "Salt lakes", "Mugalzhar hills"] },
  KZ39: { population: "≈ 870K", area: "196,001 km²", unesco: ["Saryarka (part)"], adventure: ["Birdwatching", "Lake camping", "Naurzum reserve"] },
  KZ59: { population: "≈ 530K", area: "98,040 km²", adventure: ["Lake retreats", "Pine forests", "Burabay nearby"] },
  KZ11: { population: "≈ 740K", area: "146,219 km²", unesco: ["Saryarka — Steppe & Lakes"], adventure: ["Burabay hiking", "Lake swimming", "Zerenda"] },
  KZ55: { population: "≈ 750K", area: "124,755 km²", adventure: ["Bayanaul trekking", "Irtysh river", "Granite peaks"] },
  KZ63: { population: "≈ 730K", area: "97,000 km²", adventure: ["Altai trekking", "Markakol lake", "Rafting", "Berel mounds"] },
  KZ10: { population: "≈ 600K", area: "185,500 km²", adventure: ["Steppe & taiga", "Abai heritage", "Semey"] },
  KZ33: { population: "≈ 670K", area: "118,000 km²", unesco: ["Tamgaly Petroglyphs"], adventure: ["Altyn-Emel", "Singing Dune", "Lake Balkhash", "Petroglyphs"] },
  KZ35: { population: "≈ 1.1M", area: "239,000 km²", adventure: ["Karkaraly pines", "Steppe rides", "Spassk memorial"] },
  KZ62: { population: "≈ 220K", area: "189,000 km²", adventure: ["Sacred Ulytau hills", "Jochi Mausoleum", "Steppe lore"] },
  KZ43: { population: "≈ 830K", area: "226,019 km²", adventure: ["Baikonur Cosmodrome", "Aral Sea", "Korkyt Ata"] },
  KZ31: { population: "≈ 1.2M", area: "144,264 km²", unesco: ["Aksu-Zhabagly (Western Tien-Shan)"], adventure: ["Aksu-Zhabagly reserve", "Taraz heritage", "Mausoleums"] },
  KZ79: { population: "≈ 1.2M", area: "1,170 km²", adventure: ["Old Town", "Bazaars", "Kazakh cuisine"] },
};

const meta: Record<string, { name?: string; blurb: string; highlights: string[] }> = {
  KZ19: {
    name: "Almaty Region",
    blurb:
      "Home to the Tian Shan mountains, alpine lakes, and the cultural heart of Kazakhstan.",
    highlights: ["Charyn Canyon", "Big Almaty Lake", "Kolsai Lakes", "Shymbulak"],
  },
  KZ75: {
    name: "Almaty City",
    blurb:
      "A leafy mountain city pulsing with cafés, art and the country's most refined cuisine.",
    highlights: ["Medeu", "Kok-Tobe", "Green Bazaar", "Panfilov Park"],
  },
  KZ47: {
    name: "Mangystau",
    blurb:
      "Surreal Caspian shorelines and chalk valleys that look like another planet.",
    highlights: ["Bozjyra", "Tuzbair", "Sherkala", "Kyzylkup"],
  },
  KZ61: {
    name: "Turkistan",
    blurb:
      "One of Central Asia's most important historical and spiritual centers.",
    highlights: ["Khoja Ahmed Yasawi", "Sauran", "Otrar", "Arystan-Bab"],
  },
  KZ71: {
    name: "Astana",
    blurb:
      "A futuristic capital rising from the steppe — bold architecture by night.",
    highlights: ["Bayterek", "Khan Shatyr", "Nur-Astana", "Expo"],
  },
  KZ23: {
    name: "Atyrau",
    blurb:
      "Where Europe meets Asia along the Ural River and the Caspian shore.",
    highlights: ["Caspian Sea", "Ural Delta", "Sturgeon waters"],
  },
  KZ27: {
    name: "West Kazakhstan",
    blurb:
      "Wide steppe and Cossack history along the rolling Ural River basin.",
    highlights: ["Uralsk Old Town", "River steppe", "Aksai"],
  },
  KZ15: {
    name: "Aktobe",
    blurb:
      "Gateway to vast prairies, salt flats and the rugged Mugalzhar hills.",
    highlights: ["Mugalzhar Hills", "Salt lakes", "Steppe trails"],
  },
  KZ39: {
    name: "Kostanay",
    blurb:
      "Northern grain belt with serene lakes and the Naurzum nature reserve.",
    highlights: ["Naurzum", "Lake Sarykol", "Birdwatching"],
  },
  KZ59: {
    name: "North Kazakhstan",
    blurb:
      "Forests, lakes and the gentle Kokshetau hills — Kazakhstan's quiet north.",
    highlights: ["Burabay", "Lake Shchuchye", "Pine forests"],
  },
  KZ11: {
    name: "Akmola",
    blurb:
      "Rolling hills, sacred lakes and the famed Burabay national park.",
    highlights: ["Burabay", "Zerenda", "Steppe lakes"],
  },
  KZ55: {
    name: "Pavlodar",
    blurb:
      "The mighty Irtysh River, ribbon-pine forests and Bayanaul's granite peaks.",
    highlights: ["Bayanaul", "Irtysh River", "Sabyndykol Lake"],
  },
  KZ63: {
    name: "East Kazakhstan",
    blurb:
      "Wild Altai mountains, turquoise rivers, and the gem-blue Lake Markakol.",
    highlights: ["Altai", "Markakol", "Berel mounds", "Rakhmanov Springs"],
  },
  KZ10: {
    name: "Abai",
    blurb:
      "The poetic land of Abai Qunanbaiuly — steppe, taiga, and literary heritage.",
    highlights: ["Semey", "Abai Museum", "Polygon memorial"],
  },
  KZ33: {
    name: "Jetisu",
    blurb:
      "The Land of Seven Rivers — singing dunes, mountains and ancient petroglyphs.",
    highlights: ["Altyn-Emel", "Singing Dune", "Tamgaly", "Lake Balkhash"],
  },
  KZ35: {
    name: "Karaganda",
    blurb:
      "A vast central region of steppe, Karkaraly pines and Soviet history.",
    highlights: ["Karkaraly", "Spassk", "Steppe horizons"],
  },
  KZ62: {
    name: "Ulytau",
    blurb:
      "The geographic heart of Eurasia — sacred mountains and Khan-era mausoleums.",
    highlights: ["Ulytau Hills", "Jochi Mausoleum", "Steppe lore"],
  },
  KZ43: {
    name: "Kyzylorda",
    blurb:
      "Gateway to the Aral and the Baikonur Cosmodrome — where rockets touch the steppe.",
    highlights: ["Baikonur", "Aral Sea", "Korkyt Ata"],
  },
  KZ31: {
    name: "Jambyl",
    blurb:
      "Silk Road oases, mausoleums of saints, and the Aksu-Zhabagly reserve.",
    highlights: ["Taraz", "Aksu-Zhabagly", "Aisha Bibi"],
  },
  KZ79: {
    name: "Shymkent",
    blurb:
      "Kazakhstan's southern soul — bazaars, plov, and the warmest welcome.",
    highlights: ["Old Town", "Bazaars", "Cuisine"],
  },
};

export const regions: Region[] = (paths as { id: string; name: string; d: string }[]).map(
  (p) => {
    const m = meta[p.id] ?? { blurb: "A beautiful region of Kazakhstan.", highlights: [] };
    const d = details[p.id];
    return {
      id: p.id,
      name: m.name ?? p.name,
      d: p.d,
      blurb: m.blurb,
      highlights: m.highlights,
      population: d?.population,
      area: d?.area,
      unesco: d?.unesco,
      adventure: d?.adventure,
    };
  }
);

export const regionViewBox = "0 0 1000 549";
