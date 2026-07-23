import React, { useState } from 'react';
import { Post, User, AgedLikeVote } from '../types';
import { PostCard } from './PostCard';
import { FlameIcon } from './CustomIcons';
import { Sparkles, TrendingUp, Users, Shield, ArrowUpRight } from 'lucide-react';

interface HomeFeedProps {
  posts: Post[];
  user: User;
  onLike: (postId: string) => void;
  onVoteAged: (postId: string, vote: AgedLikeVote) => void;
  onOpenComments: (post: Post) => void;
  onBookmark: (postId: string) => void;
  onRepost: (postId: string) => void;
  onOpenCreatePost: () => void;
  onSelectCommunity?: (communityId: string) => void;
}

export type FeedFilter = 'ALL' | 'HOT_TAKES' | 'CONTROVERSIAL' | 'FOLLOWING' | 'CITYZENS';

export const HomeFeed: React.FC<HomeFeedProps> = ({
  posts,
  user,
  onLike,
  onVoteAged,
  onOpenComments,
  onBookmark,
  onRepost,
  onOpenCreatePost,
  onSelectCommunity
}) => {
  const [filter, setFilter] = useState<FeedFilter>('ALL');

  const filteredPosts = posts.filter((p) => {
    if (filter === 'HOT_TAKES') return p.hotMeter === 'SPICY' || p.hotMeter === 'NUCLEAR';
    if (filter === 'CONTROVERSIAL') return p.communityVerdict === 'VOLCANIC' || p.agedLikeMilkVotes > 20;
    if (filter === 'FOLLOWING') return p.author.username === 'TacticsGuru' || p.author.username === 'ArsenalPundit';
    if (filter === 'CITYZENS') return p.taggedClub === 'Manchester City' || p.author.favoriteClubCrest?.includes('508098682722');
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Welcome Banner inspired by Official Club App layout */}
      <div className="bg-gradient-to-r from-[#0B1E3D] via-[#0E2854] to-[#00A3E0] rounded-2xl p-4 sm:p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/15 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider text-sky-200 uppercase">
                Welcome Back, {user.displayName}
              </span>
              <span className="text-xs text-sky-300 font-medium">Lvl {user.level} Author</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight font-mono uppercase leading-tight">
              NEVER MISS A <span className="text-[#00A3E0]">HOT TAKE</span>
            </h1>
            <p className="text-xs text-sky-100/80 mt-1 max-w-md">
              Share your football opinions, debate with fans worldwide, and vote on community verdicts.
            </p>
          </div>

          <button
            onClick={onOpenCreatePost}
            className="px-4 py-2.5 rounded-xl bg-white text-[#0B1E3D] hover:bg-sky-50 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-black/20 self-stretch sm:self-auto justify-center"
          >
            <FlameIcon size={16} className="text-red-500" />
            <span>Drop A Hot Take</span>
          </button>
        </div>
      </div>

      {/* Featured Community Banner Strip */}
      <div className="bg-white dark:bg-[#0C1D38] rounded-xl p-3 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <img
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80"
            alt="Man City"
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>Man City Community Feed</span>
              <span className="bg-sky-500/10 text-[#00A3E0] text-[10px] px-1.5 py-0.2 rounded font-bold">Official Hub</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">485k Cityzens debating Rayan Cherki debut goal & Golden Ball</p>
          </div>
        </div>
        {onSelectCommunity && (
          <button
            onClick={() => onSelectCommunity('com_mcfc')}
            className="text-xs font-bold text-[#00A3E0] hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            <span>Visit Hub</span>
            <ArrowUpRight size={14} />
          </button>
        )}
      </div>

      {/* Feed Filter Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'ALL'
              ? 'bg-[#0B1E3D] text-white shadow-xs'
              : 'bg-white dark:bg-[#0C1D38] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <Sparkles size={14} />
          <span>All Feed</span>
        </button>

        <button
          onClick={() => setFilter('HOT_TAKES')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'HOT_TAKES'
              ? 'bg-[#0B1E3D] text-white shadow-xs'
              : 'bg-white dark:bg-[#0C1D38] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <FlameIcon size={14} className="text-amber-500" />
          <span>🔥 Hot Takes Only</span>
        </button>

        <button
          onClick={() => setFilter('CONTROVERSIAL')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'CONTROVERSIAL'
              ? 'bg-[#0B1E3D] text-white shadow-xs'
              : 'bg-white dark:bg-[#0C1D38] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <TrendingUp size={14} className="text-red-500" />
          <span>Controversial</span>
        </button>

        <button
          onClick={() => setFilter('FOLLOWING')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'FOLLOWING'
              ? 'bg-[#0B1E3D] text-white shadow-xs'
              : 'bg-white dark:bg-[#0C1D38] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <Users size={14} />
          <span>Following</span>
        </button>

        <button
          onClick={() => setFilter('CITYZENS')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'CITYZENS'
              ? 'bg-[#0B1E3D] text-white shadow-xs'
              : 'bg-white dark:bg-[#0C1D38] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <Shield size={14} className="text-[#00A3E0]" />
          <span>Man City</span>
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={onLike}
              onVoteAged={onVoteAged}
              onOpenComments={onOpenComments}
              onBookmark={onBookmark}
              onRepost={onRepost}
            />
          ))
        ) : (
          <div className="bg-white dark:bg-[#0C1D38] rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-800">
            <FlameIcon size={32} className="mx-auto text-slate-400 mb-2" />
            <h3 className="font-bold text-[#0B1E3D] dark:text-white text-sm">No Hot Takes found for this filter</h3>
            <p className="text-xs text-slate-500 mt-1">Be the first football fan to drop a take here!</p>
            <button
              onClick={onOpenCreatePost}
              className="mt-4 px-4 py-2 bg-[#00A3E0] text-white font-bold text-xs rounded-xl hover:bg-sky-400"
            >
              Post A Hot Take Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
