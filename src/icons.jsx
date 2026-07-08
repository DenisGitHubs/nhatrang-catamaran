// Инлайн-SVG: обложки маршрутов и иконки навигации

/* Катамаран в профиль: два корпуса, грот и стаксель */
function Catamaran({ hull = '#f4f9fb', sail = '#ffffff', jib = '#e8f4f8', mast = '#22405a', line = '#22405a' }) {
  return (
    <g>
      {/* грот */}
      <path d="M0 -46 C -13 -30 -16 -12 -12 0 L 0 0 Z" fill={sail} />
      <path d="M0 -46 C -10 -32 -12 -14 -9 -2 L 0 -2 Z" fill="rgba(11,45,79,0.06)" />
      {/* стаксель */}
      <path d="M2 -38 C 12 -26 15 -12 13 -1 L 3 -1 Z" fill={jib} />
      {/* мачта и штаг */}
      <path d="M0 -46 L0 2" stroke={mast} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M0 -46 L14 0" stroke={mast} strokeWidth="0.8" opacity="0.6" />
      {/* палуба-батут и корпуса */}
      <path d="M-17 2 L17 2" stroke={line} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-19 4 q2 5 6 5 l24 0 q5 0 8 -5 z" fill={hull} />
      <path d="M-19 4 q2 5 6 5 l24 0 q5 0 8 -5 l-4 0 q-2 3 -5 3 l-22 0 q-3 0 -4 -3 z" fill="rgba(11,45,79,0.12)" />
    </g>
  );
}

/* Чайки */
function Gulls({ color = '#2c5670', ...props }) {
  return (
    <g stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" {...props}>
      <path d="M0 0 q4 -4 8 0 q4 -4 8 0" />
      <path d="M22 -8 q3 -3 6 0 q3 -3 6 0" />
    </g>
  );
}

/* ===== 1. Острова залива — день, бирюзовая вода ===== */
export function IslandsCover() {
  return (
    <svg viewBox="0 0 400 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Bay islands">
      <defs>
        <linearGradient id="isl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#aee2f5" />
          <stop offset="1" stopColor="#e9f8fd" />
        </linearGradient>
        <linearGradient id="isl-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3fc3dd" />
          <stop offset="0.45" stopColor="#17a0c6" />
          <stop offset="1" stopColor="#0c6e9e" />
        </linearGradient>
        <radialGradient id="isl-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6d8" />
          <stop offset="0.55" stopColor="#ffe9a0" />
          <stop offset="1" stopColor="#ffe9a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* небо и солнце */}
      <rect width="400" height="86" fill="url(#isl-sky)" />
      <circle cx="330" cy="30" r="34" fill="url(#isl-sun)" />
      <circle cx="330" cy="30" r="13" fill="#ffdf8e" />

      {/* облака */}
      <g fill="#ffffff" opacity="0.85">
        <ellipse cx="80" cy="26" rx="26" ry="7" />
        <ellipse cx="98" cy="21" rx="16" ry="5" />
        <ellipse cx="228" cy="40" rx="20" ry="5" opacity="0.7" />
      </g>

      {/* дальние острова — воздушная перспектива */}
      <g fill="#9fd3e4">
        <path d="M-4 86 Q30 62 66 86 Z" />
        <path d="M330 86 Q368 58 404 86 Z" />
      </g>
      {/* средний остров с двумя вершинами */}
      <g>
        <path d="M96 86 Q128 44 158 70 Q178 52 214 86 Z" fill="#5fae9b" />
        <path d="M96 86 Q128 44 158 70 L158 86 Z" fill="#4c9d89" />
        {/* пляж у подножия */}
        <path d="M100 86 Q155 78 210 86 Z" fill="#f2e2bd" />
      </g>
      {/* ближний островок справа */}
      <g>
        <path d="M258 86 Q282 66 308 86 Z" fill="#3f8f7c" />
        <path d="M262 86 Q283 80 304 86 Z" fill="#f2e2bd" />
      </g>

      {/* море */}
      <rect y="86" width="400" height="54" fill="url(#isl-sea)" />
      {/* отражения островов */}
      <g opacity="0.18" fill="#0b2d4f">
        <path d="M100 86 Q155 108 210 86 Z" />
        <path d="M262 86 Q283 96 304 86 Z" />
      </g>
      {/* блики на воде */}
      <g stroke="#dff6fb" strokeLinecap="round" fill="none">
        <path d="M36 100 h18 M64 100 h8" strokeWidth="2" opacity="0.65" />
        <path d="M150 112 h22 M182 112 h9" strokeWidth="2" opacity="0.5" />
        <path d="M292 104 h16 M316 104 h7" strokeWidth="2" opacity="0.6" />
        <path d="M90 126 h26 M126 126 h10" strokeWidth="2.4" opacity="0.4" />
        <path d="M250 128 h20 M280 128 h8" strokeWidth="2.4" opacity="0.35" />
      </g>

      {/* катамаран */}
      <g transform="translate(210 100) scale(1.15)">
        <Catamaran />
      </g>
      {/* отражение паруса */}
      <path d="M198 112 C 192 120 190 128 192 134 L 210 134 C 212 126 211 118 210 112 Z" fill="#ffffff" opacity="0.14" />

      <Gulls transform="translate(120 34)" />
    </svg>
  );
}

