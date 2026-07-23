import React, { useState } from 'react';
import { Post } from '../types';
import { Shield, X, Users, AlertTriangle, CheckCircle, BarChart3, Trash2 } from 'lucide-react';

interface AdminPanelModalProps {
  posts: Post[];
  onClose: () => void;
  onDeletePost: (postId: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  posts,
  onClose,
  onDeletePost
}) => {
  const [activeTab, setActiveTab] = useState<'METRICS' | 'REPORTS' | 'USERS'>('METRICS');

  const reportedPosts = posts.filter((p) => p.communityVerdict === 'VOLCANIC' || p.hotMeter === 'NUCLEAR');

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#0C1D38] text-slate-900 dark:text-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto">
        <div className="p-4 bg-[#0B1E3D] text-white flex items-center justify-between border-b border-sky-900">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-amber-400" />
            <h3 className="font-extrabold text-base font-mono uppercase">Admin Control Panel</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-slate-300">
            <X size={20} />
          </button>
        </div>

        {/* Tab Header */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#07152B] text-xs font-bold">
          <button
            onClick={() => setActiveTab('METRICS')}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'METRICS' ? 'border-b-2 border-[#00A3E0] text-[#00A3E0]' : 'text-slate-500'
            }`}
          >
            <BarChart3 size={15} />
            <span>Metrics & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('REPORTS')}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'REPORTS' ? 'border-b-2 border-[#00A3E0] text-[#00A3E0]' : 'text-slate-500'
            }`}
          >
            <AlertTriangle size={15} />
            <span>Moderation Queue ({reportedPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('USERS')}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'USERS' ? 'border-b-2 border-[#00A3E0] text-[#00A3E0]' : 'text-slate-500'
            }`}
          >
            <Users size={15} />
            <span>User Verifications</span>
          </button>
        </div>

        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4">
          {activeTab === 'METRICS' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 dark:bg-[#07152B] rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-xl font-black text-[#00A3E0] block">1.2M</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Active Fans</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-[#07152B] rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-xl font-black text-amber-500 block">48.5K</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Hot Takes Today</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-[#07152B] rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-xl font-black text-emerald-500 block">340.2K</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Debate Votes</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-[#07152B] rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-xl font-black text-purple-500 block">99.8%</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Uptime</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-[#07152B] p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-xs uppercase text-[#00A3E0]">AI Moderation Status</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Server-side Gemini 3.6 Flash automated AI Moderation active. Automatically flags abusive language, spam links, and duplicate bot posts.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'REPORTS' && (
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-500 uppercase">Spicy / High Impact Take Queue</h4>
              {reportedPosts.length > 0 ? (
                reportedPosts.map((p) => (
                  <div key={p.id} className="p-3 bg-slate-50 dark:bg-[#07152B] rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-red-500">@{p.author.username}:</span>
                      <p className="line-clamp-2 text-slate-700 dark:text-slate-300">{p.content}</p>
                    </div>
                    <button
                      onClick={() => onDeletePost(p.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-1 shrink-0 ml-2"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 text-center py-4">No reported takes pending review.</p>
              )}
            </div>
          )}

          {activeTab === 'USERS' && (
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-500 uppercase">Verification Badge Requests</h4>
              <div className="p-3 bg-slate-50 dark:bg-[#07152B] rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold">TacticsGuru (@TacticsGuru)</span>
                  <p className="text-[10px] text-slate-500">Level 18 Author • 3,800 Reputation</p>
                </div>
                <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">VERIFIED</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
