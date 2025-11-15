#!/bin/bash

# Скрипт для быстрого деплоя на oynapp.kz
# Выполните этот скрипт на ВАШЕМ компьютере (не на сервере)

set -e

echo "🚀 Деплой Oyna Website на oynapp.kz"
echo ""

# Цвета
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Параметры подключения
SERVER_HOST="195.210.46.29"
SERVER_USER="oynapp.kz"
SERVER_PATH="/var/www/vhosts/oynapp.kz/httpdocs"

echo -e "${YELLOW}📋 Шаг 1: Подключение к серверу и настройка${NC}"
echo "Подключаемся к $SERVER_USER@$SERVER_HOST..."
echo ""

# Создаем временный скрипт для выполнения на сервере
cat > /tmp/oyna-setup.sh << 'REMOTE_SCRIPT'
#!/bin/bash
set -e

echo "✅ Подключились к серверу"
cd /var/www/vhosts/oynapp.kz/httpdocs

# Проверка и установка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Установите через Plesk панель!"
    exit 1
fi

echo "✅ Node.js: $(node --version)"

# Установка PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 Устанавливаем PM2..."
    npm install -g pm2
fi

echo "✅ PM2 установлен"

# Настройка автозапуска PM2
pm2 startup || true

# Создание структуры директорий
mkdir -p temp backups logs
chmod 755 temp backups logs

echo "✅ Директории созданы"

# Клонирование репозитория (если еще не клонирован)
if [ ! -f "package.json" ]; then
    echo "📥 Клонирование репозитория..."
    read -p "Введите URL репозитория: " REPO_URL
    git clone $REPO_URL .
fi

# Установка зависимостей
if [ -f "package.json" ]; then
    echo "📦 Установка зависимостей..."
    npm install
fi

# Создание .env.production
if [ ! -f ".env.production" ]; then
    echo "📝 Создание .env.production..."
    cat > .env.production << 'EOF'
NEXT_PUBLIC_SITE_URL=https://oynapp.kz
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_INBOX=info@oynapp.kz
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
EOF
    echo "⚠️  Не забудьте заполнить .env.production реальными значениями!"
fi

# Сборка проекта
if [ -f "package.json" ]; then
    echo "🔨 Сборка проекта..."
    npm run build
fi

# Остановка старого процесса
pm2 stop oynapp 2>/dev/null || true
pm2 delete oynapp 2>/dev/null || true

# Запуск приложения
echo "🚀 Запуск приложения..."
pm2 start npm --name "oynapp" -- start
pm2 save

echo ""
echo "✅ Настройка сервера завершена!"
echo ""
echo "📊 Статус приложения:"
pm2 status

echo ""
echo "🌐 Приложение должно быть доступно на:"
echo "   http://oynapp.kz:3000 (после настройки Nginx)"
echo "   https://oynapp.kz (после настройки SSL)"
REMOTE_SCRIPT

# Копируем и выполняем скрипт на сервере
echo "Загружаем скрипт на сервер..."
scp /tmp/oyna-setup.sh $SERVER_USER@$SERVER_HOST:/tmp/oyna-setup.sh

echo ""
echo "Выполняем настройку на сервере..."
ssh $SERVER_USER@$SERVER_HOST 'bash /tmp/oyna-setup.sh'

echo ""
echo -e "${GREEN}✅ Шаг 3 выполнен: Сервер настроен!${NC}"
echo ""

# Шаг 4: Инструкции по SSL
echo -e "${YELLOW}📋 Шаг 4: Настройка SSL${NC}"
echo ""
echo "Для настройки SSL сертификата:"
echo "1. Откройте в браузере: https://$SERVER_HOST:8443"
echo "2. Войдите с логином: $SERVER_USER"
echo "3. Перейдите: Websites & Domains → oynapp.kz"
echo "4. Нажмите: SSL/TLS Certificates"
echo "5. Нажмите: Install у 'Let's Encrypt'"
echo "6. Выберите: oynapp.kz и www.oynapp.kz"
echo "7. Нажмите: Get it free"
echo ""
echo "⏳ Подождите 1-2 минуты пока сертификат установится"
echo ""
read -p "Нажмите Enter после установки SSL сертификата..."

echo ""
echo -e "${GREEN}✅ Шаг 4 выполнен: SSL настроен!${NC}"
echo ""

# Шаг 5: Проверка
echo -e "${YELLOW}📋 Шаг 5: Проверка работы${NC}"
echo ""
echo "Проверяем доступность сайта..."

# Проверка HTTP
if curl -s -o /dev/null -w "%{http_code}" http://oynapp.kz | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ HTTP работает${NC}"
else
    echo -e "${YELLOW}⚠️  HTTP пока не доступен (возможно DNS еще не распространился)${NC}"
fi

# Проверка HTTPS
if curl -s -o /dev/null -w "%{http_code}" https://oynapp.kz 2>/dev/null | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ HTTPS работает${NC}"
else
    echo -e "${YELLOW}⚠️  HTTPS пока не доступен (возможно нужно подождать DNS)${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Деплой завершен!${NC}"
echo ""
echo "📊 Полезные команды:"
echo "   ssh $SERVER_USER@$SERVER_HOST"
echo "   pm2 status"
echo "   pm2 logs oynapp"
echo "   pm2 restart oynapp"
echo ""
echo "🌐 Сайт должен быть доступен на:"
echo "   https://oynapp.kz"
echo "   https://www.oynapp.kz"
echo ""

