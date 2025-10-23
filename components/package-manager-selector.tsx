"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageManager } from "@/types/package-managers";

interface PackageManagerSelectorProps {
  selected: PackageManager;
  onChange: (pm: PackageManager) => void;
}

export default function PackageManagerSelector({
  selected,
  onChange,
}: PackageManagerSelectorProps) {
  const managers: PackageManager[] = ["npm", "yarn", "pnpm", "bun"];

  return (
    <Card className="p-6 border-2 border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Package Manager
      </h2>
      <div className="space-y-2">
        {managers.map((pm) => (
          <Button
            key={pm}
            variant={selected === pm ? "default" : "outline"}
            className="w-full justify-start capitalize transition-all duration-200"
            onClick={() => onChange(pm)}
          >
            {pm}
          </Button>
        ))}
      </div>
    </Card>
  );
}
