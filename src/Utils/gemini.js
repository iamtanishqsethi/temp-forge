const { GoogleGenerativeAI } = require("@google/generative-ai");
export const initializeGeminiAI = () => {
    try {
        const apiKey = localStorage.getItem('gemini_api_key');
        const modelName = localStorage.getItem('gemini_model');

        if (!apiKey) {
            throw new Error('Gemini API key not found in localStorage');
        }

        if (!modelName) {
            throw new Error('Gemini model name not found in localStorage');
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });

        return model;
    } catch (error) {
        console.error('Failed to initialize Gemini AI:', error);
        throw error;
    }
};