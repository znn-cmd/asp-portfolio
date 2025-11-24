"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Edit, Eye } from "lucide-react";

interface Property {
  id: string;
  titleEn?: string;
  emirate?: string;
  area?: string;
  propertyType?: string;
  propertySubType?: string;
  dealType?: string;
  totalPriceAed?: string | number;
  hidePrice?: boolean;
  sizeValue?: string | number;
  sizeUnit?: string;
  bedrooms?: string;
  bathrooms?: string;
  parking?: string;
  offeringType?: string;
  updatedAt?: string;
  [key: string]: any;
}

interface PropertiesTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onView?: (property: Property) => void;
  loading?: boolean;
}

export function PropertiesTable({
  properties,
  onEdit,
  onView,
  loading,
}: PropertiesTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading properties...</div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">No properties found</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-3 font-semibold text-sm">Title EN</th>
            <th className="text-left p-3 font-semibold text-sm">
              Emirate / Area
            </th>
            <th className="text-left p-3 font-semibold text-sm">
              Type / Subtype
            </th>
            <th className="text-left p-3 font-semibold text-sm">Deal Type</th>
            <th className="text-left p-3 font-semibold text-sm">Price</th>
            <th className="text-left p-3 font-semibold text-sm">Size</th>
            <th className="text-left p-3 font-semibold text-sm">
              Beds/Baths/Parking
            </th>
            <th className="text-left p-3 font-semibold text-sm">
              Offering Type
            </th>
            <th className="text-left p-3 font-semibold text-sm">Updated At</th>
            <th className="text-left p-3 font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr
              key={property.id}
              className="border-b hover:bg-muted/30 transition-colors"
            >
              <td className="p-3">
                <div className="font-medium">{property.titleEn || "-"}</div>
              </td>
              <td className="p-3">
                <div className="text-sm">
                  {property.emirate || "-"}
                  {property.area && ` / ${property.area}`}
                </div>
              </td>
              <td className="p-3">
                <div className="text-sm">
                  {property.propertyType || "-"}
                  {property.propertySubType && ` / ${property.propertySubType}`}
                </div>
              </td>
              <td className="p-3">
                <div className="text-sm">{property.dealType || "-"}</div>
              </td>
              <td className="p-3">
                <div className="text-sm font-medium">
                  {property.hidePrice === true || property.hidePrice === 'TRUE'
                    ? "Hidden"
                    : property.totalPriceAed
                    ? formatCurrency(property.totalPriceAed)
                    : "-"}
                </div>
              </td>
              <td className="p-3">
                <div className="text-sm">
                  {property.sizeValue
                    ? `${property.sizeValue} ${property.sizeUnit || ""}`
                    : "-"}
                </div>
              </td>
              <td className="p-3">
                <div className="text-sm">
                  {[
                    property.bedrooms,
                    property.bathrooms && `${property.bathrooms}B`,
                    property.parking && `${property.parking}P`,
                  ]
                    .filter(Boolean)
                    .join(" / ") || "-"}
                </div>
              </td>
              <td className="p-3">
                <div className="text-sm">{property.offeringType || "-"}</div>
              </td>
              <td className="p-3">
                <div className="text-sm text-muted-foreground">
                  {formatDate(property.updatedAt)}
                </div>
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  {onView && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(property)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Info
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(property)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

