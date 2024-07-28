import { GoogleGenerativeAI,HarmCategory,HarmBlockThreshold } from "@google/generative-ai"


const safetySetting = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GENE_AI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"},safetySetting);

export default model;