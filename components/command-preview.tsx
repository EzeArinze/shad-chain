"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

interface CommandPreviewProps {
  selectedComponents: string[];
  packageManager: PackageManager;
}

export default function CommandPreview({
  selectedComponents,
  packageManager,
}: CommandPreviewProps) {
  const [copied, setCopied] = useState(false);

  const generateCommand = () => {
    if (selectedComponents.length === 0) {
      return "Select components to generate command";
    }

    const components = selectedComponents.join(" ");

    const commands: Record<PackageManager, string> = {
      npm: `npx shadcn@latest add ${components}`,
      yarn: `yarn dlx shadcn-ui@latest add ${components}`,
      pnpm: `pnpm dlx shadcn@latest add ${components}`,
      bun: `bun x shadcn-ui@latest add ${components}`,
    };

    return commands[packageManager];
  };

  const command = generateCommand();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (selectedComponents.length > 0) {
        handleCopy();
      }
    }
  };

  return (
    <Card className="p-6 sticky top-8 border-2 border-border hover:border-primary/50 transition-colors duration-300">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Install Command
      </h2>

      <div
        className="bg-muted rounded-lg p-4 mb-4 font-mono text-sm text-foreground break-all cursor-pointer hover:bg-muted/80 transition-colors duration-200 border border-border/50"
        onClick={handleCopy}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        title="Click to copy or press Cmd/Ctrl + Enter"
      >
        {command}
      </div>

      <Button
        onClick={handleCopy}
        className="w-full transition-all duration-300"
        disabled={selectedComponents.length === 0}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2 animate-pulse" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copy Command
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground mt-4">
        {selectedComponents.length} component
        {selectedComponents.length !== 1 ? "s" : ""} selected
      </p>
      {selectedComponents.length > 0 && (
        <p className="text-xs text-muted-foreground/70 mt-2">
          💡 Tip: Press Cmd/Ctrl + Enter to copy
        </p>
      )}
    </Card>
  );
}
