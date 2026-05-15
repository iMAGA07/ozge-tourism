export const adventures = {
  weekend: [
    {
      dates: "May 1–3",
      regions: ["Mangystau", "Almaty", "South Kazakhstan", "East Kazakhstan"],
    },
    {
      dates: "May 8–10",
      regions: ["Mangystau", "Almaty", "South Kazakhstan", "East Kazakhstan"],
    },
    {
      dates: "May 15–17",
      regions: ["Mangystau", "Almaty", "South Kazakhstan", "East Kazakhstan"],
    },
    {
      dates: "May 22–24",
      regions: ["Mangystau", "Almaty", "South Kazakhstan", "East Kazakhstan"],
    },
    {
      dates: "May 29–31",
      regions: ["Mangystau", "Almaty", "South Kazakhstan", "East Kazakhstan"],
    },
  ],
  longform: [
    {
      dates: "May 1–10",
      regions: ["Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan"],
    },
    {
      dates: "May 8–17",
      regions: ["Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan"],
    },
    {
      dates: "May 15–24",
      regions: ["Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan"],
    },
    {
      dates: "May 22–31",
      regions: ["Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan"],
    },
  ],
};

export const services = [
  {
    title: "Individual, Family & Private Group Tours",
    desc: "",
    icon: "users" as const,
  },
  {
    title: "Customized City Tours",
    desc: "Astana, Tashkent, Bishkek, Ashgabat, Dushanbe, Kabul, Tehran, & beyond.",
    icon: "city" as const,
  },
  {
    title: "Full-Day & Multi-Day Regional Tours",
    desc: "Across Central Asia.",
    icon: "map" as const,
  },
  {
    title: "Adventure & Outdoor Activities",
    desc: "Horse riding, hiking, cycling, trekking, lakes, camping, mountains, skiing, snowboarding, and more (you name it!).",
    icon: "mountain" as const,
  },
  {
    title: "Cultural & Traditional Experiences",
    desc: "Authentic Kazakh cuisine, village visits, museums, and historical sites.",
    icon: "landmark" as const,
  },
  {
    title: "Airport Services & Transportation",
    desc: "Pick-up, drop-off, and VIP transfers.",
    icon: "car" as const,
  },
  {
    title: "Corporate, Embassy & International Organization Packages",
    desc: "",
    icon: "briefcase" as const,
  },
  {
    title: "University & Student Programs",
    desc: "Discounts, summer/winter camps, field trips, and more.",
    icon: "graduation" as const,
  },
  {
    title: "24/7 On-Demand Tourism Services",
    desc: "",
    icon: "headset" as const,
  },
  {
    title: "Flight Bookings & Accommodation Reservations",
    desc: "",
    icon: "plane" as const,
  },
  {
    title: "Transportation Services",
    desc: "Economy, business, comfortable, premium.",
    icon: "car" as const,
  },
  {
    title: "Content Creation & Media Support",
    desc: "Photography, drone shoots, and storytelling.",
    icon: "camera" as const,
  },
];

export type ServiceIcon = (typeof services)[number]["icon"];

export const whyUs = [
  {
    title: "Available 24/7",
    desc: "",
  },
  {
    title: "Professional, multilingual, and highly experienced guides",
    desc: "",
  },
  {
    title: "Fully flexible, fully customized, and fully comprehensive packages",
    desc: "Covering A to Z of your adventure, including but not limited to airfare, transportation, accommodation, and all other necessary arrangements.",
  },
  {
    title: "Fully equipped to deliver every type of adventure across Central Asia",
    desc: "",
  },
  {
    title: "Strong, proven track record across Kazakhstan and Central Asia",
    desc: "With 100+ tours for individuals, groups, families, and fully customized packages.",
  },
  {
    title: "Trusted by international students, embassies, international organizations, and expat communities",
    desc: "",
  },
  {
    title: "Exceptional value combined with authentic cultural experiences",
    desc: "",
  },
];

export const pricing = [
  {
    label: "Option 01",
    title: "Pay the standard package rate we offer",
    desc:
      "Confidently knowing it is the most affordable option for the value provided.",
  },
  {
    label: "Option 02",
    title: "10% less than the market",
    desc:
      "Check the market — and then pay 10% less than whatever price you find elsewhere.",
  },
  {
    label: "Option 03",
    title: "Pay as You Enjoy",
    desc:
      "Pay as you enjoy the adventure. If you genuinely don't enjoy it — you don't pay. As simple as that. And yes, we are seriously serious. 🙂",
  },
];

export const faq = [
  {
    q: "Is Kazakhstan safe for foreign travelers?",
    a: "Yes — Kazakhstan is one of the safest destinations in Central Asia. Most nationalities enjoy visa-free entry, English is widely understood in cities, and our team is on-call 24/7 throughout your trip.",
  },
  {
    q: "What is the best time of year to visit?",
    a: "May–early October is ideal for mountains, lakes and the steppe. Mangystau is best March–May and September–November. Winter (December–March) is excellent for skiing and snow adventures around Almaty.",
  },
  {
    q: "Do I need a visa?",
    a: "Citizens of 80+ countries travel to Kazakhstan visa-free for up to 30 days. We help you confirm your specific case before booking and assist with all neighboring-country arrangements.",
  },
  {
    q: "Are tours private or group?",
    a: "Both. We run scheduled small-group adventures every weekend and we design fully private experiences for individuals, families, embassies and organizations any day of the year.",
  },
  {
    q: "What is included in the price?",
    a: "By default: transport, accommodation, professional guide, entrance fees and major meals. Flights and personal expenses are optional add-ons we can arrange end-to-end.",
  },
  {
    q: "What if I don't enjoy the trip?",
    a: "Our bold promise: if you genuinely feel your experience was not worth what you paid, we provide a full refund. No questions asked.",
  },
];

export const testimonials = [
  "t1.jpg",
  "T3.jpg",
  "t4.jpg",
  "t5.jpg",
  "t6.jpg",
  "Beige_and_Cream_Minimal_Trend_Style_Fashion_Photo_Grid_Instagram_Post_53.jpg",
];

export const trustLogos = [
  "Embassies",
  "International Organizations",
  "AIFC",
  "Universities",
  "Expat Communities",
  "100+ Tours",
];
