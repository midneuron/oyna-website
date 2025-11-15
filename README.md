## Oyna Website

Маркетинговый лендинг для Oyna Development — медиа-платформы в салонах такси. Проект реализован на Next.js (pages router) с TypeScript, Tailwind CSS 4 и мультиязычной поддержкой RU/EN.

### Ключевые возможности
- Геро-блок и 9 тематических секций (платформа, функции, планшеты, аудитории, география, награды, компания, команда, контакты).
- Данные и тексты вынесены в словари `locales/ru.ts` и `locales/en.ts` с типизацией.
- Формы обратной связи на `react-hook-form` + `zod`, отправка через API `/api/contact` в email и Telegram.
- Секция Privacy доступна на маршруте `/privacy`.

### Технологии
- Next.js 16 (pages router, SSG + ISR, API Routes)
- TypeScript, Tailwind CSS 4, Framer Motion
- Axios, React Hook Form, Zod, Nodemailer

### Локальный запуск

#### Если npm не найден в системе

Используйте локальный Node.js, который входит в проект:

```bash
# Активировать окружение через скрипт
source setup-dev.sh

# Или вручную экспортировать PATH
export PATH="/Users/yernar/Oyna-Web-site/.local/node-v20.11.1-darwin-arm64/bin:$PATH"
```

#### Запуск dev-сервера

```bash
npm install
npm run dev
# приложение будет доступно на http://localhost:3000
```

Для продакшен-сборки:
```bash
npm run build
npm start
```

### Переменные окружения
Скопируйте `env.example` → `.env.local` и задайте значения:
- `NEXT_PUBLIC_SITE_URL` — канонический URL сайта (для hreflang).
- SMTP-набор (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_INBOX`) для email-уведомлений.
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — бот и чат для заявок.

### Структура
```
components/      – UI-компоненты и секции
context/         – зарезервировано для будущего контекста
hooks/           – пользовательские хуки
lib/             – утилиты (напр. загрузка словарей)
locales/         – словари RU/EN
pages/           – страницы Next.js (лендинг, privacy, API)
public/images/   – webp-ассеты
store/           – зарезервировано под состояние
styles/          – глобальные стили Tailwind
utils/           – вспомогательные утилиты (анимации и т.п.)
```

### Скрипты npm
- `npm run dev` — запуск dev-сервера
- `npm run build` — продакшен-сборка
- `npm run start` — запуск собранного приложения
- `npm run lint` — проверка ESLint

### Дальнейшие шаги
- Интегрировать отдельный backend (`/backend` + Prisma + PostgreSQL).
- Подготовить GitHub Actions для lint/test/deploy.
- Добавить e2e/интеграционные тесты и GA4/Meta/TikTok пиксели.
