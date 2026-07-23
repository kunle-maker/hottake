import React from 'react';
import { User } from '../types';
import { VerifiedBadge } from './CustomIcons';
import { Bell, Search, Shield, User as UserIcon, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  user: User;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenAdmin?: () => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  unreadCount,
  onOpenNotifications,
  onOpenSearch,
  onOpenProfile,
  onOpenAdmin,
  onOpenAuth,
  isLoggedIn,
  isDarkMode = true,
  onToggleTheme
}) => {
  const logoUrl = "https://i.ibb.co/d4tFKk7c/1e12634183c9.jpg";

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#111827] text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 h-15 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src={logoUrl}
            alt="HotTakes Logo"
            className="w-9 h-9 rounded-full object-cover border-2 border-orange-500 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-lg tracking-tight uppercase font-display">
                <span className="text-orange-600 dark:text-orange-500">HOT</span>
                <span className="text-slate-900 dark:text-white">TAKES</span>
              </span>
              <span className="text-[10px] font-extrabold text-orange-500 align-super">™</span>
            </div>
            <p className="text-[9px] text-slate-500 dark:text-slate-400 tracking-tight font-semibold uppercase">Football Community & Debates</p>
          </div>
        </div>

        {/* Right Action Icons & Profile Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light / Dark Mode Toggle for Eye Sensitivity */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700/60"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={19} className="text-amber-400 fill-amber-400/20" /> : <Moon size={19} className="text-slate-700" />}
            </button>
          )}

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search users, clubs, takes"
          >
            <Search size={19} />
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            title="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Admin Dashboard Trigger (if Admin) */}
          {user.role === 'ADMIN' && (
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:flex items-center gap-1 text-xs font-bold"
              title="Admin Panel"
            >
              <Shield size={18} />
              <span className="hidden md:inline">Admin</span>
            </button>
          )}

          {/* User Profile / Login Button */}
          {isLoggedIn ? (
            <div
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-7 h-7 rounded-full object-cover border border-slate-300 dark:border-slate-600"
              />
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[90px] truncate">{user.displayName}</span>
                  {user.isVerified && <VerifiedBadge size={13} />}
                </div>
                <span className="text-[10px] font-semibold text-orange-600 dark:text-orange-400 block leading-tight">
                  Lvl {user.level} • {user.xp} XP
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all flex items-center gap-1 shadow-xs"
            >
              <UserIcon size={15} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

