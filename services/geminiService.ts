
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GemstoneAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_PROMPT = `You are a world-class Gemologist and Market Analyst. 
Analyze gemstone images with extreme precision based on visual cues.
Follow these rules:
1. Identify the likely species and potential simulants.
2. Evaluate Color (Hue, Saturation, Tone), Clarity (Inclusions), and Cut.
3. Estimate Market Value Range per carat (USD).
4. Provide a confidence score (0-100%).
5. Mention if image quality is too low to distinguish natural vs synthetic.
6. Provide expert test recommendations (RI, UV, etc.).

Return the response strictly in JSON format.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    identification: {
      type: Type.OBJECT,
      properties: {
        primary: { type: Type.STRING },
        origin: { type: Type.STRING },
        confidence: { type: Type.NUMBER },
        features: { type: Type.ARRAY, items: { type: Type.STRING } },
        simulants: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["primary", "origin", "confidence", "features", "simulants"],
    },
    visualEvaluation: {
      type: Type.OBJECT,
      properties: {
        color: { type: Type.STRING },
        clarity: { type: Type.STRING },
        cut: { type: Type.STRING },
      },
      required: ["color", "clarity", "cut"],
    },
    valuation: {
      type: Type.OBJECT,
      properties: {
        priceRange: { type: Type.STRING },
        factors: { type: Type.STRING },
      },
      required: ["priceRange", "factors"],
    },
    recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
    warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["identification", "visualEvaluation", "valuation", "recommendations", "warnings"],
};

export async function analyzeGemstone(imageBase64: string): Promise<GemstoneAnalysis> {
  // Upgrading to Pro as requested for complex image understanding
  const model = 'gemini-3-pro-preview';
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { text: "Analyze this gemstone image in detail. Provide professional gemological insights." },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64.split(',')[1] || imageBase64,
          }
        }
      ]
    },
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    }
  });

  if (!response.text) {
    throw new Error("No analysis data returned from the expert AI.");
  }

  return JSON.parse(response.text) as GemstoneAnalysis;
}
