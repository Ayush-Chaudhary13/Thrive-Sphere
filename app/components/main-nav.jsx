import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import UserAccountNav from "app/components/user-account-nav";
import { redirect } from "next/navigation";
import { getCurrentUser } from "app/libs/session";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function MainNav() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-graydarker/95 backdrop-blur shadow-lg border-b border-tealmain">
      <div className="w-full flex items-center justify-between pl-5 pr-8 py-2">
        {/* Logo and Brand — shifted to the far left */}
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/Logo.png"
              alt="logo"
              priority
              className="w-10 md:w-10 mx-2 h-auto"
              width="100"
              height="100"
            />
            <span
              className="text-2xl font-extrabold tracking-tight text-graylight"
              style={orbitron.style}
            >
              Thrive <span className="text-tealmain">Sphere</span>
            </span>
          </Link>
        </div>
        {/* Navigation and UserAccountNav shifted to right edge */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="font-semibold px-4 py-2 rounded-full text-graylight hover:text-tealmain hover:bg-graydarker/80 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            href="/communities"
            className="font-semibold px-4 py-2 rounded-full text-graylight hover:text-tealmain hover:bg-graydarker/80 transition-colors duration-200"
          >
            Communities
          </Link>
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </div>
    </nav>
  );
}
