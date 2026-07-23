import React from 'react';
import { User } from '../types';
import { FootballIcon, VerifiedBadge } from './CustomIcons';
import { Bell, Search, Shield, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  user: User;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenAdmin?: () => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  unreadCount,
  onOpenNotifications,
  onOpenSearch,
  onOpenProfile,
  onOpenAdmin,
  onOpenAuth,
  isLoggedIn
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0B1E3D] text-white shadow-md border-b border-sky-900/50">
      <div className="max-w-4xl mx-auto px-4 h-15 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00A3E0] to-sky-300 flex items-center justify-center shadow-xs border border-white/20">
            <FootballIcon size={20} className="text-[#0B1E3D]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-xl tracking-wider text-white font-mono uppercase">
                HOT<span className="text-[#00A3E0]">TAKES</span>
              </span>
              <span className="text-[10px] font-bold text-sky-300 align-super">™</span>
            </div>
            <p className="text-[9px] text-sky-200/80 tracking-tight font-medium">Football Community & Debates</p>
          </div>
        </div>

        {/* Right Action Icons & Profile Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full text-sky-100 hover:bg-white/10 transition-colors"
            title="Search users, clubs, takes"
          >
            <Search size={19} />
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="p-2 rounded-full text-sky-100 hover:bg-white/10 transition-colors relative"
            title="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Admin Dashboard Trigger (if Admin) */}
          {user.role === 'ADMIN' && (
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full text-amber-300 hover:bg-amber-500/20 transition-colors hidden sm:flex items-center gap-1 text-xs font-semibold"
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
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 transition-all cursor-pointer border border-sky-400/30"
            >
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-7 h-7 rounded-full object-cover border border-white/40"
              />
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white max-w-[90px] truncate">{user.displayName}</span>
                  {user.isVerified && <VerifiedBadge size={13} />}
                </div>
                <span className="text-[10px] font-medium text-sky-300 block leading-tight">
                  Lvl {user.level} • {user.xp} XP
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-full bg-[#00A3E0] hover:bg-sky-400 text-[#0B1E3D] font-bold text-xs transition-all flex items-center gap-1 shadow-sm"
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
