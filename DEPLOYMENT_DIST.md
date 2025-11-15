# Подготовка сборки для деплоя

## 🎯 Цель

Создание папки **`dist`** с полной standalone сборкой Next.js для деплоя на любой хостинг с поддержкой Node.js (Plesk, VPS, Dedicated и т.д.).

---

## 📦 Что такое standalone сборка?

**Standalone** режим Next.js создает минимальную самодостаточную сборку, которая включает:

✅ Скомпилированный серверный код  
✅ Минимальный набор зависимостей (только необходимые для production)  
✅ Оптимизированные static файлы  
✅ Все public ресурсы (изображения, favicon и т.д.)  

**Преимущества:**
- Размер сборки ~50-100 MB (вместо ~500 MB с полным node_modules)
- Быстрый деплой
- Готово к запуску на любом сервере с Node.js 20+

---

## 🚀 Быстрый старт

### 1. Собрать проект для деплоя

```bash
# Настроить окружение и собрать
source setup-dev.sh
npm run build:deploy
```

Эта команда выполнит:
1. `npm run build` - создаст оптимизированную Next.js сборку
2. `./scripts/prepare-deploy.sh` - подготовит папку `dist` для деплоя

### 2. Результат

После выполнения команды появится папка **`dist/`** со следующей структурой:

```
dist/
├── server.js              # Основной Next.js сервер
├── package.json           # Информация о зависимостях
├── node_modules/          # Минимальный набор зависимостей
├── .next/                 # Скомпилированные страницы
│   └── static/           # Static assets
├── public/               # Статические файлы (изображения, favicon)
├── start.sh              # Скрипт запуска сервера
└── DEPLOY_README.md      # Инструкция по деплою
```

**Размер:** ~78 MB

---

## 📤 Деплой на сервер

### Вариант 1: Через SCP/SFTP

```bash
# Архивировать
cd dist
tar -czf oyna-website.tar.gz *

# Загрузить на сервер
scp oyna-website.tar.gz user@your-server:/var/www/oynapp.kz/

# На сервере
ssh user@your-server
cd /var/www/oynapp.kz/
tar -xzf oyna-website.tar.gz
rm oyna-website.tar.gz
```

### Вариант 2: Через Git (рекомендуется)

```bash
# На сервере клонировать репозиторий
git clone https://github.com/your-repo/oyna-website.git
cd oyna-website

# Собрать на сервере
npm install
npm run build:deploy
cd dist
```

### Вариант 3: Через Plesk File Manager

1. Архивировать папку `dist`
2. Загрузить через Plesk File Manager
3. Распаковать через Plesk

---

## 🎛️ Настройка сервера

### 1. Переменные окружения

Создайте файл `.env.production` в папке `dist/`:

```bash
# Основные настройки
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_PUBLIC_SITE_URL=https://oynapp.kz

# Email настройки (для формы обратной связи)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
EMAIL_FROM=noreply@oynapp.kz
EMAIL_TO=info@oynapp.kz

# Telegram (опционально)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

### 2. Запуск приложения

#### Вариант A: Напрямую через Node.js

```bash
cd /var/www/oynapp.kz/dist
chmod +x start.sh
./start.sh
```

#### Вариант B: Через PM2 (рекомендуется)

PM2 - менеджер процессов, который автоматически перезапускает приложение при сбоях.

```bash
# Установить PM2 глобально
npm install -g pm2

# Запустить приложение
cd /var/www/oynapp.kz/dist
pm2 start server.js --name oyna-website

# Сохранить конфигурацию
pm2 save

