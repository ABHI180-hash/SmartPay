import React from 'react';

export const QuickActionButton = ({
  icon: Icon,
  label,
  onClick,
  badge = null,
  colorScheme = 'default', // 'default' | 'teal' | 'emerald' | 'navy'
}) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white border border-[#E9D5FF] shadow-sm hover:border-[#7C3AED]/30 hover:shadow-md transition-all duration-200 active:scale-95"
    >
      {badge && (
        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500 text-white shadow-sm">
          {badge}
        </span>
      )}
      
      {/* Icon Squircle Container */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#DDF1EF] text-[#6222BD] group-hover:bg-[#7C3AED] group-hover:text-white transition-colors duration-200 shadow-inner">
        <Icon className="w-6 h-6 stroke-[2]" />
      </div>

      {/* Label */}
      <span className="mt-2 text-xs font-semibold text-[#1E1B4B] text-center tracking-tight leading-tight line-clamp-1">
        {label}
      </span>
    </button>
  );
};
