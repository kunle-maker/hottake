import React from 'react';

// Custom Flame SVG for Hot Meter
export const FlameIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

// Custom Fine Wine SVG Icon for "Aged Like Fine Wine"
export const WineIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 22h8" />
    <path d="M12 15v7" />
    <path d="M12 15a5 5 0 0 0 5-5V3H7v7a5 5 0 0 0 5 5z" />
  </svg>
);

// Custom Milk Carton SVG Icon for "Aged Like Milk"
export const MilkIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 2h8l2 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6l2-4z" />
    <path d="M6 6h12" />
    <path d="M10 12h4" />
    <path d="M12 10v4" />
  </svg>
);

// Custom Football Ball Icon
export const FootballIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m12 7 3 2.5-1.2 3.5h-3.6L9 9.5z" />
    <path d="M12 7V2" />
    <path d="m15 9.5 4.5-2" />
    <path d="m13.8 13 3 4" />
    <path d="m10.2 13-3 4" />
    <path d="m9 9.5-4.5-2" />
  </svg>
);

// Custom Shield Verification Badge
export const VerifiedBadge: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#00A3E0"
    className={className}
  >
    <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm-2 16l-4-4 1.41-1.41L10 15.17l6.59-6.59L18 10l-8 8z" />
  </svg>
);

// Hot Take Level Badge Color Mapper
export const HotMeterBadge: React.FC<{ level: 'MILD' | 'SPICY' | 'NUCLEAR' }> = ({ level }) => {
  if (level === 'NUCLEAR') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-xs">
        <FlameIcon size={12} className="animate-pulse" />
        NUCLEAR
      </span>
    );
  }
  if (level === 'SPICY') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-500/30">
        <FlameIcon size={12} />
        SPICY
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300 border border-sky-500/20">
      <FlameIcon size={12} />
      MILD
    </span>
  );
};

// Verdict Badge Mapper
export const CommunityVerdictBadge: React.FC<{ verdict: string }> = ({ verdict }) => {
  let label = 'WARM TAKE';
  let styles = 'bg-slate-100 text-slate-700 border-slate-200';

  switch (verdict) {
    case 'COLD_TAKE':
      label = 'Cold Take';
      styles = 'bg-blue-500/10 text-blue-600 border-blue-300';
      break;
    case 'WARM_TAKE':
      label = 'Warm Take';
      styles = 'bg-amber-500/10 text-amber-700 border-amber-300';
      break;
    case 'HOT_TAKE':
      label = 'Hot Take!';
      styles = 'bg-orange-500/10 text-orange-600 border-orange-300 font-bold';
      break;
    case 'VOLCANIC':
      label = 'Volcanic Take';
      styles = 'bg-red-500/15 text-red-600 border-red-400 font-bold';
      break;
    case 'LEGENDARY':
      label = 'Legendary Take';
      styles = 'bg-purple-600/15 text-purple-700 border-purple-400 font-extrabold tracking-wide';
      break;
  }

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] border ${styles}`}>
      {label}
    </span>
  );
};
