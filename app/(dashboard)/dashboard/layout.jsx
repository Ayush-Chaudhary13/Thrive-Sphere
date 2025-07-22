import { DashboardNav } from "../../components/nav";
import Image from "next/image"; // import the Next.js Image component

export default async function CommunitiesLayout({ children }) {
  return (
    <div className="flex">
      <aside className="hidden md:flex flex-col justify-between w-[200px] sticky top-24 h-[80vh] m-8">
        {/* Navigation links at the top */}
        <DashboardNav
          items={[
            { title: "Home feed", href: "/dashboard", icon: "laptop" },
            { title: "Posts", href: "/dashboard/posts", icon: "post" },
            { title: "Settings", href: "/dashboard/settings", icon: "settings" },
          ]}
        />
        {/* SVG at bottom */}
        <div>
          <Image
            src="/images/socialmediamarketing.svg"   // Update with your actual SVG file name
            alt="Decorative Logo"
            width={400}   // Adjust as needed
            height={800}  // Adjust as needed
            className="drop-shadow-lg"
            priority
          />
        </div>
      </aside>
      <main className="flex w-full flex-col overflow-hidden text-foreground">
        {children}
      </main>
    </div>
  );
}
