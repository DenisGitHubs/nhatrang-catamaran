import { useEffect, useState } from 'react';
import { CONTACTS, PRICING, ROUTES, GALLERY, HERO_PHOTO } from './data.js';
import { STRINGS, detectLang } from './i18n.js';
import { ROUTE_COVERS, HomeIcon, PhotoIcon, FaqIcon, PhoneIcon, SailIcon } from './icons.jsx';

const tg = window.Telegram?.WebApp;

// Мобильный или десктоп: по платформе Telegram, с запасным вариантом по UA
function detectMobile() {
  const p = tg?.platform;
  if (p) return p === 'android' || p === 'ios';
  return /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
}

const TABS = [
  { id: 'home', Icon: HomeIcon, label: 'tabHome' },
  { id: 'gallery', Icon: PhotoIcon, label: 'tabGallery' },
  { id: 'book', Icon: SailIcon, label: 'bookShort' },
  { id: 'faq', Icon: FaqIcon, label: 'tabFaq' },
  { id: 'contacts', Icon: PhoneIcon, label: 'tabContacts' },
];

export default function App() {
  const [lang, setLang] = useState(detectLang);
  const [tab, setTab] = useState('home');
  const isMobile = detectMobile();
  const t = (key) => STRINGS[key][lang];

  useEffect(() => {
    if (!tg) return;
    tg.ready();
    tg.expand();
    tg.setHeaderColor?.('#101c2c');
  }, []);

  const openTelegram = () => {
    if (tg?.openTelegramLink) tg.openTelegramLink(CONTACTS.telegram);
    else window.open(CONTACTS.telegram, '_blank');
  };

  const langSwitch = (
    <button
      className="lang-switch"
      onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
    >
      {isMobile
        ? (lang === 'ru' ? '🇬🇧 EN' : '🇷🇺 RU')
        : (lang === 'ru' ? 'EN' : 'RU')}
    </button>
  );

  // Заголовок в шапке: на главной — общий, на остальных — название страницы
  const heroTitle = {
    home: t('heroTitle'),
    faq: t('faqTitle'),
    contacts: t('contactsTitle'),
  }[tab];

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
            <div className="price-value">{PRICING.priceLabel[lang]}</div>
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
                      <h3>{r.title[lang]}</h3>
                      <p>{r.desc[lang]}</p>
                      <div className="route-tags">
                        {r.tags[lang].map((tag) => (
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
            <h2>{t('included')}</h2>
            <ul className="included-list">
              {STRINGS.includedList[lang].map((item) => (
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
                <img src={ph.src} alt={ph.caption[lang]} loading="lazy" />
                <figcaption>{ph.caption[lang]}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {tab === 'faq' && (
        <section className="section page">
          {STRINGS.faq[lang].map(([q, a]) => (
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
            <button className="contact-big cta-red" onClick={openTelegram}>
              {t('writeTg')}
            </button>
            <a className="contact-big" href={`tel:${CONTACTS.phoneRaw}`}>
              {t('call')} · {CONTACTS.phone}
            </a>
          </div>
          <p className="contact-handle">Telegram: {CONTACTS.telegramHandle}</p>
          <p className="cta-hint">{t('bookHint')}</p>
        </section>
      )}

      <nav className="tabbar">
        {TABS.map((item) =>
          item.id === 'book' ? (
            <button className="tab-book" key="book" onClick={openTelegram}>
              <span className="tab-book-btn"><SailIcon /></span>
              <span className="tab-book-label">{t('bookShort')}</span>
            </button>
          ) : (
            <button
              key={item.id}
              className={'tab' + (tab === item.id ? ' active' : '')}
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
