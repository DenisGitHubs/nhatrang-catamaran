import { useEffect, useState } from 'react';
import { CONTACTS, PRICING, ROUTES } from './data.js';
import { STRINGS, detectLang } from './i18n.js';

const tg = window.Telegram?.WebApp;

export default function App() {
  const [lang, setLang] = useState(detectLang);
  const t = (key) => STRINGS[key][lang];

  useEffect(() => {
    if (!tg) return;
    tg.ready();
    tg.expand();
    tg.setHeaderColor?.('#023e7d');
  }, []);

  const openTelegram = () => {
    if (tg?.openTelegramLink) tg.openTelegramLink(CONTACTS.telegram);
    else window.open(CONTACTS.telegram, '_blank');
  };

  return (
    <div className="app">
      {/* Hero */}
      <header className="hero">
        <div className="hero-top">
          <button
            className="lang-switch"
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          >
            {lang === 'ru' ? '🇬🇧 EN' : '🇷🇺 RU'}
          </button>
        </div>
        <div className="hero-emoji">⛵</div>
        <h1>{t('heroTitle')}</h1>
        <p>{t('heroSubtitle')}</p>
        <svg className="hero-waves" viewBox="0 0 480 40" preserveAspectRatio="none">
          <path
            d="M0 20 Q60 0 120 20 T240 20 T360 20 T480 20 V40 H0 Z"
            fill="#f4f9fc"
          />
        </svg>
      </header>

      {/* Price card */}
      <div className="price-card">
        <div className="price-value">{PRICING.priceLabel[lang]}</div>
        <div className="price-note">{t('perBoat')}</div>
        <div className="chips">
          <span className="chip">⏱ {t('hours')}</span>
          <span className="chip">👥 {t('guests')}</span>
          <span className="chip">🔒 {t('private')}</span>
        </div>
      </div>

      {/* Routes */}
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

      {/* Included */}
      <section className="section">
        <h2>{t('included')}</h2>
        <ul className="included-list">
          {STRINGS.includedList[lang].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="section">
        <h2>{t('faqTitle')}</h2>
        {STRINGS.faq[lang].map(([q, a]) => (
          <details className="faq-item" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* Contacts */}
      <section className="section">
        <h2>{t('contactsTitle')}</h2>
        <div className="contact-row">
          <a className="contact-btn" href={`tel:${CONTACTS.phoneRaw}`}>
            📞 {t('call')}
          </a>
          <a className="contact-btn" href={`mailto:${CONTACTS.email}`}>
            ✉️ {t('write')}
          </a>
        </div>
        <p className="contact-handle">
          Telegram: {CONTACTS.telegramHandle} · {CONTACTS.phone}
        </p>
      </section>

      {/* Sticky CTA */}
      <div className="cta-bar">
        <button className="cta-btn" onClick={openTelegram}>
          {t('bookNow')}
        </button>
        <p className="cta-hint">{t('bookHint')}</p>
      </div>
    </div>
  );
}
