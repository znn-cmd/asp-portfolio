"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, type PropertyFormData, type ContactFormData } from "@/lib/schemas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  EMIRATES,
  OFFERING_TYPES,
  FINISHING_TYPES,
  COMPLETION_STATUSES,
  DEAL_TYPES,
  PROPERTY_TYPES,
  RESIDENTIAL_SUB_TYPES,
  COMMERCIAL_SUB_TYPES,
  BEDROOMS,
  BATHROOMS,
  PARKING,
  FURNISH_STATUSES,
  FACING,
  SIZE_UNITS,
  CHEQUES_COUNT,
  AMENITIES_BASIC,
  AMENITIES_FEATURED,
  AMENITIES_NEARBY,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Plus, X, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId?: string;
  initialData?: any;
  areas: string[];
  users: Array<{ name: string }>;
  onSuccess: () => void;
}

export function PropertyForm({
  open,
  onOpenChange,
  propertyId,
  initialData,
  areas,
  users,
  onSuccess,
}: PropertyFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [amenitySearch, setAmenitySearch] = useState({ basic: "", featured: "", nearby: "" });
  const [areaSearch, setAreaSearch] = useState("");
  const totalSteps = 5;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      hidePrice: false,
      amenitiesBasic: [],
      amenitiesFeatured: [],
      amenitiesNearby: [],
      contacts: [],
      dealType: "Sale",
      propertyType: "Residential",
      sizeUnit: "Sq. Feet",
      listingUser: users.length > 0 ? users[0].name : "Admin",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const propertyType = watch("propertyType");
  const dealType = watch("dealType");
  const hidePrice = watch("hidePrice");

  // Set default listingUser when users are loaded and form is opened
  useEffect(() => {
    if (open && !initialData) {
      const currentValue = watch("listingUser");
      const defaultUser = users.length > 0 ? users[0].name : "Admin";
      
      if (!currentValue || currentValue.trim() === "") {
        setValue("listingUser", defaultUser, { shouldValidate: true });
      }
    }
  }, [open, users, setValue, watch, initialData]);

  useEffect(() => {
    if (initialData && open) {
      console.log("=== LOADING DATA FOR EDIT ===");
      console.log("Initial data:", initialData);
      
      // Map initial data to form format
      const formData = {
        emirate: initialData.emirate || undefined,
        offeringType: initialData.offeringType || undefined,
        finishingType: initialData.finishingType || undefined,
        completionStatus: initialData.completionStatus || undefined,
        hidePrice: initialData.hidePrice === true || initialData.hidePrice === 'TRUE' || String(initialData.hidePrice).toUpperCase() === 'TRUE' ? true : false,
        dealType: initialData.dealType || "Sale",
        propertyType: initialData.propertyType || "Residential",
        propertySubType: initialData.propertySubType || "",
        bedrooms: initialData.bedrooms || undefined,
        propertyAge: initialData.propertyAgeYears ? String(initialData.propertyAgeYears) : undefined,
        listingUser: initialData.listingUser || (users.length > 0 ? users[0].name : "Admin"),
        sizeValue: initialData.sizeValue ? String(initialData.sizeValue) : "",
        sizeUnit: initialData.sizeUnit || "Sq. Feet",
        titleEn: initialData.titleEn || "",
        titleAr: initialData.titleAr || undefined,
        unitNumber: initialData.unitNumber || undefined,
        aboutEn: initialData.aboutEn || undefined,
        aboutAr: initialData.aboutAr || undefined,
        downPayment: initialData.downPaymentAed !== undefined && initialData.downPaymentAed !== null && String(initialData.downPaymentAed).trim() !== '' ? String(initialData.downPaymentAed).trim() : '',
        totalPrice: initialData.totalPriceAed !== undefined && initialData.totalPriceAed !== null && String(initialData.totalPriceAed).trim() !== '' ? String(initialData.totalPriceAed).trim() : '',
        chequesCount: initialData.chequesCount || undefined,
        area: initialData.area || undefined,
        buildingOrProject: initialData.buildingOrProject || undefined,
        locationFreeText: initialData.locationFreeText || undefined,
        geoLat: initialData.geoLat || undefined,
        geoLng: initialData.geoLng || undefined,
        permitNumber: initialData.permitNumber || undefined,
        issuingClientLicenseNumber: initialData.issuingClientLicenseNumber || undefined,
        googleDriveLink: initialData.googleDriveLink !== undefined && initialData.googleDriveLink !== null ? String(initialData.googleDriveLink).trim() : '',
        leadRatLink: initialData.leadRatLink !== undefined && initialData.leadRatLink !== null ? String(initialData.leadRatLink).trim() : '',
        bathrooms: initialData.bathrooms || undefined,
        parking: initialData.parking || undefined,
        furnishStatus: initialData.furnishStatus || undefined,
        facing: initialData.facing || undefined,
        amenitiesBasic: typeof initialData.amenitiesBasic === 'string'
          ? initialData.amenitiesBasic.split(',').map((a: string) => a.trim()).filter(Boolean)
          : Array.isArray(initialData.amenitiesBasic) ? initialData.amenitiesBasic : [],
        amenitiesFeatured: typeof initialData.amenitiesFeatured === 'string'
          ? initialData.amenitiesFeatured.split(',').map((a: string) => a.trim()).filter(Boolean)
          : Array.isArray(initialData.amenitiesFeatured) ? initialData.amenitiesFeatured : [],
        amenitiesNearby: typeof initialData.amenitiesNearby === 'string'
          ? initialData.amenitiesNearby.split(',').map((a: string) => a.trim()).filter(Boolean)
          : Array.isArray(initialData.amenitiesNearby) ? initialData.amenitiesNearby : [],
        contacts: typeof initialData.contactsJson === 'string' && initialData.contactsJson
          ? (() => {
              try {
                const parsed = JSON.parse(initialData.contactsJson);
                // Migrate developerName to name for backward compatibility
                return Array.isArray(parsed) ? parsed.map((contact: any) => ({
                  ...contact,
                  name: contact.name || contact.developerName || '',
                })) : [];
              } catch {
                return [];
              }
            })()
          : Array.isArray(initialData.contacts) ? initialData.contacts.map((contact: any) => ({
              ...contact,
              name: contact.name || contact.developerName || '',
            })) : [],
      };
      
      console.log("Mapped form data:", formData);
      reset(formData);
      setStep(1);
    } else if (!initialData && open) {
      const defaultListingUser = users.length > 0 ? users[0].name : "Admin";
      reset({
        hidePrice: false,
        amenitiesBasic: [],
        amenitiesFeatured: [],
        amenitiesNearby: [],
        contacts: [],
        dealType: "Sale",
        propertyType: "Residential",
        sizeUnit: "Sq. Feet",
        listingUser: defaultListingUser,
      });
      // Ensure listingUser is set
      setValue("listingUser", defaultListingUser);
      setStep(1);
    }
  }, [initialData, open, reset, users, setValue]);

  const onSubmit = async (data: PropertyFormData) => {
    try {
      console.log("Submitting form data:", data);
      
      const url = propertyId
        ? `/api/properties?id=${propertyId}`
        : "/api/properties";
      const method = propertyId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to save property");
      }

      toast({
        title: "Success",
        description: propertyId
          ? "Property updated successfully"
          : "Property created successfully",
      });

      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save property",
        variant: "destructive",
      });
    }
  };

  const toggleAmenity = (
    category: "amenitiesBasic" | "amenitiesFeatured" | "amenitiesNearby",
    amenity: string
  ) => {
    const current = watch(category) || [];
    const index = current.indexOf(amenity);
    if (index > -1) {
      setValue(
        category,
        current.filter((_, i) => i !== index)
      );
    } else {
      setValue(category, [...current, amenity]);
    }
  };

  const filteredAmenities = (category: typeof AMENITIES_BASIC, search: string) => {
    if (!search) return category;
    return category.filter((a) =>
      a.toLowerCase().includes(search.toLowerCase())
    );
  };

  const propertySubTypes =
    propertyType === "Residential"
      ? RESIDENTIAL_SUB_TYPES
      : COMMERCIAL_SUB_TYPES;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {propertyId ? "Edit Property" : "Add New Property"}
          </DialogTitle>
          <DialogDescription>
            Fill in all required fields marked with * to create a new property listing.
          </DialogDescription>
        </DialogHeader>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            // Only submit if we're on the last step
            if (step === totalSteps) {
              handleSubmit(
                onSubmit,
                (err) => {
                  console.log("=== FORM VALIDATION FAILED ===");
                  console.log("Errors object:", err);
                  console.log("Current form values:", watch());
                  
                  // Extract all error messages
                  const errorMessages: string[] = [];
                  Object.keys(err).forEach((key) => {
                    const error = (err as any)[key];
                    if (error?.message) {
                      errorMessages.push(`${key}: ${error.message}`);
                    } else {
                      errorMessages.push(`${key}: invalid`);
                    }
                  });
                  
                  console.log("Error messages:", errorMessages);
                  
                  // Show first error
                  if (errorMessages.length > 0) {
                    toast({
                      title: "Validation Error",
                      description: errorMessages[0],
                      variant: "destructive",
                    });
                  } else {
                    toast({
                      title: "Validation Error",
                      description: "Please fill in all required fields",
                      variant: "destructive",
                    });
                  }
                }
              )(e);
            }
          }}
          onKeyDown={(e) => {
            // Prevent Enter key from submitting form, but allow it in textarea fields
            if (e.key === 'Enter') {
              const target = e.target as HTMLElement;
              
              // Allow Enter in textarea fields (for multi-line text)
              if (target.tagName === 'TEXTAREA') {
                // Do nothing - let Enter work normally in textarea
                return;
              }
              
              // For input fields, prevent default form submission
              if (target.tagName === 'INPUT') {
                // Only allow Enter to submit if we're on the last step and clicking submit button
                if (step < totalSteps || (e.target as HTMLElement).type !== 'submit') {
                  e.preventDefault();
                  // Don't auto-advance, let user explicitly click Next/Submit
                }
              }
            }
          }}
          className="space-y-6"
        >
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex items-center flex-1">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    i + 1 === step
                      ? "bg-primary text-primary-foreground"
                      : i + 1 < step
                      ? "bg-primary/50 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {i + 1 < step ? "✓" : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-1 mx-2",
                      i + 1 < step ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Main */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Select Emirates <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {EMIRATES.map((emirate) => (
                    <Button
                      key={emirate}
                      type="button"
                      variant={
                        watch("emirate") === emirate ? "default" : "outline"
                      }
                      onClick={() => setValue("emirate", emirate)}
                    >
                      {emirate}
                    </Button>
                  ))}
                </div>
                {errors.emirate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emirate.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Offering Type <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {OFFERING_TYPES.map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={
                        watch("offeringType") === type ? "default" : "outline"
                      }
                      onClick={() => setValue("offeringType", type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
                {errors.offeringType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.offeringType.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Finishing Type
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {FINISHING_TYPES.map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={
                        watch("finishingType") === type ? "default" : "outline"
                      }
                      onClick={() => setValue("finishingType", type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Completion Status <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {COMPLETION_STATUSES.map((status) => (
                    <Button
                      key={status}
                      type="button"
                      variant={
                        watch("completionStatus") === status
                          ? "default"
                          : "outline"
                      }
                      onClick={() => setValue("completionStatus", status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
                {errors.completionStatus && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.completionStatus.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={hidePrice}
                  onCheckedChange={(checked) => setValue("hidePrice", checked)}
                />
                <Label>Hide Price on Application</Label>
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  I want to <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {DEAL_TYPES.map((type) => (
                    <div
                      key={type}
                      className={cn(
                        "border-2 rounded-lg p-4 cursor-pointer transition-colors",
                        watch("dealType") === type
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setValue("dealType", type)}
                    >
                      <div className="font-semibold">{type}</div>
                    </div>
                  ))}
                </div>
                {errors.dealType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dealType.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Property Type <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {PROPERTY_TYPES.map((type) => (
                    <div
                      key={type}
                      className={cn(
                        "border-2 rounded-lg p-4 cursor-pointer transition-colors",
                        watch("propertyType") === type
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setValue("propertyType", type)}
                    >
                      <div className="font-semibold">{type}</div>
                    </div>
                  ))}
                </div>
                {errors.propertyType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.propertyType.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Property Sub-Type <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {propertySubTypes.map((subType) => (
                    <Button
                      key={subType}
                      type="button"
                      variant={
                        watch("propertySubType") === subType
                          ? "default"
                          : "outline"
                      }
                      className="h-auto py-2"
                      onClick={() => setValue("propertySubType", subType)}
                    >
                      {subType}
                    </Button>
                  ))}
                </div>
                {errors.propertySubType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.propertySubType.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  BR / Bedrooms <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {BEDROOMS.map((br) => (
                    <Button
                      key={br}
                      type="button"
                      variant={
                        watch("bedrooms") === br ? "default" : "outline"
                      }
                      onClick={() => setValue("bedrooms", br)}
                    >
                      {br}
                    </Button>
                  ))}
                </div>
                {errors.bedrooms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bedrooms.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="propertyAge">Property Age (years)</Label>
                <Input
                  id="propertyAge"
                  type="number"
                  {...register("propertyAge")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sizeValue">
                    Property Size <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sizeValue"
                    type="number"
                    {...register("sizeValue")}
                  />
                  {errors.sizeValue && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sizeValue.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="sizeUnit">Unit</Label>
                  <Select
                    value={watch("sizeUnit")}
                    onValueChange={(value) =>
                      setValue("sizeUnit", value as "Sq. Feet" | "Sq. Meter")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SIZE_UNITS.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="titleEn">
                  Property Title (English) <span className="text-red-500">*</span>
                </Label>
                <Input id="titleEn" {...register("titleEn")} />
                {errors.titleEn && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.titleEn.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="titleAr">Property Title (Arabic)</Label>
                <Input id="titleAr" {...register("titleAr")} />
              </div>

              <div>
                <Label htmlFor="unitNumber">Unit Number</Label>
                <Input id="unitNumber" {...register("unitNumber")} />
              </div>

              <div>
                <Label htmlFor="aboutEn">About Property (English)</Label>
                <Textarea
                  id="aboutEn"
                  rows={3}
                  {...register("aboutEn")}
                />
              </div>

              <div>
                <Label htmlFor="aboutAr">About Property (Arabic)</Label>
                <Textarea
                  id="aboutAr"
                  rows={3}
                  {...register("aboutAr")}
                />
              </div>

              <div>
                <Label htmlFor="downPayment">Down Payment (AED)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  {...register("downPayment")}
                />
              </div>

              <div>
                <Label htmlFor="totalPrice">
                  Total Price (AED) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="totalPrice"
                  type="number"
                  {...register("totalPrice")}
                />
                {errors.totalPrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.totalPrice.message}
                  </p>
                )}
              </div>

              {dealType === "Rent / Lease" && (
                <div>
                  <Label htmlFor="chequesCount">Number of Cheques</Label>
                  <Select
                    value={watch("chequesCount")}
                    onValueChange={(value) => setValue("chequesCount", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cheques count" />
                    </SelectTrigger>
                    <SelectContent>
                      {CHEQUES_COUNT.map((count) => (
                        <SelectItem key={count} value={count}>
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="area">Area</Label>
                <Select
                  value={watch("area")}
                  onValueChange={(value) => {
                    setValue("area", value);
                    setAreaSearch(""); // Clear search when area is selected
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2 border-b sticky top-0 bg-background z-10">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search area..."
                          value={areaSearch}
                          onChange={(e) => {
                            setAreaSearch(e.target.value);
                            e.stopPropagation(); // Prevent Select from closing
                          }}
                          onClick={(e) => e.stopPropagation()} // Prevent Select from closing
                          className="pl-8 h-9"
                          onKeyDown={(e) => {
                            e.stopPropagation(); // Prevent Select from closing on Enter
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              // Select first filtered area if any
                              const filtered = areas.filter(area => 
                                area && area.trim() && area.toLowerCase().includes(areaSearch.toLowerCase())
                              );
                              if (filtered.length > 0) {
                                setValue("area", filtered[0]);
                                setAreaSearch("");
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {areas
                        .filter(area => area && area.trim())
                        .filter(area => 
                          areaSearch === "" || 
                          area.toLowerCase().includes(areaSearch.toLowerCase())
                        )
                        .map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="buildingOrProject">
                  Building/Project
                </Label>
                <Input
                  id="buildingOrProject"
                  {...register("buildingOrProject")}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="locationFreeText">
                    Location free text
                  </Label>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => {
                      const input = document.getElementById(
                        "locationFreeText"
                      ) as HTMLInputElement;
                      input?.focus();
                    }}
                  >
                    Manually Enter Location
                  </Button>
                </div>
                <Input
                  id="locationFreeText"
                  {...register("locationFreeText")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="geoLat">Geo Latitude</Label>
                  <Input
                    id="geoLat"
                    type="number"
                    step="any"
                    {...register("geoLat")}
                  />
                </div>
                <div>
                  <Label htmlFor="geoLng">Geo Longitude</Label>
                  <Input
                    id="geoLng"
                    type="number"
                    step="any"
                    {...register("geoLng")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="permitNumber">Permit Number</Label>
                <Input id="permitNumber" {...register("permitNumber")} />
              </div>

              <div>
                <Label htmlFor="issuingClientLicenseNumber">
                  Issuing Client License Number
                </Label>
                <Input
                  id="issuingClientLicenseNumber"
                  {...register("issuingClientLicenseNumber")}
                />
              </div>

              <div>
                <Label htmlFor="googleDriveLink">Google Drive Link</Label>
                <Input
                  id="googleDriveLink"
                  type="url"
                  placeholder="https://drive.google.com/..."
                  {...register("googleDriveLink")}
                />
                {errors.googleDriveLink && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.googleDriveLink.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="leadRatLink">LeadRat Link</Label>
                <Input
                  id="leadRatLink"
                  type="url"
                  placeholder="https://leadrat.com/..."
                  {...register("leadRatLink")}
                />
                {errors.leadRatLink && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.leadRatLink.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Attributes & Contacts */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Bathrooms
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {BATHROOMS.map((count) => (
                    <Button
                      key={count}
                      type="button"
                      variant={
                        watch("bathrooms") === count ? "default" : "outline"
                      }
                      onClick={() => setValue("bathrooms", count as any)}
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Parking
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {PARKING.map((count) => (
                    <Button
                      key={count}
                      type="button"
                      variant={
                        watch("parking") === count ? "default" : "outline"
                      }
                      onClick={() => setValue("parking", count as any)}
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Furnish Status
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {FURNISH_STATUSES.map((status) => (
                    <Button
                      key={status}
                      type="button"
                      variant={
                        watch("furnishStatus") === status
                          ? "default"
                          : "outline"
                      }
                      onClick={() => setValue("furnishStatus", status as any)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Facing
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {FACING.map((direction) => (
                    <Button
                      key={direction}
                      type="button"
                      variant={
                        watch("facing") === direction ? "default" : "outline"
                      }
                      onClick={() => setValue("facing", direction as any)}
                    >
                      {direction}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="listingUser">Listing on Behalf</Label>
                <Select
                  value={watch("listingUser") || (users.length > 0 ? users[0].name : "Admin")}
                  onValueChange={(value) => {
                    if (value && value.trim()) {
                      setValue("listingUser", value, { shouldValidate: true });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.filter(user => user.name && user.name.trim()).map((user) => (
                      <SelectItem key={user.name} value={user.name}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.listingUser && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.listingUser.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-semibold">Contacts</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({
                        name: "",
                        phoneNumber: "+971",
                        alternateNumber: "+971",
                        email: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border rounded-lg p-4 space-y-4 mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <Label>Contact {index + 1}</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Name</Label>
                      <Input
                        {...register(`contacts.${index}.name`)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Phone Number</Label>
                        <Input
                          {...register(`contacts.${index}.phoneNumber`)}
                          placeholder="+971"
                        />
                      </div>
                      <div>
                        <Label>Alternate Number</Label>
                        <Input
                          {...register(`contacts.${index}.alternateNumber`)}
                          placeholder="+971"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        {...register(`contacts.${index}.email`)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Amenities */}
          {step === 5 && (
            <div className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search amenities..."
                      className="pl-10"
                      value={amenitySearch.basic}
                      onChange={(e) =>
                        setAmenitySearch({
                          ...amenitySearch,
                          basic: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                    {filteredAmenities(
                      AMENITIES_BASIC,
                      amenitySearch.basic
                    ).map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={watch("amenitiesBasic")?.includes(amenity)}
                          onCheckedChange={() =>
                            toggleAmenity("amenitiesBasic", amenity)
                          }
                        />
                        <Label className="font-normal cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="featured" className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search amenities..."
                      className="pl-10"
                      value={amenitySearch.featured}
                      onChange={(e) =>
                        setAmenitySearch({
                          ...amenitySearch,
                          featured: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                    {filteredAmenities(
                      AMENITIES_FEATURED,
                      amenitySearch.featured
                    ).map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={watch("amenitiesFeatured")?.includes(
                            amenity
                          )}
                          onCheckedChange={() =>
                            toggleAmenity("amenitiesFeatured", amenity)
                          }
                        />
                        <Label className="font-normal cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="nearby" className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search amenities..."
                      className="pl-10"
                      value={amenitySearch.nearby}
                      onChange={(e) =>
                        setAmenitySearch({
                          ...amenitySearch,
                          nearby: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                    {filteredAmenities(
                      AMENITIES_NEARBY,
                      amenitySearch.nearby
                    ).map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={watch("amenitiesNearby")?.includes(amenity)}
                          onCheckedChange={() =>
                            toggleAmenity("amenitiesNearby", amenity)
                          }
                        />
                        <Label className="font-normal cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Previous
            </Button>
            {step < totalSteps ? (
              <Button
                type="button"
                onClick={() => setStep(Math.min(totalSteps, step + 1))}
              >
                Next
              </Button>
            ) : (
              <Button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Only submit when explicitly clicking the button on the last step
                  if (step === totalSteps) {
                    const form = (e.target as HTMLElement).closest('form');
                    if (form) {
                      handleSubmit(onSubmit)(e as any);
                    }
                  }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : propertyId ? "Update" : "Create"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

