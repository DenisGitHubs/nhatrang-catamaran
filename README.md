# Катамаран в Нячанге — Telegram Mini App

Лендинг-приложение для бронирования прогулок на катамаране. React + Vite + Telegram Web App API, без бэкенда. Интерфейс RU/EN с автоопределением языка из Telegram.

## Данные

Цены, маршруты и контакты — в `src/data.js`. Тексты интерфейса — в `src/i18n.js`.

## Запуск локально

```bash
npm install
npm run dev
```

## Деплой на Vercel

1. Залейте проект на GitHub (или используйте `vercel` CLI).
2. На [vercel.com](https://vercel.com) → **Add New Project** → импортируйте репозиторий.
3. Vercel сам определит Vite: build `npm run build`, output `dist`. Просто нажмите **Deploy**.
4. Получите URL вида `https://your-app.vercel.app`.

## Подключение к Telegram

1. Откройте [@BotFather](https://t.me/BotFather) → `/newbot` → придумайте имя и username бота.
2. `/newapp` → выберите бота → укажите URL с Vercel → получите ссылку вида `t.me/ваш_бот/app`.
3. Дополнительно: `/setmenubutton` — кнопка меню бота будет открывать приложение.

После этого ссылку `t.me/ваш_бот/app` можно давать туристам в чатах и объявлениях.