/* ===== 2. Закатная прогулка — солнце у горизонта ===== */
export function SunsetCover() {
  return (
    <svg viewBox="0 0 400 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Sunset cruise">
      <defs>
        <linearGradient id="sun-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c1e5c" />
          <stop offset="0.4" stopColor="#8f3a67" />
          <stop offset="0.72" stopColor="#f2703f" />
          <stop offset="1" stopColor="#ffcf7d" />
        </linearGradient>
        <linearGradient id="sun-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e08050" />
          <stop offset="0.5" stopColor="#8f3a5c" />
          <stop offset="1" stopColor="#3a1e52" />
        </linearGradient>
        <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe8b0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe8b0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* небо */}
      <rect width="400" height="90" fill="url(#sun-sky)" />
      {/* сияние и солнце, наполовину в море */}
      <circle cx="200" cy="90" r="52" fill="url(#sun-glow)" />
      <path d="M174 90 A26 26 0 0 1 226 90 Z" fill="#ffdf94" />

      {/* перистые облака */}
      <g fill="#5c2a58" opacity="0.55">
        <path d="M40 30 q30 -6 62 0 q-30 5 -62 0 z" />
        <path d="M290 22 q26 -5 54 0 q-26 5 -54 0 z" />
        <path d="M96 52 q22 -4 46 0 q-22 4 -46 0 z" opacity="0.7" />
      </g>
      <g fill="#ff9c62" opacity="0.5">
        <path d="M60 64 q34 -5 70 0 q-34 5 -70 0 z" />
        <path d="M268 56 q28 -4 58 0 q-28 4 -58 0 z" />
      </g>

      {/* тёмные силуэты островов */}
      <path d="M-4 90 Q36 64 84 90 Z" fill="#331a4e" />
      <path d="M316 90 Q352 60 404 90 Z" fill="#331a4e" />

      {/* море */}
      <rect y="90" width="400" height="50" fill="url(#sun-sea)" />

      {/* солнечная дорожка */}
      <g fill="#ffd98c" opacity="0.85">
        <rect x="188" y="95" width="24" height="2.6" rx="1.3" />
        <rect x="180" y="102" width="40" height="2.8" rx="1.4" opacity="0.8" />
        <rect x="172" y="110" width="56" height="3" rx="1.5" opacity="0.65" />
        <rect x="162" y="119" width="76" height="3.2" rx="1.6" opacity="0.5" />
        <rect x="150" y="129" width="100" height="3.4" rx="1.7" opacity="0.35" />
      </g>

      {/* катамаран-силуэт слева от дорожки */}
      <g transform="translate(108 98) scale(1.1)">
        <Catamaran hull="#241536" sail="#241536" jib="#31204a" mast="#241536" line="#241536" />
      </g>
      {/* отражение силуэта */}
      <path d="M96 108 L120 108 L116 116 L100 116 Z" fill="#241536" opacity="0.3" />

      <Gulls transform="translate(288 40)" color="#2b1440" />
    </svg>
  );
}

