# Инструкция по исправлению структуры таблицы Google Sheets

## Проблема

Данные не попадают в правильные колонки, потому что порядок колонок в вашей Google Sheets таблице не соответствует ожидаемому в коде.

## Решение

Вам нужно перестроить таблицу так, чтобы порядок колонок точно соответствовал структуре, описанной ниже.

## Пошаговая инструкция

### Шаг 1: Создайте резервную копию

1. Откройте вашу Google Sheets таблицу
2. Скопируйте все данные в отдельный файл (для безопасности)

### Шаг 2: Убедитесь, что у вас есть все колонки

Скопируйте и вставьте эту строку заголовков в первую строку (A1) вашей таблицы Properties:

```
id	createdAt	updatedAt	listingUser	emirate	offeringType	finishingType	completionStatus	dealType	propertyType	propertySubType	bedrooms	bathrooms	parking	furnishStatus	facing	propertyAgeYears	sizeValue	sizeUnit	titleEn	titleAr	aboutEn	aboutAr	unitNumber	notes	totalPriceAed	downPaymentAed	chequesCount	hidePrice	area	buildingOrProject	locationFreeText	geoLat	geoLng	permitNumber	issuingClientLicenseNumber	contactsJson	amenitiesBasic	amenitiesFeatured	amenitiesNearby	Reference Id	Google Drive link	LeadRat Link
```

**Важно:** Используйте TAB как разделитель между колонками (как показано выше).

### Шаг 3: Проверьте порядок колонок

Убедитесь, что колонки расположены в следующем порядке:

**A (1):** id  
**B (2):** createdAt  
**C (3):** updatedAt  
**D (4):** listingUser  
**E (5):** emirate  
**F (6):** offeringType  
**G (7):** finishingType  
**H (8):** completionStatus  
**I (9):** dealType  
**J (10):** propertyType  
**K (11):** propertySubType  
**L (12):** bedrooms  
**M (13):** bathrooms  
**N (14):** parking  
**O (15):** furnishStatus  
**P (16):** facing  
**Q (17):** propertyAgeYears  
**R (18):** sizeValue  
**S (19):** sizeUnit  
**T (20):** titleEn  
**U (21):** titleAr  
**V (22):** aboutEn  
**W (23):** aboutAr  
**X (24):** unitNumber  
**Y (25):** notes  
**Z (26):** **totalPriceAed** ← ЦЕНА ДОЛЖНА БЫТЬ ЗДЕСЬ!  
**AA (27):** downPaymentAed  
**AB (28):** chequesCount  
**AC (29):** hidePrice  
**AD (30):** area  
**AE (31):** buildingOrProject  
**AF (32):** locationFreeText  
**AG (33):** geoLat  
**AH (34):** geoLng  
**AI (35):** permitNumber  
**AJ (36):** issuingClientLicenseNumber  
**AK (37):** contactsJson  
**AL (38):** amenitiesBasic  
**AM (39):** amenitiesFeatured  
**AN (40):** amenitiesNearby  
**AO (41):** Reference Id  
**AP (42):** Google Drive link  
**AQ (43):** LeadRat Link  

### Шаг 4: Переместите существующие данные

Если у вас уже есть данные в таблице:

1. **Определите, где сейчас находятся ваши данные:**
   - Найдите колонку с ценой (возможно, она сейчас в другой колонке)
   - Найдите колонку с описанием (aboutEn, aboutAr)
   - Найдите колонку с unitNumber

2. **Переместите данные в правильные колонки:**
   - Если цена сейчас не в колонке Z, скопируйте её в колонку Z
   - Если unitNumber не в колонке X, переместите его в колонку X
   - И так далее для всех колонок

### Шаг 5: Проверка

После исправления структуры:

1. Создайте новый объект через форму
2. Проверьте, что цена сохраняется в колонку Z (totalPriceAed)
3. Проверьте, что ссылки сохраняются в колонки AP и AQ

## Важные моменты

- **Цена (totalPriceAed)** должна быть в колонке **Z** (26-я колонка, индекс 25 в коде)
- **Google Drive link** должна быть в колонке **AP** (42-я колонка, индекс 41)
- **LeadRat Link** должна быть в колонке **AQ** (43-я колонка, индекс 42)
- Все колонки должны быть в точном порядке, указанном выше

## Если порядок колонок неправильный

Если колонки в неправильном порядке, самый простой способ:

1. Создайте новую таблицу с правильными заголовками
2. Скопируйте данные из старой таблицы, сопоставляя колонки вручную
3. Или используйте функцию VLOOKUP в Google Sheets для переноса данных

## После исправления

После того, как вы исправите структуру таблицы:
- Цены будут правильно сохраняться в колонку Z
- Ссылки будут правильно сохраняться в колонки AP и AQ
- Все данные будут отображаться корректно в приложении

