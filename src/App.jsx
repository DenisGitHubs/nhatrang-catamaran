import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CONTACTS, PRICING, ROUTES, GALLERY, HERO_PHOTO, APP_LINK } from './data.js';
import { STRINGS, detectLang } from './i18n.js';
import { ROUTE_COVERS, BayMap, HomeIcon, PhotoIcon, FaqIcon, PhoneIcon, SailIcon } from './icons.jsx';

const tg = window.Telegram?.WebApp;

// Фирменный тёмно-синий — тот же, что --deep в index.css
const DEEP = '#0b2d4f';

// Мобильный или десктоп: по платформе Telegram, с запасным вариантом по UA.
// Значение неизменно в течение сессии, поэтому считаем один раз.
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
  const other = lang === 'ru' ? 'en' : 'ru';
  // Локализация: tr достаёт нужный язык из объекта {ru, en}, t — то же для строк STRINGS.
  // Оба с запасным вариантом, чтобы отсутствующий ключ/язык не ронял всё приложение в белый экран.
  const tr = (obj) => obj?.[lang] ?? obj?.en ?? '';
  const t = (key) => tr(STRINGS[key]) || key;

  useEffect(() => {
    if (!tg) return;
    tg.ready();
    tg.expand();
    tg.setHeaderColor?.(DEEP);
  }, []);

  // Держим <html lang> в соответствии с языком — для скринридеров и авто-переводчиков
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // При открытии раздела прокручиваем к самому верху
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  const openTelegram = () => {
    if (tg?.openTelegramLink) tg.openTelegramLink(CONTACTS.telegram);
    else window.open(CONTACTS.telegram, '_blank');
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

  // Заголовок в шапке: на главной — общий, на остальных — название страницы
  const heroTitleKey = { home: 'heroTitle', faq: 'faqTitle', contacts: 'contactsTitle' }[tab];
  const heroTitle = heroTitleKey && t(heroTitleKey);

  return (
    <div className="app">
      {tab !== 'gallery' && (
        <header
          className={'hero' + (tab === 'home' ? '' : ' hero-compact')}
          style={{ backgroundImage: `url(${HERO_PHOTO})` }}
        >
          <div className="hero-shade" />
          <div className="hero-top">{langSwitch}</div>
          <div className="hero-text">
            <h1>{heroTitle}</h1>
            {tab === 'home' && <p>{t('heroSubtitle')}</p>}
          </div>
        </header>
      )}

      {tab === 'home' && (
        <>
          <div className="price-card">
            <div className="price-value">{tr(PRICING.priceLabel)}</div>
            <div className="price-note">{t('perBoat')}</div>
            <div className="chips">
              <span className="chip">⏱ {t('hours')}</span>
              <span className="chip">👥 {t('guests')}</span>
              <span className="chip">🔒 {t('private')}</span>
            </div>
          </div>

          <section className="section">
            <h2>{t('routesTitle')}</h2>
            <p className="sub">{t('routesSubtitle')}</p>
            <div className="routes-grid">
              {ROUTES.map((r) => {
                const Cover = ROUTE_COVERS[r.id];
                return (
                  <article className="route-card" key={r.id}>
                    <div className="route-cover">{Cover ? <Cover /> : null}</div>
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
                );
              })}
            </div>
          </section>

          <section className="section">
            <h2>{t('tripFlowTitle')}</h2>
            <div className="map-frame"><BayMap /></div>
            <ol className="timeline">
              {tr(STRINGS.tripFlow).map(([title, text], i) => (
                <li className="timeline-item" key={title}>
                  <span className="timeline-dot">{i + 1}</span>
                  <div className="timeline-body">
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="section">
            <h2>{t('helmTitle')}</h2>
            <div className="helm-card">
              <p>{t('helmText')}</p>
              <ul className="helm-list">
                {tr(STRINGS.helmList).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="helm-note">{t('helmNote')}</div>
            </div>
          </section>

          <section className="section">
            <h2>{t('included')}</h2>
            <ul className="included-list">
              {tr(STRINGS.includedList).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {tab === 'gallery' && (
        <section className="section page">
          <div className="page-head">
            <h2>{t('galleryTitle')}</h2>
            {langSwitch}
          </div>
          <p className="sub">{t('gallerySubtitle')}</p>
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
        <section className="section page">
          {tr(STRINGS.faq).map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      )}

      {tab === 'contacts' && (
        <section className="section page">
          <p className="sub">{t('contactsSubtitle')}</p>
          <div className="contacts-wrap">
            <button className="contact-big cta-main" onClick={openTelegram}>
              {t('writeTg')}
            </button>
            <a className="contact-big" href={`tel:${CONTACTS.phoneRaw}`}>
              {t('call')} · {CONTACTS.phone}
            </a>
          </div>
          <p className="contact-handle">Telegram: {CONTACTS.telegramHandle}</p>
          <p className="cta-hint">{t('bookHint')}</p>

          <div className="qr-block">
            <div className="qr-title">{t('qrTitle')}</div>
            <div className="qr-frame">
              <QRCodeSVG value={APP_LINK} size={168} bgColor="#ffffff" fgColor="#0b2d4f" level="M" />
            </div>
            <p className="qr-hint">{t('qrHint')}</p>
          </div>
          <button className="contact-big share-btn" onClick={shareApp}>
            {t('shareBtn')}
          </button>
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
