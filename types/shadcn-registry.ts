// Each file listed under "files"
export interface RegistryFile {
  path: string;
  type: "registry:ui" | "registry:hook" | string;
}

// Optional Tailwind configuration extension
export interface TailwindConfig {
  theme?: {
    extend?: {
      keyframes?: Record<string, Record<string, Record<string, string>>>;
      animation?: Record<string, string>;
      colors?: Record<string, Record<string, string> | string>;
    };
  };
}

// CSS Variables for light/dark modes
export interface CssVars {
  light?: Record<string, string>;
  dark?: Record<string, string>;
}

// The main registry item type
export interface RegistryComponent {
  name: string;
  type: "registry:ui" | string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  tailwind?: {
    config?: TailwindConfig;
  };
  cssVars?: CssVars;
}

// The entire registry (array of components)
export type ShadcnRegistry = RegistryComponent[];
