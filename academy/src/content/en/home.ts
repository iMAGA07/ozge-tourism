// Homepage copy and section ORDER. Reorder or remove ids in `sections` to
// rearrange the homepage — this is the field a CMS editor will control.
export const home = {
  sections: ["hero", "marquee", "intro", "divisions", "featured", "why", "instructors", "how", "stories", "faq", "cta"] as const,
  hero: {
    eyebrow: "Ozge Academy · Astana",
    titleTop: "Open the world through",
    words: ["languages.", "IELTS & SAT.", "admissions.", "AI skills."],
    lead: "Qualified instructors and native speakers, personal guidance, and programs built around your goals — online, in person or hybrid.",
  },
  marquee: ["English", "Русский", "Français", "中文", "Қазақ тілі", "IELTS", "TOEFL", "SAT", "GRE", "GMAT", "University admissions", "Scholarships", "AI skills", "Public speaking"],
  intro: {
    eyebrow: "Who we are",
    title: "An academy built on great teachers and honest guidance",
    lead: "Ozge Academy helps students and professionals learn languages, prepare for international exams, reach universities abroad and build modern skills. What makes us different is simple:",
    points: [
      { title: "The right instructor", body: "Qualified professionals and native speakers, matched to your goals." },
      { title: "A plan made for you", body: "Placement and diagnostic tests first, then a path that fits your level and timeline." },
      { title: "Try before you commit", body: "A free 15-minute call with an instructor before you enroll." },
    ],
  },
  divisions: { eyebrow: "Programs", title: "Six ways to move forward", lead: "Choose a division to see every course, package and format available." },
  featured: { eyebrow: "Featured", title: "Popular programs", lead: "A few places our students often start." },
  why: {
    eyebrow: "Why Ozge Academy",
    title: "Quality you can feel from the first lesson",
    pillars: [
      { title: "Instructor quality", body: "Selected for qualifications, experience and the ability to teach — with native speakers for languages wherever possible." },
      { title: "Professional standards", body: "Structured curricula, clear milestones and regular feedback. Transparent terms, no surprises." },
      { title: "Personalised learning", body: "Small groups of eight at most, or one-to-one. Your goals set the pace." },
      { title: "Student-focused", body: "A free intro call, honest advice, and a confidential way to tell us when something isn’t right." },
    ],
  },
  instructors: { eyebrow: "Our team", title: "Meet the people who teach", lead: "Experienced instructors and native speakers across every program." },
  how: {
    eyebrow: "How it works",
    title: "From first click to first class",
    steps: [
      { title: "Explore", body: "Browse programs and compare formats, levels and packages." },
      { title: "Talk to us — free", body: "Book a 15-minute introductory call with an instructor." },
      { title: "Register online", body: "Three-minute registration. Nothing is charged at this step." },
      { title: "Begin learning", body: "We confirm your schedule and you start — online or in person." },
    ],
  },
  stories: {
    eyebrow: "Student stories",
    title: "Real results, verified",
    body: "We only publish testimonials from real students, with their permission. Our first cohorts’ stories will appear here.",
  },
  faq: { eyebrow: "FAQ", title: "Good questions", lead: "Everything else is on our FAQ page — or just ask us." },
};
