import InstallationGuide from "@/components/installation-guide";
import { getComponents } from "@/data/get-components";
import { ClientContent } from "./_components/page-ui";
import Header from "./_components/header";

export default async function Home() {
  const initialComponents = await getComponents();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <InstallationGuide />
        </div>

        <ClientContent initialComponents={initialComponents} />
      </main>
    </div>
  );
}
