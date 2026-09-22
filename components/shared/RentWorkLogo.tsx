import React from 'react';

interface RentWorkLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RentWorkLogo({ className = '', iconOnly = false, size = 'md' }: RentWorkLogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* 3D Isometric Blue Cube Logo Icon matching the image */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Top Facet */}
          <path
            d="M18 3L31.5 10.5L18 18L4.5 10.5L18 3Z"
            fill="#3B82F6"
            stroke="#1D4ED8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Right Facet */}
          <path
            d="M18 18L31.5 10.5V25.5L18 33V18Z"
            fill="#1D4ED8"
            stroke="#1E40AF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Left Facet */}
          <path
            d="M4.5 10.5L18 18V33L4.5 25.5V10.5Z"
            fill="#2563EB"
            stroke="#1D4ED8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Inner Isometric Cutout Detail */}
          <path
            d="M18 9L25 13L18 17L11 13L18 9Z"
            fill="#60A5FA"
            opacity="0.85"
          />
        </svg>
      </div>

      {!iconOnly && (
        <span className={`font-black tracking-tight text-slate-900 ${textSizes[size]}`}>
          Rent<span className="text-blue-600">Work</span>
        </span>
      )}
    </div>
  );
}
