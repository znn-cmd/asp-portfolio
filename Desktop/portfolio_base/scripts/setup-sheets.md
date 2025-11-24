# Google Sheets Setup Guide

This guide will help you set up your Google Sheets for the Dubai Real Estate CRM.

## Step 1: Create the Spreadsheet

1. Create a new Google Spreadsheet
2. Name it something like "Dubai Real Estate CRM"

## Step 2: Create the Properties Tab

1. Click on the first tab (Sheet1) and rename it to "Properties"
2. Add the following headers in row 1 (columns A through AQ - 43 columns total):

```
id | createdAt | updatedAt | listingUser | emirate | offeringType | finishingType | completionStatus | dealType | propertyType | propertySubType | bedrooms | bathrooms | parking | furnishStatus | facing | propertyAgeYears | sizeValue | sizeUnit | titleEn | titleAr | aboutEn | aboutAr | unitNumber | notes | totalPriceAed | downPaymentAed | chequesCount | hidePrice | area | buildingOrProject | locationFreeText | geoLat | geoLng | permitNumber | issuingClientLicenseNumber | contactsJson | amenitiesBasic | amenitiesFeatured | amenitiesNearby | Reference Id | Google Drive link | LeadRat Link
```

**ВАЖНО:** Порядок колонок должен быть точно таким, как указано выше. Подробную структуру смотрите в файле `GOOGLE_SHEETS_STRUCTURE.md`.

## Step 3: Create the DubaiAreas Tab

1. Click the "+" button to add a new tab
2. Rename it to "DubaiAreas"
3. In cell A1, enter: `Name` (exactly as shown)
4. In cells A2 onwards, add Dubai areas one per row, for example:
   - Dubai Marina
   - Downtown Dubai
   - Palm Jumeirah
   - Business Bay
   - JBR
   - Dubai Hills
   - Arabian Ranches
   - etc.

## Step 4: Create the Employee Tab

1. Click the "+" button to add a new tab
2. Rename it to "Employee" (exactly as shown)
3. In cell A1, enter: `Name` (exactly as shown)
4. In cells A2 onwards, add employee names one per row, for example:
   - Admin
   - Broker 1
   - Broker 2

## Step 5: Share with Service Account

1. Copy your service account email (from the Google Cloud Console)
2. Click the "Share" button in Google Sheets
3. Paste the service account email
4. Give it "Editor" access
5. Click "Send"

## Step 6: Copy Spreadsheet ID

1. Look at the URL of your spreadsheet
2. The ID is the long string between `/d/` and `/edit`
3. Example: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
4. The ID is: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`
5. Use this ID in your `.env.local` file as `GOOGLE_SHEETS_ID`

## Notes

- The Properties tab will automatically have data added when you create properties through the app
- You can manually add/edit areas in the DubaiAreas tab
- You can manually add/edit users in the UserAccounts tab
- Make sure all headers match exactly as specified above (case-sensitive)

