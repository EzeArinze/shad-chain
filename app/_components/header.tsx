import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground select-none">
              <span className="bg-linear-to-r from-primary via-primary to-muted-foreground bg-clip-text text-transparent">
                shad
              </span>
              <span className="text-muted-foreground">-chain</span>
            </h1>
            <p className="text-muted-foreground line-clamp-1">
              Select shadcn components and generate a single install command
            </p>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
