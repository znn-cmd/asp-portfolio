# Dubai Real Estate CRM

A production-ready Next.js web application for managing Dubai real estate property listings with Google Sheets as the database backend.

## Features

- **Single-page application** with modal-based property form
- **Advanced filtering system** with collapsible sections
- **Comprehensive property management** with all Dubai-specific fields
- **Google Sheets integration** for data storage
- **Responsive design** with mobile-friendly sidebar
- **Real-time search** and filtering

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui components
- react-hook-form + zod validation
- Google Sheets API v4

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Google Sheets Setup

1. Create a new Google Spreadsheet
2. Create the following tabs:
   - **Properties** - Main property data table
   - **DubaiAreas** - List of Dubai areas (single column with header: `Name`)
   - **Employee** - List of employees (single column with header: `Name`)

3. Set up Google Service Account:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google Sheets API
   - Create a Service Account
   - Download the JSON key file
   - Share your Google Spreadsheet with the service account email (give it Editor access)

4. Set up environment variables:

Create a `.env.local` file:

```env
GOOGLE_SHEETS_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Note**: Replace `\n` with actual newlines in the private key, or ensure it's properly escaped.

### 3. Google Sheets Structure

#### Properties Tab

The Properties tab should have the following columns (in order):

1. id
2. createdAt
3. updatedAt
4. listingUser
5. emirate
6. offeringType
7. finishingType
8. completionStatus
9. dealType
10. propertyType
11. propertySubType
12. bedrooms
13. bathrooms
14. parking
15. furnishStatus
16. facing
17. propertyAgeYears
18. sizeValue
19. sizeUnit
20. titleEn
21. titleAr
22. aboutEn
23. aboutAr
24. unitNumber
25. notes
26. totalPriceAed
27. downPaymentAed
28. chequesCount
29. hidePrice
30. area
31. buildingOrProject
32. locationFreeText
33. geoLat
34. geoLng
35. permitNumber
36. issuingClientLicenseNumber
37. contactsJson
38. amenitiesBasic
39. amenitiesFeatured
40. amenitiesNearby

#### DubaiAreas Tab

Simple single column with header `Name` (in cell A1) and area names in rows below (A2 onwards).

#### Employee Tab

Simple single column with header `Name` (in cell A1) and employee names in rows below (A2 onwards).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add the environment variables in Vercel dashboard:
   - `GOOGLE_SHEETS_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
4. Deploy

**Important**: When adding `GOOGLE_PRIVATE_KEY` in Vercel, make sure to include the full key with actual newlines or escape them properly.

## Usage

1. **Add Property**: Click "Add Property" button to open the modal form
2. **Edit Property**: Click "Edit" button on any property row
3. **Filter Properties**: Use the left sidebar filters to search and filter properties
4. **Search**: Use keyword search in the Text Search section
5. **Select User**: Choose a user from the top-right dropdown (this will be stored as `listingUser`)

## Project Structure

```
/app
  /api
    /properties - GET, POST, PUT endpoints
    /areas - GET Dubai areas
    /users - GET users
  page.tsx - Main properties page
  layout.tsx - Root layout
/components
  /property
    PropertyForm.tsx - Property form modal
    FiltersPanel.tsx - Left sidebar filters
    PropertiesTable.tsx - Properties table display
  /ui - shadcn/ui components
/lib
  constants.ts - All enums and constants
  schemas.ts - Zod validation schemas
  googleSheets.ts - Google Sheets client
  utils.ts - Utility functions
```

## License

MIT

