import { google } from 'googleapis';
import { v4 as uuidv4 } from 'uuid';

interface SheetsClient {
  readProperties: () => Promise<any[]>;
  appendProperty: (property: any) => Promise<void>;
  updateProperty: (id: string, property: any) => Promise<void>;
  readAreas: () => Promise<string[]>;
  readUsers: () => Promise<Array<{ name: string; email?: string; phone?: string }>>;
}

let sheetsClientInstance: SheetsClient | null = null;

export async function getSheetsClient(): Promise<SheetsClient> {
  if (sheetsClientInstance) {
    return sheetsClientInstance;
  }

  const sheetsId = process.env.GOOGLE_SHEETS_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!sheetsId || !serviceAccountEmail || !privateKey) {
    throw new Error('Missing Google Sheets configuration. Please set GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY environment variables.');
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // Property row to object mapper
  const rowToProperty = (row: any[]): any => {
    return {
      id: row[0] || '',
      createdAt: row[1] || '',
      updatedAt: row[2] || '',
      listingUser: row[3] || '',
      emirate: row[4] || '',
      offeringType: row[5] || '',
      finishingType: row[6] || '',
      completionStatus: row[7] || '',
      dealType: row[8] || '',
      propertyType: row[9] || '',
      propertySubType: row[10] || '',
      bedrooms: row[11] || '',
      bathrooms: row[12] || '',
      parking: row[13] || '',
      furnishStatus: row[14] || '',
      facing: row[15] || '',
      propertyAgeYears: row[16] || '',
      sizeValue: row[17] || '',
      sizeUnit: row[18] || '',
      titleEn: row[19] || '',
      titleAr: row[20] || '',
      aboutEn: row[21] || '',
      aboutAr: row[22] || '',
      unitNumber: row[23] || '',
      notes: row[24] || '',
      totalPriceAed: (row[25] !== undefined && row[25] !== null && row[25] !== '') ? String(row[25]) : '',
      downPaymentAed: (row[26] !== undefined && row[26] !== null && row[26] !== '') ? String(row[26]) : '',
      chequesCount: row[27] || '',
      hidePrice: row[28] === 'TRUE' || row[28] === true || (typeof row[28] === 'string' && row[28].toUpperCase() === 'TRUE'),
      area: row[29] || '',
      buildingOrProject: row[30] || '',
      locationFreeText: row[31] || '',
      geoLat: row[32] || '',
      geoLng: row[33] || '',
      permitNumber: row[34] || '',
      issuingClientLicenseNumber: row[35] || '',
      contactsJson: row[36] || '',
      amenitiesBasic: row[37] || '',
      amenitiesFeatured: row[38] || '',
      amenitiesNearby: row[39] || '',
      googleDriveLink: (row[41] !== undefined && row[41] !== null) ? String(row[41]) : '',
      leadRatLink: (row[42] !== undefined && row[42] !== null) ? String(row[42]) : '',
    };
  };

  // Property object to row mapper
  const propertyToRow = (property: any): any[] => {
    return [
      property.id || uuidv4(),
      property.createdAt || new Date().toISOString(),
      property.updatedAt || new Date().toISOString(),
      property.listingUser || '',
      property.emirate || '',
      property.offeringType || '',
      property.finishingType || '',
      property.completionStatus || '',
      property.dealType || '',
      property.propertyType || '',
      property.propertySubType || '',
      property.bedrooms || '',
      property.bathrooms || '',
      property.parking || '',
      property.furnishStatus || '',
      property.facing || '',
      property.propertyAge || '',
      property.sizeValue || '',
      property.sizeUnit || '',
      property.titleEn || '',
      property.titleAr || '',
      property.aboutEn || '',
      property.aboutAr || '',
      property.unitNumber || '',
      property.notes || '',
      property.totalPriceAed || property.totalPrice || '',
      property.downPaymentAed || property.downPayment || '',
      property.chequesCount || '',
      property.hidePrice ? 'TRUE' : 'FALSE',
      property.area || '',
      property.buildingOrProject || '',
      property.locationFreeText || '',
      property.geoLat || '',
      property.geoLng || '',
      property.permitNumber || '',
      property.issuingClientLicenseNumber || '',
      typeof property.contacts === 'string' ? property.contacts : JSON.stringify(property.contacts || []),
      Array.isArray(property.amenitiesBasic) ? property.amenitiesBasic.join(', ') : (property.amenitiesBasic || ''),
      Array.isArray(property.amenitiesFeatured) ? property.amenitiesFeatured.join(', ') : (property.amenitiesFeatured || ''),
      Array.isArray(property.amenitiesNearby) ? property.amenitiesNearby.join(', ') : (property.amenitiesNearby || ''),
      '', // Reference Id (column 40)
      property.googleDriveLink || '', // Google Drive link (column 41)
      property.leadRatLink || '', // LeadRat Link (column 42)
    ];
  };

  sheetsClientInstance = {
    async readProperties(): Promise<any[]> {
      try {
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: sheetsId,
          range: 'Properties!A2:AQ', // Skip header row (columns A-AQ, 43 columns total)
        });

        const rows = response.data.values || [];
        return rows
          .filter(row => row[0]) // Filter out empty rows
          .map(rowToProperty);
      } catch (error) {
        console.error('Error reading properties:', error);
        throw error;
      }
    },

    async appendProperty(property: any): Promise<void> {
      try {
        const propertyWithId = {
          ...property,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const row = propertyToRow(propertyWithId);

        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetsId,
          range: 'Properties!A1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [row],
          },
        });
      } catch (error) {
        console.error('Error appending property:', error);
        throw error;
      }
    },

    async updateProperty(id: string, property: any): Promise<void> {
      try {
        // First, find the row index
        const properties = await sheets.spreadsheets.values.get({
          spreadsheetId: sheetsId,
          range: 'Properties!A2:A', // Just IDs
        });

        const rows = properties.data.values || [];
        const rowIndex = rows.findIndex(row => row[0] === id);

        if (rowIndex === -1) {
          throw new Error(`Property with id ${id} not found`);
        }

        // Update the property
        const updatedProperty = {
          ...property,
          id,
          updatedAt: new Date().toISOString(),
        };

        const row = propertyToRow(updatedProperty);

        // Row index is 0-based, but we skip header, so +2
        await sheets.spreadsheets.values.update({
          spreadsheetId: sheetsId,
          range: `Properties!A${rowIndex + 2}:AQ${rowIndex + 2}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [row],
          },
        });
      } catch (error) {
        console.error('Error updating property:', error);
        throw error;
      }
    },

    async readAreas(): Promise<string[]> {
      try {
        // First check if the sheet exists
        const sheetInfo = await sheets.spreadsheets.get({
          spreadsheetId: sheetsId,
        });
        
        const areasSheet = sheetInfo.data.sheets?.find(
          (sheet: any) => sheet.properties?.title === 'DubaiAreas'
        );
        
        if (!areasSheet) {
          // Sheet doesn't exist, return defaults
          return ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'JBR'];
        }

        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: sheetsId,
          range: 'DubaiAreas!A:A', // Read all rows from column A
        });

        const rows = response.data.values || [];
        // Skip header if it exists (check if first row is "Name" - exactly as shown in screenshot)
        const dataRows = rows.length > 0 && (
          rows[0]?.[0]?.toLowerCase().trim() === 'name'
        ) 
          ? rows.slice(1) 
          : rows;
        
        const areas = dataRows
          .filter(row => row && row[0] && row[0].trim())
          .map(row => row[0].trim())
          .filter(area => area.length > 0); // Double check for empty strings
        
        // Return areas if we found any, otherwise return defaults
        return areas.length > 0 ? areas : ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'JBR'];
      } catch (error: any) {
        // Silently return default areas if sheet doesn't exist or can't be read
        if (error?.response?.status !== 404) {
          console.error('Error reading areas:', error.message || error);
        }
        return ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'JBR'];
      }
    },

    async readUsers(): Promise<Array<{ name: string; email?: string; phone?: string }>> {
      // Default users - return immediately if sheet doesn't exist
      const defaultUsers = [
        { name: 'Admin' },
        { name: 'Broker 1' },
        { name: 'Broker 2' },
      ];

      try {
        // First, check if the sheet exists by getting spreadsheet metadata
        const sheetInfo = await sheets.spreadsheets.get({
          spreadsheetId: sheetsId,
        });
        
        const userSheet = sheetInfo.data.sheets?.find(
          (sheet: any) => sheet.properties?.title === 'Employee'
        );
        
        // If sheet doesn't exist, return defaults without error
        if (!userSheet) {
          return defaultUsers;
        }

        // Sheet exists, try to read the data
        try {
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetsId,
            range: 'Employee!A:A', // Read all rows from column A (only Name column)
          });

          const rows = response.data.values || [];
          if (!rows || rows.length === 0) {
            return defaultUsers;
          }

          // Skip header row if it exists (check if first row is "Name" - exactly as shown)
          const dataRows = rows.length > 0 && (
            rows[0]?.[0]?.toLowerCase().trim() === 'name'
          )
            ? rows.slice(1)
            : rows;
          
          // Map rows to user objects (only Name column from Employee sheet)
          const users = dataRows
            .filter(row => row && row[0] && row[0].trim()) // Only rows with at least a name
            .map(row => ({
              name: row[0]?.trim() || '',
            }))
            .filter(user => user.name && user.name.length > 0); // Filter out empty names

          // Return users if we found any, otherwise return defaults
          return users.length > 0 ? users : defaultUsers;
        } catch (readError: any) {
          // If reading fails, return defaults silently
          // Only log if it's not a 400/404 error (sheet doesn't exist or invalid range)
          if (readError?.code !== 400 && readError?.response?.status !== 400 && readError?.response?.status !== 404) {
            console.error('Error reading users data:', readError.message || readError);
          }
          return defaultUsers;
        }
      } catch (error: any) {
        // If metadata check fails, assume sheet doesn't exist and return defaults
        // Don't log errors for missing sheets
        return defaultUsers;
      }
    },
  };

  return sheetsClientInstance;
}

