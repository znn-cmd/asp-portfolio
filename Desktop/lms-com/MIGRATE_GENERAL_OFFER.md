# Миграция базы данных: добавление колонки generalOfferId

## Проблема
Колонка `generalOfferId` была добавлена в схему Prisma, но еще не существует в базе данных на Vercel.

## Решение

### Вариант 1: Через Vercel CLI (рекомендуется)

1. Убедитесь, что у вас есть доступ к базе данных Vercel:
   ```bash
   vercel env pull .env.local
   ```

2. Примените изменения схемы:
   ```bash
   npx prisma db push
   ```

3. Или создайте миграцию:
   ```bash
   npx prisma migrate dev --name add_general_offer_id
   npx prisma migrate deploy
   ```

### Вариант 2: Через Prisma Studio (если есть прямой доступ к БД)

1. Подключитесь к базе данных
2. Выполните SQL:
   ```sql
   ALTER TABLE "Offer" ADD COLUMN "generalOfferId" TEXT;
   ALTER TABLE "Offer" ADD CONSTRAINT "Offer_generalOfferId_fkey" 
     FOREIGN KEY ("generalOfferId") REFERENCES "Offer"("id") 
     ON DELETE SET NULL ON UPDATE CASCADE;
   ```

### Вариант 3: Через Vercel Dashboard

1. Откройте проект в Vercel Dashboard
2. Перейдите в Settings → Environment Variables
3. Скопируйте `DATABASE_URL`
4. Используйте его локально для миграции:
   ```bash
   DATABASE_URL="your_vercel_database_url" npx prisma db push
   ```

## После миграции

После применения миграции страница offers будет полностью функциональна с поддержкой General Offers.

## Проверка

После миграции проверьте:
1. Страница `/hr/offers` открывается без ошибок
2. Колонка "General Offer" отображается в канбане
3. Personal Offers, созданные из General Offers, показывают пометку "From General Offer"

