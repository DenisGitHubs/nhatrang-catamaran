import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CONTACTS, PRICING, ROUTES, ADDONS, REVIEWS, GALLERY, HERO_PHOTO, APP_LINK } from './data.js';
import { STRINGS, detectLang } from './i18n.js';
import {
  AnchorIcon, CompassIcon, SignalFlags, CheckIcon,
  HomeIcon, PhotoIcon, FaqIcon, PhoneIcon, SailIcon, ThemeIcon,
} from './icons.jsx';

const tg = window.Telegram?.WebApp;

// Фирменный тёмно-синий (navy) — тот же, что --navy в index.css.
// Полоса шапки (.masthead-bar) остаётся navy в обеих темах,
// поэтому нативную шапку Telegram всегда красим в navy — без шва.
const NAVY = '#12365C';
// Ключ хранения выбранной темы
const THEME_KEY = 'kat-theme';

// Стартовая тема: сохранённая → тема Telegram → светлая
function initTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* localStorage может быть недоступен */ }
  return tg?.colorScheme === 'dark' ? 'dark' : 'light';
}

// Капитанское фото для блока «Встаньте за штурвал»
const HELM_PHOTO = '/photos/beach-captain.webp';

// Мобильный или десктоп: по платформе Telegram, с запасным вариантом по UA.
function detectMobile() {
  const p = tg?.platform;
  if (p) return p === 'android' || p === 'ios';
  return /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
}
const IS_MOBILE = detectMobile();

const TABS = [
  { id: 'home', Icon: HomeIcon, label: 'tabHome' },
  { id: 'gallery', Icon: PhotoIcon, label: 'tabGallery' },
  { id: 'book', Icon: SailIcon, label: 'bookShort', cta: true },
  { id: 'faq', Icon: FaqIcon, label: 'tabFaq' },
  { id: 'contacts', Icon: PhoneIcon, label: 'tabContacts' },
];

