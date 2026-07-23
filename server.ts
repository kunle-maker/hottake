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

// In-Memory Data Store with default dynamic state
let postsStore = [
  {
    id: 'post_101',
    userId: 'usr_002',
    author: {
      id: 'usr_002',
      username: 'TacticsGuru',
      displayName: 'Liam Davies',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      level: 18,
      favoriteClubCrest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80'
    },
    content: 'Unpopular opinion: Rodri winning the Golden Ball and World Cup triumph solidifies him as the most complete midfielder in football history. Better than Xavi or Busquets at their peaks because of his match-winning goals in key finals.',
    images: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80'],
    hashtags: ['Rodri', 'GoldenBall', 'PremierLeague', 'MidfieldGOAT'],
    taggedClub: 'Arsenal',
    taggedPlayer: 'Bukayo Saka',
    createdAt: '1h ago',
    hotMeter: 'NUCLEAR',
    communityVerdict: 'LEGENDARY',
    agedLikeWineVotes: 342,
    agedLikeMilkVotes: 19,
    myAgedVote: 'FINE_WINE',
    likesCount: 1284,
    isLikedByMe: true,
    commentsCount: 245,
    repostsCount: 189,
    isRepostedByMe: false,
    isBookmarkedByMe: true
  },
  {
    id: 'post_102',
    userId: 'usr_003',
    author: {
      id: 'usr_003',
      username: 'ArsenalPundit',
      displayName: 'Kofi Mensah',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      level: 14
    },
    content: 'People are sleeping on Arsenal squad depth this season. The double pivot system with Merino and Rice is going to lock down every European giant. 90+ points incoming.',
    hashtags: ['AFC', 'Gunners', 'EPL', 'TitleRace'],
    taggedClub: 'Arsenal',
    createdAt: '3h ago',
    hotMeter: 'SPICY',
    communityVerdict: 'HOT_TAKE',
    agedLikeWineVotes: 112,
    agedLikeMilkVotes: 88,
    likesCount: 540,
    commentsCount: 98,
    repostsCount: 42
  },
  {
    id: 'post_103',
    userId: 'usr_004',
    author: {
      id: 'usr_004',
      username: 'MadridistaKing',
      displayName: 'Carlos Silva',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      isVerified: false,
      level: 9
    },
    content: 'Kylian Mbappé will score 40+ goals in all competitions this year. People rushed to criticize his first 3 matches, but his positioning in transition is unmatched.',
    images: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80'],
    hashtags: ['RealMadrid', 'Mbappe', 'LaLiga', 'Galacticos'],
    taggedClub: 'Real Madrid',
    taggedPlayer: 'Kylian Mbappé',
    createdAt: '5h ago',
    hotMeter: 'SPICY',
    communityVerdict: 'WARM_TAKE',
    agedLikeWineVotes: 210,
    agedLikeMilkVotes: 45,
    likesCount: 890,
    commentsCount: 132,
    repostsCount: 76
  }
];

// Live Match Engine Simulation State
let liveMatchMinute = 81;
let liveHomeScore = 4;
let liveAwayScore = 1;
let liveEvents = [
  { id: 'ev_1', minute: 14, type: 'GOAL', player: 'E. Haaland', team: 'HOME', details: 'Assist: K. De Bruyne' },
  { id: 'ev_2', minute: 32, type: 'GOAL', player: 'L. Martinez', team: 'AWAY', details: 'Right foot shot' },
  { id: 'ev_3', minute: 55, type: 'GOAL', player: 'P. Foden', team: 'HOME', details: 'Curling left-foot top corner' },
  { id: 'ev_4', minute: 68, type: 'YELLOW_CARD', player: 'B. Barella', team: 'AWAY', details: 'Tactical foul' },
  { id: 'ev_5', minute: 81, type: 'GOAL', player: 'R. Cherki', team: 'HOME', details: 'Debut goal! Sensational strike' }
];

