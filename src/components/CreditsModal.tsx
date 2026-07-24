import React from 'react';
import { Shield, Flame, X, Info, Code2, Sparkles, CheckCircle2, Heart, Award, Globe } from 'lucide-react';

interface CreditsModalProps {
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Info size={20} className="text-orange-400" />
            <h3 className="font-black text-base uppercase tracking-wider font-display">
              Platform Credits & Specs
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-slate-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5 text-xs">
          {/* Mission */}
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-slate-800 dark:text-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-orange-600 dark:text-orange-400 uppercase tracking-wide text-xs">
              <Flame size={16} />
              <span>Platform Mission</span>
            </div>
            <p className="leading-relaxed">
              HotTakes™ is a dedicated global opinion network built exclusively for football supporters. Designed to give fans an unfiltered, text-focused space to post, debate, and rate football takes across clubs and leagues.
            </p>
          </div>

          {/* Technology Stack Grid */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Code2 size={15} className="text-emerald-500" />
              Engine Architecture & Stack
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-slate-900 dark:text-white block">React 18 + Vite</span>
                <span className="text-[10px] text-slate-500">UI Rendering Engine</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-orange-500 block">Gemini 2.5 AI</span>
                <span className="text-[10px] text-slate-500">Spiciness & Moderation</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-slate-900 dark:text-white block">Tailwind CSS</span>
                <span className="text-[10px] text-slate-500">Calm Dark/Light UI</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-emerald-500 block">Express Node.js</span>
                <span className="text-[10px] text-slate-500">Secure API Proxy</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-slate-900 dark:text-white block">Lucide React</span>
                <span className="text-[10px] text-slate-500">Vector Icons</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-sky-400 block">Google Fonts</span>
                <span className="text-[10px] text-slate-500">Plus Jakarta & Sora</span>
              </div>
            </div>
          </div>

          {/* Super Admin & Operating Lead */}
          <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                <Shield size={15} className="text-orange-400" />
                Super Admin Operator
              </span>
              <span className="text-[10px] bg-orange-500 text-white font-extrabold px-2 py-0.5 rounded">
                System Lead
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center font-black text-white text-sm">
                DA
              </div>
              <div>
                <div className="font-bold text-sm text-white">David Ayodele</div>
                <div className="text-[11px] text-slate-400 font-mono">davidayodele847@gmail.com</div>
              </div>
            </div>
          </div>

          {/* Design Philosophy */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-1 text-[11px] text-slate-500">
            <p className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Clean, text-driven layout without OS emojis or cluttered widgets.</span>
            </p>
            <p className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Device file uploads enabled for hot take attachments.</span>
            </p>
          </div>
        </div>

        {/* Footer button */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs hover:opacity-90 transition-opacity"
          >
            Close Credits
          </button>
        </div>
      </div>
    </div>
  );
};
