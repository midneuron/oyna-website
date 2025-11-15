# Changelog

Все важные изменения в проекте документируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
и этот проект следует [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Настроена система CI/CD через GitHub Actions
- Добавлены workflows для lint, test и deploy
- Настроен Jest и React Testing Library для тестирования
- Добавлена конфигурация Prettier для форматирования кода
- Созданы тесты для компонентов (LanguageSwitcher, SectionHeading)
- Созданы тесты для API endpoint (/api/contact)
- Добавлена поддержка coverage reports
- Создана документация по настройке CI/CD (GITHUB_ACTIONS_SETUP.md, CI_CD_SETUP.md)
- Добавлен template для Pull Request
- Добавлен пример переменных окружения для CI (.env.ci.example)

### Changed
- Обновлен package.json с новыми скриптами для тестирования и форматирования
- Обновлен README.md с информацией о CI/CD и тестировании
- Обновлен workflow_checklist.txt - отмечена готовность CI/CD

### Technical Details
- Jest 29.7.0
- React Testing Library 14.1.2
- Prettier 3.1.1
- GitHub Actions workflows для автоматизации
- Автоматический деплой на Vercel
- Coverage reports через Codecov (опционально)

---

## [0.1.0] - 2025-11-15

### Added
- Создан маркетинговый лендинг для Oyna Development
- Реализована мультиязычность (RU/EN)
- Добавлены все основные секции:
  - Hero с видео
  - About Platform
  - Tablet Features
  - Audiences
  - Geography
  - Awards
  - Company
  - Team
  - Contacts
- Формы обратной связи с интеграцией Email + Telegram
- Адаптивный дизайн для всех устройств
- Мобильная навигация с гамбургер-меню
- Анимации через Framer Motion
- SEO-оптимизация (meta tags, og:tags)
- Privacy страница

### Technical Stack
- Next.js 16 (pages router)
- TypeScript
- Tailwind CSS 4
- React Hook Form + Zod
- Axios
- Nodemailer
- Framer Motion

[Unreleased]: https://github.com/your-username/oyna-website/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/your-username/oyna-website/releases/tag/v0.1.0