// Periodically progress live match timer every 20 seconds for real-time live feel
setInterval(() => {
  if (liveMatchMinute < 90) {
    liveMatchMinute += 1;
    // Random chance of goal or card around minute 86
    if (liveMatchMinute === 86 && liveEvents.length === 5) {
      liveHomeScore += 1;
      liveEvents.push({
        id: `ev_${Date.now()}`,
        minute: 86,
        type: 'GOAL',
        player: 'E. Haaland',
        team: 'HOME',
        details: 'Header from Savinho cross'
      });
    }
  }
}, 20000);

let transfersStore = [
  {
    id: 'tr_301',
    playerName: 'Rayan Cherki',
    playerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    fromClub: 'Olympique Lyonnais',
    fromClubCrest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&auto=format&fit=crop&q=80',
    toClub: 'Arsenal FC',
    toClubCrest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&auto=format&fit=crop&q=80',
    fee: '€38M',
    type: 'CONFIRMED',
    tierReliability: 1,
    summary: 'Here We Go! Rayan Cherki completes medical and signs a 5-year contract at Emirates Stadium.',
    date: 'July 2026',
    likesCount: 1420
  },
  {
    id: 'tr_302',
    playerName: 'Nico Williams',
    playerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    fromClub: 'Athletic Club',
    fromClubCrest: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=80&auto=format&fit=crop&q=80',
    toClub: 'FC Barcelona',
    toClubCrest: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80',
    fee: '€58M Release Clause',
    type: 'RUMOUR',
    tierReliability: 2,
    summary: 'Barcelona preparing final bank guarantee documents for Nico Williams clause release.',
    date: 'July 2026',
    likesCount: 980
  },
  {
    id: 'tr_303',
    playerName: 'Xavi Simons',
    playerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    fromClub: 'PSG',
    fromClubCrest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&auto=format&fit=crop&q=80',
    toClub: 'RB Leipzig',
    toClubCrest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=80',
    fee: 'Loan + Option',
    type: 'LOAN',
    tierReliability: 1,
    summary: 'Xavi Simons extends loan agreement at RB Leipzig for another season.',
    date: 'July 2026',
    likesCount: 650
  }
];

// In-Memory API Cache to prevent rate-limiting API-FOOTBALL
const apiCache: { [key: string]: { timestamp: number; data: any } } = {};
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

