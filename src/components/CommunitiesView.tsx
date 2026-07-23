import React, { useState } from 'react';
import { Community, Post } from '../types';
import { PostCard } from './PostCard';
import { Shield, Users, ArrowLeft, Trophy, MapPin, Check, Plus } from 'lucide-react';

interface CommunitiesViewProps {
  communities: Community[];
  posts: Post[];
  selectedCommunityId: string | null;
  onSelectCommunity: (id: string | null) => void;
  onLikePost: (postId: string) => void;
  onOpenComments: (post: Post) => void;
}

export const CommunitiesView: React.FC<CommunitiesViewProps> = ({
  communities,
  posts,
  selectedCommunityId,
  onSelectCommunity,
  onLikePost,
  onOpenComments
}) => {
  const [joinedIds, setJoinedIds] = useState<string[]>(['com_mcfc', 'com_rmcf']);

  const activeCommunity = communities.find((c) => c.id === selectedCommunityId);

  const toggleJoin = (id: string) => {
    if (joinedIds.includes(id)) {
      setJoinedIds(joinedIds.filter((i) => i !== id));
    } else {
      setJoinedIds([...joinedIds, id]);
    }
  };

  // If a specific community hub is selected
  if (activeCommunity) {
    const clubPosts = posts.filter(
      (p) => p.taggedClub?.toLowerCase() === activeCommunity.name.toLowerCase() || p.content.toLowerCase().includes(activeCommunity.name.toLowerCase())
    );

    const isJoined = joinedIds.includes(activeCommunity.id);

    return (
      <div className="space-y-4 pb-20">
        {/* Back button */}
        <button
          onClick={() => onSelectCommunity(null)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#00A3E0] hover:underline"
        >
          <ArrowLeft size={16} />
          <span>Back to All Football Communities</span>
        </button>

        {/* Community Hero Banner */}
        <div className="bg-white dark:bg-[#0C1D38] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="h-32 w-full relative bg-slate-900">
            <img src={activeCommunity.coverPhoto} alt="Cover" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1D38] via-transparent to-transparent" />
          </div>

          <div className="p-4 relative -mt-10 space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div className="flex items-end gap-3">
                <img
                  src={activeCommunity.crest}
                  alt={activeCommunity.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-[#0C1D38] shadow-md bg-white"
                />
                <div>
                  <h1 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight">
                    {activeCommunity.name} Community
                  </h1>
                  <span className="text-xs text-sky-500 font-medium">
                    {activeCommunity.membersCount.toLocaleString()} Fanatics
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleJoin(activeCommunity.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-xs ${
                  isJoined
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                    : 'bg-[#00A3E0] hover:bg-sky-400 text-white'
                }`}
              >
                {isJoined ? (
                  <>
                    <Check size={14} />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>Join Club Hub</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">{activeCommunity.description}</p>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
              {activeCommunity.manager && (
                <div className="flex items-center gap-1">
                  <Shield size={14} className="text-[#00A3E0]" />
                  <span>Manager: <strong>{activeCommunity.manager}</strong></span>
                </div>
              )}
              {activeCommunity.stadium && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-[#00A3E0]" />
                  <span>Stadium: <strong>{activeCommunity.stadium}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Club Dedicated Feed */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
            Official {activeCommunity.name} Hot Takes
          </h2>

          {clubPosts.length > 0 ? (
            clubPosts.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                onLike={onLikePost}
                onVoteAged={() => {}}
                onOpenComments={onOpenComments}
                onBookmark={() => {}}
                onRepost={() => {}}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-[#0C1D38] p-6 rounded-xl text-center text-xs text-slate-500 border border-slate-200 dark:border-slate-800">
              No specific takes yet for {activeCommunity.name}. Post one now!
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default Grid View of all Communities
  return (
    <div className="space-y-5 pb-20">
      <div className="bg-[#0B1E3D] text-white rounded-2xl p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Shield size={20} className="text-[#00A3E0]" />
          <div>
            <h1 className="font-black text-lg tracking-wider font-mono uppercase">Club & League Hubs</h1>
            <p className="text-[11px] text-sky-300">Join your club's official fan discussion room</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {communities.map((c) => {
          const isJoined = joinedIds.includes(c.id);
          return (
            <div
              key={c.id}
              className="bg-white dark:bg-[#0C1D38] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#00A3E0] transition-all space-y-3"
            >
              <div className="flex items-center gap-3">
                <img src={c.crest} alt={c.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                <div className="flex-1">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{c.name}</h3>
                  <span className="text-[11px] text-slate-500">{c.membersCount.toLocaleString()} members</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{c.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onSelectCommunity(c.id)}
                  className="text-xs font-bold text-[#00A3E0] hover:underline"
                >
                  Enter Hub →
                </button>

                <button
                  onClick={() => toggleJoin(c.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isJoined
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      : 'bg-[#00A3E0] text-white hover:bg-sky-400'
                  }`}
                >
                  {isJoined ? 'Joined' : 'Join'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
