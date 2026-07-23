import React, { useState } from 'react';
import { Shield, Flame, Sparkles, Trophy, Zap, Lock, Mail, Eye, EyeOff, HelpCircle, ArrowRight, CheckCircle2, MessageSquare, BarChart2 } from 'lucide-react';
import { User } from '../types';
import { ADMIN_USER, CURRENT_USER } from '../data/mockData';

interface LandingPageProps {
  onLoginSuccess: (user: User) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLoginSuccess,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mode, setMode] = useState<'SIGN_IN' | 'REGISTER'>('SIGN_IN');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Date of birth for registration
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  const logoUrl = "https://i.ibb.co/d4tFKk7c/1e12634183c9.jpg";

  // Quick fill admin credentials
  const handleFillAdmin = () => {
    setMode('SIGN_IN');
    setEmailOrUsername('davidayodele847@gmail.com');
    setPassword('1234201217');
    setErrorMsg('');
  };

  // Quick fill fan credentials
  const handleFillFan = () => {
    setMode('SIGN_IN');
    setEmailOrUsername('ayodele@hottakes.app');
    setPassword('password123');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanInput = emailOrUsername.trim();
    if (!cleanInput) {
      setErrorMsg('Please enter your Email or Username.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    if (mode === 'REGISTER') {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (!dobDay || !dobMonth || !dobYear) {
        setErrorMsg('Date of Birth is required for account creation.');
        return;
      }
    }

    setIsLoading(true);

    try {
      // Call server auth endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanInput,
          password: password,
        }),
      });

      const data = await response.json();

      setIsLoading(false);

      // Check admin credentials
      if (
        cleanInput.toLowerCase() === 'davidayodele847@gmail.com' &&
        password === '1234201217'
      ) {
        onLoginSuccess(ADMIN_USER);
        return;
      }

      if (data.success && data.user) {
        // Construct user object
        const loggedUser: User = {
          ...CURRENT_USER,
          id: data.user.id || `usr_${Date.now()}`,
          username: data.user.username || cleanInput.split('@')[0],
          displayName: data.user.displayName || cleanInput.split('@')[0],
          role: cleanInput.toLowerCase() === 'davidayodele847@gmail.com' ? 'ADMIN' : 'USER',
        };
        onLoginSuccess(loggedUser);
      } else {
        setErrorMsg(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setIsLoading(false);
      // Fallback local authentication logic if server offline
      if (
        cleanInput.toLowerCase() === 'davidayodele847@gmail.com' &&
        password === '1234201217'
      ) {
        onLoginSuccess(ADMIN_USER);
      } else {
        const fallbackUser: User = {
          ...CURRENT_USER,
          username: cleanInput.split('@')[0],
          displayName: cleanInput.split('@')[0],
          role: 'USER',
        };
        onLoginSuccess(fallbackUser);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Hot Takes Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-500 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-black text-lg tracking-wider uppercase text-white flex items-center gap-1.5">
                HOT TAKES™
                <span className="text-[10px] bg-orange-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest">
                  Live
                </span>
              </span>
              <p className="text-[10px] text-slate-400 hidden sm:block">Global Football Opinion Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFillAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold text-xs transition-colors"
            >
              <Shield size={14} />
              <span>Admin Demo Login</span>
            </button>

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs font-semibold"
            >
              {isDarkMode ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Body Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Platform Intro & Value Proposition */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-orange-400">
            <Flame size={16} className="text-orange-500 animate-pulse" />
            <span>The Premier Unfiltered Football Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-display uppercase">
            Where Football Opinions Meet <span className="text-orange-500 underline decoration-orange-500/40">Real Fanatics</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Join over 1.2 million supporters debating match tactics, transfer market reliability, live match threads, and AI-scored hot takes in real-time.
          </p>

          {/* Quick Demo Credentials Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                <Shield size={15} className="text-orange-500" />
                Quick Authentication Shortcuts
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                1-Click Login
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                onClick={handleFillAdmin}
                type="button"
                className="p-3 rounded-lg bg-orange-600/10 hover:bg-orange-600/20 border border-orange-500/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between font-extrabold text-orange-400 group-hover:text-orange-300">
                  <span className="flex items-center gap-1">
                    <Shield size={13} />
                    Super Admin
                  </span>
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[11px] text-slate-300 font-mono mt-1">davidayodele847@gmail.com</div>
                <div className="text-[10px] text-slate-500 font-mono">Pass: 1234201217</div>
              </button>

              <button
                onClick={handleFillFan}
                type="button"
                className="p-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all group"
              >
                <div className="flex items-center justify-between font-extrabold text-slate-200 group-hover:text-white">
                  <span>Football Fan</span>
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">ayodele@hottakes.app</div>
                <div className="text-[10px] text-slate-500 font-mono">Pass: password123</div>
              </button>
            </div>
          </div>

          {/* Feature Bullets */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-300 pt-2">
            <div className="flex items-center gap-2 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              <Sparkles className="text-orange-400 shrink-0" size={18} />
              <span>AI Hot Take Spiciness Meter™</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              <BarChart2 className="text-emerald-400 shrink-0" size={18} />
              <span>Aged Like Wine 🍷 vs Milk 🥛</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              <Trophy className="text-amber-400 shrink-0" size={18} />
              <span>Live Match Score Engine & XP</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              <Zap className="text-sky-400 shrink-0" size={18} />
              <span>Verified Transfer Market Tiers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Embedded Auth Form */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            {/* Form Top Switcher */}
            <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-950 text-xs font-extrabold">
              <button
                type="button"
                onClick={() => { setMode('SIGN_IN'); setErrorMsg(''); }}
                className={`py-3.5 text-center transition-colors uppercase tracking-wider ${
                  mode === 'SIGN_IN'
                    ? 'bg-orange-600 text-white font-black'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                SIGN IN
              </button>
              <button
                type="button"
                onClick={() => { setMode('REGISTER'); setErrorMsg(''); }}
                className={`py-3.5 text-center transition-colors uppercase tracking-wider ${
                  mode === 'REGISTER'
                    ? 'bg-orange-600 text-white font-black'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                CREATE ACCOUNT
              </button>
            </div>

            {/* Auth Form Container */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="text-center pb-1">
                <h2 className="font-extrabold text-base text-white uppercase tracking-tight">
                  {mode === 'SIGN_IN' ? 'Welcome Back, Supporter' : 'Join the Football Community'}
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Sign in required to view Home Feed, Match Threads & Transfer Hub.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold text-center">
                  {errorMsg}
                </div>
              )}

              {/* Email / Username field */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Email Address or Username <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder="davidayodele847@gmail.com or username"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none font-medium"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Password <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Registration Extra Fields */}
              {mode === 'REGISTER' && (
                <>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Confirm Password <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-1 font-bold text-slate-300">
                      <span className="text-orange-500">*</span> Date of Birth
                      <HelpCircle size={14} className="text-slate-500 ml-auto" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={dobDay}
                        onChange={(e) => setDobDay(e.target.value)}
                        className="p-2 border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                        required
                      >
                        <option value="">Day</option>
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>

                      <select
                        value={dobMonth}
                        onChange={(e) => setDobMonth(e.target.value)}
                        className="p-2 border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                        required
                      >
                        <option value="">Month</option>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>

                      <select
                        value={dobYear}
                        onChange={(e) => setDobYear(e.target.value)}
                        className="p-2 border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                        required
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 70 }, (_, i) => (
                          <option key={2026 - i} value={2026 - i}>{2026 - i}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-black uppercase tracking-wider text-xs transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{mode === 'SIGN_IN' ? 'SIGN IN TO ENTER APP' : 'CREATE ACCOUNT & LOG IN'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-500">
                  By logging in, you agree to HotTakes™ Community Guidelines & AI Moderation policies.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-4 bg-slate-900/60 text-center text-xs text-slate-500">
        <p>© 2026 HotTakes™ Global Football Network. Super Admin Access configured for davidayodele847@gmail.com.</p>
      </footer>
    </div>
  );
};
