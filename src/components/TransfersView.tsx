import React, { useState } from 'react';
import { Transfer } from '../types';
import { Repeat, Zap, Shield, Heart, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

interface TransfersViewProps {
  transfers: Transfer[];
  onLikeTransfer: (id: string) => void;
}

export const TransfersView: React.FC<TransfersViewProps> = ({ transfers, onLikeTransfer }) => {
  const [transferFilter, setTransferFilter] = useState<'ALL' | 'CONFIRMED' | 'RUMOUR' | 'LOAN'>('ALL');

  const filteredTransfers = transfers.filter((t) => {
    if (transferFilter === 'ALL') return true;
    return t.type === transferFilter;
  });

  return (
    <div className="space-y-5 pb-20">
      {/* Transfer Deadline Day Header */}
      <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-md border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Repeat size={20} className="text-orange-400" />
            <h1 className="font-black text-lg tracking-tight font-display uppercase">Transfer Hub 2026</h1>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] px-2.5 py-0.5 rounded-full font-bold animate-pulse">
            LIVE WINDOW
          </span>
        </div>
        <p className="text-xs text-slate-300">
          Track confirmed "Here We Go!" transfers, reliable rumors, release clause activations, and loans worldwide.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
        <button
          onClick={() => setTransferFilter('ALL')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            transferFilter === 'ALL'
              ? 'bg-orange-600 text-white shadow-xs font-extrabold'
              : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Deals ({transfers.length})
        </button>

        <button
          onClick={() => setTransferFilter('CONFIRMED')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            transferFilter === 'CONFIRMED'
              ? 'bg-orange-600 text-white shadow-xs font-extrabold'
              : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Confirmed Done Deals
        </button>

        <button
          onClick={() => setTransferFilter('RUMOUR')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            transferFilter === 'RUMOUR'
              ? 'bg-orange-600 text-white shadow-xs font-extrabold'
              : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Reliable Rumours
        </button>

        <button
          onClick={() => setTransferFilter('LOAN')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            transferFilter === 'LOAN'
              ? 'bg-orange-600 text-white shadow-xs font-extrabold'
              : 'bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Loans
        </button>
      </div>

      {/* Transfer Cards List */}
      <div className="space-y-3.5">
        {filteredTransfers.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#1E293B] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
          >
            {/* Type Header */}
            <div className="flex items-center justify-between text-xs border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <div className="flex items-center gap-1.5 font-extrabold">
                {item.type === 'CONFIRMED' ? (
                  <span className="bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                    <CheckCircle size={12} />
                    HERE WE GO! • CONFIRMED
                  </span>
                ) : item.type === 'RUMOUR' ? (
                  <span className="bg-amber-500/15 text-amber-600 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                    <AlertTriangle size={12} />
                    HIGH-TIER RUMOUR
                  </span>
                ) : (
                  <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded text-[10px]">
                    LOAN AGREEMENT
                  </span>
                )}
              </div>

              <span className="text-[10px] font-bold text-zinc-400">Tier {item.tierReliability} Source</span>
            </div>

            {/* Player & Fee Bar */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={item.playerAvatar} alt={item.playerName} className="w-11 h-11 rounded-full object-cover border border-zinc-200 dark:border-zinc-700" />
                <div>
                  <h3 className="font-extrabold text-sm text-zinc-900 dark:text-white leading-tight">{item.playerName}</h3>
                  <span className="text-xs font-black text-zinc-700 dark:text-zinc-300">{item.fee}</span>
                </div>
              </div>

              {/* Club Move Arrows */}
              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/60 p-2 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
                <img src={item.fromClubCrest} alt={item.fromClub} className="w-7 h-7 rounded-full object-cover" title={item.fromClub} />
                <ArrowRight size={14} className="text-zinc-400" />
                <img src={item.toClubCrest} alt={item.toClub} className="w-7 h-7 rounded-full object-cover" title={item.toClub} />
              </div>
            </div>

            {/* Summary Text */}
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60">
              {item.summary}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-zinc-400 text-[11px]">{item.date}</span>
              <button
                onClick={() => onLikeTransfer(item.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold transition-all"
              >
                <Heart size={14} className="text-red-500" />
                <span>{item.likesCount} Hype</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
