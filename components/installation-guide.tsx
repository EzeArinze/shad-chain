"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Framework = "nextjs" | "react" | "vue" | "svelte" | "astro";

const frameworks: { id: Framework; name: string; label: string }[] = [
  { id: "nextjs", name: "Next.js", label: "Next.js" },
  { id: "react", name: "React", label: "React" },
  { id: "vue", name: "Vue", label: "Vue" },
  { id: "svelte", name: "Svelte", label: "Svelte" },
  { id: "astro", name: "Astro", label: "Astro" },
];

const installCommands: Record<Framework, string> = {
  nextjs: "npx shadcn@latest init",
  react: "https://ui.shadcn.com/docs/installation/vite",
  vue: "https://ui.shadcn.com/docs/installation/vue",
  svelte: "https://ui.shadcn.com/docs/installation/sveltekit",
  astro: "https://ui.shadcn.com/docs/installation/astro",
};

export default function InstallationGuide() {
  const [selectedFramework, setSelectedFramework] =
    useState<Framework>("nextjs");
  const [copied, setCopied] = useState(false);

  const isNextJs = selectedFramework === "nextjs";
  const command = installCommands[selectedFramework];

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 border-2 border-border bg-card/50 backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Step 1: Install shadcn/ui
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Select your framework to get started
          </p>
        </div>

        {/* Framework Selector */}
        <div className="flex flex-wrap gap-2">
          {frameworks.map((fw) => (
            <Button
              key={fw.id}
              variant={selectedFramework === fw.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFramework(fw.id)}
              className="transition-all duration-200"
            >
              {fw.label}
            </Button>
          ))}
        </div>

        {/* Installation Instructions */}
        <div className="pt-4 border-t border-border">
          {isNextJs ? (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Copy and run this command in your terminal:
              </p>
              <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg border border-border">
                <code className="text-xs font-mono text-foreground flex-1 truncate">
                  {command}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="shrink-0 h-8 w-8 p-0"
                >
                  {copied ? (
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Visit the shadcn/ui documentation for{" "}
                {frameworks.find((f) => f.id === selectedFramework)?.name} setup
                instructions:
              </p>
              <a
                href={command}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                View Installation Guide
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
          )}
        </div>
      </div>
    </Card>
  );
}
