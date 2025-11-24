"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  EMIRATES,
  OFFERING_TYPES,
  DEAL_TYPES,
  PROPERTY_TYPES,
  RESIDENTIAL_SUB_TYPES,
  COMMERCIAL_SUB_TYPES,
  COMPLETION_STATUSES,
  FINISHING_TYPES,
  FURNISH_STATUSES,
  BEDROOMS,
  BATHROOMS,
  PARKING,
  FACING,
  CHEQUES_COUNT,
  AMENITIES_BASIC,
  AMENITIES_FEATURED,
  AMENITIES_NEARBY,
} from "@/lib/constants";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FiltersPanelProps {
  filters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  areas: string[];
  users: Array<{ name: string }>;
}

export function FiltersPanel({
  filters,
  onFilterChange,
  onClearFilters,
  areas,
  users,
}: FiltersPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basics: true,
    ranges: true,
    counts: true,
    attributes: true,
    text: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const propertySubTypes =
    filters.propertyType === "Residential"
      ? RESIDENTIAL_SUB_TYPES
      : filters.propertyType === "Commercial"
      ? COMMERCIAL_SUB_TYPES
      : [];

  const SectionHeader = ({
    section,
    title,
  }: {
    section: string;
    title: string;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full py-2 font-semibold text-left"
    >
      <span>{title}</span>
      {expandedSections[section] ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <div className="bg-white border-r border-gray-200 h-full overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-sm"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        {/* Basics */}
        <div className="border-b pb-4">
          <SectionHeader section="basics" title="Basics" />
          {expandedSections.basics && (
            <div className="space-y-3 mt-3">
              <div>
                <Label className="text-sm">Emirates</Label>
                <Select
                  value={filters.emirate && filters.emirate.trim() ? filters.emirate : undefined}
                  onValueChange={(value) =>
                    onFilterChange("emirate", (value && value.trim()) ? value : null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Emirates" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMIRATES.filter(e => e && e.trim()).map((emirate) => (
                      <SelectItem key={emirate} value={emirate}>
                        {emirate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Dubai Area</Label>
                <Select
                  value={filters.area}
                  onValueChange={(value) =>
                    onFilterChange("area", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Areas" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.filter(area => area && area.trim()).map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Offering Type</Label>
                <Select
                  value={filters.offeringType}
                  onValueChange={(value) =>
                    onFilterChange("offeringType", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {OFFERING_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Deal Type</Label>
                <Select
                  value={filters.dealType}
                  onValueChange={(value) =>
                    onFilterChange("dealType", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Deals" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEAL_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Property Type</Label>
                <Select
                  value={filters.propertyType}
                  onValueChange={(value) =>
                    onFilterChange("propertyType", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {filters.propertyType && propertySubTypes.length > 0 && (
                <div>
                  <Label className="text-sm">Property Sub-Type</Label>
                  <Select
                    value={filters.propertySubType}
                    onValueChange={(value) =>
                      onFilterChange("propertySubType", value || null)
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="All Sub-Types" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertySubTypes.map((subType) => (
                        <SelectItem key={subType} value={subType}>
                          {subType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label className="text-sm">Completion Status</Label>
                <Select
                  value={filters.completionStatus}
                  onValueChange={(value) =>
                    onFilterChange("completionStatus", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPLETION_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Finishing Type</Label>
                <Select
                  value={filters.finishingType}
                  onValueChange={(value) =>
                    onFilterChange("finishingType", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {FINISHING_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Furnish Status</Label>
                <Select
                  value={filters.furnishStatus}
                  onValueChange={(value) =>
                    onFilterChange("furnishStatus", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    {FURNISH_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Ranges */}
        <div className="border-b pb-4">
          <SectionHeader section="ranges" title="Ranges" />
          {expandedSections.ranges && (
            <div className="space-y-3 mt-3">
              <div>
                <Label className="text-sm">Total Price (AED)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ""}
                    onChange={(e) =>
                      onFilterChange("minPrice", e.target.value || null)
                    }
                    className="h-9"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ""}
                    onChange={(e) =>
                      onFilterChange("maxPrice", e.target.value || null)
                    }
                    className="h-9"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Down Payment (AED)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minDownPayment || ""}
                    onChange={(e) =>
                      onFilterChange("minDownPayment", e.target.value || null)
                    }
                    className="h-9"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxDownPayment || ""}
                    onChange={(e) =>
                      onFilterChange("maxDownPayment", e.target.value || null)
                    }
                    className="h-9"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Property Size</Label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minSize || ""}
                    onChange={(e) =>
                      onFilterChange("minSize", e.target.value || null)
                    }
                    className="h-9"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxSize || ""}
                    onChange={(e) =>
                      onFilterChange("maxSize", e.target.value || null)
                    }
                    className="h-9"
                  />
                </div>
                <Select
                  value={filters.sizeUnit}
                  onValueChange={(value) =>
                    onFilterChange("sizeUnit", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sq. Feet">Sq. Feet</SelectItem>
                    <SelectItem value="Sq. Meter">Sq. Meter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Property Age (years)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minAge || ""}
                    onChange={(e) =>
                      onFilterChange("minAge", e.target.value || null)
                    }
                    className="h-9"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAge || ""}
                    onChange={(e) =>
                      onFilterChange("maxAge", e.target.value || null)
                    }
                    className="h-9"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Counts */}
        <div className="border-b pb-4">
          <SectionHeader section="counts" title="Counts" />
          {expandedSections.counts && (
            <div className="space-y-3 mt-3">
              <div>
                <Label className="text-sm">Bedrooms</Label>
                <Select
                  value={filters.bedrooms}
                  onValueChange={(value) =>
                    onFilterChange("bedrooms", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {BEDROOMS.map((br) => (
                      <SelectItem key={br} value={br}>
                        {br}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Bathrooms</Label>
                <Select
                  value={filters.bathrooms}
                  onValueChange={(value) =>
                    onFilterChange("bathrooms", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {BATHROOMS.map((count) => (
                      <SelectItem key={count} value={count}>
                        {count}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Parking</Label>
                <Select
                  value={filters.parking}
                  onValueChange={(value) =>
                    onFilterChange("parking", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {PARKING.map((count) => (
                      <SelectItem key={count} value={count}>
                        {count}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {filters.dealType === "Rent / Lease" && (
                <div>
                  <Label className="text-sm">Number of Cheques</Label>
                  <Select
                    value={filters.chequesCount}
                    onValueChange={(value) =>
                      onFilterChange("chequesCount", value || null)
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="All" />
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
        </div>

        {/* Attributes */}
        <div className="border-b pb-4">
          <SectionHeader section="attributes" title="Attributes" />
          {expandedSections.attributes && (
            <div className="space-y-3 mt-3">
              <div>
                <Label className="text-sm">Facing</Label>
                <Select
                  value={filters.facing}
                  onValueChange={(value) =>
                    onFilterChange("facing", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {FACING.map((direction) => (
                      <SelectItem key={direction} value={direction}>
                        {direction}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Amenities</Label>
                <div className="max-h-96 overflow-y-auto border rounded-md p-3 space-y-4">
                  {/* Basic Amenities */}
                  <div>
                    <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                      Basic
                    </Label>
                    <div className="space-y-1.5">
                      {AMENITIES_BASIC.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={filters.amenities?.includes(amenity)}
                            onCheckedChange={(checked) => {
                              const current = filters.amenities || [];
                              if (checked) {
                                onFilterChange("amenities", [...current, amenity]);
                              } else {
                                onFilterChange(
                                  "amenities",
                                  current.filter((a: string) => a !== amenity)
                                );
                              }
                            }}
                          />
                          <Label className="text-xs font-normal cursor-pointer">
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Amenities */}
                  <div className="border-t pt-3">
                    <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                      Featured
                    </Label>
                    <div className="space-y-1.5">
                      {AMENITIES_FEATURED.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={filters.amenities?.includes(amenity)}
                            onCheckedChange={(checked) => {
                              const current = filters.amenities || [];
                              if (checked) {
                                onFilterChange("amenities", [...current, amenity]);
                              } else {
                                onFilterChange(
                                  "amenities",
                                  current.filter((a: string) => a !== amenity)
                                );
                              }
                            }}
                          />
                          <Label className="text-xs font-normal cursor-pointer">
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nearby Amenities */}
                  <div className="border-t pt-3">
                    <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                      Nearby
                    </Label>
                    <div className="space-y-1.5">
                      {AMENITIES_NEARBY.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={filters.amenities?.includes(amenity)}
                            onCheckedChange={(checked) => {
                              const current = filters.amenities || [];
                              if (checked) {
                                onFilterChange("amenities", [...current, amenity]);
                              } else {
                                onFilterChange(
                                  "amenities",
                                  current.filter((a: string) => a !== amenity)
                                );
                              }
                            }}
                          />
                          <Label className="text-xs font-normal cursor-pointer">
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="border-b pb-4">
          <SectionHeader section="text" title="Text Search" />
          {expandedSections.text && (
            <div className="space-y-3 mt-3">
              <div>
                <Label className="text-sm">Keyword Search</Label>
                <Input
                  placeholder="Search titles, descriptions..."
                  value={filters.keyword || ""}
                  onChange={(e) =>
                    onFilterChange("keyword", e.target.value || null)
                  }
                  className="h-9"
                />
              </div>

              <div>
                <Label className="text-sm">Unit Number</Label>
                <Input
                  placeholder="Unit number"
                  value={filters.unitNumber || ""}
                  onChange={(e) =>
                    onFilterChange("unitNumber", e.target.value || null)
                  }
                  className="h-9"
                />
              </div>

              <div>
                <Label className="text-sm">Permit Number</Label>
                <Input
                  placeholder="Permit number"
                  value={filters.permitNumber || ""}
                  onChange={(e) =>
                    onFilterChange("permitNumber", e.target.value || null)
                  }
                  className="h-9"
                />
              </div>

              <div>
                <Label className="text-sm">Listing on Behalf</Label>
                <Select
                  value={filters.listingUser}
                  onValueChange={(value) =>
                    onFilterChange("listingUser", value || null)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Users" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.filter(user => user.name && user.name.trim()).map((user) => (
                      <SelectItem key={user.name} value={user.name}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Name</Label>
                <Input
                  placeholder="Name"
                  value={filters.developerName || ""}
                  onChange={(e) =>
                    onFilterChange("developerName", e.target.value || null) // Internal name stays developerName for backward compatibility
                  }
                  className="h-9"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

