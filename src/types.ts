export type HotMeterLevel = 'MILD' | 'SPICY' | 'NUCLEAR';

export type CommunityVerdict = 'COLD_TAKE' | 'WARM_TAKE' | 'HOT_TAKE' | 'VOLCANIC' | 'LEGENDARY';

export type AgedLikeVote = 'FINE_WINE' | 'MILK';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  favoriteClub: string;
  favoriteClubCrest: string;
  favoriteLeague: string;
  favoritePlayer: string;
  followersCount: number;
  followingCount: number;
  totalPosts: number;
  isVerified: boolean;
  xp: number;
  level: number;
  levelTitle: string;
  reputationScore: number;
  badges: Badge[];
  predictionAccuracy: number;
  joinedDate: string;
  role: 'USER' | 'ADMIN';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlockedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userDisplayName: string;
  username: string;
  userAvatar: string;
  userLevel: number;
  userIsVerified: boolean;
  content: string;
  createdAt: string;
  likesCount: number;
  isLikedByMe?: boolean;
  parentId?: string | null;
  replies?: Comment[];
}

export interface Post {
  id: string;
  userId: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    isVerified: boolean;
    level: number;
    favoriteClubCrest?: string;
  };
  content: string;
  images?: string[];
  hashtags: string[];
  taggedClub?: string;
  taggedPlayer?: string;
  createdAt: string;
  hotMeter: HotMeterLevel;
  communityVerdict: CommunityVerdict;
  agedLikeWineVotes: number;
  agedLikeMilkVotes: number;
  myAgedVote?: AgedLikeVote | null;
  likesCount: number;
  isLikedByMe?: boolean;
  commentsCount: number;
  repostsCount: number;
  isRepostedByMe?: boolean;
  isBookmarkedByMe?: boolean;
  repostAuthor?: string;
}

export interface Fixture {
  id: string;
  league: string;
  leagueLogo: string;
  homeTeam: {
    name: string;
    crest: string;
    score?: number;
  };
  awayTeam: {
    name: string;
    crest: string;
    score?: number;
  };
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  time: string; // e.g. "81'", "12:30 WAT", "FT"
  date: string; // e.g. "Sat 1 Aug 2026"
  stadium: string;
  events?: MatchEvent[];
  lineups?: {
    home: string[];
    away: string[];
  };
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION' | 'VAR' | 'FULL_TIME';
  player: string;
  team: 'HOME' | 'AWAY';
  details?: string;
}

export interface Prediction {
  id: string;
  userId: string;
  fixtureId: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  predictedFirstGoalscorer: string;
  predictedMOTM: string;
  status: 'PENDING' | 'CORRECT' | 'INCORRECT';
  xpAwarded?: number;
  createdAt: string;
}

export interface Transfer {
  id: string;
  playerName: string;
  playerAvatar: string;
  fromClub: string;
  fromClubCrest: string;
  toClub: string;
  toClubCrest: string;
  fee: string;
  type: 'CONFIRMED' | 'RUMOUR' | 'LOAN' | 'FREE_AGENT';
  tierReliability: 1 | 2 | 3 | 4;
  summary: string;
  date: string;
  likesCount: number;
}

export interface Community {
  id: string;
  name: string;
  type: 'CLUB' | 'LEAGUE' | 'NATIONAL';
  crest: string;
  coverPhoto: string;
  description: string;
  membersCount: number;
  isJoined?: boolean;
  manager?: string;
  stadium?: string;
}

export interface NotificationItem {
  id: string;
  type: 'LIKE' | 'COMMENT' | 'REPOST' | 'MENTION' | 'FIXTURE_GOAL' | 'TRANSFER_ALERT';
  actorName: string;
  actorAvatar: string;
  message: string;
  targetId?: string;
  createdAt: string;
  isRead: boolean;
}

export interface HotTakeAnalysisResult {
  hotMeter: HotMeterLevel;
  verdict: CommunityVerdict;
  spicinessScore: number; // 0 to 100
  aiSummary: string;
  suggestedHashtags: string[];
  isAppropriate: boolean;
  reasoning: string;
}
