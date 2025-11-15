import { SiteDictionary } from "@/types/content";

const ruDictionary: SiteDictionary = {
  meta: {
    title: "Oyna — медиа-платформа в такси",
    description:
      "Oyna — крупнейшая сеть брендированных планшетов в такси. Технологичная платформа для рекламодателей, пассажиров и таксопарков.",
    keywords: [
      "реклама в такси",
      "oyna",
      "медиа-платформа",
      "планшеты в такси",
      "digital out of home",
    ],
    ogImage: "/images/oyna-main-screen.png",
  },
  navigation: {
    logo: "Oyna Development",
    tagline: "Media in motion",
    links: [
      { label: "Платформа", href: "#platform" },
      { label: "Функции", href: "#features" },
      { label: "Аудитории", href: "#audiences" },
      { label: "География", href: "#geography" },
      { label: "Команда", href: "#team" },
      { label: "Контакты", href: "#contacts" },
    ],
    cta: {
      label: "Запустить кампанию",
      href: "#contacts",
    },
  },
  hero: {
    badge: "Технологичный медиаформат в такси",
    title: "Oyna — лидирующая медиа-платформа в салонах такси Казахстана",
    subtitle:
      "Живые экраны на базе брендированных планшетов и аналитики в реальном времени. Мы соединяем бренды, пассажиров и таксопарки в одной экосистеме.",
    description:
      "Установите планшеты Oyna и превратите каждую поездку в персонализированный опыт с точным таргетингом и измеримой эффективностью.",
    primaryCta: {
      label: "Получить медиакит",
      href: "#contacts",
    },
    secondaryCta: {
      label: "Подключить парк",
      href: "#contacts",
    },
    media: {
      src: "/images/Oyna Intro.mp4",
      alt: "Интерфейс планшета Oyna",
    },
    astanaHub: {
      logo: "/images/Astana-hub logo.avif",
      text: "Участники Astana Hub",
    },
    metrics: [
      {
        value: "600+",
        label: "активных авто",
        description: "брендированные машины в парках-партнёрах",
      },
      {
        value: "3",
        label: "города",
        description: "Алматы, Астана, Шымкент",
      },
      {
        value: "98%",
        label: "внимание пассажиров",
        description: "по данным eye-tracking исследований",
      },
      {
        value: "2.1x",
        label: "выше CTR",
        description: "по сравнению с in-app рекламой",
      },
    ],
  },
  about: {
    title: "Oyna — экосистема для рекламодателей и таксопарков",
    description:
      "Мы разработали планшеты, софт и платформу доставки контента, чтобы дать брендам контроль над сообщениями, а таксопаркам — новый доход. Все данные и аналитика доступны в единой панели.",
    highlights: [
      {
        title: "End-to-end технология",
        text: "Собственный софт, MDM, телеметрия и система плейлистов.",
      },
      {
        title: "Гибкие форматы",
        text: "Видео 4K, интерактивы, опросы, QR-to-Action, rich content.",
      },
      {
        title: "Быстрое масштабирование",
        text: "Подключение новых городов за 3 недели благодаря партнёрской сети.",
      },
    ],
  },
  features: {
    title: "Функциональность платформы",
    subtitle:
      "Каждый планшет работает как умное медиаустройство с динамическим контентом и аналитикой.",
    cards: [
      {
        title: "Умный плейлист",
        description:
          "Динамическая выдача креативов в зависимости от города, времени суток и сегмента поездки.",
        bullets: [
          "до 12 сценариев на одну кампанию",
          "автопауза по геолокации",
          "поддержка интерактивов",
        ],
      },
      {
        title: "Аналитика в реальном времени",
        description:
          "Мониторинг показов, статусы устройств и эффективность кампаний в Live-режиме.",
        bullets: [
          "дашборды для брендов",
          "webhook-и и экспорт в BI",
          "алерты по SLA",
        ],
      },
      {
        title: "Контроль качества",
        description:
          "MDM следит за яркостью, зарядом и доступом, а команда поддержки работает 24/7.",
        bullets: [
          "дистанционный перезапуск",
          "автологирование инцидентов",
          "регламентированный сервис",
        ],
      },
    ],
  },
  tablet: {
    title: "Планшеты Oyna",
    subtitle: "Промышленные устройства с защитой, фирменным UI и LTE-связью.",
    cards: [
      {
        title: "Интерфейс для пассажиров",
        description:
          "Персонализированные подборки контента, маршруты, рекомендации мероприятий и сервисные функции.",
        media: { src: "/images/Oyna_interfeys.png", alt: "Пассажирский интерфейс" },
        tags: ["UX-исследования", "off-line кеш", "анимации"],
      },
      {
        title: "Реклама с вовлечением",
        description:
          "Игровые механики, QR-активации, формы обратной связи и купоны в один тап.",
        media: { src: "/images/Addvert-on-tablet.jpeg", alt: "Интерактивная реклама" },
        tags: ["Rich media", "A/B тесты", "Realtime"],
      },
    ],
  },
  audiences: {
    title: "Решения для каждой аудитории",
    subtitle:
      "Создаём ценность для пассажиров, бренд-команд и таксопарков через единые стандарты сервиса.",
    cards: [
      {
        id: "passengers",
        title: "Для пассажиров",
        description:
          "Развлечение в пути, полезные рекомендации и уровень сервиса бизнес-класса.",
        benefits: [
          "Персональные подборки и лайв-виджеты",
          "Интерактивы и оффлайн-контент",
          "Программа лояльности в такси",
        ],
        badge: "NPS 4.9/5",
        media: { src: "/images/In-Taxi.jpeg", alt: "Пассажирский интерфейс" },
      },
      {
        id: "advertisers",
        title: "Для рекламодателей",
        description:
          "Высокий охват аудитории с гарантией контакта и прозрачной аналитикой.",
        benefits: [
          "Video+interactive сценарии",
          "Интеграция с CDP и пикселями",
          "Атрибуция и Brand Lift-исследования",
        ],
        badge: "CTR до 4.8%",
        media: { src: "/images/oyna_advert_on_screen.png", alt: "Медиа-платформа" },
      },
      {
        id: "fleets",
        title: "Для таксопарков",
        description:
          "Дополнительный доход и премиальная дифференциация с минимальными усилиями.",
        benefits: [
          "Фиксированные выплаты за устройство",
          "Обслуживание и техподдержка 24/7",
          "Обучение водителей и контроль качества",
        ],
        badge: "+25% ARPU",
        media: { src: "/images/tablet.jpeg", alt: "Таксопарк Oyna" },
      },
    ],
  },
  geography: {
    title: "География и масштаб",
    description:
      "Рост сети обеспечивают партнёрства с крупнейшими агрегаторами и таксопарками.",
    stats: [
      { value: "600+", label: "планшетов в парке" },
      { value: "3", label: "города" },
      { value: "35 дн.", label: "цикл запуска" },
    ],
    coverage: ["Алматы", "Астана", "Шымкент"],
    map: {
      src: "/images/oyna_screen.png",
      alt: "Карта присутствия Oyna",
    },
  },
  awards: {
    title: "Награды и признание",
    subtitle: "Команда Oyna ежегодно входит в шортлисты Digital и Tech премий.",
    awards: [
      {
        year: "2024",
        title: "Ozimiz IT Awards",
        description: "Лучший AdTech продукт Казахстана.",
      },
      {
        year: "2023",
        title: "TechOrda Showcase",
        description: "Инновационный сервис в сфере Smart Mobility.",
      },
      {
        year: "2023",
        title: "AdAsia Local Stars",
        description: "Кейс с FMCG брендом получил A-ранг.",
      },
    ],
    media: { src: "/images/Addvert-on-tablet.jpeg", alt: "Статуэтки и награды Oyna" },
  },
  company: {
    title: "Oyna Development",
    description:
      "Независимая технологическая компания, которая создаёт инструменты для умного city mobility и медиа в транспорте.",
    milestones: [
      { value: "2023", label: "запуск платформы" },
      { value: "120%", label: "рост выручки YoY" },
      { value: "40+", label: "специалистов в команде" },
    ],
  },
  team: {
    title: "Команда основателей",
    subtitle: "Лидеры AdTech и продуктового развития в регионе.",
    members: [
      {
        name: "Akzol Zhumagulov",
        role: "CEO & Co-founder",
        bio: "Отвечает за стратегию, партнёрства и масштабирование продукта Oyna.",
        image: "/images/Akzhol-Zhumagulov.jpeg",
        expertise: ["Strategy", "BizDev", "Product Vision"],
      },
      {
        name: "Timur Tai",
        role: "COO & Co-founder",
        bio: "Руководит операциями, качеством сервиса и запуском городов.",
        image: "/images/Timur-Tai.jpeg",
        expertise: ["Operations", "Quality", "People"],
      },
      {
        name: "Okubay Temudjin",
        role: "CTO & Co-founder",
        bio: "Создаёт технологическую архитектуру, MDM и аналитику.",
        image: "/images/Okubay Temudjin.png",
        expertise: ["Engineering", "Data", "Security"],
      },
    ],
  },
  contacts: {
    title: "Свяжитесь с Oyna",
    description:
      "Выберите сценарий и получите ответ команды в течение рабочего дня. Интеграция с email и Telegram обеспечивает мгновенную обработку.",
    forms: [
      {
        id: "advertiser",
        title: "Запустить рекламную кампанию",
        description: "Получите медиаплан и подборку кейсов по вашей категории.",
        cta: "Получить предложение",
      },
      {
        id: "partner",
        title: "Стать партнёром",
        description:
          "Предложите совместные проекты, кросс-промо или интеграции контента.",
        cta: "Обсудить идею",
      },
      {
        id: "fleet",
        title: "Подключить таксопарк",
        description:
          "Узнайте условия установки планшетов и программу монетизации.",
        cta: "Подключить парк",
      },
    ],
    successMessage: "Спасибо! Мы свяжемся с вами в течение 24 часов.",
    errorMessage: "Что-то пошло не так. Попробуйте ещё раз или напишите в Telegram.",
    policy: "Отправляя форму, вы соглашаетесь с политикой конфиденциальности Oyna.",
    fields: [
      {
        id: "name",
        label: "Имя и фамилия",
        placeholder: "Алия Абишева",
        type: "text",
      },
      {
        id: "company",
        label: "Компания",
        placeholder: "Brand / Taxi Fleet / Agency",
        type: "text",
      },
      {
        id: "email",
        label: "Email",
        placeholder: "you@company.com",
        type: "email",
      },
      {
        id: "phone",
        label: "Телефон или Telegram",
        placeholder: "+7 777 000 00 00",
        type: "tel",
      },
      {
        id: "message",
        label: "Комментарий",
        placeholder: "Опишите задачу или формат кампании",
        type: "textarea",
      },
    ],
  },
  footer: {
    tagline: "Oyna — медиа в движении. Мы соединяем бренды и пассажиров.",
    rights: "© 2025 Oyna Development. Все права защищены.",
    links: [
      { label: "Политика конфиденциальности", href: "/privacy" },
      { label: "Instagram", href: "https://www.instagram.com/oyna_app/" },
    ],
  },
};

export default ruDictionary;

