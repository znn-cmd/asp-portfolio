import { NextRequest, NextResponse } from 'next/server';
import { getSheetsClient } from '@/lib/googleSheets';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const client = await getSheetsClient();
    let properties = await client.readProperties();

    // Apply filters
    const emirate = searchParams.get('emirate');
    const area = searchParams.get('area');
    const offeringType = searchParams.get('offeringType');
    const dealType = searchParams.get('dealType');
    const propertyType = searchParams.get('propertyType');
    const propertySubType = searchParams.get('propertySubType');
    const completionStatus = searchParams.get('completionStatus');
    const finishingType = searchParams.get('finishingType');
    const furnishStatus = searchParams.get('furnishStatus');
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');
    const parking = searchParams.get('parking');
    const facing = searchParams.get('facing');
    const listingUser = searchParams.get('listingUser');
    const keyword = searchParams.get('keyword');
    const unitNumber = searchParams.get('unitNumber');
    const permitNumber = searchParams.get('permitNumber');
    const developerName = searchParams.get('developerName'); // Keep for backward compatibility, maps to contact.name
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minDownPayment = searchParams.get('minDownPayment');
    const maxDownPayment = searchParams.get('maxDownPayment');
    const minSize = searchParams.get('minSize');
    const maxSize = searchParams.get('maxSize');
    const minAge = searchParams.get('minAge');
    const maxAge = searchParams.get('maxAge');
    const chequesCount = searchParams.get('chequesCount');
    const amenities = searchParams.getAll('amenities');

    properties = properties.filter((property) => {
      if (emirate && property.emirate !== emirate) return false;
      if (area && property.area !== area) return false;
      if (offeringType && property.offeringType !== offeringType) return false;
      if (dealType && property.dealType !== dealType) return false;
      if (propertyType && property.propertyType !== propertyType) return false;
      if (propertySubType && property.propertySubType !== propertySubType) return false;
      if (completionStatus && property.completionStatus !== completionStatus) return false;
      if (finishingType && property.finishingType !== finishingType) return false;
      if (furnishStatus && property.furnishStatus !== furnishStatus) return false;
      if (bedrooms && property.bedrooms !== bedrooms) return false;
      if (bathrooms && property.bathrooms !== bathrooms) return false;
      if (parking && property.parking !== parking) return false;
      if (facing && property.facing !== facing) return false;
      if (listingUser && property.listingUser !== listingUser) return false;
      if (unitNumber && property.unitNumber !== unitNumber) return false;
      if (permitNumber && property.permitNumber !== permitNumber) return false;

      // Developer name search (search in contacts JSON)
      if (developerName) {
        try {
          const contacts = typeof property.contactsJson === 'string' 
            ? JSON.parse(property.contactsJson) 
            : property.contacts || [];
          const hasDeveloper = Array.isArray(contacts) && contacts.some(
            (contact: any) => 
              contact?.name?.toLowerCase().includes(developerName.toLowerCase())
          );
          if (!hasDeveloper) return false;
        } catch {
          // If contacts JSON is invalid, skip this filter
        }
      }

      // Price filters
      const price = parseFloat(property.totalPriceAed as string) || 0;
      if (minPrice && price < parseFloat(minPrice)) return false;
      if (maxPrice && price > parseFloat(maxPrice)) return false;

      const downPayment = parseFloat(property.downPaymentAed as string) || 0;
      if (minDownPayment && downPayment < parseFloat(minDownPayment)) return false;
      if (maxDownPayment && downPayment > parseFloat(maxDownPayment)) return false;

      // Size filters
      const size = parseFloat(property.sizeValue as string) || 0;
      if (minSize && size < parseFloat(minSize)) return false;
      if (maxSize && size > parseFloat(maxSize)) return false;

      // Age filters
      const age = parseFloat(property.propertyAgeYears as string) || 0;
      if (minAge && age < parseFloat(minAge)) return false;
      if (maxAge && age > parseFloat(maxAge)) return false;

      // Cheques count
      if (chequesCount && property.chequesCount !== chequesCount) return false;

      // Keyword search
      if (keyword) {
        const searchTerm = keyword.toLowerCase();
        const searchableFields = [
          property.titleEn,
          property.titleAr,
          property.aboutEn,
          property.aboutAr,
          property.notes,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!searchableFields.includes(searchTerm)) return false;
      }

      // Amenities filter
      if (amenities.length > 0) {
        const allAmenities = [
          property.amenitiesBasic,
          property.amenitiesFeatured,
          property.amenitiesNearby,
        ]
          .filter(Boolean)
          .join(', ')
          .toLowerCase();
        
        const hasAllAmenities = amenities.every((amenity) =>
          allAmenities.includes(amenity.toLowerCase())
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    return NextResponse.json({ properties });
  } catch (error: any) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await getSheetsClient();
    
    // Map form data to sheet structure
    const propertyData = {
      id: body.id,
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      listingUser: body.listingUser || '',
      emirate: body.emirate || '',
      offeringType: body.offeringType || '',
      finishingType: body.finishingType || '',
      completionStatus: body.completionStatus || '',
      dealType: body.dealType || '',
      propertyType: body.propertyType || '',
      propertySubType: body.propertySubType || '',
      bedrooms: body.bedrooms || '',
      bathrooms: body.bathrooms || '',
      parking: body.parking || '',
      furnishStatus: body.furnishStatus || '',
      facing: body.facing || '',
      propertyAgeYears: body.propertyAge || '',
      sizeValue: body.sizeValue || '',
      sizeUnit: body.sizeUnit || '',
      titleEn: body.titleEn || '',
      titleAr: body.titleAr || '',
      aboutEn: body.aboutEn || '',
      aboutAr: body.aboutAr || '',
      unitNumber: body.unitNumber || '',
      notes: body.notes || '',
      totalPriceAed: body.totalPrice || '',
      downPaymentAed: body.downPayment || '',
      chequesCount: body.chequesCount || '',
      hidePrice: body.hidePrice || false,
      area: body.area || '',
      buildingOrProject: body.buildingOrProject || '',
      locationFreeText: body.locationFreeText || '',
      geoLat: body.geoLat || '',
      geoLng: body.geoLng || '',
      permitNumber: body.permitNumber || '',
      issuingClientLicenseNumber: body.issuingClientLicenseNumber || '',
      contacts: body.contacts || [],
      amenitiesBasic: body.amenitiesBasic || [],
      amenitiesFeatured: body.amenitiesFeatured || [],
      amenitiesNearby: body.amenitiesNearby || [],
      googleDriveLink: body.googleDriveLink || '',
      leadRatLink: body.leadRatLink || '',
    };

    await client.appendProperty(propertyData);
    
    return NextResponse.json({ success: true, property: propertyData });
  } catch (error: any) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create property' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const client = await getSheetsClient();
    
    // Map form data to sheet structure
    const propertyData = {
      id,
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      listingUser: body.listingUser || '',
      emirate: body.emirate || '',
      offeringType: body.offeringType || '',
      finishingType: body.finishingType || '',
      completionStatus: body.completionStatus || '',
      dealType: body.dealType || '',
      propertyType: body.propertyType || '',
      propertySubType: body.propertySubType || '',
      bedrooms: body.bedrooms || '',
      bathrooms: body.bathrooms || '',
      parking: body.parking || '',
      furnishStatus: body.furnishStatus || '',
      facing: body.facing || '',
      propertyAgeYears: body.propertyAge || '',
      sizeValue: body.sizeValue || '',
      sizeUnit: body.sizeUnit || '',
      titleEn: body.titleEn || '',
      titleAr: body.titleAr || '',
      aboutEn: body.aboutEn || '',
      aboutAr: body.aboutAr || '',
      unitNumber: body.unitNumber || '',
      notes: body.notes || '',
      totalPriceAed: body.totalPrice || '',
      downPaymentAed: body.downPayment || '',
      chequesCount: body.chequesCount || '',
      hidePrice: body.hidePrice || false,
      area: body.area || '',
      buildingOrProject: body.buildingOrProject || '',
      locationFreeText: body.locationFreeText || '',
      geoLat: body.geoLat || '',
      geoLng: body.geoLng || '',
      permitNumber: body.permitNumber || '',
      issuingClientLicenseNumber: body.issuingClientLicenseNumber || '',
      contacts: body.contacts || [],
      amenitiesBasic: body.amenitiesBasic || [],
      amenitiesFeatured: body.amenitiesFeatured || [],
      amenitiesNearby: body.amenitiesNearby || [],
      googleDriveLink: body.googleDriveLink || '',
      leadRatLink: body.leadRatLink || '',
    };

    await client.updateProperty(id, propertyData);
    
    return NextResponse.json({ success: true, property: propertyData });
  } catch (error: any) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update property' },
      { status: 500 }
    );
  }
}

