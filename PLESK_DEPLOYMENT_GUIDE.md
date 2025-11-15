# 🚀 Руководство по деплою на Plesk хостинг (oynapp.kz)

## 📋 Информация о хостинге

- **Домен:** oynapp.kz
- **Сервер:** srv-plesk01.ps.kz
- **IP адрес:** 195.210.46.29
- **Панель управления:** Plesk

---

## 🔧 Шаг 1: Первоначальная настройка сервера

### 1.1 Вход в Plesk

1. Откройте в браузере: `https://srv-plesk01.ps.kz:8443` или `https://195.210.46.29:8443`
2. Логин: `oynapp.kz`
3. Пароль: (используйте предоставленный пароль)

### 1.2 Создание/проверка домена

1. В Plesk перейдите в **Websites & Domains**
2. Убедитесь, что домен `oynapp.kz` добавлен
3. Если нет - нажмите **Add Domain** и добавьте `oynapp.kz`

### 1.3 Установка Node.js

1. В Plesk перейдите в **Websites & Domains** → выберите `oynapp.kz`
2. Найдите **Node.js** в разделе "Developer Tools"
3. Установите Node.js версии **20.x LTS**
4. Включите Node.js для домена

### 1.4 Установка PM2 (Process Manager)

Подключитесь к серверу через SSH и выполните:

```bash
# Подключение к серверу
ssh oynapp.kz@195.210.46.29

# Установка PM2 глобально
npm install -g pm2

# Настройка автозапуска PM2
pm2 startup
pm2 save
```

---

## 🔐 Шаг 2: Настройка GitHub Secrets

Добавьте следующие секреты в **GitHub Repository → Settings → Secrets → Actions**:

### Обязательные секреты для Plesk:

| Название | Значение |
|----------|----------|
| `PLESK_HOST` | `195.210.46.29` |
| `PLESK_USERNAME` | `oynapp.kz` |
| `PLESK_PASSWORD` | (ваш пароль от хостинга) |

### Секреты для приложения:

| Название | Значение | Описание |
|----------|----------|----------|
| `SMTP_HOST` | `smtp.gmail.com` | SMTP сервер |
| `SMTP_PORT` | `587` | SMTP порт |
| `SMTP_USER` | `your@email.com` | Email для отправки |
| `SMTP_PASSWORD` | `app-password` | Пароль приложения |
| `CONTACT_INBOX` | `info@oynapp.kz` | Email для получения заявок |
| `TELEGRAM_BOT_TOKEN` | `your-token` | Токен Telegram бота |
| `TELEGRAM_CHAT_ID` | `your-chat-id` | ID чата Telegram |

---

## 🌐 Шаг 3: Настройка DNS

### 3.1 Записи DNS для oynapp.kz

Добавьте следующие DNS записи в панели управления доменом:

#### Основные записи:

```
Тип: A
Имя: @
Значение: 195.210.46.29
TTL: 3600

Тип: A
Имя: www
Значение: 195.210.46.29
TTL: 3600

Тип: CNAME
Имя: www
Значение: oynapp.kz
TTL: 3600
```

#### Записи для email (если используете):

```
Тип: MX
Имя: @
Значение: mail.oynapp.kz
Приоритет: 10
TTL: 3600

Тип: TXT
Имя: @
Значение: v=spf1 mx ~all
TTL: 3600
```

### 3.2 Проверка DNS

После добавления записей проверьте их:

```bash
# Проверка A-записи
nslookup oynapp.kz

# Проверка с указанием DNS сервера
nslookup oynapp.kz 8.8.8.8

# Проверка через dig (если установлен)
dig oynapp.kz
```

**Важно:** DNS изменения могут занять от 15 минут до 48 часов.

---

## 🔒 Шаг 4: Настройка SSL сертификата

### 4.1 Через Let's Encrypt (бесплатно, рекомендуется)

