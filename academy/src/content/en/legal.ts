import type { LegalDoc } from "../types";

// ⚠️ DRAFTS for the prototype. Every page renders a visible "Draft" notice.
// Final wording must be approved by Ozge Ltd. with professional legal advice.
const updated = "2026-11-04";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "What personal information we collect, why, and how we protect it.",
    updated,
    sections: [
      { heading: "Who we are", body: ["Ozge Academy is operated by Ozge Ltd., registered at the Astana International Financial Centre (AIFC), Kazakhstan. Ozge Ltd. is responsible for the personal information described here."] },
      { heading: "What we collect", body: [
        "Registration: your name, email, phone number, country, chosen program and preferences, learning goals, and — for students under 18 — parent or guardian details and consent.",
        "Consultation requests: your name, email, chosen course, preferred time and the topics you want to discuss.",
        "Contact messages: your name, email and message.",
        "Feedback and complaints: the category, subject and message. Contact details only if you choose to give them. Anonymous submissions are stored without name, email, phone or IP address.",
      ] },
      { heading: "Why we use it", body: ["To respond to your request, arrange consultations, process registrations, deliver courses, and improve our services. We do not sell your information or use it for unrelated advertising."] },
      { heading: "Who can see it", body: ["Only authorised Ozge Academy staff who need it for the purpose above. Complaints and feedback are restricted to designated staff. We use trusted service providers (for example, hosting and secure messaging or email delivery) who process data on our instructions."] },
      { heading: "Security", body: ["The website uses HTTPS encryption, strict security headers, input validation and rate limiting. Access to submissions is restricted. No system is perfectly secure, but we take reasonable, proportionate measures and review them regularly."] },
      { heading: "How long we keep it", body: ["We keep information only as long as needed for the purpose it was collected for and to meet legal obligations. [Retention periods to be confirmed.]"] },
      { heading: "Your rights", body: ["You can ask to access, correct or delete your personal information, or withdraw consent, by contacting us. We will respond within a reasonable time and in line with applicable law."] },
    ],
  },
  {
    slug: "terms",
    title: "Terms and Conditions",
    summary: "The terms for using this website and our services.",
    updated,
    sections: [
      { heading: "Using this website", body: ["By using this website you agree to these terms. Content is provided for general information and may change as programs are updated."] },
      { heading: "Course information", body: ["We aim to keep course details, schedules and prices accurate. Your place, schedule and price are confirmed in writing by our team before enrollment."] },
      { heading: "Acceptable use", body: ["Do not misuse the website, attempt to gain unauthorised access, or submit false, abusive or automated content through our forms."] },
      { heading: "Intellectual property", body: ["Website content, course materials and branding belong to Ozge Ltd. or its licensors and may not be reused without permission."] },
      { heading: "Liability", body: ["We provide educational services with reasonable skill and care. We cannot guarantee exam scores or admission outcomes, which depend on many factors outside our control."] },
      { heading: "Governing law", body: ["[To be confirmed with legal counsel.]"] },
    ],
  },
  {
    slug: "enrollment",
    title: "Course Enrollment and Cancellation Policy",
    summary: "How enrollment is confirmed and how cancellations and rescheduling work.",
    updated,
    sections: [
      { heading: "Enrollment", body: ["Registering online is a request, not a binding contract. Your enrollment is confirmed once we agree the program, schedule and price in writing and payment terms are met."] },
      { heading: "Rescheduling individual lessons", body: ["Individual lessons can be rescheduled free of charge with at least 24 hours’ notice. [Notice period to be confirmed.]"] },
      { heading: "Cancellation by the student", body: ["[Cancellation terms to be confirmed.]"] },
      { heading: "Cancellation by the academy", body: ["If we cancel or reschedule a class, we will offer an alternative time or a credit or refund for the affected session."] },
    ],
  },
  {
    slug: "refunds",
    title: "Refund Policy",
    summary: "When and how refunds are issued.",
    updated,
    sections: [
      { heading: "Overview", body: ["We want every student to be satisfied. If something is not right, contact us first — we will try to fix it."] },
      { heading: "Eligibility", body: ["[Refund eligibility, timelines and conditions to be confirmed.]"] },
      { heading: "How refunds are paid", body: ["Refunds are returned to the original payment method. Once online payments are introduced, card refunds are processed through the payment provider; we never store card details on our servers."] },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    summary: "How this website uses cookies and similar technologies.",
    updated,
    sections: [
      { heading: "Current use", body: ["This website currently sets no advertising or analytics cookies. Only technically necessary storage may be used to make the site work."] },
      { heading: "Future changes", body: ["If we add privacy-conscious analytics or other optional cookies, we will update this policy and ask for your consent where required."] },
    ],
  },
  {
    slug: "complaints",
    title: "Complaints and Feedback Policy",
    summary: "How complaints, suggestions and feedback are handled — including anonymously.",
    updated,
    sections: [
      { heading: "Our commitment", body: ["We welcome complaints and suggestions: they help us improve. Raising a concern will never disadvantage a student."] },
      { heading: "How to submit", body: ["Use the confidential feedback form. You may submit anonymously — no name, email or phone is required, and we do not store your IP address with anonymous submissions."] },
      { heading: "Confidentiality", body: ["Submissions are never published on the website and are accessible only to designated staff."] },
      { heading: "What happens next", body: ["Each submission receives a reference number and moves through these stages: Received → Under review → In progress → Resolved. If you left contact details, we aim to reply within [X] working days."] },
    ],
  },
];
