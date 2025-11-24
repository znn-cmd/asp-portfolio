// Emirates
export const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Northern Emirates"
] as const;

// Offering Type
export const OFFERING_TYPES = [
  "Ready",
  "Off Plan",
  "Secondary"
] as const;

// Finishing Type
export const FINISHING_TYPES = [
  "Fully-Finished",
  "Semi-Finished",
  "Unfinished"
] as const;

// Completion Status
export const COMPLETION_STATUSES = [
  "Completed",
  "Off Plan",
  "Completed-Primary",
  "Off Plan-Primary"
] as const;

// Deal Type
export const DEAL_TYPES = [
  "Rent / Lease",
  "Sale"
] as const;

// Property Type
export const PROPERTY_TYPES = [
  "Residential",
  "Commercial"
] as const;

// Residential Sub-Types
export const RESIDENTIAL_SUB_TYPES = [
  "Duplex",
  "Full Floor",
  "Bungalow",
  "Compound",
  "Half floor",
  "Bulk sale unit",
  "Penthouse",
  "Flat",
  "Villa",
  "Plot",
  "Row Villa",
  "Independent House",
  "Whole Building",
  "Villament",
  "Apartment",
  "Townhouse",
  "Floor",
  "Hotel Apartment"
] as const;

// Commercial Sub-Types
export const COMMERCIAL_SUB_TYPES = [
  "Commercial Villa",
  "Guest House",
  "Office Space",
  "Plot",
  "Showroom",
  "Godown",
  "Chambers",
  "Kiosk",
  "Studio",
  "Industrial Space",
  "Hotel Space",
  "Hostel Guest House",
  "Basement",
  "Bulk Rent Unit",
  "Full Floor",
  "Land",
  "Business Centre",
  "Factory",
  "Retail",
  "Labor Camp",
  "Staff Accommodation",
  "Warehouse",
  "Complete Building",
  "Co Working Office Space",
  "Restaurants",
  "Cafes",
  "Farm",
  "Shop",
  "Commercial Shop",
  "Floor"
] as const;

// Bedrooms
export const BEDROOMS = [
  "Studio",
  "1 BR",
  "2 BR",
  "3 BR",
  "4 BR",
  "5 BR",
  "5+ BR"
] as const;

// Bathrooms
export const BATHROOMS = [
  "1",
  "2",
  "3",
  "4",
  "5+"
] as const;

// Parking
export const PARKING = [
  "1",
  "2",
  "3",
  "4",
  "5+"
] as const;

// Furnish Status
export const FURNISH_STATUSES = [
  "Unfurnished",
  "Furnished",
  "Semi-Furnished"
] as const;

// Facing
export const FACING = [
  "East",
  "West",
  "North",
  "South",
  "North-East",
  "North-West",
  "South-East",
  "South-West"
] as const;

// Size Units
export const SIZE_UNITS = [
  "Sq. Feet",
  "Sq. Meter"
] as const;

// Cheques Count
export const CHEQUES_COUNT = Array.from({ length: 12 }, (_, i) => (i + 1).toString()) as readonly string[];

// Amenities Basic
export const AMENITIES_BASIC = [
  "24x7 Water Supply",
  "Air Conditioner",
  "Bicycle Stand",
  "Bike Parking",
  "Car Parking",
  "Earth Quake Resistance",
  "EV Charging Points",
  "Fire Fighting System",
  "Garbage Management System",
  "Intercom",
  "Lift",
  "Maintenance Staff",
  "Multipurpose Hall",
  "Municipal Water Supply",
  "Power Supply",
  "Security",
  "Valet Parking",
  "Visitor Car Parking"
] as const;

