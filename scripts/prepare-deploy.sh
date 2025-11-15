#!/bin/bash
# Скрипт подготовки полной сборки для деплоя на хостинг

set -e

echo "📦 Подготовка сборки для деплоя..."

# Проверить наличие .next/standalone
if [ ! -d ".next/standalone" ]; then
  echo "❌ Папка .next/standalone не найдена."
  echo "   Запустите сначала: npm run build"
  exit 1
fi

# Очистить папку dist, если существует
if [ -d "dist" ]; then
  echo "🧹 Очистка старой папки dist..."
  rm -rf dist
fi

# Создать папку dist
echo "📁 Создание папки dist..."
mkdir -p dist

# Копировать standalone сборку
echo "📋 Копирование standalone сборки..."
cp -r .next/standalone/* dist/

# Копировать .next из standalone (она уже содержит все необходимое)
echo "📋 Копирование скомпилированных файлов..."
if [ -d ".next/standalone/.next" ]; then
  cp -r .next/standalone/.next dist/
fi

# Копировать static файлы поверх
echo "📋 Копирование static файлов..."
mkdir -p dist/.next
cp -r .next/static dist/.next/static

# Копировать public файлы
echo "📋 Копирование public файлов..."
cp -r public dist/public

# Создать start.sh для запуска на сервере
cat > dist/start.sh << 'EOF'
#!/bin/bash
# Скрипт запуска Next.js на сервере

export NODE_ENV=production
export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-0.0.0.0}

node server.js
EOF

chmod +x dist/start.sh

# Создать README для деплоя
cat > dist/DEPLOY_README.md << 'EOF'
# Инструкция по деплою

## Содержимое папки

- `server.js` - основной сервер Next.js
- `node_modules/` - минимальные зависимости для production
- `package.json` - информация о пакетах
- `.next/` - скомпилированные страницы и static файлы
- `public/` - статические ресурсы (изображения, favicon и т.д.)
- `start.sh` - скрипт запуска сервера

## Деплой на сервер

### 1. Загрузить файлы на сервер
```bash
scp -r dist/* user@your-server:/path/to/app/
```

### 2. На сервере установить Node.js 20+
```bash
node --version  # Должна быть версия 20.x или выше
```

### 3. Запустить приложение
```bash
cd /path/to/app
chmod +x start.sh
./start.sh
```

### 4. Или использовать PM2 (рекомендуется)
```bash
npm install -g pm2
pm2 start server.js --name oyna-website
pm2 save
pm2 startup
```

### 5. Настроить Nginx (опционально)
```nginx
server {
    listen 80;
    server_name oynapp.kz www.oynapp.kz;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Переменные окружения

Создайте файл `.env.production` на сервере:
```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_PUBLIC_SITE_URL=https://oynapp.kz

# Email settings
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
EMAIL_FROM=noreply@oynapp.kz
EMAIL_TO=info@oynapp.kz

# Telegram settings (опционально)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

## Проверка работоспособности
```bash
curl http://localhost:3000
```

## Размер сборки
- Общий размер: ~50-100 MB
- Оптимизированная standalone сборка
- Минимальный набор зависимостей
EOF

echo ""
echo "✅ Сборка готова!"
echo ""
echo "📂 Папка dist содержит:"
echo "   - Standalone Next.js сервер"
echo "   - Все необходимые зависимости"
echo "   - Static файлы и изображения"
echo "   - Скрипт запуска (start.sh)"
echo ""
echo "📊 Размер сборки:"
du -sh dist
echo ""
echo "🚀 Готово к деплою на хостинг!"
echo ""
echo "📖 Инструкция по деплою: dist/DEPLOY_README.md"
echo ""