# Настроить автозапуск при перезагрузке сервера
pm2 startup
# Выполнить команду, которую покажет PM2
```

**Полезные команды PM2:**

```bash
pm2 list                    # Список процессов
pm2 logs oyna-website       # Логи приложения
pm2 restart oyna-website    # Перезапуск
pm2 stop oyna-website       # Остановка
pm2 delete oyna-website     # Удаление из PM2
pm2 monit                   # Мониторинг в реальном времени
```

### 3. Настройка Nginx (проксирование)

Создайте конфигурацию Nginx `/etc/nginx/sites-available/oynapp.kz`:

```nginx
server {
    listen 80;
    server_name oynapp.kz www.oynapp.kz;

    # Редирект на HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name oynapp.kz www.oynapp.kz;

    # SSL сертификаты (через Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/oynapp.kz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/oynapp.kz/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Проксирование на Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Кэширование static файлов
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Кэширование изображений
    location ~* \.(jpg|jpeg|png|gif|ico|webp|avif|svg)$ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, max-age=31536000";
    }
}
```

Активировать конфигурацию:

```bash
ln -s /etc/nginx/sites-available/oynapp.kz /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 4. SSL сертификат (Let's Encrypt)

```bash
# Установить certbot
apt install certbot python3-certbot-nginx

# Получить сертификат
certbot --nginx -d oynapp.kz -d www.oynapp.kz

# Автообновление (уже настроено автоматически)
certbot renew --dry-run
```

---

## 🔄 Обновление сайта

### 1. Подготовить новую сборку локально

```bash
source setup-dev.sh
npm run build:deploy
```

### 2. Загрузить на сервер

```bash
cd dist
tar -czf oyna-website-update.tar.gz *
scp oyna-website-update.tar.gz user@your-server:/var/www/oynapp.kz/
```

### 3. На сервере обновить файлы

```bash
cd /var/www/oynapp.kz
tar -xzf oyna-website-update.tar.gz
rm oyna-website-update.tar.gz

# Перезапустить через PM2
pm2 restart oyna-website
```

---

## 🧪 Проверка работоспособности

### Локальная проверка

```bash
cd dist
PORT=3000 node server.js
```

Открыть в браузере: http://localhost:3000

### Проверка на сервере

```bash
# Проверить, что приложение запущено
curl http://localhost:3000

# Проверить через внешний URL
curl https://oynapp.kz
```

### Проверка логов PM2

```bash
pm2 logs oyna-website --lines 100
```

---

## 📊 Мониторинг и логи

### PM2 монит

```bash
pm2 monit
```

Показывает в реальном времени:
- CPU usage
- Memory usage
- Логи

### Логи приложения

```bash
# Последние 100 строк
pm2 logs oyna-website --lines 100

# Следить за логами в реальном времени
pm2 logs oyna-website --lines 0
```

### Системные логи

```bash
# Nginx логи
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Системные логи
journalctl -u nginx -f
```

---

## 🔧 Решение проблем

### Приложение не запускается

```bash
# Проверить версию Node.js
node --version  # Должна быть 20.x или выше

# Проверить порт
netstat -tulpn | grep 3000

# Проверить логи
pm2 logs oyna-website
```

### 502 Bad Gateway в Nginx

```bash
# Проверить, что Next.js запущен
curl http://localhost:3000

# Если не работает - перезапустить
pm2 restart oyna-website
```

### Изображения не загружаются

Проверить, что папка `public` скопирована в `dist`:

```bash
ls -la dist/public/images/
```

---

## 📝 Структура проекта

```
/var/www/oynapp.kz/
├── dist/                    # Production сборка
│   ├── server.js
│   ├── node_modules/
│   ├── .next/
│   ├── public/
│   └── .env.production
├── logs/                    # Логи (если настроены)
└── backups/                 # Бэкапы (опционально)
```

---

## 🎯 Чеклист перед деплоем

- [ ] Протестирован локально (`npm run dev`)
- [ ] Собран production build (`npm run build:deploy`)
- [ ] Проверена папка `dist` (размер ~78 MB)
- [ ] Подготовлен `.env.production` с правильными значениями
- [ ] SSL сертификат настроен (HTTPS)
- [ ] Nginx конфигурация проверена
- [ ] PM2 настроен для автозапуска
- [ ] Домен указывает на сервер (DNS настроен)

---

## 📚 Дополнительные ресурсы

- [Next.js Standalone Output](https://nextjs.org/docs/advanced-features/output-file-tracing)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/getting-started/)

---

## 🤝 Поддержка

Если возникли проблемы с деплоем, проверьте:
1. Логи PM2: `pm2 logs oyna-website`
2. Логи Nginx: `tail -f /var/log/nginx/error.log`
3. Версию Node.js: `node --version` (должна быть 20+)
4. Доступность порта 3000: `netstat -tulpn | grep 3000`

