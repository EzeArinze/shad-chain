"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Component {
  name: string;
  description: string;
  dependencies?: string[];
}

interface ComponentGridProps {
  components: Component[];
  selectedComponents: Set<string>;
  onToggle: (name: string) => void;
}

export default function ComponentGrid({
  components,
  selectedComponents,
  onToggle,
}: ComponentGridProps) {
  if (components.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">No components found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {components.map((component) => {
        const isSelected = selectedComponents.has(component.name);
        return (
          <Card
            key={component.name}
            className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
              isSelected
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/50 hover:bg-accent/50 hover:shadow-md"
            }`}
            onClick={() => onToggle(component.name)}
          >
            <div className="space-y-3">
              {/* Header with name and learn more link */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground capitalize text-lg">
                  {component.name}
                </h3>
                <a
                  href={`https://ui.shadcn.com/docs/components/${component.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                  title="Learn more about this component"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {component.description}
              </p>

              {/* Selection tag */}
              <div className="flex items-center gap-2">
                <Badge
                  variant={isSelected ? "default" : "outline"}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent"
                  }`}
                >
                  {isSelected ? "Selected" : "Click to select"}
                </Badge>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