/* ===== 3. Свободный маршрут — морская карта с пунктиром ===== */
export function FreeRouteCover() {
  return (
    <svg viewBox="0 0 400 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Your own route — nautical chart">
      <defs>
        <linearGradient id="map-sea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1187b4" />
          <stop offset="1" stopColor="#0a5f88" />
        </linearGradient>
      </defs>

      <rect width="400" height="140" fill="url(#map-sea)" />

      {/* изобаты — линии глубин вокруг островов */}
      <g stroke="#bfeaf7" fill="none" opacity="0.25" strokeWidth="1.4">
        <ellipse cx="120" cy="46" rx="52" ry="24" />
        <ellipse cx="120" cy="46" rx="38" ry="16" />
        <ellipse cx="296" cy="106" rx="58" ry="26" />
        <ellipse cx="296" cy="106" rx="42" ry="17" />
      </g>

      {/* острова в стиле карты: песчаная кромка + зелень */}
      <g>
        <path d="M96 38 q14 -14 34 -8 q16 4 12 18 q-4 14 -24 12 q-22 -2 -22 -22 z" fill="#f2e2bd" />
        <path d="M102 40 q10 -10 26 -6 q12 3 9 13 q-3 11 -18 9 q-17 -2 -17 -16 z" fill="#4c9d89" />
        {/* пальма */}
        <path d="M118 34 q-1 -7 3 -11" stroke="#7a5230" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <g fill="#2f8a76">
          <path d="M121 23 q-8 -4 -14 0 q7 1 10 4 z" />
          <path d="M121 23 q9 -3 13 2 q-7 -1 -11 2 z" />
          <path d="M121 23 q0 -7 -5 -10 q2 5 1 9 z" />
        </g>
      </g>
      <g>
        <path d="M272 96 q16 -12 34 -4 q14 6 8 18 q-6 12 -26 8 q-20 -4 -16 -22 z" fill="#f2e2bd" />
        <path d="M278 98 q12 -9 24 -3 q10 4 6 12 q-5 9 -19 6 q-15 -3 -11 -15 z" fill="#4c9d89" />
      </g>

      {/* волновые глифы, как на картах */}
      <g stroke="#bfeaf7" strokeWidth="1.6" fill="none" opacity="0.4" strokeLinecap="round">
        <path d="M40 118 q5 -4 10 0 q5 4 10 0" />
        <path d="M220 30 q5 -4 10 0 q5 4 10 0" />
        <path d="M348 52 q5 -4 10 0 q5 4 10 0" />
        <path d="M180 128 q5 -4 10 0 q5 4 10 0" />
      </g>

      {/* маршрут: старт → извилистый пунктир → у компаса */}
      <circle cx="46" cy="104" r="9" fill="none" stroke="#ffd166" strokeWidth="2" opacity="0.55" />
      <circle cx="46" cy="104" r="5" fill="#ffd166" stroke="#fff" strokeWidth="2" />
      <path d="M56 100 C 104 76 138 96 172 74 S 250 40 298 52 S 344 44 352 40"
        stroke="#ffd166" strokeWidth="3" strokeDasharray="9 8" fill="none" strokeLinecap="round" />

      {/* катамаран сверху, идёт по маршруту */}
      <g transform="translate(196 66) rotate(-18)">
        {/* кильватер */}
        <path d="M-30 0 h12 M-14 0 h6" stroke="#dff6fb" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        {/* корпуса */}
        <rect x="-12" y="-7.5" width="26" height="4" rx="2" fill="#f4f9fb" />
        <rect x="-12" y="3.5" width="26" height="4" rx="2" fill="#f4f9fb" />
        {/* балки и парус */}
        <path d="M-6 -5.5 L-6 5.5 M8 -5.5 L8 5.5" stroke="#22405a" strokeWidth="1.6" />
        <path d="M1 -9 L13 0 L1 9 Z" fill="#ffffff" opacity="0.95" />
      </g>

      {/* компас */}
      <g transform="translate(354 34)">
        <circle r="16" fill="#0b2d4f" opacity="0.35" />
        <circle r="16" fill="none" stroke="#dff6fb" strokeWidth="1.6" />
        <circle r="12" fill="none" stroke="#dff6fb" strokeWidth="0.8" opacity="0.6" />
        {/* малые лучи */}
        <g fill="#8fd4e8">
          <path d="M0 -11 L2.5 -2.5 L11 0 L2.5 2.5 L0 11 L-2.5 2.5 L-11 0 L-2.5 -2.5 Z" opacity="0.5" transform="rotate(45)" />
        </g>
        {/* главные лучи: север — коралловый */}
        <path d="M0 -13 L3 0 L0 4 L-3 0 Z" fill="#ff7a52" />
        <path d="M0 13 L3 0 L0 -4 L-3 0 Z" fill="#f4f9fb" />
        <path d="M0 -13 L3 0 L0 4 L-3 0 Z" fill="#f4f9fb" transform="rotate(90)" />
        <path d="M0 -13 L3 0 L0 4 L-3 0 Z" fill="#f4f9fb" transform="rotate(-90)" />
        <circle r="2.2" fill="#dff6fb" />
      </g>
    </svg>
  );
}

