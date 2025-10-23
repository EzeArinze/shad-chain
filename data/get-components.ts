import { ShadcnRegistry } from "@/types/shadcn-registry";
import { cacheLife, cacheTag } from "next/cache";

export interface Component {
  name: string;
  description: string;
  dependencies?: string[];
}

export async function getComponents(): Promise<Component[]> {
  "use cache";
  cacheTag("cart");
  cacheLife("hours"); // Cache for 1 hour

  try {
    const response = await fetch("https://ui.shadcn.com/r/index.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = (await response.json()) as ShadcnRegistry;

    const componentsList: Component[] = data.map((item) => ({
      name: item.name,
      description: item.files[0].type || "A shadcn component",
      dependencies: item.dependencies || [],
    }));

    // if (Array.isArray(data)) {
    //   // If data is an array, map directly
    //   componentsList = data.map((item) => ({
    //     name: item.name,
    //     description: item.files[0].type || "A shadcn component",
    //     dependencies: item.dependencies || [],
    //   }));
    // } else {
    //   // If data is an object, use Object.entries
    //   componentsList = Object.entries(data).map(
    //     ([name, value]: [string, any]) => ({
    //       name: value.name || name,
    //       description: value.description || "A shadcn component",
    //       dependencies: value.dependencies || [],
    //     }),
    //   );
    // }

    return componentsList;
  } catch (error) {
    console.error("Failed to fetch components from registry:", error);
    // Return empty array if fetch fails
    return [];
  }
}
