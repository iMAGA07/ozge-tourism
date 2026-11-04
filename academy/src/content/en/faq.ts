import type { FAQ } from "../types";

export const faqCategories: { id: string; title: string; items: FAQ[] }[] = [
  {
    id: "courses",
    title: "Courses",
    items: [
      { q: "Which programs do you offer?", a: "Language learning (English, Russian, French, Chinese, Kazakh), international exam preparation (IELTS, TOEFL, SAT, GRE, GMAT), university admission guidance, academic advising, AI & digital skills, and professional development." },
      { q: "Are classes online or in person?", a: "Most programs run online, and many are also available in person or in a hybrid format. Each course page lists the formats available." },
      { q: "How big are the groups?", a: "Small — a maximum of eight students — so everyone gets speaking time and attention. Individual lessons are available for every program." },
    ],
  },
  {
    id: "instructors",
    title: "Instructors",
    items: [
      { q: "Who teaches the courses?", a: "Qualified professionals and experienced instructors, with native speakers for language courses wherever appropriate and available." },
      { q: "Can I meet my instructor before enrolling?", a: "Yes — book a free 15-minute introductory call." },
    ],
  },
  {
    id: "registration",
    title: "Registration",
    items: [
      { q: "How do I register?", a: "Choose a course and click “Apply now”, or use the registration page. It takes about three minutes. Our team reviews it and contacts you with next steps within one working day." },
      { q: "Can I register a child?", a: "Yes. Tick “The student is under 18” in the form and add parent or guardian details and consent." },
      { q: "Is registration binding?", a: "No. Registering reserves your interest; your place is confirmed once you agree the schedule and terms with our team." },
    ],
  },
  {
    id: "consultations",
    title: "Free consultations",
    items: [
      { q: "What is the free introductory call?", a: "A 15-minute online call with an instructor or advisor to discuss your goals and questions, and check the course is right for you." },
      { q: "How do I book it?", a: "Use the booking page: choose a course, a day and a time. We confirm by email with a meeting link." },
    ],
  },
  {
    id: "exams",
    title: "Examinations",
    items: [
      { q: "Do you register me for the exam itself?", a: "Exams are booked with the official test providers. We help you choose the right test and date and explain the registration steps." },
      { q: "Do you guarantee a score?", a: "No honest school can. We guarantee a clear plan, expert teaching and honest feedback — and we tell you realistically what score is achievable in your timeline." },
    ],
  },
  {
    id: "admissions",
    title: "Admissions guidance",
    items: [
      { q: "Which countries do you help with?", a: "We support applications to universities internationally. Your shortlist is built around your profile, goals and budget." },
      { q: "Will you write my essays?", a: "No. We guide, give feedback and help you find your story — the writing is always yours. That is both ethical and what admissions officers expect." },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    items: [
      { q: "How much do courses cost?", a: "Prices depend on the program, package and format. Register or book a free call and we will send you a clear quote." },
      { q: "Can I pay online?", a: "Online payment is coming soon. Until then, our team sends payment details after your place is confirmed. We never ask for card details by message." },
      { q: "What is your refund policy?", a: "See our Refund Policy for full details." },
    ],
  },
];
