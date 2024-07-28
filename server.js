import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("Error: Missing environment variable OPENAI_API_KEY");
  process.exit(1); // Exit the application with an error code
}

// Initialize OpenAI with the API key
const configuration = new Configuration({
  apiKey: "ssk-proj-SJpklgYjUEvoTi3SMeiWT3BlbkFJoYFlyxNCJcMMHeh9ZcDo",
});
const openai = new OpenAIApi(configuration);

const app = express();

// Configure CORS
app.use(cors({
  origin: "https://anoncounsel.vercel.app", // Update this to your frontend's origin
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json());

app.get("/get", async (req, res) => {
  res.status(200).send({
    message: "Hi Rahul Welcome To ChatGPT",
  });
});

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Make a request to the OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-4", // Use the appropriate model
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).send({
      bot: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || "Something went wrong");
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`AI server started on port ${port}`);
});
