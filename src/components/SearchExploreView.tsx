import React, { useState } from 'react';
import { Post, User, Community } from '../types';
import { VerifiedBadge } from './CustomIcons';
import { Search, Flame, TrendingUp, Users, Shield, Hash, ArrowUpRight, UserPlus } from 'lucide-react';

interface SearchExploreViewProps {
  posts: Post[];
  communities: Community[];
  onOpenPost: (post: Post) => void;
  onSelectCommunity: (communityId: string) => void;
}

export const SearchExploreView: React.FC<SearchExploreViewProps> = ({
  posts,
  communities,
  onOpenPost,
  onSelectCommunity
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<'ALL' | 'CLUBS' | 'PLAYERS' | 'HASHTAGS' | 'TAKES'>('ALL');

  const trendingHashtags = [
    { tag: 'GoldenBall', postsCount: '48.2k takes' },
    { tag: 'Rodri', postsCount: '38.9k takes' },
    { tag: 'PepOut', postsCount: '24.1k takes' },
    { tag: 'MbappeReal', postsCount: '19.4k takes' },
    { tag: 'NicoWilliamsBarca', postsCount: '15.8k takes' },
    { tag: 'ChampionsLeague', postsCount: '89.0k takes' }
  ];

  const trendingPlayers = [
    { name: 'Rodri', club: 'Man City', position: 'Midfielder', rating: 'World Champion' },
    { name: 'Rayan Cherki', club: 'Man City', position: 'Attacking Mid', rating: 'Debut Goal Hero' },
    { name: 'Kylian Mbappé', club: 'Real Madrid', position: 'Forward', rating: '3 Goals in 2' },
    { name: 'Erling Haaland', club: 'Man City', position: 'Striker', rating: 'Pre-season Top Scorer' }
  ];

  const featuredCreators = [
    { name: 'Liam Davies', handle: 'TacticsGuru', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80', level: 18, club: 'Man City' },
    { name: 'Kofi Mensah', handle: 'ArsenalPundit', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80', level: 14, club: 'Arsenal' },
    { name: 'Carlos Silva', handle: 'MadridistaKing', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80', level: 9, club: 'Real Madrid' }
  ];

  // Search Results Filtering
  const filteredPosts = posts.filter(p =>
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.author.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.hashtags.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCommunities = communities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-20">
      {/* Search Input Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Hot Takes, clubs, players (#Rodri, #PepOut, Man City)..."
          className="w-full bg-white dark:bg-[#0C1D38] border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-hidden focus:border-[#00A3E0] shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-slate-200 dark:bg-slate-700 rounded-full w-5 h-5 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200"
          >
            ×
          </button>
        )}
      </div>

      {/* Category Pills if Searching */}
      {searchQuery ? (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Search Results for "{searchQuery}"
          </h2>

          {/* Communities Results */}
          {filteredCommunities.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-[#00A3E0] tracking-wider">Clubs & Communities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCommunities.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onSelectCommunity(c.id)}
                    className="p-3 bg-white dark:bg-[#0C1D38] rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 cursor-pointer hover:border-[#00A3E0]"
                  >
                    <img src={c.crest} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-xs">{c.name}</h4>
                      <p className="text-[10px] text-slate-500">{c.membersCount.toLocaleString()} members</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Post Results */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-[#00A3E0] tracking-wider">Hot Takes ({filteredPosts.length})</h3>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onOpenPost(p)}
                  className="p-3.5 bg-white dark:bg-[#0C1D38] rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-[#00A3E0] space-y-1"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-slate-800 dark:text-slate-200">@{p.author.username}</span>
                    <span>{p.createdAt}</span>
                  </div>
                  <p className="text-xs line-clamp-2">{p.content}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No Hot Takes match this query.</p>
            )}
          </div>
        </div>
      ) : (
        /* Explore Home / Trending Hub */
        <div className="space-y-5">
          {/* Trending Hashtags Grid */}
          <section className="bg-white dark:bg-[#0C1D38] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-[#00A3E0]" />
                <h2 className="font-bold text-sm">Trending Football Topics</h2>
              </div>
              <span className="text-[10px] bg-sky-500/10 text-[#00A3E0] px-2 py-0.5 rounded font-bold uppercase">
                Realtime
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {trendingHashtags.map((item) => (
                <div
                  key={item.tag}
                  onClick={() => setSearchQuery(item.tag)}
                  className="p-2.5 bg-slate-50 dark:bg-[#07152B] rounded-xl border border-slate-200/70 dark:border-slate-800/80 cursor-pointer hover:border-[#00A3E0] transition-all"
                >
                  <div className="flex items-center gap-1 text-xs font-bold text-[#00A3E0]">
                    <Hash size={13} />
                    <span>{item.tag}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{item.postsCount}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Players Cards */}
          <section className="bg-white dark:bg-[#0C1D38] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-[#00A3E0]" />
                <h2 className="font-bold text-sm">Trending Players in Debates</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trendingPlayers.map((player) => (
                <div
                  key={player.name}
                  onClick={() => setSearchQuery(player.name)}
                  className="p-3 bg-slate-50 dark:bg-[#07152B] rounded-xl border border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between cursor-pointer hover:border-[#00A3E0]"
                >
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white">{player.name}</h3>
                    <p className="text-[10px] text-slate-500">{player.club} • {player.position}</p>
                  </div>
                  <span className="bg-sky-500/10 text-[#00A3E0] text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {player.rating}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Creators List */}
          <section className="bg-white dark:bg-[#0C1D38] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-[#00A3E0]" />
                <h2 className="font-bold text-sm">Featured Hot Take Authors</h2>
              </div>
            </div>

            <div className="space-y-2.5">
              {featuredCreators.map((creator) => (
                <div
                  key={creator.handle}
                  className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#07152B] rounded-xl border border-slate-200/70 dark:border-slate-800/80"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={creator.avatar} alt={creator.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs">{creator.name}</span>
                        <VerifiedBadge size={12} />
                      </div>
                      <span className="text-[10px] text-slate-500">@{creator.handle} • Lvl {creator.level}</span>
                    </div>
                  </div>

                  <button className="px-3 py-1 bg-[#00A3E0] hover:bg-sky-400 text-[#0B1E3D] font-bold text-xs rounded-lg flex items-center gap-1 transition-all">
                    <UserPlus size={13} />
                    <span>Follow</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
