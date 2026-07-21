// ===== Данные о услуге — правьте здесь =====

export const CONTACTS = {
  phone: '+84 77 298 1653',
  phoneRaw: '+84772981653',
  email: 'sokurenkoda87@gmail.com',
  telegram: 'https://t.me/DenisSokurenko',
  telegramHandle: '@DenisSokurenko',
  whatsapp: 'https://wa.me/84772981653',
};

// Ссылка на мини-апп (из BotFather) — её кодирует QR и ею делятся в Telegram.
export const APP_LINK = 'https://t.me/NhaTrangCatamaranBot/app';

export const PRICING = {
  priceVND: 2000000,
  priceLabel: { ru: '2 000 000 ₫', en: '2,000,000 ₫' },
  durationHours: 3,
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
    caption: { ru: 'Ваш капитан — опытный и всегда рядом', en: 'Your captain — experienced and always by your side' },
  },
  {
    src: '/photos/beach-bay.webp',
    caption: { ru: 'Готовы к выходу — море и острова впереди', en: 'Ready to sail — the bay and islands ahead' },
  },
  {
    src: '/photos/guests.webp',
    caption: { ru: 'Наши гости — и целое море впечатлений', en: 'Our guests — and a whole sea of good memories' },
  },
  {
    src: '/photos/sailing.webp',
    caption: { ru: 'Под парусом по реке Кай', en: 'Under sail on the Cai River' },
  },
  {
    src: '/photos/onboard.webp',
    caption: { ru: 'На борту — простор и безопасность', en: 'On board — roomy and safe' },
  },
];

// Маршруты. cover — фото-обложка карточки, badge — цветной бейдж поверх фото.
// tone бейджа: 'hit' (красный), 'gold' (латунь), 'navy' (тёмно-синий).
export const ROUTES = [
  {
    id: 'hon-mun',
    cover: '/photos/beach-bay.webp',
    badge: { ru: 'Хит', en: 'Top pick' },
    tone: 'hit',
    title: { ru: 'Остров Хон-Мун', en: 'Hon Mun Island' },
    desc: {
      ru: 'Коралловый риф и прозрачная вода — одно из лучших мест для снорклинга в заливе.',
      en: 'A coral reef and crystal-clear water — one of the best snorkeling spots in the bay.',
    },
    tags: {
      ru: ['Снорклинг', 'Кораллы', 'Прозрачная вода'],
      en: ['Snorkeling', 'Coral reef', 'Clear water'],
    },
  },
  {
    id: 'hon-tam',
    cover: '/photos/onboard.webp',
    badge: { ru: 'Пляж', en: 'Beach' },
    tone: 'gold',
    title: { ru: 'Остров Хон-Там', en: 'Hon Tam Island' },
    desc: {
      ru: 'Спокойная стоянка и купание у песчаного пляжа — идеально для отдыха без спешки.',
      en: 'A calm mooring and a swim by the sandy beach — perfect for an unhurried break.',
    },
    tags: {
      ru: ['Купание', 'Пляж', 'Спокойная стоянка'],
      en: ['Swimming', 'Beach', 'Calm mooring'],
    },
  },
  {
    id: 'freeride',
    cover: '/photos/sailing.webp',
    badge: { ru: 'Свобода', en: 'Freedom' },
    tone: 'navy',
    title: { ru: 'Свободный день', en: 'Your Own Day' },
    desc: {
      ru: 'Лодка ваша на все 3 часа — сами решаете, чем заняться. Купание, рыбалка или дрейф под парусом.',
      en: 'The boat is yours for all 3 hours — you decide what to do. Swimming, fishing or just drifting under sail.',
    },
    tags: {
      ru: ['Гибкий план', 'Рыбалка', 'Приватно'],
      en: ['Flexible plan', 'Fishing', 'Private'],
    },
  },
  {
    id: 'sailing-course',
    cover: '/photos/beach-captain.webp',
    badge: { ru: 'Новое', en: 'New' },
    tone: 'navy',
    title: { ru: 'Обучение яхтингу', en: 'Sailing Course' },
    desc: {
      ru: 'Курс на несколько дней: учим уверенно ходить под парусом и управлять катамараном. Детали и длительность — обсудим при бронировании.',
      en: 'A multi-day course: we teach you to sail with confidence and handle the catamaran yourself. Details and duration — we will confirm when you book.',
    },
    tags: {
      ru: ['Несколько дней', 'С нуля', 'Свой катамаран'],
      en: ['Multi-day', 'From scratch', 'Hands-on'],
    },
  },
];

// Допродажи — сделают прогулку особеннее. Цены не публикуем, называем при брони.
export const ADDONS = [
  {
    id: 'drone',
    title: { ru: 'Дрон-фотосессия', en: 'Drone photo session' },
    desc: { ru: 'Кадры с высоты — вы и катамаран посреди моря', en: 'Aerial shots — you and the catamaran out at sea' },
  },
  {
    id: 'fruits',
    title: { ru: 'Свежие фрукты', en: 'Fresh fruit' },
    desc: { ru: 'Тропическая тарелка к морю и солнцу', en: 'A tropical platter for the sea and sun' },
  },
  {
    id: 'champagne',
    title: { ru: 'Шампанское', en: 'Champagne' },
    desc: { ru: 'Отметить момент прямо на воде', en: 'Toast the moment right on the water' },
  },
  {
    id: 'beer',
    title: { ru: 'Холодное пиво', en: 'Cold beer' },
    desc: { ru: 'Освежиться в жаркий день', en: 'Cool off on a hot day' },
  },
  {
    id: 'extrahour',
    title: { ru: 'Дополнительный час', en: 'Extra hour at sea' },
    desc: { ru: 'Продлить прогулку, когда уходить не хочется', en: 'Stay longer when you just do not want to head back' },
  },
];

// Отзывы гостей. initial — буква для аватара, country/text — двуязычные.
export const REVIEWS = [
  {
    initial: 'А',
    name: 'Анна',
    country: { ru: 'Россия', en: 'Russia' },
    text: {
      ru: 'Лучшее утро в Нячанге: прозрачная вода, паруса и никакой толпы. Денис дал поуправлять катамараном — восторг!',
      en: 'Best morning in Nha Trang: clear water, sails and no crowds. Denis let me steer the catamaran — loved it!',
    },
  },
  {
    initial: 'Д',
    name: 'Дмитрий',
    country: { ru: 'Россия', en: 'Russia' },
    text: {
      ru: 'Брали всей семьёй маршрут по островам. Дети в полном восторге, капитан внимательный, всё безопасно. Обязательно вернёмся.',
      en: 'We took the island route as a family. The kids loved it, the captain was attentive, everything felt safe. We will be back.',
    },
  },
  {
    initial: 'М',
    name: 'Мария',
    country: { ru: 'Казахстан', en: 'Kazakhstan' },
    text: {
      ru: 'Катамаран целиком только для нас — это того стоит. Снорклинг, фрукты, съёмка с дрона. Спасибо за идеальный день!',
      en: 'The whole catamaran just for us — worth every bit. Snorkeling, fruit, drone shots. Thank you for a perfect day!',
    },
  },
];
