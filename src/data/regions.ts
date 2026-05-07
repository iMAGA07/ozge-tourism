import paths from "./regions_paths.json";

export type Region = {
  id: string;
  name: string;
  d: string;
  blurb: string;
  highlights: string[];
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
    return {
      id: p.id,
      name: m.name ?? p.name,
      d: p.d,
      blurb: m.blurb,
      highlights: m.highlights,
    };
  }
);

export const regionViewBox = "0 0 1000 549";
