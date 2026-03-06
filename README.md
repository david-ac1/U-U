# U+U (User + Universal Access) 🏥✨

**Theme Alignment:** HealthTech (Pillar 2 - Human Capital Systems)  
**Hackathon Goal:** Build Things People Need

**Bridging the gap between the 2025 Reproductive Health Law and 3 million Rwandan youth through private education and "Ghost" logistics.**

---

## 🌍 The Problem (Theme Alignment & Business Viability)
*(Weight: 25%)*
Despite the passage of Rwanda's progressive Law N° 026/2025—which grants youth aged 15+ the legal right to Sexual and Reproductive Health (SRH) services—stigma remains a massive barrier. Young "Seekers" know the law has changed, but are terrified of being seen at local clinics or judged by pharmacists. Conversely, "Providers" want to comply with the law but lack a discreet, foolproof way to verify age and fulfill sensitive orders without exposing Patient Identifiable Information (PII).

U+U is a high-impact, high-value HealthTech solution built to solve this exact bottleneck, bringing about meaningful change at scale.

## 💡 The Solution (Innovation & Creativity)
*(Weight: 20%)*
U+U is a tri-fold ecosystem that guarantees absolute privacy while ensuring strict legal compliance:

1. **The Emotion-Aware "Musa" Triage Engine:** Powered by Gemini 2.5 Flash, Musa acts as an empathetic, emotionally intelligent guide. It detects contexts like "Unprotected encounter" to trigger Emergency Directives (PEP), validates users' fears to reduce anxiety, and ensures every piece of advice legally cites *Article 2(o) of Law N° 026/2025*.
2. **The Digital Legal Pass (ZKP):** A Zero-Knowledge Proof (ZKP) mechanism that verifies a user's age (15+) via a mock-NIDA check. It generates a scanning credential for providers that displays a green "Validated Access" status without ever showing the user's name or photo.
3. **"Ghost" Logistics Middleware:** A stealth fulfillment system featuring a discreet catalog, "Incognito Protocol" options (Brown Bag/Silent Drop-off via GPS pin), and secure MTN MoMo payment integrations.

## 🛠️ Technical Execution
*(Weight: 25%)*
Built on a modern, highly-performant **Next.js 14 App Router** stack powered by **Tailwind CSS**.

- **AI Integration:** `@google/generative-ai` SDK implemented via Edge routes with strict system prompting to enforce the RBC (Rwanda Biomedical Centre) guidelines.
- **Global State Management:** React Context API manages the shopping cart, active pathways (Crisis vs. Wellness), and NIDA verification state across deeply nested routes.
- **Interactive UI/UX:** Responsive, accessible interfaces featuring an embedded **Health Facilities Map** mapping discreet clinics (STI/HIV testing, PrEP/PEP), stealth delivery tracking maps, gamified 30-day Adherence Trackers, and Provider scanner simulations.
- **Safety First Architecture:** A hardcoded "Data Purge" (Self-Destruct) feature instantly wipes local session data and chat history, ensuring zero footprint for at-risk youth.

## 📈 Impact & Scalability
*(Weight: 20%)*
Our success isn't just measured in code, but in lives protected. U+U is designed to track three core metrics during the 5-Month Buildathon:
1. **Adherence Rates:** Gamified 30-day PrEP/PEP tracking (`/profile`) to ensure vulnerable users complete their courses.
2. **Stigma Reduction:** Real-time metrics on successful "Safe-Drop" deliveries in high-density areas (Nyamirambo, Kimisagara).
3. **Legal Empowerment:** The volume of Digital Legal Passes scanned by partner pharmacies (`/provider`).

## 🏃🏾‍♂️ Founder & Team Commitment (Buildathon Readiness)
Our team is uniquely positioned and deeply committed to seeing U+U scale beyond a weekend project. 
- **🔥 Founder-Problem Fit:** We understand the nuances of the Rwandan healthcare space and the direct pain points of youth facing SRH stigma.
- **🧠 Learning Mindset:** We've iterated aggressively during this hackathon based on legal constraints and user empathy.
- **🏃🏾‍♂️ Execution Energy:** We have a realistic roadmap outlining immediate priorities beyond the hackathon: actual NIDA API integration, database persistence via Supabase, and active clinic onboarding. We are ready for the 5-Month Buildathon.

---

## 🚀 Getting Started Locally

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the **Seeker flow**.

### Demo Routes
* **`/counselor`**: Interact with Musa and view the Digital Legal Pass. *(Note: You must provide a valid `GEMINI_API_KEY` in `.env.local` for the chat to function).*
* **`/checkout`**: Explore the "Ghost" Logistics Map and MoMo payment simulator.
* **`/provider`**: Test the Pharmacist ZKP Scanner interface.
* **`/profile`**: View the Adherence Tracker and 30-day streak mechanics.
