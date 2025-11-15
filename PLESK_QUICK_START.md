# ⚡ Быстрый старт: Деплой на oynapp.kz

## 🎯 Краткая инструкция (5-10 минут)

### Шаг 1: Настройка GitHub Secrets

Добавьте в **GitHub → Settings → Secrets → Actions**:

```
PLESK_HOST = 195.210.46.29
PLESK_USERNAME = oynapp.kz
PLESK_PASSWORD = (ваш пароль от хостинга)

SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your@email.com
SMTP_PASSWORD = your-app-password
CONTACT_INBOX = info@oynapp.kz
TELEGRAM_BOT_TOKEN = your-token
TELEGRAM_CHAT_ID = your-chat-id
```

### Шаг 2: Настройка DNS

В панели регистратора домена добавьте:

```
A запись:    @ → 195.210.46.29
A запись:  www → 195.210.46.29
```

### Шаг 3: Первоначальная настройка сервера

Подключитесь к серверу:

```bash
ssh oynapp.kz@195.210.46.29
```

Скачайте и запустите скрипт установки:

```bash
cd /var/www/vhosts/oynapp.kz/httpdocs
wget https://raw.githubusercontent.com/your-repo/oyna-website/main/scripts/setup-server.sh
chmod +x setup-server.sh
./setup-server.sh
```

**Или вручную:**

```bash
# Установка PM2
npm install -g pm2
pm2 startup

# Клонирование проекта
git clone https://github.com/your-username/oyna-website.git .

# Установка и сборка
npm install
npm run build

# Создание .env.production
nano .env.production
# (добавьте переменные окружения)

# Запуск
pm2 start npm --name "oynapp" -- start
pm2 save
```

### Шаг 4: Настройка SSL

В Plesk:
1. Перейдите в **SSL/TLS Certificates**
2. Нажмите **Install** у "Let's Encrypt"
3. Включите для `oynapp.kz` и `www.oynapp.kz`
4. Нажмите **Get it free**

### Шаг 5: Деплой

```bash
git add .
git commit -m "feat: setup Plesk deployment"
git push origin main
```

Готово! Сайт доступен на **https://oynapp.kz** 🎉

---

## 📚 Детальные инструкции

- [PLESK_DEPLOYMENT_GUIDE.md](./PLESK_DEPLOYMENT_GUIDE.md) - полная документация
- [DNS_SETUP.md](./DNS_SETUP.md) - настройка DNS
- [NEXT_STEPS.md](./NEXT_STEPS.md) - что делать дальше

---

## 🔍 Проверка

```bash
# Статус приложения
ssh oynapp.kz@195.210.46.29
pm2 status

# Логи
pm2 logs oynapp

# Перезапуск
pm2 restart oynapp
```

---

## 🆘 Проблемы?

См. раздел **Troubleshooting** в [PLESK_DEPLOYMENT_GUIDE.md](./PLESK_DEPLOYMENT_GUIDE.md)