// Amenities Featured
export const AMENITIES_FEATURED = [
  "Amphi Theatre",
  "Available Networked",
  "Badminton Court",
  "Balcony",
  "Barbeque Facility",
  "Basement Parking",
  "Basket Ball Court",
  "BBQ Area",
  "Beach Access",
  "Built-in Kitchen Appliances",
  "Built-in Wardrobes",
  "Cable Ready",
  "CCTV",
  "Children Play Area",
  "Children's Pool",
  "City View",
  "Club House",
  "Community View",
  "Concierge Service",
  "Covered Parking",
  "Cricket Pitch",
  "Cycling Track",
  "Day Care Center",
  "Dining in building",
  "Driver Dormitory",
  "Drivers room",
  "DTH Connection",
  "EPABX System",
  "Family Lawn",
  "Football Court",
  "Garden",
  "Garden View",
  "Gazebo",
  "Guest Room",
  "Gymnasium",
  "Health Club",
  "Health Facilities",
  "HVAC System",
  "Indoor Games",
  "Internet",
  "Jacuzzi",
  "Jogging Track",
  "Kids Library",
  "Kids Play Area",
  "Laundry Room",
  "Library",
  "Lobby in Building",
  "Maid Room",
  "Maid Service",
  "Massage Parlour",
  "Mezzanine",
  "Mini Theater",
  "Modular Kitchen",
  "Near Golf",
  "No Common Wall",
  "North Orientation",
  "On High Floor",
  "On Low Floor",
  "On Mid Floor",
  "Outdoor Games",
  "Pantry",
  "Party Lawn",
  "Pets Allowed",
  "Piped LPG Connection",
  "Power Back Up",
  "Private Car Parking",
  "Private Garden",
  "Private Gym",
  "Private Jacuzzi",
  "Private Pool",
  "Rain Water Harvesting",
  "Reception",
  "Restaurant",
  "Sauna Bath",
  "Sea/Water View",
  "Senior Citizen Corner",
  "Shared Gym",
  "Shared Pool",
  "Shared Spa",
  "Shopping Stores",
  "Skating Rink",
  "Sky Lounge",
  "Society Office",
  "Solar Power",
  "Solar Water Heater",
  "Spa and Salon",
  "Squash Court",
  "Steam Room",
  "Study",
  "Swimming Pool",
  "Tennis Court",
  "Terrace",
  "Three Tier Security",
  "Tution Room",
  "Two Tier Security",
  "Upgraded Interior",
  "Utility Shop",
  "Vastu compliant",
  "View of Landmark",
  "View of Water",
  "Walk-in Closet",
  "Water Softener",
  "West Orientation",
  "Within Compound",
  "Worship Place",
  "Yoga and Meditation Center"
] as const;

// Amenities Nearby
export const AMENITIES_NEARBY = [
  "Airport",
  "Aqua gym",
  "ATM",
  "Bank",
  "Church",
  "City Bus Stop",
  "Convenience Store",
  "Dance Room",
  "Gurudwara",
  "Hospital",
  "Metro",
  "Mini Zoo",
  "Monastery",
  "Mosque",
  "Music Room",
  "Park",
  "Pet Park",
  "Pharmacy",
  "Public Transportation",
  "Railway Station",
  "Restaurants",
  "School",
  "Shopping Malls",
  "Shops",
  "Storage Room",
  "Super Market",
  "Temple",
  "Theatres",
  "Veterinary Hospital",
  "Zumba Studio"
] as const;

export type EmiratesType = typeof EMIRATES[number];
export type OfferingType = typeof OFFERING_TYPES[number];
export type FinishingType = typeof FINISHING_TYPES[number];
export type CompletionStatusType = typeof COMPLETION_STATUSES[number];
export type DealType = typeof DEAL_TYPES[number];
export type PropertyType = typeof PROPERTY_TYPES[number];
export type ResidentialSubType = typeof RESIDENTIAL_SUB_TYPES[number];
export type CommercialSubType = typeof COMMERCIAL_SUB_TYPES[number];
export type BedroomsType = typeof BEDROOMS[number];
export type BathroomsType = typeof BATHROOMS[number];
export type ParkingType = typeof PARKING[number];
export type FurnishStatusType = typeof FURNISH_STATUSES[number];
export type FacingType = typeof FACING[number];
export type SizeUnitType = typeof SIZE_UNITS[number];

