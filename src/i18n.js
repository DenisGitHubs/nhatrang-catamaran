export const STRINGS = {
  heroTitle: {
    ru: 'Катамаран в Нячанге',
    en: 'Catamaran in Nha Trang',
  },
  heroSubtitle: {
    ru: 'Частная морская прогулка под парусом — только вы, море и капитан',
    en: 'Private sailing trip — just you, the sea and your captain',
  },
  perBoat: { ru: 'за лодку целиком', en: 'per whole boat' },
  hours: { ru: '4 часа в море', en: '4 hours at sea' },
  guests: { ru: 'до 3 гостей + капитан', en: 'up to 3 guests + captain' },
  private: { ru: '100% приватно', en: '100% private' },
  routesTitle: { ru: 'Маршруты', en: 'Routes' },
  routesSubtitle: {
    ru: 'Цена одна — выбирайте, как провести свои 4 часа',
    en: 'One price — choose how to spend your 4 hours',
  },
  included: { ru: 'Что входит', en: "What's included" },
  includedList: {
    ru: [
      '⛵ Катамаран целиком — без посторонних',
      '👨‍✈️ Опытный капитан',
      '🦺 Спасательные жилеты',
      '🤿 Маски для снорклинга',
      '💧 Питьевая вода',
    ],
    en: [
      '⛵ The whole catamaran — no strangers aboard',
      '👨‍✈️ Experienced captain',
      '🦺 Life jackets',
      '🤿 Snorkeling masks',
      '💧 Drinking water',
    ],
  },
  helmTitle: { ru: 'За штурвалом', en: 'Take the Helm' },
  helmText: {
    ru: 'Можно не просто любоваться морем, а встать за штурвал самому. Капитан покажет, как держать курс и управлять парусом, — почувствуешь настоящий яхтинг. Опыт не нужен, всё объясним с нуля.',
    en: "Don't just watch the sea — take the wheel yourself. Your captain shows you how to hold a course and work the sail, so you feel real sailing. No experience needed, we start from scratch.",
  },
  helmList: {
    ru: [
      '🧭 Держать курс и читать море',
      '⛵ Ставить и настраивать парус',
      '🦺 Безопасно — капитан рядом',
    ],
    en: [
      '🧭 Hold a course and read the sea',
      '⛵ Raise and trim the sail',
      '🦺 Safe — your captain is right there',
    ],
  },
  helmNote: {
    ru: 'Уже входит в прогулку — просто скажи, что хочешь порулить.',
    en: 'Already included in the trip — just say you would like to steer.',
  },
  faqTitle: { ru: 'Частые вопросы', en: 'FAQ' },
  faq: {
    ru: [
      ['Где посадка?', 'Точку посадки пришлём после бронирования — это набережная Нячанга, добираться удобно из любого отеля.'],
      ['Можно с детьми?', 'Да! Детские жилеты есть на борту. Дети считаются как гости — всего на борту до 3 гостей.'],
      ['А если погода испортится?', 'Перенесём прогулку на другой день или вернём предоплату — как вам удобнее.'],
      ['Как оплатить?', 'Наличными в донгах или переводом. Детали — при бронировании.'],
    ],
    en: [
      ['Where do we board?', "We'll send the meeting point after booking — it's on the Nha Trang seafront, easy to reach from any hotel."],
      ['Can we bring kids?', 'Sure! Kids life jackets are on board. Children count as guests — up to 3 guests total.'],
      ['What if the weather turns bad?', "We'll reschedule for another day or refund your deposit — whichever you prefer."],
      ['How do I pay?', 'Cash in VND or bank transfer. Details when you book.'],
    ],
  },
  bookShort: { ru: 'Бронь', en: 'Book' },
  bookHint: {
    ru: 'Напишите Денису — ответит быстро и поможет выбрать время',
    en: "Message Denis — he replies fast and will help you pick a time",
  },
  contactsTitle: { ru: 'Контакты', en: 'Contacts' },
  contactsSubtitle: {
    ru: 'Быстрее всего — написать в Telegram',
    en: 'Telegram is the fastest way to reach us',
  },
  call: { ru: 'Позвонить', en: 'Call' },
  write: { ru: 'Написать на почту', en: 'Email us' },
  writeTg: { ru: 'Написать в Telegram', en: 'Message on Telegram' },
  galleryTitle: { ru: 'Фотогалерея', en: 'Photo Gallery' },
  gallerySubtitle: {
    ru: 'Наш катамаран вживую — таким вы его и увидите',
    en: 'Our catamaran as it is — exactly what you get',
  },
  tabHome: { ru: 'Главная', en: 'Home' },
  tabGallery: { ru: 'Фото', en: 'Photos' },
  tabFaq: { ru: 'Вопросы', en: 'FAQ' },
  tabContacts: { ru: 'Контакты', en: 'Contacts' },
};

export function detectLang() {
  const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
  const lang = tgLang || navigator.language || 'en';
  return lang.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}
