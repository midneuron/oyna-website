#!/bin/bash
# Скрипт для быстрой настройки окружения Oyna Website

set -e

PROJECT_DIR="/Users/yernar/Oyna-Web-site"
NODE_BIN="$PROJECT_DIR/.local/node-v20.11.1-darwin-arm64/bin"

echo "🔧 Настройка окружения для Oyna Website..."

# Проверить наличие Node.js
if [ ! -d "$NODE_BIN" ]; then
  echo "❌ Node.js не найден в .local/"
  echo "   Запустите сначала установку через Cursor AI."
  exit 1
fi

# Добавить Node.js в PATH
export PATH="$NODE_BIN:$PATH"

echo "✅ Node.js $(node -v) подключен"
echo "✅ npm $(npm -v) доступен"

# Установить зависимости, если нужно
if [ ! -d "$PROJECT_DIR/node_modules" ]; then
  echo "📦 Устанавливаем npm-зависимости..."
  cd "$PROJECT_DIR"
  npm install
else
  echo "✅ node_modules уже установлены"
fi

echo ""
echo "🚀 Готово! Теперь можно запустить:"
echo ""
echo "   cd /Users/yernar/Oyna-Web-site"
echo "   export PATH=\"$NODE_BIN:\$PATH\""
echo "   npm run dev"
echo ""
echo "Или используйте команду для быстрого старта:"
echo ""
echo "   source setup-dev.sh && npm run dev"
echo ""


