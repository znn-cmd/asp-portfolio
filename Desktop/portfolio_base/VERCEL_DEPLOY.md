# Инструкция по деплою на Vercel

## Шаг 1: Подготовка репозитория GitHub

1. Убедитесь, что репозиторий https://github.com/znn-cmd/asp-portfolio.git создан и пуст

2. Настройте remote (если еще не настроен):
   ```bash
   git remote remove origin  # если старый remote не нужен
   git remote add origin https://github.com/znn-cmd/asp-portfolio.git
   ```

3. Добавьте все файлы и сделайте первый коммит:
   ```bash
   git add .
   git commit -m "Initial commit: Dubai Real Estate CRM"
   git branch -M main
   git push -u origin main
   ```

## Шаг 2: Деплой на Vercel

### Вариант 1: Через веб-интерфейс Vercel

1. Зайдите на https://vercel.com
2. Нажмите "Add New Project"
3. Импортируйте репозиторий `znn-cmd/asp-portfolio`
4. Vercel автоматически определит Next.js проект

### Вариант 2: Через Vercel CLI

1. Установите Vercel CLI (если еще не установлен):
   ```bash
   npm i -g vercel
   ```

2. Войдите в Vercel:
   ```bash
   vercel login
   ```

3. Задеплойте проект:
   ```bash
   vercel
   ```

4. Для production деплоя:
   ```bash
   vercel --prod
   ```

## Шаг 3: Настройка Environment Variables на Vercel

После деплоя вам нужно добавить переменные окружения в настройках проекта на Vercel:

1. Откройте проект в Vercel Dashboard
2. Перейдите в Settings → Environment Variables
3. Добавьте следующие переменные:

   ```
   GOOGLE_SHEETS_ID=your_spreadsheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

   **ВАЖНО:** 
   - При добавлении `GOOGLE_PRIVATE_KEY` в Vercel, вставьте весь ключ с переносами строк
   - Vercel автоматически обработает `\n` как новые строки

4. После добавления переменных, сделайте новый деплой:
   - Либо через "Redeploy" в Vercel Dashboard
   - Либо через CLI: `vercel --prod`

## Шаг 4: Проверка деплоя

После деплоя:
1. Откройте URL вашего приложения (например: `https://asp-portfolio.vercel.app`)
2. Проверьте, что приложение загружается
3. Проверьте, что данные загружаются из Google Sheets

## Структура проекта

Проект уже настроен для Next.js и готов к деплою:
- ✅ `package.json` с правильными скриптами
- ✅ `.gitignore` исключает `.env.local`
- ✅ Next.js 14+ с App Router
- ✅ TypeScript настроен
- ✅ Все зависимости указаны

## Полезные команды

```bash
# Проверить статус git
git status

# Добавить все файлы
git add .

# Сделать коммит
git commit -m "Your commit message"

# Отправить на GitHub
git push origin main

# Проверить remote
git remote -v

# Изменить remote
git remote set-url origin https://github.com/znn-cmd/asp-portfolio.git
```

## Troubleshooting

Если возникают проблемы:

1. **Build ошибки**: Проверьте логи в Vercel Dashboard → Deployments
2. **Environment Variables не работают**: Убедитесь, что переменные добавлены для всех окружений (Production, Preview, Development)
3. **Google Sheets ошибки**: Проверьте, что Service Account имеет доступ к Google Sheets и переменные окружения правильно скопированы

