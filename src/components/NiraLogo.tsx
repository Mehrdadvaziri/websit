import React from 'react';
import exactLogoUrl from '../assets/images/nira_logo_exact.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  theme?: 'light' | 'dark';
}

export const NiraLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  theme = 'light'
}) => {
  // Reduced by 30% for a clean, balanced layout where the entire fiber cable and optic tips are 100% visible
  const sizeMap = {
    sm: 'h-5 w-auto max-h-5',
    md: 'h-7 sm:h-8 w-auto max-h-8',
    lg: 'h-8 sm:h-9 w-auto max-h-9',
    xl: 'h-11 w-auto max-h-11'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* 
        Exact Original NIRA NETWORKS Logo File (Letter N + Full Fiber Optic Cable with glowing end-tips)
        Transparent background with full margins and 30% reduction
      */}
      <div className="shrink-0 flex items-center justify-center p-0.5">
        <img
          src={exactLogoUrl}
          alt="لوگو نیرا شبکه - کابل فیبر نوری و حرف N"
          className={`${sizeMap[size]} object-contain drop-shadow-xs transition-transform duration-300 hover:scale-105 select-none`}
        />
      </div>

      {showText && (
        <div className="flex flex-col text-right select-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-black text-base sm:text-lg tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              نیرا شبکه
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-50 text-[#0066FF] border border-blue-200">
              NIRA
            </span>
          </div>
          <span className={`text-[10px] sm:text-[11px] font-semibold tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            کابل فیبر نوری و تجهیزات زیرساخت
          </span>
        </div>
      )}
    </div>
  );
};
