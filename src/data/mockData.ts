import { User, Post, Fixture, Transfer, Community, NotificationItem } from '../types';

export const CURRENT_USER: User = {
  id: 'usr_001',
  username: 'Ayodele',
  displayName: 'Ayodele',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  coverPhoto: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
  bio: 'Tactical Analyst & Die-hard Cityzen. Football is chess played at 100mph. ⚽️🎯',
  favoriteClub: 'Manchester City',
  favoriteClubCrest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80',
  favoriteLeague: 'Premier League',
  favoritePlayer: 'Rodri',
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
    content: 'Unpopular opinion: Rodri winning the Golden Ball and World Cup triumph solidifies him as the most complete midfielder in football history. Better than Xavi or Busquets at their peaks because of his match-winning goals in key finals.',
    images: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80'],
    hashtags: ['Rodri', 'GoldenBall', 'PremierLeague', 'MidfieldGOAT'],
    taggedClub: 'Manchester City',
    taggedPlayer: 'Rodri',
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
      username: 'KeeganEraFan',
      displayName: 'David Miller',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      level: 21
    },
    content: 'Watch: The Keegan Years! Kevin Keegan brought unmatched flair and entertainment back to City. Modern football needs more managers who play with that pure attacking joy.',
    images: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80'],
    hashtags: ['CityHistory', 'KeeganYears', 'AttackingFootball'],
    taggedClub: 'Manchester City',
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
      name: 'Man City',
      crest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80',
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
      { id: 'ev_1', minute: 14, type: 'GOAL', player: 'E. Haaland', team: 'HOME', details: 'Assist: K. De Bruyne' },
      { id: 'ev_2', minute: 32, type: 'GOAL', player: 'L. Martinez', team: 'AWAY', details: 'Right foot shot' },
      { id: 'ev_3', minute: 55, type: 'GOAL', player: 'P. Foden', team: 'HOME', details: 'Curling left-foot top corner' },
      { id: 'ev_4', minute: 68, type: 'YELLOW_CARD', player: 'B. Barella', team: 'AWAY', details: 'Tactical foul' },
      { id: 'ev_5', minute: 81, type: 'GOAL', player: 'R. Cherki', team: 'HOME', details: 'Debut goal! Sensational strike' }
    ],
    lineups: {
      home: ['Ederson', 'Walker', 'Dias', 'Gvardiol', 'Ake', 'Rodri', 'Bernardo', 'De Bruyne', 'Foden', 'Doku', 'Haaland'],
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
      name: 'Man City',
      crest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80',
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
      name: 'Man City',
      crest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80',
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
    toClub: 'Manchester City',
    toClubCrest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=80',
    fee: '€38M',
    type: 'CONFIRMED',
    tierReliability: 1,
    summary: 'Here We Go! Rayan Cherki completes medical and signs a 5-year contract at Etihad.',
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
    id: 'com_mcfc',
    name: 'Manchester City',
    type: 'CLUB',
    crest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=120&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    description: 'Official fan hub for Manchester City FC. Blue Moon, Pep Guardiola, Etihad Stadium news and debates.',
    membersCount: 485000,
    isJoined: true,
    manager: 'Pep Guardiola',
    stadium: 'Etihad Stadium'
  },
  {
    id: 'com_afc',
    name: 'Arsenal FC',
    type: 'CLUB',
    crest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=120&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80',
    description: 'The Gunners community. North London derby discussions, Arteta tactics, and match threads.',
    membersCount: 410000,
    isJoined: false,
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
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'LIKE',
    actorName: 'TacticsGuru',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    message: 'liked your Hot Take on Rodri Golden Ball victory',
    createdAt: '12m ago',
    isRead: false
  },
  {
    id: 'notif_2',
    type: 'FIXTURE_GOAL',
    actorName: 'ManCityApp',
    actorAvatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    message: "81' GOAL!! | Wolves 0-4 City. Rayan Cherki scores on his City debut. An afternoon to remember!",
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
