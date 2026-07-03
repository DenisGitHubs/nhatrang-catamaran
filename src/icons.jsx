// Инлайн-SVG: обложки маршрутов и иконки навигации

export function IslandsCover() {
  return (
    <svg viewBox="0 0 400 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ed8f8" />
          <stop offset="1" stopColor="#d8f1fb" />
        </linearGradient>
        <linearGradient id="sea1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0aa3c9" />
          <stop offset="1" stopColor="#056a92" />
        </linearGradient>
      </defs>
      <rect width="400" height="90" fill="url(#sky1)" />
      <circle cx="340" cy="28" r="16" fill="#ffd166" />
      <ellipse cx="120" cy="88" rx="70" ry="18" fill="#2e9e6b" />
      <ellipse cx="118" cy="92" rx="78" ry="10" fill="#f4e2b8" />
      <path d="M118 88 q-4 -26 2 -34" stroke="#7a5230" strokeWidth="4" fill="none" />
      <g fill="#3fae67">
        <path d="M120 52 q-20 -12 -34 -4 q16 2 22 10 z" />
        <path d="M120 52 q22 -10 34 0 q-16 0 -24 8 z" />
        <path d="M120 52 q-2 -18 -14 -24 q6 12 4 22 z" />
        <path d="M120 52 q6 -16 18 -20 q-8 12 -8 22 z" />
      </g>
      <ellipse cx="300" cy="92" rx="46" ry="12" fill="#37a06d" />
      <ellipse cx="300" cy="95" rx="52" ry="7" fill="#f4e2b8" />
      <rect y="96" width="400" height="44" fill="url(#sea1)" />
      <g stroke="#bfeaf7" strokeWidth="2.5" fill="none" opacity="0.7">
        <path d="M20 112 q10 -6 20 0 q10 6 20 0" />
        <path d="M150 124 q10 -6 20 0 q10 6 20 0" />
        <path d="M300 116 q10 -6 20 0 q10 6 20 0" />
      </g>
      <g>
        <path d="M196 96 l44 0 l-7 9 l-30 0 z" fill="#e63946" />
        <path d="M216 60 l0 36" stroke="#25313f" strokeWidth="2.5" />
        <path d="M216 62 q-17 22 -3 32 l3 0 z" fill="#ffffff" />
        <path d="M219 66 q13 18 2 28 l-2 0 z" fill="#f1b8b8" />
      </g>
    </svg>
  );
}

export function SunsetCover() {
  return (
    <svg viewBox="0 0 400 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b2a86" />
          <stop offset="0.5" stopColor="#e6603f" />
          <stop offset="1" stopColor="#ffb35c" />
        </linearGradient>
        <linearGradient id="sea2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c14a35" />
          <stop offset="1" stopColor="#5f2350" />
        </linearGradient>
      </defs>
      <rect width="400" height="92" fill="url(#sky2)" />
      <circle cx="200" cy="88" r="26" fill="#ffdd8f" />
      <rect y="92" width="400" height="48" fill="url(#sea2)" />
      <g fill="#ffd98c" opacity="0.75">
        <rect x="184" y="98" width="32" height="3" rx="1.5" />
        <rect x="176" y="106" width="48" height="3" rx="1.5" />
        <rect x="188" y="114" width="24" height="3" rx="1.5" />
        <rect x="170" y="122" width="60" height="3" rx="1.5" />
      </g>
      <g fill="#2b1230">
        <path d="M96 92 l40 0 l-6 8 l-28 0 z" />
        <path d="M114 58 l0 34" stroke="#2b1230" strokeWidth="2.5" />
        <path d="M114 58 q-15 20 -3 34 l3 0 z" />
        <path d="M117 62 q12 16 2 30 l-2 0 z" />
      </g>
      <g fill="#2b1230" opacity="0.85">
        <path d="M318 74 q6 -8 12 0 q-6 -2 -12 0 z" />
        <path d="M338 66 q6 -8 12 0 q-6 -2 -12 0 z" />
      </g>
    </svg>
  );
}

export function FreeRouteCover() {
  return (
    <svg viewBox="0 0 400 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sea3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0e7fae" />
          <stop offset="1" stopColor="#0a5e86" />
        </linearGradient>
      </defs>
      <rect width="400" height="140" fill="url(#sea3)" />
      <g stroke="#bfeaf7" strokeWidth="2" fill="none" opacity="0.35">
        <path d="M0 30 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />
        <path d="M0 110 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />
      </g>
      <path d="M60 104 C 120 60, 180 120, 240 76 S 340 40, 352 44"
        stroke="#ffd166" strokeWidth="3.5" strokeDasharray="10 8" fill="none" strokeLinecap="round" />
      <g>
        <circle cx="60" cy="104" r="7" fill="#e63946" stroke="#fff" strokeWidth="2.5" />
        <ellipse cx="250" cy="80" rx="26" ry="8" fill="#2e9e6b" />
        <ellipse cx="250" cy="83" rx="30" ry="5" fill="#f4e2b8" />
        <g transform="translate(346,38)">
          <circle r="13" fill="#ffffff" />
          <path d="M0 -8 L3 3 L0 1 L-3 3 Z" fill="#e63946" />
          <circle r="2" fill="#25313f" />
        </g>
      </g>
      <g transform="translate(150,96)">
        <path d="M-20 6 l40 0 l-6 8 l-28 0 z" fill="#e63946" />
        <path d="M-2 -26 l0 32" stroke="#fff" strokeWidth="2.5" />
        <path d="M-2 -26 q-14 18 -3 32 l3 0 z" fill="#ffffff" />
      </g>
    </svg>
  );
}

export const ROUTE_COVERS = {
  islands: IslandsCover,
  sunset: SunsetCover,
  freeride: FreeRouteCover,
};

/* ===== Иконки табов ===== */
const ic = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...ic}>
    <path d="M3 11.5 L12 4 l9 7.5" />
    <path d="M5.5 10.5 V20 h13 v-9.5" />
    <path d="M10 20 v-5.5 h4 V20" />
  </svg>
);

export const PhotoIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...ic}>
    <rect x="3" y="6.5" width="18" height="13" rx="2.5" />
    <path d="M8.5 6.5 L10 4 h4 l1.5 2.5" />
    <circle cx="12" cy="13" r="3.6" />
  </svg>
);

export const FaqIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...ic}>
    <path d="M4 6 a3 3 0 0 1 3 -3 h10 a3 3 0 0 1 3 3 v7 a3 3 0 0 1 -3 3 h-7 l-4.5 4 v-4 H7 a3 3 0 0 1 -3 -3 z" />
    <path d="M9.6 8.2 a2.4 2.4 0 1 1 3.2 2.6 c-.7.3 -.8.8 -.8 1.4" />
    <circle cx="12" cy="14.6" r="0.4" fill="currentColor" />
  </svg>
);

export const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...ic}>
    <path d="M5 4 h4 l1.5 4.5 L8 10 a12 12 0 0 0 6 6 l1.5 -2.5 L20 15 v4 a2 2 0 0 1 -2 2 A16 16 0 0 1 3 6 a2 2 0 0 1 2 -2 z" />
  </svg>
);

export const SailIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="#ffffff">
    <path d="M12 2 q-8 10 -1.5 16 l1.5 0 z" />
    <path d="M13.5 5 q6 8 1 13 l-1 0 z" opacity="0.85" />
    <path d="M4.5 19.5 h15 l-2.5 3 h-10 z" />
  </svg>
);
