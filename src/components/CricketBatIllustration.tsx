import React from 'react';
import { CricketBat } from '../types/bat';

interface CricketBatIllustrationProps {
  bat: CricketBat;
  className?: string;
  isHero?: boolean;
}

export const CricketBatIllustration: React.FC<CricketBatIllustrationProps> = ({
  bat,
  className = 'w-full h-full',
  isHero = false,
}) => {
  // Wood gradients based on willow type
  const isKashmir = bat.willowType === 'Kashmir Willow';
  const isIncredible = bat.willowType === 'Incredible Willow';
  const isDarkMarble = bat.stickerStyle === 'supernatural-black';

  const woodBase = isDarkMarble
    ? '#e8e2d9'
    : isIncredible
    ? '#dcd4c7'
    : isKashmir
    ? '#e5d1b5'
    : '#f4ede2';

  const woodEdge = isDarkMarble
    ? '#c9beb0'
    : isIncredible
    ? '#bfb3a0'
    : isKashmir
    ? '#cbaf8c'
    : '#e6dac8';

  const woodHighlight = isDarkMarble
    ? '#f3efe8'
    : isIncredible
    ? '#eee6dc'
    : isKashmir
    ? '#fae9d4'
    : '#fffbf5';

  // Sticker colors
  const getStickerConfig = () => {
    switch (bat.stickerStyle) {
      case 'rs-purple':
        return {
          primary: '#7c3aed',
          secondary: '#3b82f6',
          text: '#ffffff',
          label: 'RS EXCLUSIV',
          subLabel: 'INTENSE',
          gripColor: '#6d28d9',
          accent: '#ec4899',
        };
      case 'rs-green':
        return {
          primary: '#10b981',
          secondary: '#065f46',
          text: '#ffffff',
          label: 'RS 080',
          subLabel: 'FEARLESS',
          gripColor: '#059669',
          accent: '#34d399',
        };
      case 'rs-blue':
        return {
          primary: '#2563eb',
          secondary: '#1e3a8a',
          text: '#ffffff',
          label: 'RS 35',
          subLabel: "GOD'S PLAN",
          gripColor: '#1d4ed8',
          accent: '#60a5fa',
        };
      case 'thumpa-rust':
        return {
          primary: '#c2410c',
          secondary: '#7c2d12',
          text: '#ffffff',
          label: 'THUMPA',
          subLabel: 'POWER',
          gripColor: '#9a3412',
          accent: '#f97316',
        };
      case 'supernatural-black':
        return {
          primary: '#18181b',
          secondary: '#27272a',
          text: '#f4f4f5',
          label: 'SUPERNATURAL',
          subLabel: 'BLACK MARBLE',
          gripColor: '#09090b',
          accent: '#a1a1aa',
        };
      case 'supernatural-rust':
        return {
          primary: '#9a3412',
          secondary: '#451a03',
          text: '#fef3c7',
          label: 'SUPERNATURAL',
          subLabel: 'RUST GOLD',
          gripColor: '#78350f',
          accent: '#d97706',
        };
      case 'blak-minimal':
        return {
          primary: '#09090b',
          secondary: '#18181b',
          text: '#fafafa',
          label: 'BLAK',
          subLabel: bat.name.includes('Rachin') ? 'RACHIN RAVINDRA' : 'SERIES',
          gripColor: '#09090b',
          accent: '#52525b',
        };
      case 'wildfire-neon':
        return {
          primary: '#84cc16',
          secondary: '#4d7c0f',
          text: '#09090b',
          label: 'WILDFIRE',
          subLabel: 'WARRIOR TENNIS',
          gripColor: '#65a30d',
          accent: '#a3e635',
        };
      case 'drake-blue':
        return {
          primary: '#0284c7',
          secondary: '#075985',
          text: '#ffffff',
          label: 'DRAKE',
          subLabel: 'KASHMIR WILLOW',
          gripColor: '#0369a1',
          accent: '#38bdf8',
        };
      case 'lava-red':
        return {
          primary: '#dc2626',
          secondary: '#991b1b',
          text: '#ffffff',
          label: 'LAVA',
          subLabel: 'ROAR',
          gripColor: '#b91c1c',
          accent: '#f87171',
        };
      case 'player-cyan':
      default:
        return {
          primary: '#0284c7',
          secondary: '#0369a1',
          text: '#ffffff',
          label: 'PLAYER',
          subLabel: 'EDITION',
          gripColor: '#0c4a6e',
          accent: '#38bdf8',
        };
    }
  };

  const config = getStickerConfig();

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[340px] drop-shadow-md transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Blade Wood Gradients */}
          <linearGradient id={`wood-blade-${bat.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={woodHighlight} />
            <stop offset="30%" stopColor={woodBase} />
            <stop offset="85%" stopColor={woodEdge} />
            <stop offset="100%" stopColor={woodEdge} />
          </linearGradient>

          {/* Spine depth shadow */}
          <linearGradient id={`wood-spine-${bat.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
          </linearGradient>

          {/* Sticker Gradient */}
          <linearGradient id={`sticker-grad-${bat.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.accent} />
            <stop offset="50%" stopColor={config.primary} />
            <stop offset="100%" stopColor={config.secondary} />
          </linearGradient>

          {/* Handle Texture */}
          <pattern id={`grip-pattern-${bat.id}`} width="8" height="6" patternUnits="userSpaceOnUse">
            <path d="M 0 3 L 4 0 L 8 3 L 4 6 Z" fill="rgba(255,255,255,0.12)" />
          </pattern>

          {/* Drop Shadow underneath bat */}
          <filter id={`drop-shadow-${bat.id}`} x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="8" dy="18" stdDeviation="12" floodOpacity="0.14" floodColor="#1e293b" />
          </filter>
        </defs>

        {/* Rotated Container representing the 45-degree angle in the reference screenshot */}
        <g
          transform="translate(160, 200) rotate(-40) translate(-60, -180)"
          filter={`url(#drop-shadow-${bat.id})`}
        >
          {/* Ground Soft Contact Shadow */}
          <ellipse cx="60" cy="350" rx="45" ry="14" fill="rgba(0,0,0,0.08)" />

          {/* --- CRICKET BAT BLADE --- */}
          {/* Main Blade Body */}
          <path
            d="M 28 85 
               Q 25 90 24 130 
               L 20 330 
               Q 22 346 45 352 
               L 75 352 
               Q 98 346 100 330 
               L 96 130 
               Q 95 90 92 85 
               L 72 75 
               L 48 75 
               Z"
            fill={`url(#wood-blade-${bat.id})`}
            stroke="#d8caba"
            strokeWidth="0.75"
          />

          {/* Blade Spine Curve (Central power ridge) */}
          <path
            d="M 60 85 L 60 348"
            stroke="rgba(0,0,0,0.09)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 58 85 L 58 348"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Willow Grain Lines */}
          <g stroke="rgba(120, 85, 45, 0.18)" strokeWidth="0.8" strokeLinecap="round">
            <line x1="32" y1="110" x2="30" y2="335" />
            <line x1="40" y1="95" x2="38" y2="342" />
            <line x1="48" y1="90" x2="47" y2="346" />
            <line x1="56" y1="88" x2="56" y2="349" />
            <line x1="64" y1="88" x2="64" y2="349" />
            <line x1="72" y1="90" x2="73" y2="346" />
            <line x1="80" y1="95" x2="82" y2="342" />
            <line x1="88" y1="110" x2="90" y2="335" />
          </g>

          {/* Black Rubber Toe Guard */}
          <path
            d="M 20 326 
               L 20 332 
               Q 22 346 45 352 
               L 75 352 
               Q 98 346 100 332 
               L 100 326 
               Q 95 334 75 338 
               L 45 338 
               Q 25 334 20 326 Z"
            fill="#18181b"
          />

          {/* --- BRAND DECAL / STICKER ON BLADE --- */}
          {/* Main Upper Blade Decal (Winged / Chevron shape matching DSC / Cricket Adda) */}
          <path
            d="M 25 125 
               L 95 125 
               L 93 210 
               Q 60 230 27 210 
               Z"
            fill={`url(#sticker-grad-${bat.id})`}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.5"
          />

          {/* Decal Geometric Highlights */}
          <path
            d="M 30 130 L 90 130 L 86 170 L 34 170 Z"
            fill="rgba(255,255,255,0.15)"
          />

          {/* Prominent Decal Brandmark / Text */}
          <g transform="translate(60, 165) scale(0.9)">
            {/* Athletic 3D Lettering */}
            <text
              x="0"
              y="-10"
              fill={config.text}
              fontSize="20"
              fontWeight="900"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="1"
            >
              CRICKET
            </text>
            <text
              x="0"
              y="10"
              fill="#fbbf24"
              fontSize="16"
              fontWeight="900"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="2"
            >
              ADDA
            </text>
            <text
              x="0"
              y="26"
              fill="rgba(255,255,255,0.9)"
              fontSize="8"
              fontWeight="800"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="1"
            >
              {config.label}
            </text>
          </g>

          {/* Lower Sweet Spot Decal */}
          <rect
            x="38"
            y="260"
            width="44"
            height="18"
            rx="3"
            fill={`url(#sticker-grad-${bat.id})`}
          />
          <text
            x="60"
            y="272"
            fill={config.text}
            fontSize="7"
            fontWeight="700"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            HANDCRAFTED
          </text>

          {/* --- SHOULDERS & HANDLE --- */}
          {/* Blade Shoulder Slope */}
          <path
            d="M 48 75 L 72 75 L 68 55 L 52 55 Z"
            fill={woodEdge}
            stroke="rgba(0,0,0,0.1)"
          />

          {/* Rubber/Cane Handle Body */}
          <rect
            x="50"
            y="-45"
            width="20"
            height="105"
            rx="4"
            fill={config.gripColor}
          />
          {/* Grip Texture Overlay */}
          <rect
            x="50"
            y="-45"
            width="20"
            height="105"
            rx="4"
            fill={`url(#grip-pattern-${bat.id})`}
          />

          {/* Handle Rib rings */}
          <line x1="50" y1="-25" x2="70" y2="-25" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          <line x1="50" y1="-5" x2="70" y2="-5" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          <line x1="50" y1="15" x2="70" y2="15" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          <line x1="50" y1="35" x2="70" y2="35" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

          {/* Handle Top White Cap */}
          <rect
            x="48"
            y="-52"
            width="24"
            height="9"
            rx="3"
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="0.8"
          />

          {/* Handle Grip Brand Tape */}
          <rect
            x="49"
            y="48"
            width="22"
            height="10"
            fill="#18181b"
          />
          <text
            x="60"
            y="55"
            fill="#ffffff"
            fontSize="5"
            fontWeight="bold"
            textAnchor="middle"
          >
            ADDA
          </text>
        </g>
      </svg>
    </div>
  );
};
