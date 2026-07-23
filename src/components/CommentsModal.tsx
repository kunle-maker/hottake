import React, { useState } from 'react';
import { Post, Comment } from '../types';
import { VerifiedBadge } from './CustomIcons';
import { X, Heart, Send, MessageSquare } from 'lucide-react';

interface CommentsModalProps {
  post: Post;
  onClose: () => void;
  onAddComment: (postId: string, text: string) => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ post, onClose, onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState<Comment[]>([
    {
      id: 'c1',
      postId: post.id,
      userId: 'usr_002',
      userDisplayName: 'TacticsGuru',
      username: 'TacticsGuru',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      userLevel: 18,
      userIsVerified: true,
      content: 'Completely agree on the tactical assessment! Midfield positioning in transition is key.',
      createdAt: '45m ago',
      likesCount: 14
    },
    {
      id: 'c2',
      postId: post.id,
      userId: 'usr_003',
      userDisplayName: 'ArsenalPundit',
      username: 'ArsenalPundit',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      userLevel: 14,
      userIsVerified: true,
      content: 'Debatable! Rice and Merino double pivot will prove otherwise in the Champions League knockouts.',
      createdAt: '25m ago',
      likesCount: 8
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      postId: post.id,
      userId: 'usr_001',
      userDisplayName: 'Ayodele',
      username: 'Ayodele',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      userLevel: 12,
      userIsVerified: true,
      content: commentText.trim(),
      createdAt: 'Just now',
      likesCount: 0
    };

    setCommentsList([newCommentObj, ...commentsList]);
    onAddComment(post.id, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg h-[80vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-orange-400" />
            <h3 className="font-extrabold text-sm">Debate & Comments</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-slate-300">
            <X size={18} />
          </button>
        </div>

        {/* Original Post Snippet */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-xs">
          <span className="font-extrabold text-slate-900 dark:text-white">@{post.author.username}:</span>
          <p className="line-clamp-2 italic text-slate-700 dark:text-slate-300 mt-0.5">{post.content}</p>
        </div>

        {/* Comments Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {commentsList.map((c) => (
            <div key={c.id} className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={c.userAvatar} alt={c.userDisplayName} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{c.userDisplayName}</span>
                      {c.userIsVerified && <VerifiedBadge size={12} />}
                      <span className="text-[10px] text-slate-400">Lvl {c.userLevel}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">@{c.username} • {c.createdAt}</span>
                  </div>
                </div>

                <button className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-500">
                  <Heart size={13} />
                  <span>{c.likesCount}</span>
                </button>
              </div>

              <p className="text-xs text-slate-800 dark:text-slate-200">{c.content}</p>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="p-3 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your counter take..."
            className="flex-1 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 transition-all shadow-xs"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};
