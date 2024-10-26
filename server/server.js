const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Example JSON schema for recipe
const exampleJson = {
  "name": "Phở Gà Áp Chảo Sáng",
  "ingredients": [
    { "ingredient": "Chicken breast", "quantity": "150g" },
    { "ingredient": "Pho noodles", "quantity": "1 cup" },
    { "ingredient": "Chicken stock", "quantity": "2 cups" }
  ],
  "how_to_do": ["Step 1: Cook the noodles.", "Step 2: Prepare the stock."],
  "macronutrients_summary": {
    "carbohydrates": "40g",
    "proteins": "27g",
    "fats": "10g",
    "calories": "350 kcal"
  }
};

// SSE Endpoint
app.get("/recipeStream", (req, res) => {
  const { ingredients, mealType, cuisine, cookingTime, complexity, people } = req.query;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (chunk) => {
    let chunkResponse;
    if (chunk.choices[0].finish_reason === "stop") {
      res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`);
    } else {
      chunkResponse = chunk.choices[0].delta.content
        ? { action: "chunk", chunk: chunk.choices[0].delta.content }
        : { action: "start" };
      res.write(`data: ${JSON.stringify(chunkResponse)}\n\n`);
    }
  };

  const prompt = `
    Generate a recipe based on:
    - Ingredients: ${ingredients}
    - Meal Type: ${mealType}
    - Cuisine: ${cuisine}
    - Cooking Time: ${cookingTime}
    - Complexity: ${complexity}
    - Number of People: ${people}
    The recipe should follow this schema: ${JSON.stringify(exampleJson)}
  `;

  const messages = [
    { role: "system", content: "Provide output in JSON format following the schema provided." },
    { role: "user", content: prompt },
  ];

  fetchOpenAICompletionsStream(messages, sendEvent);

  req.on("close", () => res.end());
});

require('dotenv').config({ path: '../RecipeGenerator/.env' });

async function fetchOpenAICompletionsStream(messages, callback) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: messages,
      temperature: 1,
      stream: true,
    });

    for await (const chunk of completion) {
      callback(chunk);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
