"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PropertyForm } from "@/components/property/PropertyForm";
import { FiltersPanel } from "@/components/property/FiltersPanel";
import { PropertiesTable } from "@/components/property/PropertiesTable";
import { PropertyViewDialog } from "@/components/property/PropertyViewDialog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Menu, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState<string[]>([]);
  const [users, setUsers] = useState<Array<{ name: string }>>([]);
  const [selectedUser, setSelectedUser] = useState<string>("Admin");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [viewingProperty, setViewingProperty] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  // Load areas and users
  useEffect(() => {
    const loadData = async () => {
      try {
        const [areasRes, usersRes] = await Promise.all([
          fetch("/api/areas"),
          fetch("/api/users"),
        ]);

        const areasData = await areasRes.json();
        const usersData = await usersRes.json();

        setAreas(areasData.areas || []);
        setUsers(usersData.users || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Load properties
  const loadProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else {
            params.append(key, value.toString());
          }
        }
      });

      const response = await fetch(`/api/properties?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setProperties(data.properties || []);
        setFilteredProperties(data.properties || []);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to load properties",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [filters, toast]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleViewProperty = (property: any) => {
    setViewingProperty(property);
    setIsViewDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingProperty(null);
    loadProperties();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Toaster />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <h1 className="text-xl font-bold">Dubai Real Estate CRM</h1>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedUser && selectedUser.trim() ? selectedUser : undefined} onValueChange={(value) => setSelectedUser(value || "Admin")}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {users.filter(user => user.name && user.name.trim()).map((user) => (
                <SelectItem key={user.name} value={user.name}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddProperty}>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Filters Sidebar */}
        <aside
          className={cn(
            "bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
            sidebarOpen
              ? "translate-x-0 w-[320px]"
              : "-translate-x-full w-0 lg:translate-x-0 lg:w-[320px]",
            "lg:relative absolute left-0 z-20 h-full overflow-y-auto",
            "top-16 lg:top-0"
          )}
        >
          {sidebarOpen && (
            <FiltersPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              areas={areas}
              users={users}
            />
          )}
        </aside>

        {/* Properties List */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Properties ({filteredProperties.length})
                </h2>
              </div>
            </div>
            <div className="p-4">
              <PropertiesTable
                properties={filteredProperties}
                onEdit={handleEditProperty}
                onView={handleViewProperty}
                loading={loading}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Property Form Modal */}
      <PropertyForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        propertyId={editingProperty?.id}
        initialData={editingProperty}
        areas={areas}
        users={users}
        onSuccess={handleFormSuccess}
      />

      {/* Property View Dialog */}
      <PropertyViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        property={viewingProperty}
      />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[5]"
          onClick={() => setSidebarOpen(false)}
          style={{ top: '64px' }}
        />
      )}
    </div>
  );
}

