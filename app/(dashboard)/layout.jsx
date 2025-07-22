import MainNav from "app/components/main-nav";

export default async function CommunitiesLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-graydark bg-card text-foreground">
        {/* You can wrap with a container here if needed */}
        <div className="h-min w-full">
          <MainNav />
        </div>
      </header>
      <main className="flex-grow w-full">{children}</main>
      <footer className="h-8 w-full"></footer>
    </div>
  );
}
