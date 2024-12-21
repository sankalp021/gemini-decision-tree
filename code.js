const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

async function generateContent() {
	const result = await model.generateContent(prompt);
	console.log(result.response.text());
}

generateContent();