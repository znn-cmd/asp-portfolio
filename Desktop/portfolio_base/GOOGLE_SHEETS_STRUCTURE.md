# Правильная структура таблицы Google Sheets для Properties

## ВАЖНО: Порядок колонок должен быть точно таким!

Таблица должна иметь следующие заголовки в строке 1 (начиная с колонки A):

### Колонки A-AO (40 основных колонок):

| Колонка | Название | Описание |
|---------|----------|----------|
| A | id | Уникальный ID объекта |
| B | createdAt | Дата создания (ISO формат) |
| C | updatedAt | Дата обновления (ISO формат) |
| D | listingUser | Пользователь, который создал объявление |
| E | emirate | Эмират (Dubai, Abu Dhabi, Northern Emirates) |
| F | offeringType | Тип предложения (Ready, Off Plan, Secondary) |
| G | finishingType | Тип отделки (Fully-Finished, Semi-Finished, Unfinished) |
| H | completionStatus | Статус завершения (Completed, Off Plan, etc.) |
| I | dealType | Тип сделки (Rent / Lease, Sale) |
| J | propertyType | Тип недвижимости (Residential, Commercial) |
| K | propertySubType | Подтип недвижимости (Apartment, Villa, etc.) |
| L | bedrooms | Количество спален |
| M | bathrooms | Количество ванных |
| N | parking | Количество парковочных мест |
| O | furnishStatus | Статус меблировки |
| P | facing | Ориентация (East, West, North, etc.) |
| Q | propertyAgeYears | Возраст недвижимости в годах |
| R | sizeValue | Размер недвижимости (число) |
| S | sizeUnit | Единица измерения размера (Sq. Feet, Sq. Meter) |
| T | titleEn | Название на английском |
| U | titleAr | Название на арабском |
| V | aboutEn | Описание на английском |
| W | aboutAr | Описание на арабском |
| X | unitNumber | Номер юнита |
| Y | notes | Заметки |
| Z | totalPriceAed | Общая цена в AED |
| AA | downPaymentAed | Первоначальный взнос в AED |
| AB | chequesCount | Количество чеков |
| AC | hidePrice | Скрыть цену (TRUE/FALSE) |
| AD | area | Район (Dubai Area) |
| AE | buildingOrProject | Здание/Проект |
| AF | locationFreeText | Свободный текст местоположения |
| AG | geoLat | Географическая широта |
| AH | geoLng | Географическая долгота |
| AI | permitNumber | Номер разрешения |
| AJ | issuingClientLicenseNumber | Номер лицензии клиента |
| AK | contactsJson | Контакты в формате JSON |
| AL | amenitiesBasic | Базовые удобства (через запятую) |
| AM | amenitiesFeatured | Рекомендуемые удобства (через запятую) |
| AN | amenitiesNearby | Ближайшие удобства (через запятую) |
| AO | Reference Id | Справочный ID (может быть пустым) |

### Дополнительные колонки:

| Колонка | Название | Описание |
|---------|----------|----------|
| AP | Google Drive link | Ссылка на Google Drive |
| AQ | LeadRat Link | Ссылка на LeadRat |

## Итого: 43 колонки (A-AQ)

## Как исправить существующую таблицу:

1. Откройте вашу Google Sheets таблицу
2. Проверьте заголовки в первой строке
3. Убедитесь, что порядок колонок точно соответствует списку выше
4. Если порядок неправильный:
   - Скопируйте данные из неправильных колонок
   - Переместите/переименуйте колонки в правильном порядке
   - Вставьте данные обратно
5. Убедитесь, что колонки AP и AQ существуют для Google Drive link и LeadRat Link

## Пример правильных заголовков:

Скопируйте и вставьте в первую строку (начиная с A1):

```
id | createdAt | updatedAt | listingUser | emirate | offeringType | finishingType | completionStatus | dealType | propertyType | propertySubType | bedrooms | bathrooms | parking | furnishStatus | facing | propertyAgeYears | sizeValue | sizeUnit | titleEn | titleAr | aboutEn | aboutAr | unitNumber | notes | totalPriceAed | downPaymentAed | chequesCount | hidePrice | area | buildingOrProject | locationFreeText | geoLat | geoLng | permitNumber | issuingClientLicenseNumber | contactsJson | amenitiesBasic | amenitiesFeatured | amenitiesNearby | Reference Id | Google Drive link | LeadRat Link
```

## Важные заметки:

- **totalPriceAed** должна быть в колонке Z (26-я колонка, индекс 25)
- **Google Drive link** должна быть в колонке AP (42-я колонка, индекс 41)
- **LeadRat Link** должна быть в колонке AQ (43-я колонка, индекс 42)
- Все колонки должны быть в точном порядке, указанном выше
- Если какая-то колонка отсутствует, добавьте её с правильным названием

