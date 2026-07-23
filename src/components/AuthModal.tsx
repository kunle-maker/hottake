import React, { useState } from 'react';
import { FootballIcon } from './CustomIcons';
import { X, Eye, EyeOff, Lock, Mail, Calendar, HelpCircle } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'SIGN_IN' | 'REGISTER'>('SIGN_IN');
  const [emailOrSupporter, setEmailOrSupporter] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Date of birth state for register
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrSupporter) return;

    const usernameExtracted = emailOrSupporter.split('@')[0] || 'Ayodele';
    onLoginSuccess(usernameExtracted);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Banner with player image style matching screenshot */}
        <div className="bg-gradient-to-r from-[#0B1E3D] via-[#0E2854] to-[#00A3E0] p-4 text-white relative text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-black/20 hover:bg-black/40 text-white"
          >
            <X size={18} />
          </button>

          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mx-auto mb-2">
            <FootballIcon size={24} className="text-[#00A3E0]" />
          </div>

          <h2 className="font-black text-xl tracking-wider font-mono uppercase">
            {mode === 'SIGN_IN' ? 'SIGN IN TO HOT TAKES' : 'CREATE YOUR ACCOUNT'}
          </h2>
          <p className="text-xs text-sky-200 mt-0.5">
            Join 1.2M football fans debating global football every matchday.
          </p>
        </div>

        {/* Tab Switcher matching screenshot: SIGN IN | REGISTER */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-100 text-sm font-black font-mono">
          <button
            onClick={() => setMode('SIGN_IN')}
            className={`py-3 text-center transition-colors uppercase tracking-wider ${
              mode === 'SIGN_IN'
                ? 'bg-[#0B1E3D] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            SIGN IN
          </button>

          <button
            onClick={() => setMode('REGISTER')}
            className={`py-3 text-center transition-colors uppercase tracking-wider ${
              mode === 'REGISTER'
                ? 'bg-[#0B1E3D] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleAuthSubmit} className="p-5 space-y-4 text-xs">
          {mode === 'REGISTER' && (
            <div className="space-y-3 bg-sky-50/60 p-3.5 rounded-xl border border-sky-100">
              <div className="flex items-center gap-1 font-bold text-slate-800">
                <span className="text-red-500">*</span> Date of Birth
                <HelpCircle size={14} className="text-slate-400 ml-auto" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <select
                  value={dobDay}
                  onChange={(e) => setDobDay(e.target.value)}
                  className="p-2 border border-slate-300 rounded-lg bg-white font-medium"
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>

                <select
                  value={dobMonth}
                  onChange={(e) => setDobMonth(e.target.value)}
                  className="p-2 border border-slate-300 rounded-lg bg-white font-medium"
                >
                  <option value="">Month</option>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={dobYear}
                  onChange={(e) => setDobYear(e.target.value)}
                  className="p-2 border border-slate-300 rounded-lg bg-white font-medium"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 70 }, (_, i) => (
                    <option key={i} value={2010 - i}>{2010 - i}</option>
                  ))}
                </select>
              </div>

              <p className="text-[10px] text-slate-500 italic">
                Required for security and verification eligibility.
              </p>
            </div>
          )}

          {/* Email / Supporter input */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Email Address or Supporter Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={emailOrSupporter}
                onChange={(e) => setEmailOrSupporter(e.target.value)}
                placeholder="Email Address or Supporter Number"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:border-[#00A3E0] focus:outline-hidden font-medium"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl focus:border-[#00A3E0] focus:outline-hidden font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'REGISTER' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl focus:border-[#00A3E0] focus:outline-hidden font-medium"
                />
              </div>
            </div>
          )}

          {mode === 'SIGN_IN' && (
            <div className="text-right">
              <a href="#forgot" className="font-bold text-[#00A3E0] hover:underline text-[11px]">
                Forgot your password?
              </a>
            </div>
          )}

          {/* Submit Button matching screenshot */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#0B1E3D] hover:bg-[#00A3E0] text-white font-black uppercase tracking-wider text-xs transition-all shadow-md"
          >
            {mode === 'SIGN_IN' ? 'SIGN IN' : 'REGISTER NOW'}
          </button>

          {/* Social Sign in option */}
          <div className="relative text-center my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-2 text-[10px] text-slate-400 uppercase font-bold">
              OR CONTINUE WITH
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setEmailOrSupporter('ayodele@hottakes.com');
              onLoginSuccess('Ayodele');
              onClose();
            }}
            className="w-full py-2.5 border border-slate-300 hover:bg-slate-50 rounded-xl font-bold text-slate-700 text-xs transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Authentication</span>
          </button>
        </form>
      </div>
    </div>
  );
};
