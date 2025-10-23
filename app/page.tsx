import InstallationGuide from "@/components/installation-guide";
import { getComponents } from "@/data/get-components";
import { ClientContent } from "./_components/page-ui";

export default async function Home() {
  const initialComponents = await getComponents();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-foreground">
              component-chain
            </h1>
            <p className="text-muted-foreground">
              Select shadcn components and generate a single install command
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <InstallationGuide />
        </div>

        <ClientContent initialComponents={initialComponents} />
      </main>
    </div>
  );
}
