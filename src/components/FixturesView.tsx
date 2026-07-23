import React, { useState } from 'react';
import { Fixture, MatchEvent } from '../types';
import { FootballIcon } from './CustomIcons';
import { Calendar, Trophy, MessageSquare, Play, CheckCircle2, Award, Clock, MapPin, Send } from 'lucide-react';

interface FixturesViewProps {
  fixtures: Fixture[];
  userXp: number;
  onAwardXp: (amount: number) => void;
}

export const FixturesView: React.FC<FixturesViewProps> = ({ fixtures, userXp, onAwardXp }) => {
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
  const [showLiveThread, setShowLiveThread] = useState(false);
  const [liveChatMessages, setLiveChatMessages] = useState<
    { id: string; user: string; text: string; time: string }[]
  >([
    { id: 'm1', user: 'TacticsGuru', text: 'Cherki goal was pure magic! What a debut touch.', time: '81\'' },
    { id: 'm2', user: 'GoonerKev', text: 'Saka curling goal was goal of the pre-season!', time: '79\'' },
    { id: 'm3', user: 'InterUltra', text: 'Tactical defensive line collapsed after 60 mins.', time: '75\'' }
  ]);
  const [newComment, setNewComment] = useState('');

  // Prediction Form State
  const [homeScorePred, setHomeScorePred] = useState('3');
  const [awayScorePred, setAwayScorePred] = useState('1');
  const [firstGoalscorer, setFirstGoalscorer] = useState('Bukayo Saka');
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  const handleSendLiveComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setLiveChatMessages([
      ...liveChatMessages,
      {
        id: Date.now().toString(),
        user: 'You (Ayodele)',
        text: newComment.trim(),
        time: "82'"
      }
    ]);
    setNewComment('');
  };

  const handlePredictSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPredictionSubmitted(true);
    onAwardXp(150); // Award XP for submitting prediction
  };

  return (
    <div className="space-y-5 pb-20">
      {/* Date Header Strip */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-md border border-slate-800">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-orange-400" />
          <div>
            <h1 className="font-black text-lg tracking-tight font-display uppercase">August 2026 Matches</h1>
            <p className="text-[11px] text-slate-300">Live Scores, Lineups & Match Thread Discussions</p>
          </div>
        </div>

        <div className="bg-orange-500/20 border border-orange-400/30 px-3 py-1 rounded-xl text-xs font-bold text-orange-300">
          XP Level Multiplier 1.5x
        </div>
      </div>

      {/* Fixtures List */}
      <div className="space-y-3.5">
        {fixtures.map((fixture) => (
          <div
            key={fixture.id}
            className="bg-white dark:bg-[#1E293B] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
          >
            {/* Top Bar: League & Status */}
            <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>{fixture.league}</span>
              </div>

              {fixture.status === 'LIVE' ? (
                <span className="bg-red-500/15 text-red-600 border border-red-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1 animate-pulse">
                  <Play size={10} className="fill-red-600" />
                  LIVE • {fixture.time}
                </span>
              ) : (
                <span className="text-slate-500 flex items-center gap-1 font-semibold">
                  <Clock size={12} />
                  {fixture.date} • {fixture.time}
                </span>
              )}
            </div>

            {/* Scoreline Box */}
            <div className="flex items-center justify-between py-2 px-2">
              {/* Home Team */}
              <div className="flex items-center gap-3 flex-1">
                <img src={fixture.homeTeam.crest} alt={fixture.homeTeam.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">{fixture.homeTeam.name}</span>
              </div>

              {/* Score / Time Box */}
              <div className="bg-slate-100 dark:bg-slate-900/80 px-4 py-2 rounded-xl text-center font-extrabold font-display text-base tracking-widest text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 min-w-[75px]">
                {fixture.status === 'LIVE' || fixture.status === 'FINISHED' ? (
                  <span>{fixture.homeTeam.score} - {fixture.awayTeam.score}</span>
                ) : (
                  <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400">VS</span>
                )}
              </div>

              {/* Away Team */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white text-right">{fixture.awayTeam.name}</span>
                <img src={fixture.awayTeam.crest} alt={fixture.awayTeam.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
              </div>
            </div>

            {/* Stadium Info */}
            <div className="flex items-center gap-1 text-[11px] text-slate-500 justify-center">
              <MapPin size={12} />
              <span>{fixture.stadium}</span>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setSelectedFixture(fixture);
                  setShowLiveThread(true);
                }}
                className="flex-1 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MessageSquare size={15} />
                <span>Match Discussion Thread</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Match Prediction Battle Section */}
      <section className="bg-zinc-900 dark:bg-zinc-950 rounded-2xl p-4 text-white shadow-xs border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-amber-400" />
            <h2 className="font-bold text-sm">Matchday Prediction Battle</h2>
          </div>
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] px-2 py-0.5 rounded font-bold">
            +150 XP Reward
          </span>
        </div>

        <p className="text-xs text-zinc-300">
          Submit your prediction for the next big match and climb the HotTakes Leaderboard!
        </p>

        {predictionSubmitted ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-xs">
              <CheckCircle2 size={16} />
              <span>Prediction Locked In!</span>
            </div>
            <p className="text-[11px] text-zinc-300">You predicted: Arsenal {homeScorePred} - {awayScorePred} Inter. First goalscorer: {firstGoalscorer}.</p>
            <span className="inline-block text-[10px] text-amber-300 font-semibold bg-amber-500/20 px-2 py-0.5 rounded mt-1">
              +150 XP added to your reputation!
            </span>
          </div>
        ) : (
          <form onSubmit={handlePredictSubmit} className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="text-center">
                <span className="text-[10px] text-zinc-400 block mb-1">Arsenal</span>
                <input
                  type="number"
                  min="0"
                  max="9"
                  value={homeScorePred}
                  onChange={(e) => setHomeScorePred(e.target.value)}
                  className="w-12 h-10 bg-zinc-800 border border-zinc-700 rounded-lg text-center font-bold text-base text-white"
                />
              </div>

              <span className="font-extrabold text-zinc-400 text-sm mt-4">:</span>

              <div className="text-center">
                <span className="text-[10px] text-zinc-400 block mb-1">Inter Milan</span>
                <input
                  type="number"
                  min="0"
                  max="9"
                  value={awayScorePred}
                  onChange={(e) => setAwayScorePred(e.target.value)}
                  className="w-12 h-10 bg-zinc-800 border border-zinc-700 rounded-lg text-center font-bold text-base text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-zinc-400 font-semibold mb-1">First Goalscorer</label>
              <select
                value={firstGoalscorer}
                onChange={(e) => setFirstGoalscorer(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-xs text-white"
              >
                <option value="Erling Haaland">Erling Haaland</option>
                <option value="Phil Foden">Phil Foden</option>
                <option value="Rayan Cherki">Rayan Cherki</option>
                <option value="Lautaro Martinez">Lautaro Martinez</option>
                <option value="No Goal">No Goalscorer (0-0)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-xs"
            >
              Lock In Prediction
            </button>
          </form>
        )}
      </section>

      {/* Live Match Thread Drawer Modal */}
      {showLiveThread && selectedFixture && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-t-2xl sm:rounded-2xl w-full max-w-xl h-[85vh] flex flex-col shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-zinc-900 dark:bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">
                  LIVE MATCH THREAD • {selectedFixture.time}
                </span>
                <h3 className="font-extrabold text-sm font-mono">
                  {selectedFixture.homeTeam.name} ({selectedFixture.homeTeam.score}) vs ({selectedFixture.awayTeam.score}) {selectedFixture.awayTeam.name}
                </h3>
              </div>

              <button
                onClick={() => setShowLiveThread(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Content Body: Events Timeline & Live Chat */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Match Events Timeline */}
              {selectedFixture.events && selectedFixture.events.length > 0 && (
                <div className="bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
                  <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">Live Match Events</h4>
                  <div className="space-y-1.5 text-xs">
                    {selectedFixture.events.map((ev) => (
                      <div key={ev.id} className="flex items-center gap-2">
                        <span className="font-black text-zinc-900 dark:text-white font-mono">{ev.minute}'</span>
                        <span className="font-semibold text-red-500 bg-red-500/10 px-1.5 py-0.2 rounded text-[10px]">
                          {ev.type}
                        </span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">{ev.player} ({ev.team})</span>
                        {ev.details && <span className="text-zinc-400 text-[10px]">({ev.details})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Chat Discussion Stream */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Live Fan Debate</h4>
                {liveChatMessages.map((msg) => (
                  <div key={msg.id} className="bg-zinc-100 dark:bg-zinc-800/60 p-2.5 rounded-xl text-xs space-y-0.5">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-zinc-900 dark:text-zinc-100 font-bold">@{msg.user}</span>
                      <span className="text-[10px] text-zinc-400">{msg.time}</span>
                    </div>
                    <p className="text-zinc-800 dark:text-zinc-200">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendLiveComment} className="p-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Post your live match take..."
                className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-extrabold text-xs rounded-xl flex items-center gap-1 hover:opacity-90"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
