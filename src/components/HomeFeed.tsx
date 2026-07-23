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

export type FeedFilter = 'ALL' | 'HOT_TAKES' | 'CONTROVERSIAL' | 'FOLLOWING' | 'PREMIER_LEAGUE';

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
    if (filter === 'PREMIER_LEAGUE') return p.hashtags?.includes('PremierLeague') || p.hashtags?.includes('EPL') || p.taggedClub === 'Arsenal';
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Welcome Banner in Fiery Stadium Theme */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-xl border border-orange-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-orange-500/20 border border-orange-400/40 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider text-orange-300 uppercase">
                Welcome Back, {user.displayName}
              </span>
              <span className="text-xs text-slate-300 font-semibold">Lvl {user.level} Author</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight font-display uppercase leading-tight text-white">
              NEVER MISS A <span className="text-orange-400">HOT TAKE</span>
            </h1>
            <p className="text-xs text-slate-200 mt-1 max-w-md">
              Share your football opinions, debate with fans worldwide, and vote on community verdicts.
            </p>
          </div>

          <button
            onClick={onOpenCreatePost}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md self-stretch sm:self-auto justify-center"
          >
            <FlameIcon size={16} className="text-white" />
            <span>Drop A Hot Take</span>
          </button>
        </div>
      </div>

      {/* Featured Community Banner Strip */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl p-3 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
            alt="Global Football"
            className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700"
          />
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>Premier League Community Feed</span>
              <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] px-1.5 py-0.2 rounded font-extrabold border border-orange-500/20">Official Hub</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Global fans debating title race & tactical breakdowns</p>
          </div>
        </div>
        {onSelectCommunity && (
          <button
            onClick={() => onSelectCommunity('com_epl')}
            className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 whitespace-nowrap"
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
              ? 'bg-orange-600 text-white shadow-xs font-extrabold'
              : 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles size={14} />
          <span>All Feed</span>
        </button>

        <button
          onClick={() => setFilter('HOT_TAKES')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'HOT_TAKES'
              ? 'bg-orange-600 text-white shadow-xs font-extrabold'
              : 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FlameIcon size={14} className={filter === 'HOT_TAKES' ? 'text-white' : 'text-amber-500'} />
          <span>Hot Takes</span>
        </button>

        <button
          onClick={() => setFilter('CONTROVERSIAL')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'CONTROVERSIAL'
              ? 'bg-orange-600 text-white shadow-xs font-extrabold'
              : 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <TrendingUp size={14} className={filter === 'CONTROVERSIAL' ? 'text-white' : 'text-red-500'} />
          <span>Controversial</span>
        </button>

        <button
          onClick={() => setFilter('FOLLOWING')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'FOLLOWING'
              ? 'bg-orange-600 text-white shadow-xs font-extrabold'
              : 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users size={14} />
          <span>Following</span>
        </button>

        <button
          onClick={() => setFilter('PREMIER_LEAGUE')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'PREMIER_LEAGUE'
              ? 'bg-orange-600 text-white shadow-xs font-extrabold'
              : 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Shield size={14} className={filter === 'PREMIER_LEAGUE' ? 'text-white' : 'text-sky-500'} />
          <span>Premier League</span>
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
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-800">
            <FlameIcon size={32} className="mx-auto text-orange-500 mb-2" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">No Hot Takes found for this filter</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Be the first football fan to drop a take here!</p>
            <button
              onClick={onOpenCreatePost}
              className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
            >
              Post A Hot Take Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

