const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// const testRun=async ()=>{
//     const result = await model.generateContent(prompt);
//     console.log(result.response.text());
// }
export default model