// Helper function to fetch from API-FOOTBALL if API_FOOTBALL_KEY is set
async function fetchApiFootball(endpoint: string) {
  const apiKey = process.env.API_FOOTBALL_KEY || process.env.VITE_API_FOOTBALL_KEY;
  if (!apiKey) return null;

  const cacheKey = `apifootball_${endpoint}`;
  const cached = apiCache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const url = `https://v3.football.api-sports.io/${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "x-apisports-key": apiKey
      }
    });

    if (!response.ok) {
      console.warn(`API-FOOTBALL request failed with status ${response.status}`);
      return null;
    }

    const json = await response.json();
    if (json.response && Array.isArray(json.response)) {
      apiCache[cacheKey] = { timestamp: Date.now(), data: json.response };
      return json.response;
    }
    return null;
  } catch (err) {
    console.error("Error fetching from API-FOOTBALL:", err);
    return null;
  }
}

// PostgreSQL Database Connection Status
app.get("/api/db/status", (req, res) => {
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    // Mask password in output for safety
    const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ":****@");
    res.json({
      status: "CONFIGURED",
      message: "DATABASE_URL is set.",
      databaseUrl: maskedUrl,
      provider: "PostgreSQL",
      orm: "Prisma ORM"
    });
  } else {
    res.json({
      status: "IN_MEMORY_FALLBACK",
      message: "DATABASE_URL is not configured yet. Running with reactive in-memory state engine. Set DATABASE_URL on Render or local environment to persist to PostgreSQL.",
      databaseUrl: null,
      provider: "In-Memory Store"
    });
  }
});

// 1. Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "HotTakes", timestamp: new Date().toISOString() });
});

// 2. Posts Endpoints
app.get("/api/posts", (req, res) => {
  res.json({ success: true, posts: postsStore });
});

app.post("/api/posts", (req, res) => {
  const newPost = {
    id: `post_${Date.now()}`,
    ...req.body,
    createdAt: 'Just now',
    agedLikeWineVotes: 1,
    agedLikeMilkVotes: 0,
    likesCount: 1,
    isLikedByMe: true,
    commentsCount: 0,
    repostsCount: 0
  };
  postsStore.unshift(newPost);
  res.json({ success: true, post: newPost });
});

app.post("/api/posts/:id/like", (req, res) => {
  const { id } = req.params;
  const post = postsStore.find(p => p.id === id);
  if (post) {
    post.isLikedByMe = !post.isLikedByMe;
    post.likesCount += post.isLikedByMe ? 1 : -1;
    res.json({ success: true, isLikedByMe: post.isLikedByMe, likesCount: post.likesCount });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

app.post("/api/posts/:id/vote-aged", (req, res) => {
  const { id } = req.params;
  const { vote } = req.body;
  const post = postsStore.find(p => p.id === id);
  if (post) {
    if ((post as any).myAgedVote === 'FINE_WINE') post.agedLikeWineVotes -= 1;
    if ((post as any).myAgedVote === 'MILK') post.agedLikeMilkVotes -= 1;

    (post as any).myAgedVote = vote;
    if (vote === 'FINE_WINE') post.agedLikeWineVotes += 1;
    if (vote === 'MILK') post.agedLikeMilkVotes += 1;

    res.json({
      success: true,
      myAgedVote: vote,
      agedLikeWineVotes: post.agedLikeWineVotes,
      agedLikeMilkVotes: post.agedLikeMilkVotes
    });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// 3. Fixtures & Live Match API (API-FOOTBALL Integration + Fallback Engine)
app.get("/api/fixtures", async (req, res) => {
  // Try fetching live fixtures from API-FOOTBALL if key is present
  const apiFootballData = await fetchApiFootball("fixtures?live=all");
  
  if (apiFootballData && apiFootballData.length > 0) {
    const formattedFixtures = apiFootballData.map((item: any) => ({
      id: `fix_af_${item.fixture?.id || Date.now()}`,
      league: item.league?.name || 'Top Competition',
      leagueLogo: item.league?.logo || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=60&auto=format&fit=crop&q=80',
      homeTeam: {
        name: item.teams?.home?.name || 'Home Team',
        crest: item.teams?.home?.logo || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80',
        score: item.goals?.home ?? 0
      },
      awayTeam: {
        name: item.teams?.away?.name || 'Away Team',
        crest: item.teams?.away?.logo || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80',
        score: item.goals?.away ?? 0
      },
      status: item.fixture?.status?.short === 'FT' ? 'FINISHED' : 'LIVE',
      time: `${item.fixture?.status?.elapsed || 0}'`,
      date: item.fixture?.date ? new Date(item.fixture.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Today',
      stadium: item.fixture?.venue?.name || 'Stadium',
      events: item.events ? item.events.map((ev: any, idx: number) => ({
        id: `ev_${idx}`,
        minute: ev.time?.elapsed || 0,
        type: ev.type === 'Goal' ? 'GOAL' : ev.detail === 'Yellow Card' ? 'YELLOW_CARD' : 'RED_CARD',
        player: ev.player?.name || 'Player',
        team: ev.team?.name === item.teams?.home?.name ? 'HOME' : 'AWAY',
        details: ev.detail || ''
      })) : []
    }));

    res.json({ success: true, source: 'API-FOOTBALL', fixtures: formattedFixtures });
    return;
  }

  // Fallback to Live Simulation Engine
  const fixtures = [
    {
      id: 'fix_201',
      league: 'Club Friendly',
      leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=60&auto=format&fit=crop&q=80',
      homeTeam: {
        name: 'Arsenal',
        crest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80',
        score: liveHomeScore
      },
      awayTeam: {
        name: 'Inter Milan',
        crest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80',
        score: liveAwayScore
      },
      status: liveMatchMinute >= 90 ? 'FINISHED' : 'LIVE',
      time: liveMatchMinute >= 90 ? 'FT' : `${liveMatchMinute}'`,
      date: 'Sat 1 Aug 2026',
      stadium: 'Kai Tak Stadium, Hong Kong',
      events: liveEvents
    },
    {
      id: 'fix_202',
      league: 'Club Friendly',
      leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=60&auto=format&fit=crop&q=80',
      homeTeam: {
        name: 'K-League All Stars',
        crest: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&auto=format&fit=crop&q=80',
        score: 0
      },
      awayTeam: {
        name: 'Arsenal',
        crest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80',
        score: 0
      },
      status: 'UPCOMING',
      time: '12:00 WAT',
      date: 'Wed 5 Aug 2026',
      stadium: 'Seoul World Cup Stadium'
    }
  ];
  res.json({ success: true, source: 'SIMULATION_ENGINE', fixtures });
});

