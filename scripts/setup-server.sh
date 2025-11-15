#!/bin/bash

# Скрипт для первоначальной настройки сервера Plesk
# Для домена oynapp.kz

set -e

echo "🚀 Настройка сервера для Oyna Website..."
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Проверка, что скрипт запущен на сервере
if [ ! -d "/var/www/vhosts" ]; then
    echo -e "${RED}❌ Этот скрипт должен быть запущен на сервере Plesk!${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Шаг 1: Проверка Node.js${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js установлен: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js не установлен. Установите через Plesk панель.${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📋 Шаг 2: Проверка npm${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm установлен: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm не установлен.${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📋 Шаг 3: Установка PM2${NC}"
if command -v pm2 &> /dev/null; then
    echo -e "${GREEN}✅ PM2 уже установлен${NC}"
else
    echo "Устанавливаем PM2..."
    npm install -g pm2
    echo -e "${GREEN}✅ PM2 установлен${NC}"
fi

echo ""
echo -e "${YELLOW}📋 Шаг 4: Настройка автозапуска PM2${NC}"
pm2 startup || true
echo -e "${GREEN}✅ Автозапуск PM2 настроен${NC}"

echo ""
echo -e "${YELLOW}📋 Шаг 5: Создание структуры директорий${NC}"
cd /var/www/vhosts/oynapp.kz/httpdocs

# Создаем необходимые директории
mkdir -p temp
mkdir -p backups
mkdir -p logs

# Устанавливаем права
chmod 755 temp backups logs

echo -e "${GREEN}✅ Директории созданы${NC}"

echo ""
echo -e "${YELLOW}📋 Шаг 6: Клонирование репозитория (опционально)${NC}"
read -p "Клонировать репозиторий сейчас? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Введите URL репозитория: " REPO_URL
    
    if [ -z "$(ls -A .)" ]; then
        git clone $REPO_URL .
        echo -e "${GREEN}✅ Репозиторий клонирован${NC}"
    else
        echo -e "${YELLOW}⚠️  Директория не пустая. Пропускаем клонирование.${NC}"
    fi
fi

echo ""
echo -e "${YELLOW}📋 Шаг 7: Установка зависимостей (если package.json существует)${NC}"
if [ -f "package.json" ]; then
    read -p "Установить зависимости? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install
        echo -e "${GREEN}✅ Зависимости установлены${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  package.json не найден. Пропускаем установку зависимостей.${NC}"
fi

echo ""
echo -e "${YELLOW}📋 Шаг 8: Создание .env.production${NC}"
read -p "Создать файл .env.production? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cat > .env.production << 'EOF'
# Production Environment Variables
NEXT_PUBLIC_SITE_URL=https://oynapp.kz

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_INBOX=info@oynapp.kz

# Telegram Configuration
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
EOF
    echo -e "${GREEN}✅ Файл .env.production создан${NC}"
    echo -e "${YELLOW}⚠️  Не забудьте заполнить реальные значения!${NC}"
fi

echo ""
echo -e "${YELLOW}📋 Шаг 9: Сборка проекта (если нужно)${NC}"
if [ -f "package.json" ]; then
    read -p "Собрать проект сейчас? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm run build
        echo -e "${GREEN}✅ Проект собран${NC}"
    fi
fi

echo ""
echo -e "${YELLOW}📋 Шаг 10: Запуск приложения через PM2${NC}"
if [ -f "package.json" ]; then
    read -p "Запустить приложение? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Останавливаем если уже запущено
        pm2 stop oynapp 2>/dev/null || true
        pm2 delete oynapp 2>/dev/null || true
        
        # Запускаем
        pm2 start npm --name "oynapp" -- start
        pm2 save
        
        echo -e "${GREEN}✅ Приложение запущено${NC}"
        echo ""
        echo "Статус приложения:"
        pm2 status
    fi
fi

echo ""
echo -e "${GREEN}🎉 Настройка сервера завершена!${NC}"
echo ""
echo "📝 Следующие шаги:"
echo "1. Проверьте содержимое .env.production и заполните реальные значения"
echo "2. Настройте DNS записи для oynapp.kz"
echo "3. Установите SSL сертификат через Plesk"
echo "4. Настройте GitHub Secrets для автоматического деплоя"
echo "5. Откройте https://oynapp.kz в браузере"
echo ""
echo "Полезные команды:"
echo "  pm2 status          - статус приложения"
echo "  pm2 logs oynapp     - логи приложения"
echo "  pm2 restart oynapp  - перезапуск приложения"
echo "  pm2 monit           - мониторинг"
echo ""
echo -e "${GREEN}Удачи! 🚀${NC}"

