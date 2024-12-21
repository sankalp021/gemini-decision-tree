
const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend URL
  methods: ['GET', 'POST'], // Allow specific methods if necessary
}));

app.use(bodyParser.json());
app.use(express.static("public")); // Serve frontend files

// Route to handle recommendations
app.post("/recommendation", async (req, res) => {
  const { preference, type, budget } = req.body;

  const prompt = `Suggest a travel destination for someone who prefers the ${preference}, wants ${type}, and has a ${budget} budget in under 100 words.`;
  try {
    
    
    const result = await model.generateContent(prompt);
    
    res.json({ recommendation: result.response.text() });
  } catch (error) {
    console.error("Error generating recommendation:", error.message);
    res.status(500).json({ recommendation: "Sorry, we couldn't generate a recommendation at this time." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
