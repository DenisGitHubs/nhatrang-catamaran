import { useEffect, useRef, useState } from 'react';
import { submitReview } from './lib/reviews.js';

// Экземпляр Telegram WebApp: все вызовы — через ?. с фолбэком (вне Telegram / старый клиент ничего не роняет).
const tg = window.Telegram?.WebApp;

// Модалка «Оставить отзыв»: боттом-шит на мобиле, карточка по центру на десктопе.
// Работает в обеих темах (CSS-переменные), двуязычна (t), доступна (dialog/aria-modal, Esc, фокус, скролл-лок).
export default function ReviewModal({ lang, t, onClose }) {
  const [rating, setRating] = useState(0);
  // Префилл имени из Telegram
  const [name, setName] = useState(() => tg?.initDataUnsafe?.user?.first_name || '');
  const [country, setCountry] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('form'); // form | sending | success
  const [formError, setFormError] = useState(null);

  const sheetRef = useRef(null);
  const firstStarRef = useRef(null);
  // Держим актуальный onClose в ref — тяжёлый эффект открытия запускаем один раз.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  // Актуальный статус в ref — Esc/BackButton читают его свежим, а не из устаревшего замыкания.
  const statusRef = useRef(status);
  statusRef.current = status;

  // Безопасные размеры от Telegram: стабильная высота (не дёргается при клавиатуре) и нижний safe-area.
  const vsh = tg?.viewportStableHeight;
  const safeBottom = tg?.contentSafeAreaInset?.bottom || 0;
  const overlayStyle = {
    '--vsh': vsh ? `${vsh}px` : undefined,
    '--safe-bottom': `${safeBottom}px`,
  };

  // Открытие: развернуть, отключить свайп-закрытие, BackButton, скролл-лок фона, фокус, Esc/Tab. Один раз.
  useEffect(() => {
    // Во время отправки закрывать нельзя — иначе запрос резолвится «в тишину» после размонтирования.
    const close = () => { if (statusRef.current === 'sending') return; onCloseRef.current(); };

    tg?.expand?.();
    tg?.disableVerticalSwipes?.();              // свайп внутри textarea не должен сворачивать мини-апп
    tg?.BackButton?.show?.();
    tg?.BackButton?.onClick?.(close);           // системная «назад» закрывает модалку, а не мини-апп

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';    // скролл-лок фона, пока модалка открыта

    const onKeyDown = (e) => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab' && sheetRef.current) {
        // Простая фокус-ловушка внутри модалки
        const items = sheetRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // Фокус в первое поле (оценка)
    const focusTimer = setTimeout(() => firstStarRef.current?.focus(), 0);

    // Тема Telegram сменилась — у нас своя система тем (data-theme), просто не конфликтуем.
    const onThemeChanged = () => { /* no-op: тему держит data-theme */ };
    tg?.onEvent?.('themeChanged', onThemeChanged);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      tg?.enableVerticalSwipes?.();
      tg?.BackButton?.offClick?.(close);
      tg?.BackButton?.hide?.();
      tg?.disableClosingConfirmation?.();
      tg?.offEvent?.('themeChanged', onThemeChanged);
    };
  }, []);

  // Пока в форме есть несохранённый текст — подтверждать случайное закрытие мини-аппа.
  useEffect(() => {
    if (status === 'form' && text.trim().length > 0) tg?.enableClosingConfirmation?.();
    else tg?.disableClosingConfirmation?.();
  }, [text, status]);

  const clearErr = (key) => setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  const pickRating = (n) => { setRating(n); clearErr('rating'); };
  const onStarKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); pickRating(Math.min(5, rating + 1)); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); pickRating(Math.max(1, rating - 1)); }
  };

  // Клик по затемнённому фону (не по карточке) закрывает модалку. Во время отправки — игнор.
  const onOverlayClick = (e) => {
    if (status === 'sending') return;
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    const name2 = name.trim();
    const text2 = text.trim();

    // Клиентская валидация — лимиты синхронны с БД (rating 1..5, name 1..40, country ≤40, text 10..500)
    const errs = {};
    if (!rating) errs.rating = t('reviewErrorRatingEmpty');
    if (!name2) errs.name = t('reviewErrorNameEmpty');
    if (!text2) errs.text = t('reviewErrorTextEmpty');
    else if (text2.length < 10) errs.text = t('reviewErrorTextShort');
    else if (text2.length > 500) errs.text = t('reviewErrorTextLong');
    setErrors(errs);
    setFormError(null);
    if (Object.values(errs).some(Boolean)) return;

    setStatus('sending');
    const res = await submitReview({
      rating,
      name: name2.slice(0, 40),
      country: country.trim().slice(0, 40),
      body: text2,
      lang,
    });

    if (res.ok) {
      tg?.disableClosingConfirmation?.();
      tg?.hideKeyboard?.();
      setStatus('success');
      return;
    }

    // Ошибка: возвращаемся в форму и показываем сообщение
    setStatus('form');
    if (res.error === 'already') setFormError(t('reviewErrorAlready'));
    else if (res.error === 'bad_init' || res.error === 'no_init') setFormError(t('reviewErrorAuth'));
    else if (res.error === 'text_short') setErrors({ text: t('reviewErrorTextShort') });
    else if (res.error === 'rating') setErrors({ rating: t('reviewErrorRatingEmpty') });
    else setFormError(t('reviewErrorNetwork'));
  };

  const count = text.length;

  return (
    <div className="review-overlay" style={overlayStyle} onClick={onOverlayClick}>
      <div className="review-sheet" ref={sheetRef} role="dialog" aria-modal="true" aria-labelledby="review-title">
        <div className="review-sheet-grab" aria-hidden="true" />

        {status === 'success' ? (
          <div className="review-success">
            <div className="review-success-icon" aria-hidden="true">⚓</div>
            <h3>{t('reviewSuccessTitle')}</h3>
            <p>{t('reviewSuccessText')}</p>
            <button type="button" className="btn-cta" onClick={onClose}>{t('reviewCloseBtn')}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="review-sheet-head">
              <h2 id="review-title">{t('reviewModalTitle')}</h2>
              <p>{t('reviewModalSubtitle')}</p>
            </div>

            {/* Оценка — интерактивные звёзды */}
            <div className={'review-field' + (errors.rating ? ' has-error' : '')}>
              <label id="review-rating-label">{t('reviewFieldRating')}</label>
              <div className="star-input" role="radiogroup" aria-labelledby="review-rating-label">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    ref={n === 1 ? firstStarRef : undefined}
                    className={'star-btn' + (n <= rating ? ' on' : '')}
                    role="radio"
                    aria-checked={n === rating}
                    aria-label={String(n)}
                    tabIndex={(rating || 1) === n ? 0 : -1}
                    onClick={() => pickRating(n)}
                    onKeyDown={onStarKey}
                  >★</button>
                ))}
              </div>
              {errors.rating && <div className="review-error">{errors.rating}</div>}
            </div>

            {/* Имя */}
            <div className={'review-field' + (errors.name ? ' has-error' : '')}>
              <label htmlFor="review-name">{t('reviewFieldName')}</label>
              <input
                id="review-name"
                className="review-input"
                type="text"
                maxLength={40}
                value={name}
                placeholder={t('reviewFieldNamePh')}
                onChange={(e) => { setName(e.target.value); clearErr('name'); }}
              />
              {errors.name && <div className="review-error">{errors.name}</div>}
            </div>

            {/* Страна — необязательное поле */}
            <div className="review-field">
              <label htmlFor="review-country">{t('reviewFieldCountry')}</label>
              <input
                id="review-country"
                className="review-input"
                type="text"
                maxLength={40}
                value={country}
                placeholder={t('reviewFieldCountryPh')}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            {/* Текст отзыва + живой счётчик */}
            <div className={'review-field' + (errors.text ? ' has-error' : '')}>
              <label htmlFor="review-text">{t('reviewFieldText')}</label>
              <textarea
                id="review-text"
                className="review-textarea"
                maxLength={500}
                value={text}
                placeholder={t('reviewFieldTextPh')}
                onChange={(e) => { setText(e.target.value); clearErr('text'); }}
              />
              <div className={'review-counter' + (count > 450 ? ' warn' : '')}>
                {t('reviewCharCount').replace('{count}', count)}
              </div>
              {errors.text && <div className="review-error">{errors.text}</div>}
            </div>

            {formError && <div className="review-form-error">{formError}</div>}

            <div className="review-actions">
              <button type="button" className="btn-outline" onClick={onClose} disabled={status === 'sending'}>
                {t('reviewCancelBtn')}
              </button>
              <button type="submit" className="btn-cta" disabled={status === 'sending'}>
                {status === 'sending' ? t('reviewSubmitting') : t('reviewSubmitBtn')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
