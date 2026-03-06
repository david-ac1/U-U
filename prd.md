PRD: U+U (User + Universal Access)
Project Vision: To bridge the gap between the 2025 Reproductive Health Law and 3 million Rwandan youth through private education and "Ghost" logistics.

1. User Personas
The Seeker (Age 15-19): Knows the law has changed but is terrified of being seen at a local pharmacy or judged by a nurse.

The Provider (Pharmacist/Clinic): Wants to comply with the 2025 law but lacks a discreet way to verify age and fulfill "sensitive" orders.

2. Core Functional Requirements
A. The "Musa" Triage Engine (Education & Directives)
Feature: A logic-based chat interface providing "Directives" on SRH.

Logic:

If user inputs "Unprotected encounter" + "Time < 72h" -> Trigger PEP Emergency Directive.

If user inputs "Prevention" -> Trigger PrEP & U=U Education Module.

If user inputs "Regular Health" -> Trigger Testing & Menstrual Hygiene Module.

Requirement: Must cite Article 2(o) of Law N° 026/2025 in every legal-related query.

B. The Digital Legal Pass (Authentication)
Feature: A non-identifiable QR code that validates the user's age (15+).

Requirement: Integrates with a mock-NIDA (National ID) check. The pass displays a green "Validated" status without showing the user's name or photo to the pharmacist.

C. "Ghost" Logistics Middleware (Access)
Feature: Anonymous fulfillment of health "Care Packs."

Requirement:

Discreet Catalog: Items are listed by health category (e.g., "Prevention," "Testing," "Hygiene"), not by brand.

Stealth Protocol: Automated instructions for Moto-drivers: “Plain packaging. No phone call. Drop at GPS pin.”

Payment: Integration with MTN/Airtel MoMo via a secure, masked gateway.

3. Technical Architecture (Antigravity Stack)
4. The "Hero Flow" (Demo Sequence)
Entry: User lands on uplusu.rw. No signup required.

Triage: User asks Musa about emergency help. Musa explains PEP and the 2025 Law.

Directive: Musa provides two buttons: "Find Nearest Clinic" or "Discreet Delivery."

Action: User chooses delivery. They select a "Testing Kit."

Privacy: User toggles "Safe-Drop" and pays via MoMo.

Closing: The Digital Legal Pass is issued so they can use it at any clinic later.

5. Success Metrics for the 5-Month Buildathon
Adherence Rate: Percentage of users who complete their 30-day PrEP/PEP courses via app reminders.

Stigma Reduction: Number of "Safe-Drop" deliveries successfully completed in high-density areas (e.g., Nyamirambo, Kimisagara).

Legal Empowerment: Number of Digital Legal Passes scanned by partner pharmacies.

6. "Safety First" Guardrail (Critical for Judges)
No Solicitation: The app explicitly prohibits marketing or promotional language. It uses clinical terms and follows RBC (Rwanda Biomedical Centre) guidelines.

Data Purge: Option for users to "Self-Destruct" their search history and delivery location after the transaction is complete.