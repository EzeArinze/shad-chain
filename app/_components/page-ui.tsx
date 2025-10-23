"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PackageManagerSelector from "@/components/package-manager-selector";
import CommandPreview from "@/components/command-preview";
import ComponentGrid from "@/components/components-grid";
import { PackageManager } from "@/types/package-managers";

interface Component {
  name: string;
  description: string;
  dependencies?: string[];
}

export function ClientContent({
  initialComponents,
}: {
  initialComponents: Component[];
}) {
  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(
    new Set(),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");

  const filteredComponents = initialComponents.filter(
    (comp) =>
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleComponent = (name: string) => {
    const newSelected = new Set(selectedComponents);
    if (newSelected.has(name)) {
      newSelected.delete(name);
    } else {
      newSelected.add(name);
    }
    setSelectedComponents(newSelected);
  };

  const selectAll = () => {
    if (selectedComponents.size === filteredComponents.length) {
      setSelectedComponents(new Set());
    } else {
      setSelectedComponents(new Set(filteredComponents.map((c) => c.name)));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Component Selection */}
      <div className="lg:col-span-2 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-2 border-border focus:border-primary transition-colors duration-200"
          />
        </div>

        {/* Select All Button */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedComponents.size} of {filteredComponents.length} selected
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={selectAll}
            className="transition-all duration-200 bg-transparent"
          >
            {selectedComponents.size === filteredComponents.length
              ? "Deselect All"
              : "Select All"}
          </Button>
        </div>

        {/* Component Grid */}
        {initialComponents.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="space-y-2 text-center">
              <p className="text-muted-foreground">Unable to load components</p>
              <p className="text-xs text-muted-foreground/70">
                Please try refreshing the page
              </p>
            </div>
          </div>
        ) : (
          <ComponentGrid
            components={filteredComponents}
            selectedComponents={selectedComponents}
            onToggle={toggleComponent}
          />
        )}
      </div>

      {/* Right Column - Settings & Preview */}
      <div className="space-y-6">
        {/* Package Manager Selector */}
        <PackageManagerSelector
          selected={packageManager}
          onChange={setPackageManager}
        />

        {/* Command Preview */}
        <CommandPreview
          selectedComponents={Array.from(selectedComponents)}
          packageManager={packageManager}
        />
      </div>
    </div>
  );
}
