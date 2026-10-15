import React from 'react';
import { CricketBat } from '../types/bat';

interface CricketBatIllustrationProps {
  bat: CricketBat;
  className?: string;
}

export const CricketBatIllustration: React.FC<CricketBatIllustrationProps> = ({
  bat,
  className = 'w-full h-full',
}) => {
  const isBlackMonster = bat.model === 'Black Monster';
  const isGrey = bat.model === 'Grey Edition';
  const isOneSide = bat.model === 'One Side Hero';

  const bladeColor = isBlackMonster ? '#1c1917' : isGrey ? '#d6d3d1' : '#f5deb3';
  const scoopColor = isBlackMonster ? '#0c0a09' : isGrey ? '#78716c' : '#d4a373';
  const labelText = isBlackMonster ? 'BLACK MONSTER' : isGrey ? 'GREY EDITION' : isOneSide ? '1 SIDE HERO' : '7T7T GOLD';

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <svg viewBox="0 0 100 320" className="w-full h-full max-h-72 drop-shadow-md">
        {/* Grip */}
        <rect x="44" y="10" width="12" height="70" rx="3" fill="#262626" />
        <line x1="44" y1="20" x2="56" y2="20" stroke="#404040" strokeWidth="1" />
        <line x1="44" y1="35" x2="56" y2="35" stroke="#404040" strokeWidth="1" />
        <line x1="44" y1="50" x2="56" y2="50" stroke="#404040" strokeWidth="1" />
        <line x1="44" y1="65" x2="56" y2="65" stroke="#404040" strokeWidth="1" />

        {/* Handle cone */}
        <polygon points="42,80 58,80 55,95 45,95" fill="#171717" />

        {/* Shoulders & Blade */}
        <path
          d="M 45 95 Q 30 105 32 125 L 32 290 Q 32 305 50 305 Q 68 305 68 290 L 68 125 Q 70 105 55 95 Z"
          fill={bladeColor}
          stroke="#78716c"
          strokeWidth="1.5"
        />

        {/* Scoops */}
        <ellipse cx="43" cy="190" rx="6" ry="35" fill={scoopColor} />
        {!isOneSide && <ellipse cx="57" cy="190" rx="6" ry="35" fill={scoopColor} />}

        {/* Sticker / Label */}
        <rect x="37" y="115" width="26" height="42" rx="2" fill="#18181b" />
        <text x="50" y="132" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          7T7T
        </text>
        <text x="50" y="146" fill="#ffffff" fontSize="4.5" textAnchor="middle" fontFamily="sans-serif">
          {labelText}
        </text>
        <text x="50" y="153" fill="#ef4444" fontSize="3.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          LAGA TOH SIX
        </text>

        {/* Toe Guard */}
        <path d="M 32 295 Q 50 307 68 295 L 68 298 Q 50 310 32 298 Z" fill="#d97706" />
      </svg>
      <span className="text-[11px] font-bold text-neutral-600 mt-2">{bat.name}</span>
    </div>
  );
};