1. В Plesk перейдите в **Websites & Domains** → `oynapp.kz`
2. Нажмите на **SSL/TLS Certificates**
3. Нажмите **Install** рядом с "Let's Encrypt"
4. Настройте:
   - ✅ Установите для: `oynapp.kz` и `www.oynapp.kz`
   - ✅ Включите "Wildcard" (если нужно)
   - ✅ Включите "Secure domain's mail" (если используете email)
   - ✅ Включите автопродление
5. Нажмите **Get it free**

### 4.2 Принудительное HTTPS

1. В Plesk перейдите в **Websites & Domains** → `oynapp.kz`
2. Нажмите **Hosting Settings**
3. Найдите раздел "Security"
4. Включите:
   - ✅ **Permanent SEO-safe 301 redirect from HTTP to HTTPS**
   - ✅ **HSTS** (HTTP Strict Transport Security)

---

## 📂 Шаг 5: Настройка структуры на сервере

### 5.1 Создание необходимых директорий

Подключитесь к серверу через SSH:

```bash
ssh oynapp.kz@195.210.46.29
cd /var/www/vhosts/oynapp.kz/httpdocs

# Создаем необходимые директории
mkdir -p temp
mkdir -p backups
mkdir -p logs

# Устанавливаем правильные права
chmod 755 temp backups logs
```

### 5.2 Создание конфигурации Nginx (если нужно)

Создайте файл конфигурации для проксирования:

```bash
# Создаем конфигурацию для Nginx
sudo nano /etc/nginx/conf.d/oynapp.kz.conf
```

Содержимое файла:

```nginx
server {
    listen 80;
    server_name oynapp.kz www.oynapp.kz;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name oynapp.kz www.oynapp.kz;

    ssl_certificate /opt/psa/var/certificates/cert-XXXXX.pem;
    ssl_certificate_key /opt/psa/var/certificates/cert-XXXXX.pem;

    root /var/www/vhosts/oynapp.kz/httpdocs;

    # Логи
    access_log /var/www/vhosts/oynapp.kz/httpdocs/logs/access.log;
    error_log /var/www/vhosts/oynapp.kz/httpdocs/logs/error.log;

    # Next.js статика
    location /_next/static {
        alias /var/www/vhosts/oynapp.kz/httpdocs/.next/static;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    # Public статика
    location /images {
        alias /var/www/vhosts/oynapp.kz/httpdocs/public/images;
        expires 30d;
        access_log off;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Перезапустите Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🚀 Шаг 6: Первый деплой

### 6.1 Ручной деплой (для проверки)

1. Подключитесь к серверу:
   ```bash
   ssh oynapp.kz@195.210.46.29
   cd /var/www/vhosts/oynapp.kz/httpdocs
   ```

2. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/your-username/oyna-website.git .
   ```

3. Установите зависимости:
   ```bash
   npm install
   ```

4. Создайте `.env.production`:
   ```bash
   nano .env.production
   ```
   
   Содержимое:
   ```env
   NEXT_PUBLIC_SITE_URL=https://oynapp.kz
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your@email.com
   SMTP_PASSWORD=your-app-password
   CONTACT_INBOX=info@oynapp.kz
   TELEGRAM_BOT_TOKEN=your-bot-token
   TELEGRAM_CHAT_ID=your-chat-id
   ```

5. Соберите проект:
   ```bash
   npm run build
   ```

6. Запустите через PM2:
   ```bash
   pm2 start npm --name "oynapp" -- start
   pm2 save
   pm2 startup
   ```

7. Проверьте статус:
   ```bash
   pm2 status
   pm2 logs oynapp
   ```

### 6.2 Автоматический деплой через GitHub Actions

После настройки GitHub Secrets:

1. Закоммитьте изменения:
   ```bash
   git add .
   git commit -m "feat: setup Plesk deployment"
   git push origin main
   ```

2. Перейдите в **Actions** на GitHub
3. Проверьте, что workflow "Deploy to Plesk" запустился
4. Дождитесь завершения деплоя

