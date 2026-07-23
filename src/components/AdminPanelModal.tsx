import React, { useState } from 'react';
import { Post } from '../types';
import { Shield, X, Users, AlertTriangle, CheckCircle, BarChart3, Trash2, Rocket, Copy, Check } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'METRICS' | 'REPORTS' | 'USERS' | 'DEPLOY'>('METRICS');
  const [copiedYaml, setCopiedYaml] = useState(false);

  const reportedPosts = posts.filter((p) => p.communityVerdict === 'VOLCANIC' || p.hotMeter === 'NUCLEAR');

  const renderYamlContent = `services:
  - type: web
    name: hottakes-football-app
    env: node
    plan: free
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
      - key: GEMINI_API_KEY
        sync: false`;

  const copyRenderYaml = () => {
    navigator.clipboard.writeText(renderYamlContent);
    setCopiedYaml(true);
    setTimeout(() => setCopiedYaml(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#0C1D38] text-slate-900 dark:text-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto">
        <div className="p-4 bg-[#0B1E3D] text-white flex items-center justify-between border-b border-sky-900">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-amber-400" />
            <h3 className="font-extrabold text-base font-mono uppercase">Admin & Deployment Hub</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-slate-300">
            <X size={20} />
          </button>
        </div>

        {/* Tab Header */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#07152B] text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('METRICS')}
            className={`flex-1 min-w-[100px] py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'METRICS' ? 'border-b-2 border-[#00A3E0] text-[#00A3E0]' : 'text-slate-500'
            }`}
          >
            <BarChart3 size={15} />
            <span>Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('REPORTS')}
            className={`flex-1 min-w-[120px] py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'REPORTS' ? 'border-b-2 border-[#00A3E0] text-[#00A3E0]' : 'text-slate-500'
            }`}
          >
            <AlertTriangle size={15} />
            <span>Moderation ({reportedPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('USERS')}
            className={`flex-1 min-w-[100px] py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'USERS' ? 'border-b-2 border-[#00A3E0] text-[#00A3E0]' : 'text-slate-500'
            }`}
          >
            <Users size={15} />
            <span>Users</span>
          </button>

          <button
            onClick={() => setActiveTab('DEPLOY')}
            className={`flex-1 min-w-[130px] py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'DEPLOY' ? 'border-b-2 border-[#00A3E0] text-[#00A3E0]' : 'text-slate-500'
            }`}
          >
            <Rocket size={15} className="text-emerald-400" />
            <span>Render Deploy</span>
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

          {activeTab === 'DEPLOY' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3">
                <Rocket className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-extrabold text-emerald-400 text-sm">Render Deployment Ready</h4>
                  <p className="text-slate-300 mt-1">
                    This full-stack Node + React app includes a production build pipeline and <code className="text-emerald-300 bg-black/30 px-1 py-0.5 rounded">render.yaml</code> configuration file.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold uppercase text-slate-400">Environment Variables to Add on Render</h4>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-amber-400 font-bold">GEMINI_API_KEY</span>
                      <span className="text-slate-400 block text-[10px]">Required for Gemini 3.6 AI Hot Take Analyzer</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-400/10 text-amber-400 font-sans text-[10px] rounded font-bold">Secret</span>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-sky-400 font-bold">PORT</span>
                      <span className="text-slate-400 block text-[10px]">3000 (standard web server port)</span>
                    </div>
                    <span className="px-2 py-0.5 bg-sky-400/10 text-sky-400 font-sans text-[10px] rounded font-bold">Config</span>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-emerald-400 font-bold">NODE_ENV</span>
                      <span className="text-slate-400 block text-[10px]">production</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-400/10 text-emerald-400 font-sans text-[10px] rounded font-bold">Config</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold uppercase text-slate-400">render.yaml Configuration</h4>
                  <button
                    onClick={copyRenderYaml}
                    className="flex items-center gap-1 text-[#00A3E0] hover:underline font-bold text-[11px]"
                  >
                    {copiedYaml ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedYaml ? 'Copied YAML!' : 'Copy render.yaml'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 text-slate-200 font-mono text-[11px] rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
                  {renderYamlContent}
                </pre>
              </div>

              <div className="space-y-1.5 text-slate-300">
                <h4 className="font-bold uppercase text-slate-400">Deployment Steps on Render</h4>
                <ol className="list-decimal list-inside space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <li>Push this codebase to GitHub / GitLab.</li>
                  <li>Log in to <strong className="text-white">Render.com</strong> and click <strong className="text-white">New + Web Service</strong>.</li>
                  <li>Select your repository. Render automatically reads <code className="text-emerald-300">render.yaml</code> or select Node environment.</li>
                  <li>Set build command: <code className="text-sky-300">npm run build</code> and start command: <code className="text-sky-300">npm start</code>.</li>
                  <li>Add your <code className="text-amber-300">GEMINI_API_KEY</code> in Environment settings.</li>
                  <li>Click <strong className="text-emerald-400">Create Web Service</strong> to go live!</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

