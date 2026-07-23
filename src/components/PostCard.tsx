import React, { useState } from 'react';
import { Post, AgedLikeVote } from '../types';
import { HotMeterBadge, CommunityVerdictBadge, VerifiedBadge, WineIcon, MilkIcon } from './CustomIcons';
import { Heart, MessageSquare, Repeat, Bookmark, Share2, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onVoteAged: (postId: string, vote: AgedLikeVote) => void;
  onOpenComments: (post: Post) => void;
  onBookmark: (postId: string) => void;
  onRepost: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onVoteAged,
  onOpenComments,
  onBookmark,
  onRepost
}) => {
  const [copied, setCopied] = useState(false);

  const totalAgedVotes = post.agedLikeWineVotes + post.agedLikeMilkVotes;
  const winePercent = totalAgedVotes > 0 ? Math.round((post.agedLikeWineVotes / totalAgedVotes) * 100) : 50;

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      console.warn("Clipboard API failed, trying execCommand fallback", err);
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    } catch (err) {
      console.error("Copy failed", err);
      return false;
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?post=${post.id}`;
    let success = false;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hot Take by @${post.author.username}`,
          text: post.content,
          url: shareUrl
        });
        return;
      } catch (err) {
        // User cancelled or share API error, fallback to copy
        success = await copyToClipboard(shareUrl);
      }
    } else {
      success = await copyToClipboard(shareUrl);
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="bg-white dark:bg-[#1E293B] rounded-2xl p-4 mb-3.5 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      {/* Repost Header if applicable */}
      {post.repostAuthor && (
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
          <Repeat size={13} className="text-orange-500" />
          <span>{post.repostAuthor} reposted</span>
        </div>
      )}

      {/* Author Top Bar */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={post.author.avatar}
              alt={post.author.displayName}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            {post.author.favoriteClubCrest && (
              <img
                src={post.author.favoriteClubCrest}
                alt="Club"
                className="w-4 h-4 rounded-full object-cover absolute -bottom-1 -right-1 border border-white dark:border-slate-900 shadow-xs"
              />
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                {post.author.displayName}
              </span>
              {post.author.isVerified && <VerifiedBadge size={14} />}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 font-bold text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30">
                Lvl {post.author.level}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>@{post.author.username}</span>
              <span>•</span>
              <span>{post.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Hot Meter & Verdict Badges */}
        <div className="flex items-center gap-1.5 flex-col sm:flex-row items-end">
          <HotMeterBadge level={post.hotMeter} />
          <CommunityVerdictBadge verdict={post.communityVerdict} />
        </div>
      </div>

      {/* Tagged Context Pill if available */}
      {(post.taggedClub || post.taggedPlayer) && (
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
          {post.taggedClub && <span className="bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-800/50"># {post.taggedClub}</span>}
          {post.taggedPlayer && <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/50">👤 {post.taggedPlayer}</span>}
        </div>
      )}

      {/* Content Text */}
      <p className="text-slate-800 dark:text-slate-100 text-sm leading-relaxed mb-3 whitespace-pre-line font-normal">
        {post.content}
      </p>

      {/* Hashtags */}
      {post.hashtags && post.hashtags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {post.hashtags.map((tag) => (
            <span key={tag} className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Media Images */}
      {post.images && post.images.length > 0 && (
        <div className="rounded-xl overflow-hidden mb-3.5 max-h-80 border border-slate-200 dark:border-slate-800 bg-slate-950">
          <img
            src={post.images[0]}
            alt="Hot take media"
            className="w-full h-full object-cover max-h-80 hover:scale-101 transition-transform"
          />
        </div>
      )}

      {/* "Aged Like Fine Wine" vs "Aged Like Milk" Voting Widget */}
      <div className="bg-slate-50 dark:bg-slate-900/70 rounded-xl p-3 mb-3 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
          <span className="text-slate-700 dark:text-slate-300">Aged Like...</span>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {totalAgedVotes} community votes
          </span>
        </div>

        {/* Vote Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            onClick={() => onVoteAged(post.id, 'FINE_WINE')}
            className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              post.myAgedVote === 'FINE_WINE'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 hover:bg-purple-50 dark:hover:bg-slate-700'
            }`}
          >
            <WineIcon size={16} />
            <span>Fine Wine ({post.agedLikeWineVotes})</span>
          </button>

          <button
            onClick={() => onVoteAged(post.id, 'MILK')}
            className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              post.myAgedVote === 'MILK'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 hover:bg-amber-50 dark:hover:bg-slate-700'
            }`}
          >
            <MilkIcon size={16} />
            <span>Milk ({post.agedLikeMilkVotes})</span>
          </button>
        </div>

        {/* Consensus Progress Bar */}
        {totalAgedVotes > 0 && (
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-amber-500 rounded-full overflow-hidden flex">
              <div
                className="bg-purple-600 h-full transition-all duration-500"
                style={{ width: `${winePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
              <span>{winePercent}% Wine</span>
              <span>{100 - winePercent}% Milk</span>
            </div>
          </div>
        )}
      </div>

      {/* Post Action Buttons */}
      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs font-medium">
        {/* Like */}
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors ${
            post.isLikedByMe ? 'text-red-500 font-bold bg-red-50 dark:bg-red-950/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Heart size={16} className={post.isLikedByMe ? 'fill-red-500 text-red-500' : ''} />
          <span>{post.likesCount}</span>
        </button>

        {/* Comment */}
        <button
          onClick={() => onOpenComments(post)}
          className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <MessageSquare size={16} />
          <span>{post.commentsCount}</span>
        </button>

        {/* Repost */}
        <button
          onClick={() => onRepost(post.id)}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors ${
            post.isRepostedByMe ? 'text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Repeat size={16} />
          <span>{post.repostsCount}</span>
        </button>

        {/* Bookmark */}
        <button
          onClick={() => onBookmark(post.id)}
          className={`p-1.5 rounded-lg transition-colors ${
            post.isBookmarkedByMe ? 'text-orange-600 dark:text-orange-400 font-bold bg-orange-50 dark:bg-orange-950/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Save Bookmark"
        >
          <Bookmark size={16} className={post.isBookmarkedByMe ? 'fill-orange-600 dark:fill-orange-400' : ''} />
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          title="Share Take"
        >
          <Share2 size={16} />
          {copied && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap">
              Link copied!
            </span>
          )}
        </button>
      </div>
    </article>
  );
};
