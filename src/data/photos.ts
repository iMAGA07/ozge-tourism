// Curated photo set for the website. Filenames map to /public/photos/*.jpg
// Note: many of these are real expedition photos, not stock landscapes.
// We use object-position to feature the strongest part of each frame.

export const photos = {
  // Hero — horses on the open steppe under big sky (most iconically Kazakh)
  hero: { src: "IMG_0898.jpg", position: "center 35%" },
  heroAlt: { src: "IMG_3882.jpg", position: "center 35%" },

  // Story / experiences — mostly landscape-leading frames
  mountain: { src: "IMG_2600_3.jpg", position: "center 30%" },
  desert: { src: "IMG_3882.jpg", position: "center 30%" },
  lake: { src: "IMG_3716.jpg", position: "center 30%" },
  steppe: { src: "IMG_6075.jpg", position: "center 28%" },
  city: { src: "IMG_2972.jpg", position: "center 30%" },
  culture: { src: "IMG_8742.jpg", position: "center 35%" },
  campfire: { src: "IMG_6919.jpg", position: "center 30%" },
  horse: { src: "IMG_0898.jpg", position: "center 35%" },
  road: { src: "IMG_1751.jpg", position: "center 30%" },
  canyon: { src: "IMG_8134.jpg", position: "center 30%" },
  yurt: { src: "IMG_8742.jpg", position: "center 35%" },
  river: { src: "IMG_3865.jpg", position: "center 30%" },
  group: { src: "IMG_6160.jpg", position: "center 35%" },
  cuisine: { src: "IMG_7140.jpg", position: "center 35%" },
  altai: { src: "IMG_3882.jpg", position: "center 30%" },
  sunrise: { src: "IMG_2600_3.jpg", position: "center 25%" },
  trail: { src: "IMG_6585.jpg", position: "center 30%" },
  golden: { src: "IMG_6919.jpg", position: "center 30%" },
  guide: { src: "IMG_5616_2.jpg", position: "center 30%" },
  family: { src: "IMG_6504_2.jpg", position: "center 30%" },
};

// Ordered list used for galleries / marquee strips
export const galleryStrip: string[] = [
  "IMG_0898.jpg",
  "IMG_3882.jpg",
  "IMG_2600_3.jpg",
  "IMG_6075.jpg",
  "IMG_3716.jpg",
  "IMG_1751.jpg",
  "IMG_5616_2.jpg",
  "IMG_8134.jpg",
  "IMG_6919.jpg",
  "IMG_8742.jpg",
  "IMG_2972.jpg",
  "IMG_6585.jpg",
  "IMG_7140.jpg",
  "IMG_3865.jpg",
  "IMG_2332_3.jpg",
  "IMG_2799.jpg",
  "IMG_6504_2.jpg",
  "IMG_6750_2.jpg",
  "IMG_3858.jpg",
  "IMG_7766.jpg",
];

export const storyTiles = [
  {
    img: "IMG_3882.jpg",
    position: "center 28%",
    title: "Misty Burabay",
    sub: "Granite peaks above sacred lakes",
  },
  {
    img: "IMG_0898.jpg",
    position: "center 40%",
    title: "Horse country",
    sub: "Riding where the steppe began",
  },
  {
    img: "IMG_8134.jpg",
    position: "center 30%",
    title: "Hidden canyons",
    sub: "Quiet sandstone in the south",
  },
  {
    img: "IMG_8742.jpg",
    position: "center 45%",
    title: "Inside the yurt",
    sub: "A felt cathedral on the steppe",
  },
  {
    img: "IMG_2600_3.jpg",
    position: "center 22%",
    title: "Burabay rocks",
    sub: "Pyramid peaks rising from pine",
  },
  {
    img: "IMG_6919.jpg",
    position: "center 30%",
    title: "Golden hour camp",
    sub: "When the steppe goes copper",
  },
];

export const featuredDestinations = [
  {
    img: "IMG_2600_3.jpg",
    position: "center 22%",
    region: "Akmola",
    name: "Burabay & Sacred Lakes",
    blurb:
      "Granite peaks rising from pine forests above turquoise water — Kazakhstan's most beloved national park.",
  },
  {
    img: "IMG_8134.jpg",
    position: "center 30%",
    region: "South Kazakhstan",
    name: "Hidden Canyons",
    blurb:
      "Sandstone walls, sculpted shadows and silence you can hear — far from any tourist trail.",
  },
  {
    img: "IMG_0898.jpg",
    position: "center 35%",
    region: "Akmola Steppe",
    name: "Riding the Open Steppe",
    blurb:
      "Half a day on horseback through grasslands that feel as if they go on forever.",
  },
  {
    img: "IMG_3865.jpg",
    position: "center 25%",
    region: "Burabay",
    name: "Mountain Lake Country",
    blurb:
      "Mythic rock sculptures, mirror-still lakes and the freshest air in the country.",
  },
  {
    img: "IMG_6919.jpg",
    position: "center 30%",
    region: "Steppe",
    name: "Yurt Camps Under the Stars",
    blurb:
      "A felt-clad night on the open steppe with horses, kumis and silence.",
  },
  {
    img: "IMG_7766.jpg",
    position: "center 45%",
    region: "Almaty",
    name: "Winter Snow Adventures",
    blurb:
      "Skiing, snowboarding and snowshoe trails through silent winter forests.",
  },
];
