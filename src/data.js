// ===== Данные о услуге — правьте здесь =====

export const CONTACTS = {
  phone: '+84 77 298 1653',
  phoneRaw: '+84772981653',
  email: 'sokurenkoda87@gmail.com',
  telegram: 'https://t.me/DenisSokurenko',
  telegramHandle: '@DenisSokurenko',
};

// Ссылка на мини-апп (из BotFather) — её кодирует QR и ею делятся в Telegram.
export const APP_LINK = 'https://t.me/NhaTrangCatamaranBot/app';

export const PRICING = {
  priceVND: 2000000,
  priceLabel: { ru: '2 000 000 ₫', en: '2,000,000 ₫' },
  durationHours: 4,
  maxGuests: 3, // + капитан
};

// Фото: кладите файлы в public/photos и добавляйте сюда
export const HERO_PHOTO = '/photos/catamaran.webp';

export const GALLERY = [
  {
    src: '/photos/catamaran.webp',
    caption: { ru: 'Наш катамаран в заливе Нячанга', en: 'Our catamaran in Nha Trang Bay' },
  },
  {
    src: '/photos/beach-city.webp',
    caption: { ru: 'Старт с городского пляжа Нячанга', en: 'Setting off from Nha Trang city beach' },
  },
  {
    src: '/photos/beach-captain.webp',
    caption: { ru: 'Капитан ждёт вас на берегу', en: 'Your captain waiting on the shore' },
  },
  {
    src: '/photos/beach-bay.webp',
    caption: { ru: 'Готовы к выходу — море и острова впереди', en: 'Ready to sail — the bay and islands ahead' },
  },
  {
    src: '/photos/guests.webp',
    caption: { ru: 'Наши гости — жилеты для всех на борту', en: 'Our guests — life jackets for everyone aboard' },
  },
  {
    src: '/photos/sailing.webp',
    caption: { ru: 'Под парусом по заливу', en: 'Under sail across the bay' },
  },
  {
    src: '/photos/onboard.webp',
    caption: { ru: 'На борту — простор и безопасность', en: 'On board — roomy and safe' },
  },
];

export const ROUTES = [
  {
    id: 'islands',
    title: { ru: 'Острова залива', en: 'Bay Islands' },
    desc: {
      ru: 'Идём под парусом к островам Нячангского залива: Хон-Мун, Хон-Там. Прозрачная вода, снорклинг и виды, ради которых сюда едут.',
      en: 'Sail to the islands of Nha Trang Bay: Hon Mun, Hon Tam. Crystal-clear water, snorkeling and the views this bay is famous for.',
    },
    tags: {
      ru: ['Снорклинг', 'Купание', 'Фото-стопы'],
      en: ['Snorkeling', 'Swimming', 'Photo stops'],
    },
  },
  {
    id: 'sunset',
    title: { ru: 'Закатная прогулка', en: 'Sunset Cruise' },
    desc: {
      ru: 'Выходим ближе к вечеру и встречаем закат прямо в море. Тихий ход под парусом, город зажигает огни — самый романтичный маршрут.',
      en: 'We set off in the late afternoon and meet the sunset out at sea. Quiet sailing while the city lights up — our most romantic route.',
    },
    tags: {
      ru: ['Романтика', 'Закат', 'Огни города'],
      en: ['Romantic', 'Sunset', 'City lights'],
    },
  },
  {
    id: 'freeride',
    title: { ru: 'Свободный маршрут', en: 'Your Own Route' },
    desc: {
      ru: 'Лодка ваша на 4 часа — сами решаете, куда идти. Хотите больше купания, рыбалку или просто дрейфовать под парусом? Обсудим на месте.',
      en: 'The boat is yours for 4 hours — you decide where to go. More swimming, fishing, or just drifting under sail? Your call.',
    },
    tags: {
      ru: ['Гибкий план', 'Рыбалка', 'Приватно'],
      en: ['Flexible plan', 'Fishing', 'Private'],
    },
  },
];