export const ROUTE_COVERS = {
  islands: IslandsCover,
  sunset: SunsetCover,
  freeride: FreeRouteCover,
};

/* ===== Панорама прогулки: от дневного выхода к закату ===== */
export function TripFlowScene() {
  return (
    <svg viewBox="0 0 400 170" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Морская панорама: от дневного выхода к закату">
      <defs>
        <linearGradient id="flow-sky" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9fd8ef" />
          <stop offset="0.4" stopColor="#c9eaf6" />
          <stop offset="0.68" stopColor="#ffe6c6" />
          <stop offset="0.86" stopColor="#ffcf9c" />
          <stop offset="1" stopColor="#ff9e6e" />
        </linearGradient>
        <linearGradient id="flow-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2aa7cc" />
          <stop offset="1" stopColor="#0a5f88" />
        </linearGradient>
        <radialGradient id="flow-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3cf" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#ffd98c" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd98c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* небо: слева день, справа закат */}
      <rect width="400" height="104" fill="url(#flow-sky)" />

      {/* заходящее солнце справа */}
      <circle cx="336" cy="86" r="58" fill="url(#flow-sun)" />
      <circle cx="336" cy="92" r="17" fill="#ffdf8e" />

      {/* облака, теплее к закату */}
      <g fill="#ffffff" opacity="0.85">
        <ellipse cx="70" cy="26" rx="26" ry="7" />
        <ellipse cx="90" cy="21" rx="15" ry="5" />
      </g>
      <g fill="#ffd9b0" opacity="0.7">
        <ellipse cx="250" cy="34" rx="24" ry="6" />
        <ellipse cx="268" cy="29" rx="14" ry="4" />
      </g>

      {/* дальние острова по горизонту */}
      <g fill="#7fc0b0">
        <path d="M-6 104 Q30 78 74 104 Z" />
        <path d="M158 104 Q196 74 236 104 Z" />
      </g>
      {/* острова у солнца — тёплый силуэт */}
      <g fill="#c98a63">
        <path d="M300 104 Q332 80 372 104 Z" />
        <path d="M252 104 Q274 90 300 104 Z" />
      </g>
      {/* песчаная кромка ближнего острова */}
      <path d="M162 104 Q198 96 232 104 Z" fill="#f2e2bd" opacity="0.85" />

      {/* море */}
      <rect y="104" width="400" height="66" fill="url(#flow-sea)" />

      {/* золотая дорожка под солнцем */}
      <g fill="#ffd98c" opacity="0.8">
        <rect x="324" y="110" width="24" height="3" rx="1.5" />
        <rect x="316" y="118" width="40" height="3.2" rx="1.6" opacity="0.8" />
        <rect x="306" y="127" width="60" height="3.4" rx="1.7" opacity="0.6" />
        <rect x="296" y="138" width="80" height="3.6" rx="1.8" opacity="0.42" />
        <rect x="286" y="150" width="100" height="3.8" rx="1.9" opacity="0.3" />
      </g>

      {/* блики на воде слева */}
      <g stroke="#dff6fb" strokeLinecap="round" fill="none" opacity="0.5">
        <path d="M40 120 h20 M70 120 h9" strokeWidth="2" />
        <path d="M96 138 h24 M130 138 h10" strokeWidth="2.2" />
        <path d="M30 152 h26 M66 152 h10" strokeWidth="2.4" />
      </g>

      {/* катамаран идёт по заливу к закату */}
      <g transform="translate(146 120) scale(1.25)">
        {/* кильватер */}
        <path d="M-30 6 h14 M-12 6 h6" stroke="#dff6fb" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        <Catamaran />
      </g>
      {/* отражение паруса */}
      <path d="M135 132 C 129 140 127 148 129 154 L 148 154 C 150 146 149 138 147 132 Z" fill="#ffffff" opacity="0.12" />

      <Gulls transform="translate(96 40)" />
      <Gulls transform="translate(214 24)" color="#3a7d8f" />
    </svg>
  );
}

