# CI/CD Настройка для Oyna Website

## 📋 Обзор

Проект настроен с автоматизацией через **GitHub Actions** для обеспечения качества кода и автоматического деплоя.

## 🔧 Workflows

### 1. Lint Workflow (`lint.yml`)

**Триггеры:**
- Push в ветки `main` и `develop`
- Pull requests в `main` и `develop`

**Что делает:**
- ✅ Проверяет код через ESLint
- ✅ Проверяет форматирование через Prettier
- ✅ Проверяет успешность сборки проекта

**Команды для локального запуска:**
```bash
npm run lint          # Проверка ESLint
npm run lint:fix      # Автофикс ESLint
npm run format:check  # Проверка Prettier
npm run format        # Автоформатирование
```

---

### 2. Test Workflow (`test.yml`)

**Триггеры:**
- Push в ветки `main` и `develop`
- Pull requests в `main` и `develop`

**Что делает:**
- ✅ Запускает все тесты (unit + integration)
- ✅ Генерирует coverage report
- ✅ Отправляет coverage в Codecov (опционально)
- ✅ Комментирует coverage в PR

**Команды для локального запуска:**
```bash
npm run test       # Запуск тестов в watch mode
npm run test:ci    # Запуск тестов в CI mode с coverage
```

---

### 3. Deploy Workflow (`deploy.yml`)

**Триггеры:**
- Push в ветки `main` и `production` (production deploy)
- Pull requests (preview deploy)

**Что делает:**
- ✅ Проверяет код через lint
- ✅ Запускает тесты
- ✅ Собирает проект
- ✅ Деплоит на Vercel (production или preview)

**Команды для локального запуска:**
```bash
npm run build     # Сборка проекта
npm run start     # Запуск production build
```

---

## 🔐 Необходимые GitHub Secrets

Для работы CI/CD необходимо настроить следующие секреты в **GitHub Repository → Settings → Secrets → Actions**:

### Обязательные:

1. **`VERCEL_TOKEN`**
   - Токен для деплоя на Vercel
   - Получить: Vercel Dashboard → Settings → Tokens

2. **`VERCEL_ORG_ID`**
   - ID организации Vercel
   - Найти в `.vercel/project.json` после первого деплоя

3. **`VERCEL_PROJECT_ID`**
   - ID проекта Vercel
   - Найти в `.vercel/project.json` после первого деплоя

### Опциональные:

4. **`CODECOV_TOKEN`** (для coverage reports)
   - Токен Codecov
   - Получить: codecov.io

5. **`NEXT_PUBLIC_SITE_URL`**
   - URL вашего сайта
   - Пример: `https://oyna.dev`

6. **Email & Telegram (для production):**
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `CONTACT_INBOX`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

---

## 📦 Установка зависимостей

После клонирования репозитория установите зависимости:

```bash
npm install
```

Это установит все необходимые пакеты, включая:
- Jest и React Testing Library для тестирования
- Prettier для форматирования кода
- ESLint для проверки кода

---

## 🧪 Тестирование

### Структура тестов

```
__tests__/
├── components/
│   └── common/
│       ├── LanguageSwitcher.test.tsx
│       └── SectionHeading.test.tsx
└── pages/
    └── api/
        └── contact.test.ts
```

### Написание тестов

Примеры тестов:

**Компонент:**
```typescript
import { render, screen } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

**API:**
```typescript
import handler from '@/pages/api/myapi'

describe('/api/myapi', () => {
  it('returns 200 for valid request', async () => {
    // Тест логика
  })
})
```

---

## 🎨 Форматирование кода

Проект использует **Prettier** для единообразного форматирования.

**Конфигурация** (`.prettierrc`):
- Single quotes
- No semicolons
- 2 spaces indent
- 80 characters line width

**Автоформатирование:**
```bash
npm run format
```

**Проверка без изменений:**
```bash
npm run format:check
```

---

## 🚀 Процесс разработки

### 1. Создание новой фичи

```bash
git checkout -b feature/my-feature
# Разработка
npm run lint        # Проверка кода
npm run test        # Запуск тестов
npm run format      # Форматирование
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
```

### 2. Создание Pull Request

- Создайте PR в GitHub
- **Автоматически запустятся:**
  - Lint workflow
  - Test workflow
- Проверьте результаты в GitHub Actions
- Исправьте ошибки, если есть

### 3. Merge в main

- После одобрения и прохождения всех проверок
- Merge PR в `main`
- **Автоматически запустится:**
  - Deploy workflow → Production deploy на Vercel

---

## 📊 Coverage Reports

Coverage reports генерируются при каждом запуске тестов:

```bash
npm run test:ci
# Coverage в ./coverage/lcov-report/index.html
```

Откройте `coverage/lcov-report/index.html` в браузере для просмотра детального отчета.

---

## ⚠️ Troubleshooting

### Ошибка: Tests failed

**Решение:**
1. Запустите тесты локально: `npm run test`
2. Исправьте падающие тесты
3. Закоммитьте изменения

### Ошибка: Lint failed

**Решение:**
1. Запустите: `npm run lint:fix`
2. Запустите: `npm run format`
3. Закоммитьте изменения

### Ошибка: Deploy failed

**Решение:**
1. Проверьте GitHub Secrets (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
2. Проверьте логи в GitHub Actions
3. Убедитесь, что проект собирается локально: `npm run build`

### Ошибка: Build failed

**Решение:**
1. Запустите локально: `npm run build`
2. Исправьте ошибки сборки
3. Закоммитьте изменения

---

## 🔗 Полезные ссылки

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment](https://vercel.com/docs)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

---

## 📝 Чеклист перед деплоем

- [ ] Все тесты проходят: `npm run test:ci`
- [ ] Линтер не выдает ошибок: `npm run lint`
- [ ] Код отформатирован: `npm run format:check`
- [ ] Проект собирается: `npm run build`
- [ ] Настроены GitHub Secrets
- [ ] Проверен деплой на Vercel
- [ ] Проверена работа форм на production
- [ ] Проверена мультиязычность

---

**Готово! 🎉**

CI/CD pipeline настроен и готов к использованию. Все коммиты будут автоматически проверяться, тестироваться и деплоиться.

