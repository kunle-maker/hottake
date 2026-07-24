import React from 'react';
import { Flame, Search, Users, User as UserIcon, Plus, Info } from 'lucide-react';

export type NavTab = 'home' | 'search' | 'communities' | 'profile' | 'credits';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenCreatePost: () => void;
  onOpenCredits: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenCreatePost,
  onOpenCredits
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="max-w-md mx-auto px-2 h-16 flex items-center justify-between">
        {/* Tab 1: Home Takes */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'home' ? 'text-orange-500 font-extrabold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Flame size={20} className={activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5">Hot Takes</span>
        </button>

        {/* Tab 2: Search / Explore */}
        <button
          onClick={() => onSelectTab('search')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'search' ? 'text-orange-500 font-extrabold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Search size={20} className={activeTab === 'search' ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5">Explore</span>
        </button>

        {/* Center Tab: Create Hot Take Button */}
        <div className="flex-1 flex items-center justify-center relative -top-3">
          <button
            onClick={onOpenCreatePost}
            className="w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all border-2 border-white dark:border-[#0F172A]"
            title="Post a Hot Take"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Tab 3: Communities */}
        <button
          onClick={() => onSelectTab('communities')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'communities' ? 'text-orange-500 font-extrabold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Users size={20} className={activeTab === 'communities' ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5">Clubs</span>
        </button>

        {/* Tab 4: Credits / Info */}
        <button
          onClick={onOpenCredits}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'credits' ? 'text-orange-500 font-extrabold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Info size={20} className={activeTab === 'credits' ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5">Credits</span>
        </button>
      </div>
    </nav>
  );
};

