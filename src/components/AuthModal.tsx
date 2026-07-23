import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, HelpCircle, Shield } from 'lucide-react';
import { User } from '../types';
import { ADMIN_USER, CURRENT_USER } from '../data/mockData';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
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

  const logoUrl = "https://i.ibb.co/d4tFKk7c/1e12634183c9.jpg";

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = emailOrSupporter.trim();
    if (!cleanInput) return;

    if (
      cleanInput.toLowerCase() === 'davidayodele847@gmail.com' &&
      password === '1234201217'
    ) {
      onLoginSuccess(ADMIN_USER);
      onClose();
      return;
    }

    const usernameExtracted = cleanInput.split('@')[0] || 'Ayodele';
    const loggedUser: User = {
      ...CURRENT_USER,
      username: usernameExtracted,
      displayName: usernameExtracted,
      role: 'USER'
    };
    onLoginSuccess(loggedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto">
        {/* Banner with app logo */}
        <div className="bg-slate-900 text-white p-5 relative text-center border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            <X size={18} />
          </button>

          <img
            src={logoUrl}
            alt="HotTakes Logo"
            className="w-12 h-12 rounded-full object-cover border border-slate-700 mx-auto mb-2 shadow-md"
            referrerPolicy="no-referrer"
          />

          <h2 className="font-black text-xl tracking-tight uppercase text-white">
            {mode === 'SIGN_IN' ? 'SIGN IN TO HOT TAKES' : 'CREATE YOUR ACCOUNT'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            Join 1.2M football fans debating global football every matchday.
          </p>
        </div>

        {/* Tab Switcher: SIGN IN | REGISTER */}
        <div className="grid grid-cols-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-sm font-extrabold">
          <button
            onClick={() => setMode('SIGN_IN')}
            className={`py-3 text-center transition-colors uppercase tracking-wider ${
              mode === 'SIGN_IN'
                ? 'bg-orange-600 text-white font-black'
                : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            SIGN IN
          </button>

          <button
            onClick={() => setMode('REGISTER')}
            className={`py-3 text-center transition-colors uppercase tracking-wider ${
              mode === 'REGISTER'
                ? 'bg-orange-600 text-white font-black'
                : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleAuthSubmit} className="p-5 space-y-4 text-xs">
          {mode === 'REGISTER' && (
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                <span className="text-red-500">*</span> Date of Birth
                <HelpCircle size={14} className="text-slate-400 ml-auto" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <select
                  value={dobDay}
                  onChange={(e) => setDobDay(e.target.value)}
                  className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white font-semibold"
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>

                <select
                  value={dobMonth}
                  onChange={(e) => setDobMonth(e.target.value)}
                  className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white font-semibold"
                >
                  <option value="">Month</option>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={dobYear}
                  onChange={(e) => setDobYear(e.target.value)}
                  className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white font-semibold"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 70 }, (_, i) => (
                    <option key={i} value={2010 - i}>{2010 - i}</option>
                  ))}
                </select>
              </div>

              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Required for security and verification eligibility.
              </p>
            </div>
          )}

          {/* Email / Supporter input */}
          <div>
            <label className="block font-extrabold text-slate-800 dark:text-slate-200 mb-1">
              Email Address or Fan ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={emailOrSupporter}
                onChange={(e) => setEmailOrSupporter(e.target.value)}
                placeholder="Email Address or Fan ID"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden font-medium"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block font-extrabold text-slate-800 dark:text-slate-200 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-9 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'REGISTER' && (
            <div>
              <label className="block font-extrabold text-slate-800 dark:text-slate-200 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white focus:border-orange-500 focus:outline-hidden font-medium"
                />
              </div>
            </div>
          )}

          {mode === 'SIGN_IN' && (
            <div className="text-right">
              <a href="#forgot" className="font-extrabold text-slate-800 dark:text-slate-200 hover:underline text-[11px]">
                Forgot your password?
              </a>
            </div>
          )}

          {/* Quick Admin Auto Fill Shortcut */}
          <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
            <div className="text-[11px] font-bold text-orange-400 flex items-center gap-1.5">
              <Shield size={14} />
              <span>Admin Login Shortcut:</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmailOrSupporter('davidayodele847@gmail.com');
                setPassword('1234201217');
              }}
              className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-[10px] transition-colors"
            >
              Fill Admin
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold uppercase tracking-wider text-xs transition-all shadow-md"
          >
            {mode === 'SIGN_IN' ? 'SIGN IN' : 'REGISTER NOW'}
          </button>

          {/* Social Sign in option */}
          <div className="relative text-center my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <span className="relative bg-white dark:bg-[#1E293B] px-2 text-[10px] text-slate-400 uppercase font-extrabold">
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
            className="w-full py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-800 dark:text-slate-200 text-xs transition-all flex items-center justify-center gap-2"
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