export default function App() {
  const [lang, setLang] = useState(detectLang);
  const [tab, setTab] = useState('home');
  const [theme, setTheme] = useState(initTheme);
  const other = lang === 'ru' ? 'en' : 'ru';
  // Локализация: tr достаёт нужный язык из объекта {ru, en}, t — то же для строк STRINGS.
  // Оба с запасным вариантом, чтобы отсутствующий ключ/язык не ронял всё приложение.
  const tr = (obj) => obj?.[lang] ?? obj?.en ?? '';
  const t = (key) => tr(STRINGS[key]) || key;

  useEffect(() => {
    if (!tg) return;
    tg.ready();
    tg.expand();
  }, []);

  // Применяем тему: атрибут на <html>, сохранение и цвет шапки Telegram
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* нет доступа — не критично */ }
    // Шапка приложения (navy-полоса) одинакова в обеих темах → шапку Telegram всегда красим navy
    try { tg?.setHeaderColor?.(NAVY); } catch { /* старый клиент может не поддерживать — не критично */ }
  }, [theme]);

  // Держим <html lang> в соответствии с языком — для скринридеров и авто-переводчиков
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // При открытии раздела прокручиваем к самому верху
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  // Открываем чат с Денисом и подставляем готовый текст брони
  const openTelegram = () => {
    const url = `${CONTACTS.telegram}?text=${encodeURIComponent(t('bookPrefill'))}`;
    if (tg?.openTelegramLink) tg.openTelegramLink(url);
    else window.open(url, '_blank');
  };

  const openWhatsApp = () => {
    const url = `${CONTACTS.whatsapp}?text=${encodeURIComponent(t('bookPrefill'))}`;
    if (tg?.openLink) tg.openLink(url);
    else window.open(url, '_blank');
  };

  const shareApp = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(APP_LINK)}&text=${encodeURIComponent(t('shareText'))}`;
    if (tg?.openTelegramLink) tg.openTelegramLink(url);
    else window.open(url, '_blank');
  };

  const langSwitch = (
    <button
      className="lang-switch"
      onClick={() => setLang(other)}
      aria-label={lang === 'ru' ? 'Switch to English' : 'Переключить на русский'}
    >
      {IS_MOBILE
        ? (other === 'en' ? '🇬🇧 EN' : '🇷🇺 RU')
        : other.toUpperCase()}
    </button>
  );

  const themeSwitch = (
    <button
      className="theme-switch"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? t('themeToLight') : t('themeToDark')}
    >
      <ThemeIcon dark={theme === 'dark'} />
    </button>
  );

  // Заголовок-делитель секции: H2 + пунктирная линия справа
  const sectionHead = (title, sub) => (
    <>
      <div className="sec-head">
        <h2>{title}</h2>
        <span className="sec-rule" />
      </div>
      {sub && <p className="sec-sub">{sub}</p>}
    </>
  );

  return (
    <div className="app">
      {/* Шапка-тельняшка со скрытым логотипом-якорем и переключателем языка */}
      <header className="masthead">
        <div className="masthead-bar">
          <div className="brand">
            <AnchorIcon size={22} />
            <span className="brand-name">{t('brandName')}</span>
          </div>
          <div className="masthead-actions">
            {themeSwitch}
            {langSwitch}
          </div>
        </div>
        <div className="masthead-strip" />
      </header>

      {tab === 'home' && (
        <>
          {/* Hero: фото в рамке с сигнальными флажками, кикер, компас и заголовок */}
          <section className="hero">
            <div className="hero-frame">
              <div className="hero-photo">
                <img src={HERO_PHOTO} alt={t('heroTitle')} />
                <SignalFlags />
              </div>
              <div className="hero-frame-foot">
                <span className="hero-kicker">{t('heroKicker')}</span>
                <CompassIcon />
              </div>
            </div>
            <h1 className="hero-title">{t('heroTitle')}</h1>
            <p className="hero-sub">{t('heroSubtitle')}</p>
            <div className="hero-facts">
              {tr(STRINGS.heroFacts).map((f, i) => (
                <span className={'fact' + (i === 2 ? ' fact-accent' : '')} key={f}>{f}</span>
              ))}
            </div>
          </section>

          {/* Цена */}
          <section className="price-sec">
            <div className="price-card">
              <div className="price-top">
                <div>
                  <div className="price-value">{tr(PRICING.priceLabel)}</div>
                  <div className="price-unit">{t('priceUnit')}</div>
                </div>
                <div className="price-anchor">{t('priceAnchor')}</div>
              </div>
              <div className="cancel-policy">{t('cancelPolicy')}</div>
              <button className="btn-cta" onClick={openTelegram}>{t('checkDates')}</button>
            </div>
          </section>

          {/* Маршруты */}
          <section className="section">
            {sectionHead(t('routesTitle'), t('routesSubtitle'))}
            <div className="routes-grid">
              {ROUTES.map((r) => (
                <article className="route-card" key={r.id}>
                  <div className="route-cover">
                    <img src={r.cover} alt={tr(r.title)} loading="lazy" />
                    <span className={'route-badge badge-' + r.tone}>{tr(r.badge)}</span>
                  </div>
                  <div className="route-body">
                    <h3>{tr(r.title)}</h3>
                    <p>{tr(r.desc)}</p>
                    <div className="route-tags">
                      {tr(r.tags).map((tag) => (
                        <span className="route-tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Судовой журнал — таймлайн с отметками времени */}
          <section className="section">
            {sectionHead(t('logTitle'), t('logSubtitle'))}
            <div className="log-card">
              {tr(STRINGS.logSteps).map(([time, title, text]) => (
                <div className="log-row" key={time + title}>
                  <span className="log-time">{time}</span>
                  <div className="log-body">
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Встаньте за штурвал */}
          <section className="section">
            <div className="helm-card">
              <img className="helm-photo" src={HELM_PHOTO} alt={t('helmTitle')} loading="lazy" />
              <div className="helm-body">
                <span className="helm-badge">{t('helmBadge')}</span>
                <h2>{t('helmTitle')}</h2>
                <p>{t('helmText')}</p>
                <ul className="helm-list">
                  {tr(STRINGS.helmList).map((item) => (
                    <li key={item}><span className="helm-anchor">⚓</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Что входит */}
          <section className="section">
            {sectionHead(t('included'))}
            <div className="included-list">
              {tr(STRINGS.includedList).map((item) => (
                <div className="included-item" key={item}>
                  <CheckIcon />{item}
                </div>
              ))}
            </div>
          </section>

          {/* Провизия и бонусы */}
          <section className="section">
            {sectionHead(t('addonsTitle'), t('addonsNote'))}
            <div className="addons-grid">
              {ADDONS.map((a) => (
                <article className="addon-card" key={a.id}>
                  <div className="addon-title">{tr(a.title)}</div>
                  {a.desc && <div className="addon-desc">{tr(a.desc)}</div>}
                </article>
              ))}
            </div>
          </section>

          {/* Отзывы гостей */}
          {REVIEWS.length > 0 && (
            <section className="section section-flush">
              <div className="sec-inset">{sectionHead(t('reviewsTitle'), t('reviewsSubtitle'))}</div>
              <div className="reviews-scroll">
                {REVIEWS.map((rev) => (
                  <article className="review-card" key={rev.name}>
                    <div className="review-top">
                      <span className="review-stars">★★★★★</span>
                      <span className="review-quote">”</span>
                    </div>
                    <p className="review-text">{tr(rev.text)}</p>
                    <div className="review-author">
                      <span className="review-avatar">{rev.initial}</span>
                      <div>
                        <div className="review-name">{rev.name}</div>
                        <div className="review-country">{tr(rev.country)}</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Финальный CTA */}
          <section className="cta-sec">
            <div className="cta-card">
              <AnchorIcon size={30} color="#fff" />
              <h2>{t('ctaTitle')}</h2>
              <p>{t('ctaText')}</p>
              <button className="cta-btn" onClick={openTelegram}>{t('ctaBtn')}</button>
            </div>
          </section>
        </>
      )}

      {tab === 'gallery' && (
        <section className="section">
          {sectionHead(t('galleryTitle'), t('gallerySubtitle'))}
          <div className="gallery-grid">
            {GALLERY.map((ph) => (
              <figure className="gallery-item" key={ph.src}>
                <img src={ph.src} alt={tr(ph.caption)} loading="lazy" />
                <figcaption>{tr(ph.caption)}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {tab === 'faq' && (
        <section className="section">
          {sectionHead(t('faqTitle'))}
          <div className="faq-list">
            {tr(STRINGS.faq).map(([q, a]) => (
              <details className="faq-item" key={q}>
                <summary>{q}<span className="faq-plus">+</span></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {tab === 'contacts' && (
        <section className="section">
          {sectionHead(t('contactsTitle'), t('contactsSubtitle'))}
          <div className="contacts-wrap">
            <button className="btn-cta" onClick={openTelegram}>{t('writeTg')}</button>
            <button className="btn-outline" onClick={openWhatsApp}>{t('writeWa')}</button>
            <a className="btn-outline" href={`tel:${CONTACTS.phoneRaw}`}>
              {t('call')} · {CONTACTS.phone}
            </a>
          </div>
          <p className="contact-handle">Telegram: {CONTACTS.telegramHandle}</p>
          <p className="contact-note">{t('contactNote')}</p>

          <div className="qr-block">
            <div className="qr-title">{t('qrTitle')}</div>
            <div className="qr-frame">
              <QRCodeSVG value={APP_LINK} size={168} bgColor="#ffffff" fgColor={NAVY} level="M" />
            </div>
            <p className="qr-hint">{t('qrHint')}</p>
          </div>
          <button className="btn-outline share-btn" onClick={shareApp}>{t('shareBtn')}</button>
        </section>
      )}

      <nav className="tabbar">
        {TABS.map((item) =>
          item.cta ? (
            <button className="tab-book" key={item.id} onClick={openTelegram}>
              <span className="tab-book-btn"><item.Icon /></span>
              <span className="tab-book-label">{t(item.label)}</span>
            </button>
          ) : (
            <button
              key={item.id}
              className={'tab' + (tab === item.id ? ' active' : '')}
              aria-current={tab === item.id ? 'page' : undefined}
              onClick={() => setTab(item.id)}
            >
              <span className="tab-icon"><item.Icon /></span>
              <span className="tab-label">{t(item.label)}</span>
            </button>
          )
        )}
      </nav>
    </div>
  );
}
