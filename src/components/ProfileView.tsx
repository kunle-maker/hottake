import React, { useState } from 'react';
import { User, Post, AgedLikeVote } from '../types';
import { PostCard } from './PostCard';
import { VerifiedBadge, FlameIcon } from './CustomIcons';
import { Award, Trophy, Bookmark, FileText, Settings, Shield, LogOut, Sparkles } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  userPosts: Post[];
  bookmarkedPosts: Post[];
  drafts: string[];
  onLikePost: (postId: string) => void;
  onVoteAged: (postId: string, vote: AgedLikeVote) => void;
  onOpenComments: (post: Post) => void;
  onLogout: () => void;
  onOpenAdmin?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  userPosts,
  bookmarkedPosts,
  drafts,
  onLikePost,
  onVoteAged,
  onOpenComments,
  onLogout,
  onOpenAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'TAKES' | 'BOOKMARKS' | 'BADGES' | 'DRAFTS'>('TAKES');

  const xpForNextLevel = user.level * 400;
  const xpPercent = Math.min(Math.round((user.xp / xpForNextLevel) * 100), 100);

  return (
    <div className="space-y-4 pb-20">
      {/* Profile Header Banner Box */}
      <div className="bg-white dark:bg-[#0C1D38] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
        {/* Cover Photo */}
        <div className="h-32 sm:h-40 w-full relative bg-slate-900">
          <img src={user.coverPhoto} alt="Cover" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1D38] via-transparent to-transparent" />
        </div>

        {/* Profile Info Row */}
        <div className="p-4 sm:p-5 relative -mt-12 space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div className="flex items-end gap-3">
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-[#0C1D38] shadow-lg"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight">
                    {user.displayName}
                  </h1>
                  {user.isVerified && <VerifiedBadge size={18} />}
                </div>
                <span className="text-xs text-sky-500 font-bold block">@{user.username}</span>
              </div>
            </div>

            {/* Logout / Admin controls */}
            <div className="flex items-center gap-2">
              {user.role === 'ADMIN' && (
                <button
                  onClick={onOpenAdmin}
                  className="p-2 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 font-bold text-xs flex items-center gap-1"
                  title="Admin Dashboard"
                >
                  <Shield size={16} />
                </button>
              )}
              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 font-bold text-xs flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Bio */}
          <p className="text-xs text-slate-700 dark:text-slate-300 font-normal leading-relaxed">{user.bio}</p>

          {/* Level & XP Progress Card */}
          <div className="bg-slate-50 dark:bg-[#07152B] p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#00A3E0] flex items-center gap-1">
                <Trophy size={14} />
                Level {user.level}: {user.levelTitle}
              </span>
              <span className="text-slate-500">{user.xp} / {xpForNextLevel} XP</span>
            </div>

            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0B1E3D] to-[#00A3E0] transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white block text-sm">{user.totalPosts}</span>
              <span className="text-[10px] text-slate-500">Takes</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white block text-sm">{user.followersCount}</span>
              <span className="text-[10px] text-slate-500">Followers</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white block text-sm">{user.reputationScore}%</span>
              <span className="text-[10px] text-slate-500">Reputation</span>
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white block text-sm">{user.predictionAccuracy}%</span>
              <span className="text-[10px] text-slate-500">Predictions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Sub Navigation */}
      <div className="flex items-center gap-1 bg-white dark:bg-[#0C1D38] p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('TAKES')}
          className={`flex-1 py-2 rounded-lg transition-all text-center ${
            activeTab === 'TAKES' ? 'bg-[#0B1E3D] text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          My Takes ({userPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('BOOKMARKS')}
          className={`flex-1 py-2 rounded-lg transition-all text-center ${
            activeTab === 'BOOKMARKS' ? 'bg-[#0B1E3D] text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Bookmarks ({bookmarkedPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('BADGES')}
          className={`flex-1 py-2 rounded-lg transition-all text-center ${
            activeTab === 'BADGES' ? 'bg-[#0B1E3D] text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Badges ({user.badges.length})
        </button>

        <button
          onClick={() => setActiveTab('DRAFTS')}
          className={`flex-1 py-2 rounded-lg transition-all text-center ${
            activeTab === 'DRAFTS' ? 'bg-[#0B1E3D] text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Drafts ({drafts.length})
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="space-y-3">
        {activeTab === 'TAKES' && (
          userPosts.length > 0 ? (
            userPosts.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                onLike={onLikePost}
                onVoteAged={onVoteAged}
                onOpenComments={onOpenComments}
                onBookmark={() => {}}
                onRepost={() => {}}
              />
            ))
          ) : (
            <p className="text-center text-xs text-slate-500 p-6">You haven't posted any Hot Takes yet.</p>
          )
        )}

        {activeTab === 'BOOKMARKS' && (
          bookmarkedPosts.length > 0 ? (
            bookmarkedPosts.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                onLike={onLikePost}
                onVoteAged={onVoteAged}
                onOpenComments={onOpenComments}
                onBookmark={() => {}}
                onRepost={() => {}}
              />
            ))
          ) : (
            <p className="text-center text-xs text-slate-500 p-6">No saved bookmarks yet.</p>
          )
        )}

        {activeTab === 'BADGES' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.badges.map((b) => (
              <div
                key={b.id}
                className="bg-white dark:bg-[#0C1D38] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B1E3D] to-[#00A3E0] text-white flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">{b.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{b.description}</p>
                  <span className="text-[10px] text-sky-500 font-semibold block mt-1">Unlocked {b.unlockedAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'DRAFTS' && (
          drafts.length > 0 ? (
            <div className="space-y-2">
              {drafts.map((d, i) => (
                <div key={i} className="bg-white dark:bg-[#0C1D38] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-[#00A3E0] block mb-1">Draft #{i + 1}</span>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xs text-slate-500 p-6">No saved drafts.</p>
          )
        )}
      </div>
    </div>
  );
};