// 4. Transfers Real-Time Market API
app.get("/api/transfers", async (req, res) => {
  // Try fetching transfers from API-FOOTBALL transfers endpoint if key is present
  const apiTransfers = await fetchApiFootball("transfers?team=50"); // e.g. Man City or top team
  if (apiTransfers && apiTransfers.length > 0) {
    const formattedTransfers = apiTransfers.slice(0, 5).map((tr: any, idx: number) => ({
      id: `tr_af_${idx}`,
      playerName: tr.player?.name || 'Footballer',
      playerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      fromClub: tr.transfers?.[0]?.teams?.out?.name || 'Former Club',
      fromClubCrest: tr.transfers?.[0]?.teams?.out?.logo || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&auto=format&fit=crop&q=80',
      toClub: tr.transfers?.[0]?.teams?.in?.name || 'New Club',
      toClubCrest: tr.transfers?.[0]?.teams?.in?.logo || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=80',
      fee: tr.transfers?.[0]?.type || 'Undisclosed Fee',
      type: tr.transfers?.[0]?.type?.includes('Loan') ? 'LOAN' : 'CONFIRMED',
      tierReliability: 1,
      summary: `Official transfer record: ${tr.player?.name} moved from ${tr.transfers?.[0]?.teams?.out?.name} to ${tr.transfers?.[0]?.teams?.in?.name}.`,
      date: 'July 2026',
      likesCount: 1200 + idx * 150
    }));

    res.json({ success: true, source: 'API-FOOTBALL', transfers: formattedTransfers });
    return;
  }

  // Fallback to Transfer Market Store
  res.json({ success: true, source: 'DYNAMIC_STORE', transfers: transfersStore });
});

app.post("/api/transfers/:id/like", (req, res) => {
  const { id } = req.params;
  const item = transfersStore.find(t => t.id === id);
  if (item) {
    item.likesCount += 1;
    res.json({ success: true, likesCount: item.likesCount });
  } else {
    res.status(404).json({ error: "Transfer not found" });
  }
});

// 5. Gemini AI Hot Take Analyzer & Moderation Route
app.post("/api/gemini/analyze-take", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || typeof content !== "string") {
      res.status(400).json({ error: "Content is required for AI Hot Take analysis." });
      return;
    }

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

// 6. Render & Environment Setup Specs Endpoint
app.get("/api/deployment-config", (req, res) => {
  res.json({
    platform: "Render / Cloud Run",
    environmentVariables: [
      { name: "GEMINI_API_KEY", description: "Google Gemini API key for AI Hot Take Analyzer", required: true },
      { name: "NODE_ENV", description: "production", required: true },
      { name: "PORT", description: "3000", required: true }
    ],
    renderYaml: `services:
  - type: web
    name: hottakes-football-app
    env: node
    plan: free
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
      - key: GEMINI_API_KEY
        sync: false`,
    instructions: [
      "1. Push repository to GitHub/GitLab.",
      "2. Go to Render.com -> New -> Web Service.",
      "3. Connect your repository or import render.yaml.",
      "4. Add environment variable GEMINI_API_KEY under Environment Settings.",
      "5. Click Deploy Web Service."
    ]
  });
});

// 7. Mock Auth Endpoints
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    token: "jwt-token-hottakes-2026",
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

