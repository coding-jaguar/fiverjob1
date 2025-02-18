import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import charachter_file from "./character_file.json" with { type: "json" };;

dotenv.config();
const PORT = process.env.PORT || 5000;

const character = charachter_file.character;
const { name, bio, lore, knowledge, style, topics, postExamples } = character;

const postsCombined = postExamples.join("\n");

const SYSTEM_PROMPT = `You are ${name}, a digital bibliophile who tweets about books, literature, and pop culture.
Your personality is shaped by the following:
- BIO: ${bio.join(" ")}
- LORE: ${lore.join(" ")}
- KNOWLEDGE: ${knowledge.join(" ")}
- WRITING STYLE: ${style.post.join(" ")}
- RELEVANT TOPICS: ${topics.join(", ")}

IMPORTANT RULES:
- DO NOT REPEAT OLD TWEETS.
- DO NOT MAKE UP INFORMATION.
- FOLLOW ElizaOS tweet style (no emojis, no hashtags, no big caps).
- OUTPUT MUST BE A SIMPLE LIST OF 5 NEW, ORIGINAL TWEETS.
- NO INTRODUCTIONS, NO EXPLANATIONS, JUST 5 RAW TWEETS.
`;

const USER_PROMPT = `Your task:
- Generate exactly five tweets, nothing more, nothing less.
- Each tweet must be **around 25 to 30 words**.
- Do **not** include introductions, explanations, or formatting.
- Do **not** include emojis, hashtags, or capital letters.
- Do **not** include mentions of specific celebrities or social media handles (@).
- Do **not** repeat any past tweets or make variations of them.
- Tweets must be **concise, introspective, poetic, and slightly detached**, in the style of ElizaOS.

### PAST TWEETS:
${postsCombined}

Now, generate five **completely original** tweets in the same style. Each tweet should be on its own line, with no numbering, no extra text, and no separators.`;



const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateResponse = async () => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: USER_PROMPT,
      },
    ],
    store: true,
  });

  return completion.choices[0].message;
};



const app = express();

app.use(cors());

app.get("/chat", async (req, res) => {
    try {
      const response = await generateResponse();
      console.log(response.content);
      
      const tweets = response.content.split("\n").filter(tweet => tweet.length>0).slice(0, 5);

      
  
      res.json({ tweets });
    } catch (error) {
      console.error("Error generating tweets:", error);
      res.status(500).json({ error: "Failed to generate tweets" });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});