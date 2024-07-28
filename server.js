import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: ssk-proj-SJpklgYjUEvoTi3SMeiWT3BlbkFJoYFlyxNCJcMMHeh9ZcDo, // Use environment variable for API key
});

const app = express();

app.use(cors({
  origin: "https://linea-gpt.vercel.app",
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

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 1.0,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
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