---

## 📊 Шаг 7: Мониторинг и обслуживание

### 7.1 Проверка статуса приложения

```bash
# SSH в сервер
ssh oynapp.kz@195.210.46.29

# Статус PM2
pm2 status

# Логи приложения
pm2 logs oynapp

# Логи ошибок
pm2 logs oynapp --err

# Мониторинг в реальном времени
pm2 monit
```

### 7.2 Полезные команды PM2

```bash
# Перезапуск приложения
pm2 restart oynapp

# Остановка приложения
pm2 stop oynapp

# Удаление из PM2
pm2 delete oynapp

# Просмотр информации
pm2 info oynapp

# Очистка логов
pm2 flush
```

### 7.3 Создание бэкапов

```bash
# Создание бэкапа
cd /var/www/vhosts/oynapp.kz/httpdocs
tar -czf backups/backup-$(date +%Y%m%d-%H%M%S).tar.gz .next public package.json

# Просмотр бэкапов
ls -lh backups/

# Восстановление из бэкапа (если нужно)
tar -xzf backups/backup-YYYYMMDD-HHMMSS.tar.gz
```

---

## 🔍 Troubleshooting

### ❌ Сайт не открывается

**Проверки:**

1. DNS настроен правильно:
   ```bash
   nslookup oynapp.kz
   ```

2. Приложение запущено:
   ```bash
   pm2 status
   ```

3. Nginx работает:
   ```bash
   sudo systemctl status nginx
   ```

4. Порт 3000 слушается:
   ```bash
   netstat -tulpn | grep 3000
   ```

### ❌ 502 Bad Gateway

**Решение:**

```bash
# Перезапустите приложение
pm2 restart oynapp

# Проверьте логи
pm2 logs oynapp --err
```

### ❌ SSL сертификат не работает

**Решение:**

1. Проверьте, что DNS указывает на правильный IP
2. Переустановите Let's Encrypt сертификат в Plesk
3. Проверьте права на файлы сертификата

### ❌ Деплой через GitHub Actions падает

**Решение:**

1. Проверьте, что все GitHub Secrets добавлены
2. Проверьте логи в GitHub Actions
3. Попробуйте деплой вручную через SSH

---

## 📚 Дополнительные настройки

### Настройка автоматических бэкапов

Создайте cron job для автоматических бэкапов:

```bash
crontab -e

# Добавьте строку (бэкап каждый день в 2:00 ночи)
0 2 * * * cd /var/www/vhosts/oynapp.kz/httpdocs && tar -czf backups/backup-$(date +\%Y\%m\%d).tar.gz .next public package.json
```

### Настройка логов Nginx

```bash
# Ротация логов
sudo nano /etc/logrotate.d/oynapp

# Добавьте:
/var/www/vhosts/oynapp.kz/httpdocs/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
```

---

## ✅ Чеклист готовности

Перед запуском в production убедитесь:

- [ ] DNS настроен и работает (A-записи для @ и www)
- [ ] SSL сертификат установлен и работает
- [ ] Принудительный редирект на HTTPS включен
- [ ] Node.js 20.x установлен в Plesk
- [ ] PM2 установлен и настроен
- [ ] GitHub Secrets добавлены
- [ ] Первый ручной деплой выполнен успешно
- [ ] Автоматический деплой через GitHub Actions работает
- [ ] Приложение доступно по https://oynapp.kz
- [ ] Формы обратной связи работают
- [ ] Email уведомления работают
- [ ] Telegram уведомления работают
- [ ] Мониторинг через PM2 настроен
- [ ] Автоматические бэкапы настроены

---

## 🎉 Готово!

Теперь ваш сайт:
- ✅ Доступен по адресу **https://oynapp.kz**
- ✅ Автоматически деплоится при push в main
- ✅ Защищен SSL сертификатом
- ✅ Работает с вашим доменом .kz

**Удачного запуска! 🚀**

