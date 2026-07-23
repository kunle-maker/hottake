import React from 'react';
import { Home, Search, Calendar, Repeat, Plus } from 'lucide-react';

export type NavTab = 'home' | 'search' | 'fixtures' | 'transfers' | 'communities';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenCreatePost: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenCreatePost
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg">
      <div className="max-w-md mx-auto px-2 h-16 flex items-center justify-between">
        {/* Tab 1: Home */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'home' ? 'text-orange-600 dark:text-orange-500 font-extrabold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Home size={20} className={activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Tab 2: Search */}
        <button
          onClick={() => onSelectTab('search')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'search' ? 'text-orange-600 dark:text-orange-500 font-extrabold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Search size={20} className={activeTab === 'search' ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5">Explore</span>
        </button>

        {/* Center Tab: Create Hot Take Button */}
        <div className="flex-1 flex items-center justify-center relative -top-3">
          <button
            onClick={onOpenCreatePost}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all border-2 border-white dark:border-[#111827]"
            title="Post a Hot Take"
          >
            <Plus size={26} strokeWidth={2.5} />
          </button>
        </div>

        {/* Tab 3: Fixtures */}
        <button
          onClick={() => onSelectTab('fixtures')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'fixtures' ? 'text-orange-600 dark:text-orange-500 font-extrabold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Calendar size={20} className={activeTab === 'fixtures' ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5">Fixtures</span>
        </button>

        {/* Tab 4: Transfers */}
        <button
          onClick={() => onSelectTab('transfers')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'transfers' ? 'text-orange-600 dark:text-orange-500 font-extrabold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Repeat size={20} className={activeTab === 'transfers' ? 'stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[10px] mt-0.5">Transfers</span>
        </button>
      </div>
    </nav>
  );
};
