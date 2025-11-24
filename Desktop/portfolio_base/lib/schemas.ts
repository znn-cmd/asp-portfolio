import { z } from "zod";

// Contact schema
export const contactSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  alternateNumber: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
});

// Property form schema matching CSV structure
export const propertySchema = z.object({
  // Main fields
  emirate: z.enum(["Dubai", "Abu Dhabi", "Northern Emirates"]),
  offeringType: z.enum(["Ready", "Off Plan", "Secondary"]),
  finishingType: z.enum(["Fully-Finished", "Semi-Finished", "Unfinished"]).optional(),
  completionStatus: z.enum(["Completed", "Off Plan", "Completed-Primary", "Off Plan-Primary"]),
  hidePrice: z.boolean().default(false),
  dealType: z.enum(["Rent / Lease", "Sale"]),
  propertyType: z.enum(["Residential", "Commercial"]),
  propertySubType: z.string(),
  
  // Details
  bedrooms: z.enum(["Studio", "1 BR", "2 BR", "3 BR", "4 BR", "5 BR", "5+ BR"]),
  propertyAge: z.string().optional(),
  listingUser: z.string().min(1, "Listing user is required").default("Admin"),
  sizeValue: z.string().min(1, "Property size is required"),
  sizeUnit: z.enum(["Sq. Feet", "Sq. Meter"]),
  titleEn: z.string().min(1, "Property title (English) is required"),
  titleAr: z.string().optional(),
  unitNumber: z.string().optional(),
  aboutEn: z.string().optional(),
  aboutAr: z.string().optional(),
  downPayment: z.string().optional(),
  totalPrice: z.string().min(1, "Total price is required"),
  chequesCount: z.string().optional(),
  
  // Location
  area: z.string().optional(),
  buildingOrProject: z.string().optional(),
  locationFreeText: z.string().optional(),
  geoLat: z.string().optional(),
  geoLng: z.string().optional(),
  
  // Docs
  permitNumber: z.string().optional(),
  issuingClientLicenseNumber: z.string().optional(),
  googleDriveLink: z.string().optional().refine(
    (val) => !val || val === "" || z.string().url().safeParse(val).success,
    { message: "Must be a valid URL" }
  ),
  leadRatLink: z.string().optional().refine(
    (val) => !val || val === "" || z.string().url().safeParse(val).success,
    { message: "Must be a valid URL" }
  ),
  
  // Attributes
  bathrooms: z.enum(["1", "2", "3", "4", "5+"]).optional(),
  parking: z.enum(["1", "2", "3", "4", "5+"]).optional(),
  furnishStatus: z.enum(["Unfurnished", "Furnished", "Semi-Furnished"]).optional(),
  facing: z.enum(["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"]).optional(),
  
  // Amenities
  amenitiesBasic: z.array(z.string()).default([]),
  amenitiesFeatured: z.array(z.string()).default([]),
  amenitiesNearby: z.array(z.string()).default([]),
  
  // Contacts
  contacts: z.array(contactSchema).default([]),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
export type ContactFormData = z.infer<typeof contactSchema>;

