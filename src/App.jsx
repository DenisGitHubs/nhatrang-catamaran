import { useEffect, useState } from 'react';
import { CONTACTS, PRICING, ROUTES, GALLERY, HERO_PHOTO } from './data.js';
import { STRINGS, detectLang } from './i18n.js';

const tg = window.Telegram?.WebApp;

const TABS = [
  { id: 'home', icon: '⛵', label: 'tabHome' },
  { id: 'gallery', icon: '📸', label: 'tabGallery' },
  { id: 'book', icon: '', label: 'bookShort' },
  { id: 'faq', icon: '💬', label: 'tabFaq' },
  { id: 'contacts', icon: '📞', label: 'tabContacts' },
];

export default function App() {
  const [lang, setLang] = useState(detectLang);
  const [tab, setTab] = useState('home');
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

  return (
    <div className="app">
      {tab === 'home' && (
        <>
          {/* Hero: фото катамарана */}
          <header
            className="hero"
            style={{ backgroundImage: `url(${HERO_PHOTO})` }}
          >
            <div className="hero-shade" />
            <div className="hero-top">
              <button
                className="lang-switch"
                onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
              >
                {lang === 'ru' ? '🇬🇧 EN' : '🇷🇺 RU'}
              </button>
            </div>
            <div className="hero-text">
              <h1>{t('heroTitle')}</h1>
              <p>{t('heroSubtitle')}</p>
            </div>
          </header>

          {/* Цена */}
          <div className="price-card">
            <div className="price-value">{PRICING.priceLabel[lang]}</div>
            <div className="price-note">{t('perBoat')}</div>
            <div className="chips">
              <span className="chip">⏱ {t('hours')}</span>
              <span className="chip">👥 {t('guests')}</span>
              <span className="chip">🔒 {t('private')}</span>
            </div>
          </div>

          {/* Маршруты */}
          <section className="section">
            <h2>{t('routesTitle')}</h2>
            <p className="sub">{t('routesSubtitle')}</p>
            {ROUTES.map((r) => (
              <article className="route-card" key={r.id}>
                <div className="route-cover" style={{ background: r.gradient }}>
                  {r.emoji}
                </div>
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
            ))}
          </section>

          {/* Что входит */}
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
          <h2>{t('galleryTitle')}</h2>
          <p className="sub">{t('gallerySubtitle')}</p>
          {GALLERY.map((ph) => (
            <figure className="gallery-item" key={ph.src}>
              <img src={ph.src} alt={ph.caption[lang]} loading="lazy" />
              <figcaption>{ph.caption[lang]}</figcaption>
            </figure>
          ))}
        </section>
      )}

      {tab === 'faq' && (
        <section className="section page">
          <h2>{t('faqTitle')}</h2>
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
          <h2>{t('contactsTitle')}</h2>
          <p className="sub">{t('contactsSubtitle')}</p>
          <button className="contact-big cta-red" onClick={openTelegram}>
            ✈️ {t('writeTg')}
          </button>
          <a className="contact-big" href={`tel:${CONTACTS.phoneRaw}`}>
            📞 {t('call')} · {CONTACTS.phone}
          </a>
          <a className="contact-big" href={`mailto:${CONTACTS.email}`}>
            ✉️ {t('write')}
          </a>
          <p className="contact-handle">
            Telegram: {CONTACTS.telegramHandle}
          </p>
          <p className="cta-hint">{t('bookHint')}</p>
        </section>
      )}

      {/* Футер-навигация */}
      <nav className="tabbar">
        {TABS.map((item) =>
          item.id === 'book' ? (
            <button className="tab-book" key="book" onClick={openTelegram}>
              <span className="tab-book-btn">⛵</span>
              <span className="tab-book-label">{t('bookShort')}</span>
            </button>
          ) : (
            <button
              key={item.id}
              className={'tab' + (tab === item.id ? ' active' : '')}
              onClick={() => setTab(item.id)}
            >
              <span className="tab-icon">{item.icon}</span>
              <span className="tab-label">{t(item.label)}</span>
            </button>
          )
        )}
      </nav>
    </div>
  );
}
