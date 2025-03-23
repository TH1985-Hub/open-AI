import {
     GoogleGenerativeAI, 
     HarmCategory,
     HarmBlockThreshold,
     } from "@google/generative-ai";


    //const API_KEY = process.env.GEMINI_API_KEY;


class GeminiService {
    constructor() {
        this.apiKey = null;
        this.genAi = null;
        this.model = null;

        this.generationConfig = {
            temperature: 0.5,
            topP: 0.9,
            topK: 64,
            maxOutputTokens: 81921,
            responseMimeType: "text/plain",
        };

        this.safetySettings = [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
          ];
        }

    

    initialize(apiKey){
        if(!apiKey || this.apiKey === apiKey)  {
          return;
        }

        this.apiKey = apiKey;
        this.genAI = new GoogleGenerativeAI(apiKey);     
        this.model = this.genAI.getGenerativeModel({model: "gemini-1.5-flash"});
    }


    async runWithPrompt(prompt, systemPrompt) {
        if (!this.genAI || !this.model) {
            throw new Error("Gemini service not initialized");
    }

    const history = systemPrompt
    ? [
        { role: "user", parts: [{ text: systemPrompt }] },
        {
          role: "model",
          parts: [{ text: "I'll follow these instructions." }],
        },
      ]
    : [];

    const chatSession = this.model.startChat({
        generationConfig: this.generationConfig,
        safetySettings: this.safetySettings,
        history,
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response.text();

    console.log("Gemini response:", response);

    return response;
}
}

const geminiService = new GeminiService();

export {geminiService};