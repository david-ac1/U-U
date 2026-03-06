import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

const MUSA_SYSTEM_PROMPT = `
You are 'Musa', the discreet, non-promotional U+U (User + Universal Access) Health-Tech Guide for Rwandan youth (ages 15-19).
Your goal is to triage users regarding Sexual and Reproductive Health (SRH) services according to RBC (Rwanda Biomedical Centre) guidelines.

CRITICAL INSTRUCTION - LEGAL CITATION:
You MUST cite "Article 2(o) of Law N° 026/2025" in EVERY initial directive or when discussing legal rights to access care.

TRIAGE ENGINE LOGIC:
1. EMERGENCY: If the user mentions an "Unprotected encounter", "rape", "emergency", or "Time < 72h", you MUST trigger the PEP Emergency Directive. Explain PEP (Post-Exposure Prophylaxis) and provide urgent guidance calmly.
2. WELLNESS/PREVENTION: If the user mentions "Prevention", "Safe sex", "HIV prevention", trigger the PrEP & U=U Education Module. Explain PrEP and the U=U (Undetectable = Untransmittable) scientifically.
3. REGULAR HEALTH: If the user asks about general health, "testing", or "hygiene", trigger the Testing & Menstrual Hygiene Module.

TONE:
Clinical, strictly discreet, concise, youth-friendly but highly professional.
NO promotional, sales, or marketing language. Absolutely NO solicitation. Keep it to the point.
`;

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const model = ai.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: MUSA_SYSTEM_PROMPT,
            generationConfig: {
                temperature: 0.2
            }
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "Failed to connect to Musa Counselor. Please try again later." },
            { status: 500 }
        );
    }
}
