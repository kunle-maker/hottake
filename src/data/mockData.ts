import { User, Post, Fixture, Transfer, Community, NotificationItem } from '../types';

export const CURRENT_USER: User = {
  id: 'usr_001',
  username: 'Ayodele',
  displayName: 'Ayodele',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  coverPhoto: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
  bio: 'Tactical Analyst & Football Enthusiast. Football is chess played at 100mph. ⚽️🎯',
  favoriteClub: 'Arsenal FC',
  favoriteClubCrest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80',
  favoriteLeague: 'Premier League',
  favoritePlayer: 'Bukayo Saka',
  followersCount: 1420,
  followingCount: 380,
  totalPosts: 89,
  isVerified: true,
  xp: 3850,
  level: 12,
  levelTitle: 'Tactical Mastermind',
  reputationScore: 94,
  badges: [
    {
      id: 'bdg_1',
      name: 'Volcanic Author',
      description: 'Published 10 Hot Takes with over 500 votes',
      iconName: 'Flame',
      unlockedAt: '2026-05-12'
    },
    {
      id: 'bdg_2',
      name: 'Derby Prophet',
      description: 'Correctly predicted 5 consecutive derby match scores',
      iconName: 'Trophy',
      unlockedAt: '2026-06-01'
    },
    {
      id: 'bdg_3',
      name: 'Transfer Watcher',
      description: 'First to comment on 20 confirmed transfer deals',
      iconName: 'Zap',
      unlockedAt: '2026-07-10'
    }
  ],
  predictionAccuracy: 78.5,
  joinedDate: 'August 2025',
  role: 'ADMIN'
};

export const INITIAL_POSTS: Post[] = [
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
    content: 'Unpopular opinion: Saka winning the Golden Ball and leading Arsenal in Champions League solidifies him as the most complete winger in world football right now. His work-rate in defensive transition is unmatched.',
    images: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80'],
    hashtags: ['Saka', 'GoldenBall', 'PremierLeague', 'Gunners'],
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
  },
  {
    id: 'post_104',
    userId: 'usr_005',
    author: {
      id: 'usr_005',
      username: 'ClassicTactics',
      displayName: 'David Miller',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      level: 21
    },
    content: 'Modern football needs more managers who play with pure attacking joy and fluid positional rotation rather than rigid mechanical patterns.',
    images: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80'],
    hashtags: ['Tactics', 'AttackingFootball', 'UCL'],
    taggedClub: 'Real Madrid',
    createdAt: '15h ago',
    hotMeter: 'MILD',
    communityVerdict: 'COLD_TAKE',
    agedLikeWineVotes: 450,
    agedLikeMilkVotes: 12,
    likesCount: 1540,
    commentsCount: 84,
    repostsCount: 110
  }
];

export const INITIAL_FIXTURES: Fixture[] = [
  {
    id: 'fix_201',
    league: 'Club Friendly',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=60&auto=format&fit=crop&q=80',
    homeTeam: {
      name: 'Arsenal',
      crest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80',
      score: 4
    },
    awayTeam: {
      name: 'Inter Milan',
      crest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&auto=format&fit=crop&q=80',
      score: 1
    },
    status: 'LIVE',
    time: "81'",
    date: 'Sat 1 Aug 2026',
    stadium: 'Kai Tak Stadium, Hong Kong',
    events: [
      { id: 'ev_1', minute: 14, type: 'GOAL', player: 'B. Saka', team: 'HOME', details: 'Assist: M. Odegaard' },
      { id: 'ev_2', minute: 32, type: 'GOAL', player: 'L. Martinez', team: 'AWAY', details: 'Right foot shot' },
      { id: 'ev_3', minute: 55, type: 'GOAL', player: 'G. Martinelli', team: 'HOME', details: 'Curling top corner' },
      { id: 'ev_4', minute: 68, type: 'YELLOW_CARD', player: 'B. Barella', team: 'AWAY', details: 'Tactical foul' },
      { id: 'ev_5', minute: 81, type: 'GOAL', player: 'M. Merino', team: 'HOME', details: 'Debut goal! Sensational strike' }
    ],
    lineups: {
      home: ['Raya', 'White', 'Saliba', 'Gabriel', 'Timber', 'Rice', 'Merino', 'Odegaard', 'Saka', 'Martinelli', 'Havertz'],
      away: ['Sommer', 'Pavard', 'Acerbi', 'Bastoni', 'Darmian', 'Barella', 'Calhanoglu', 'Mkhitaryan', 'Dimarco', 'Thuram', 'Martinez']
    }
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
  },
  {
    id: 'fix_203',
    league: 'Club Friendly',
    leagueLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=60&auto=format&fit=crop&q=80',
    homeTeam: {
      name: 'Real Madrid',
      crest: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&auto=format&fit=crop&q=80',
      score: 0
    },
    awayTeam: {
      name: 'Atletico Madrid',
      crest: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      score: 0
    },
    status: 'UPCOMING',
    time: '12:00 WAT',
    date: 'Sun 9 Aug 2026',
    stadium: 'Seoul World Cup Stadium'
  }
];

export const INITIAL_TRANSFERS: Transfer[] = [
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

export const COMMUNITIES: Community[] = [
  {
    id: 'com_afc',
    name: 'Arsenal FC',
    type: 'CLUB',
    crest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=120&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80',
    description: 'The Gunners community. North London derby discussions, Arteta tactics, and match threads.',
    membersCount: 410000,
    isJoined: true,
    manager: 'Mikel Arteta',
    stadium: 'Emirates Stadium'
  },
  {
    id: 'com_rmcf',
    name: 'Real Madrid',
    type: 'CLUB',
    crest: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&auto=format&fit=crop&q=80',
    description: 'Hala Madrid! 15-time Kings of Europe hub. Santiago Bernabeu news, Galacticos, La Liga chatter.',
    membersCount: 620000,
    isJoined: true,
    manager: 'Carlo Ancelotti',
    stadium: 'Santiago Bernabéu'
  },
  {
    id: 'com_fcb',
    name: 'FC Barcelona',
    type: 'CLUB',
    crest: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1200&auto=format&fit=crop&q=80',
    description: 'Visca el Barça! La Masia talents, Hansi Flick tactics, Spotify Camp Nou updates.',
    membersCount: 590000,
    isJoined: false,
    manager: 'Hansi Flick',
    stadium: 'Spotify Camp Nou'
  },
  {
    id: 'com_cfc',
    name: 'Chelsea FC',
    type: 'CLUB',
    crest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=120&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    description: 'Pride of London hub. Stamford Bridge match threads, Enzo Maresca tactics, transfer news.',
    membersCount: 380000,
    isJoined: false,
    manager: 'Enzo Maresca',
    stadium: 'Stamford Bridge'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'LIKE',
    actorName: 'TacticsGuru',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    message: 'liked your Hot Take on Saka Golden Ball potential',
    createdAt: '12m ago',
    isRead: false
  },
  {
    id: 'notif_2',
    type: 'FIXTURE_GOAL',
    actorName: 'FootballHub',
    actorAvatar: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150&auto=format&fit=crop&q=80',
    message: "81' GOAL!! | Arsenal 4-1 Inter. Merino scores on debut. Sensational volley!",
    createdAt: '45m ago',
    isRead: false
  },
  {
    id: 'notif_3',
    type: 'COMMENT',
    actorName: 'ArsenalPundit',
    actorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    message: 'replied: "Disagree completely! Arsenal midfield is superior in transition."',
    createdAt: '2h ago',
    isRead: true
  }
];

