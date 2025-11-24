"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface Property {
  id: string;
  titleEn?: string;
  titleAr?: string;
  emirate?: string;
  area?: string;
  propertyType?: string;
  propertySubType?: string;
  dealType?: string;
  totalPriceAed?: string | number;
  hidePrice?: boolean;
  downPaymentAed?: string | number;
  sizeValue?: string | number;
  sizeUnit?: string;
  bedrooms?: string;
  bathrooms?: string;
  parking?: string;
  offeringType?: string;
  completionStatus?: string;
  finishingType?: string;
  furnishStatus?: string;
  facing?: string;
  propertyAgeYears?: string | number;
  unitNumber?: string;
  aboutEn?: string;
  aboutAr?: string;
  buildingOrProject?: string;
  locationFreeText?: string;
  permitNumber?: string;
  issuingClientLicenseNumber?: string;
  listingUser?: string;
  updatedAt?: string;
  createdAt?: string;
  chequesCount?: string;
  geoLat?: string;
  geoLng?: string;
  googleDriveLink?: string;
  leadRatLink?: string;
  amenitiesBasic?: string | string[];
  amenitiesFeatured?: string | string[];
  amenitiesNearby?: string | string[];
  contactsJson?: string;
  [key: string]: any;
}

interface PropertyViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property | null;
}

export function PropertyViewDialog({
  open,
  onOpenChange,
  property,
}: PropertyViewDialogProps) {
  if (!property) return null;

  const parseAmenities = (amenities: string | string[] | undefined): string[] => {
    if (!amenities) return [];
    if (Array.isArray(amenities)) return amenities;
    if (typeof amenities === 'string') {
      return amenities.split(',').map(a => a.trim()).filter(Boolean);
    }
    return [];
  };

  const parseContacts = (contactsJson: string | undefined): any[] => {
    if (!contactsJson) return [];
    try {
      const parsed = JSON.parse(contactsJson);
      // Migrate developerName to name for backward compatibility
      return Array.isArray(parsed) ? parsed.map((contact: any) => ({
        ...contact,
        name: contact.name || contact.developerName || '',
      })) : [];
    } catch {
      return [];
    }
  };

  const amenitiesBasic = parseAmenities(property.amenitiesBasic);
  const amenitiesFeatured = parseAmenities(property.amenitiesFeatured);
  const amenitiesNearby = parseAmenities(property.amenitiesNearby);
  const contacts = parseContacts(property.contactsJson);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{property.titleEn || "Property Details"}</DialogTitle>
          <DialogDescription>
            Complete information about this property listing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Main Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Emirate</Label>
                <p className="font-medium">{property.emirate || "-"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Area</Label>
                <p className="font-medium">{property.area || "-"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Property Type</Label>
                <p className="font-medium">
                  {property.propertyType || "-"}
                  {property.propertySubType && ` / ${property.propertySubType}`}
                </p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Deal Type</Label>
                <p className="font-medium">{property.dealType || "-"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Offering Type</Label>
                <p className="font-medium">{property.offeringType || "-"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Completion Status</Label>
                <p className="font-medium">{property.completionStatus || "-"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Price</Label>
                <p className="font-medium">
                  {property.hidePrice === true || property.hidePrice === 'TRUE'
                    ? "Hidden"
                    : property.totalPriceAed
                    ? formatCurrency(property.totalPriceAed)
                    : "-"}
                </p>
              </div>
              {property.downPaymentAed && (
                <div>
                  <Label className="text-sm text-muted-foreground">Down Payment</Label>
                  <p className="font-medium">{formatCurrency(property.downPaymentAed)}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Property Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Bedrooms</Label>
                <p className="font-medium">{property.bedrooms || "-"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Bathrooms</Label>
                <p className="font-medium">{property.bathrooms || "-"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Parking</Label>
                <p className="font-medium">{property.parking || "-"}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Property Size</Label>
                <p className="font-medium">
                  {property.sizeValue
                    ? `${property.sizeValue} ${property.sizeUnit || ""}`
                    : "-"}
                </p>
              </div>
              {property.propertyAgeYears && (
                <div>
                  <Label className="text-sm text-muted-foreground">Property Age</Label>
                  <p className="font-medium">{property.propertyAgeYears} years</p>
                </div>
              )}
              {property.finishingType && (
                <div>
                  <Label className="text-sm text-muted-foreground">Finishing Type</Label>
                  <p className="font-medium">{property.finishingType}</p>
                </div>
              )}
              {property.furnishStatus && (
                <div>
                  <Label className="text-sm text-muted-foreground">Furnish Status</Label>
                  <p className="font-medium">{property.furnishStatus}</p>
                </div>
              )}
              {property.facing && (
                <div>
                  <Label className="text-sm text-muted-foreground">Facing</Label>
                  <p className="font-medium">{property.facing}</p>
                </div>
              )}
              {property.unitNumber && (
                <div>
                  <Label className="text-sm text-muted-foreground">Unit Number</Label>
                  <p className="font-medium">{property.unitNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          {(property.buildingOrProject || property.locationFreeText) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Location</h3>
                <div className="space-y-2">
                  {property.buildingOrProject && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Building/Project</Label>
                      <p className="font-medium">{property.buildingOrProject}</p>
                    </div>
                  )}
                  {property.locationFreeText && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Location</Label>
                      <p className="font-medium">{property.locationFreeText}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Amenities */}
          {(amenitiesBasic.length > 0 || amenitiesFeatured.length > 0 || amenitiesNearby.length > 0) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Amenities</h3>
                {amenitiesBasic.length > 0 && (
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Basic</Label>
                    <div className="flex flex-wrap gap-2">
                      {amenitiesBasic.map((amenity, idx) => (
                        <span key={idx} className="px-2 py-1 bg-muted rounded-md text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {amenitiesFeatured.length > 0 && (
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Featured</Label>
                    <div className="flex flex-wrap gap-2">
                      {amenitiesFeatured.map((amenity, idx) => (
                        <span key={idx} className="px-2 py-1 bg-muted rounded-md text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {amenitiesNearby.length > 0 && (
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Nearby</Label>
                    <div className="flex flex-wrap gap-2">
                      {amenitiesNearby.map((amenity, idx) => (
                        <span key={idx} className="px-2 py-1 bg-muted rounded-md text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Contacts */}
          {contacts.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Developer Contacts</h3>
                <div className="space-y-3">
                  {contacts.map((contact: any, idx: number) => (
                    <div key={idx} className="border rounded-lg p-3 space-y-1">
                      {contact.name && (
                        <p className="font-medium">{contact.name}</p>
                      )}
                      <div className="text-sm text-muted-foreground space-y-1">
                        {contact.phoneNumber && <p>Phone: {contact.phoneNumber}</p>}
                        {contact.alternateNumber && <p>Alternate: {contact.alternateNumber}</p>}
                        {contact.email && <p>Email: {contact.email}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Links */}
          {(property.googleDriveLink || property.leadRatLink) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Links</h3>
                <div className="space-y-2">
                  {property.googleDriveLink && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Google Drive</Label>
                      <p className="font-medium">
                        <a
                          href={property.googleDriveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {property.googleDriveLink}
                        </a>
                      </p>
                    </div>
                  )}
                  {property.leadRatLink && (
                    <div>
                      <Label className="text-sm text-muted-foreground">LeadRat</Label>
                      <p className="font-medium">
                        <a
                          href={property.leadRatLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {property.leadRatLink}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Additional Info */}
          <Separator />
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Listed by: {property.listingUser || "-"}</p>
            <p>Created: {formatDate(property.createdAt)}</p>
            <p>Updated: {formatDate(property.updatedAt)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