/* ===== Морские иконки нового дизайна ===== */

/* Логотип-якорь. color задаёт цвет линий (по умолчанию молочный). */
export const AnchorIcon = ({ size = 24, color = '#F4F6F5' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="5" r="2.2" stroke={color} strokeWidth="1.8" />
    <path d="M12 7.5V20M6 12h12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 15c0 3.5 3 5.5 7 5.5s7-2 7-5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M5 15l-1.8-1.4M5 15l2.2-.6M19 15l1.8-1.4M19 15l-2.2-.6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/* Компас — маленькая роза ветров в hero.
   Тёмно-синие штрихи через currentColor (= var(--head)), чтобы не пропадать на тёмной карточке;
   стрелка на север остаётся фирменной красной. */
export const CompassIcon = () => (
  <svg className="compass" width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <polygon points="20,6 23,20 20,34 17,20" fill="#C8402F" />
    <polygon points="6,20 20,17 34,20 20,23" fill="currentColor" />
    <circle cx="20" cy="20" r="2.4" fill="var(--card)" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

/* Гирлянда сигнальных флажков поверх hero-фото */
export const SignalFlags = () => (
  <svg viewBox="0 0 400 40" className="hero-flags" aria-hidden="true">
    <path d="M0 2 h400" stroke="rgba(255,255,255,.85)" strokeWidth="2" />
    <polygon points="30,3 58,3 44,32" fill="#C8402F" />
    <polygon points="90,3 118,3 104,32" fill="#F4F6F5" />
    <polygon points="150,3 178,3 164,32" fill="#12365C" />
    <polygon points="210,3 238,3 224,32" fill="#F5B72E" />
    <polygon points="270,3 298,3 284,32" fill="#C8402F" />
    <polygon points="330,3 358,3 344,32" fill="#F4F6F5" />
  </svg>
);

/* Переключатель темы: луна (в светлой) / солнце (в тёмной). dark — текущая тема тёмная */
export const ThemeIcon = ({ dark = false, size = 16 }) => (
  dark ? (
    /* солнце — вернуться к светлой */
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
    </svg>
  ) : (
    /* луна — перейти в тёмную */
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 14.2A8 8 0 0 1 9.8 4 7 7 0 1 0 20 14.2z" />
    </svg>
  )
);

/* Галочка в списке «Что входит» */
export const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 12.5l5 5L20 6.5" stroke="#C8402F" strokeWidth="3" strokeLinecap="square" />
  </svg>
);

/* ===== Иконки табов ===== */
const ic = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };

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
  <svg viewBox="0 0 24 24" width="26" height="26" fill="#ffffff" aria-hidden="true">
    <path d="M12 2 q-8 10 -1.5 16 l1.5 0 z" />
    <path d="M13.5 5 q6 8 1 13 l-1 0 z" opacity="0.85" />
    <path d="M4.5 19.5 h15 l-2.5 3 h-10 z" />
  </svg>
);
