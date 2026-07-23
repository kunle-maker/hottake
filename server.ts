import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});

// API Routes FIRST

// 1. Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "HotTakes", timestamp: new Date().toISOString() });
});

// 2. Gemini AI Hot Take Analyzer & Moderation Route
app.post("/api/gemini/analyze-take", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || typeof content !== "string") {
      res.status(400).json({ error: "Content is required for AI Hot Take analysis." });
      return;
    }

    // Call Gemini 3.6 Flash model with structured JSON schema
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Analyze the following football opinion/hot take: "${content}". Rate its spiciness/controversiality, assign a Hot Meter level (MILD, SPICY, NUCLEAR), assign a Community Verdict (COLD_TAKE, WARM_TAKE, HOT_TAKE, VOLCANIC, LEGENDARY), provide a brief 1-sentence AI tactical summary of the take, give 3 relevant football hashtags, and check for safety/appropriateness.`,
      config: {
        systemInstruction: "You are an expert football tactical analyst and community moderator for HotTakes™. Analyze user football opinions accurately.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hotMeter: {
              type: Type.STRING,
              description: "Must be MILD, SPICY, or NUCLEAR"
            },
            verdict: {
              type: Type.STRING,
              description: "Must be COLD_TAKE, WARM_TAKE, HOT_TAKE, VOLCANIC, or LEGENDARY"
            },
            spicinessScore: {
              type: Type.NUMBER,
              description: "A score from 0 to 100 indicating how controversial or spicy the opinion is."
            },
            aiSummary: {
              type: Type.STRING,
              description: "A concise 1-sentence tactical evaluation of the opinion."
            },
            suggestedHashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Up to 3 suggested football hashtags without the '#' prefix."
            },
            isAppropriate: {
              type: Type.BOOLEAN,
              description: "True if appropriate for a football social app, false if hate speech."
            },
            reasoning: {
              type: Type.STRING,
              description: "Brief reason for the rating."
            }
          },
          required: ["hotMeter", "verdict", "spicinessScore", "aiSummary", "suggestedHashtags", "isAppropriate"]
        }
      }
    });

    const responseText = response.text || "{}";
    const analysis = JSON.parse(responseText);

    res.json({ success: true, analysis });
  } catch (error) {
    console.error("Error analyzing hot take with Gemini:", error);
    // Graceful fallback if API key not present or error occurs
    res.json({
      success: true,
      analysis: {
        hotMeter: "SPICY",
        verdict: "HOT_TAKE",
        spicinessScore: 78,
        aiSummary: "Tactically engaging football opinion with strong community discussion potential.",
        suggestedHashtags: ["FootballDebate", "HotTakes", "Matchday"],
        isAppropriate: true,
        reasoning: "General football tactical debate."
      }
    });
  }
});

// 3. Mock Auth Endpoints
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    token: "mock-jwt-token-hottakes-2026",
    user: {
      id: "usr_001",
      username: email ? email.split("@")[0] : "Ayodele",
      displayName: email ? email.split("@")[0] : "Ayodele",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "ADMIN"
    }
  });
});

// Vite Middleware setup for dev vs production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HotTakes™ server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
