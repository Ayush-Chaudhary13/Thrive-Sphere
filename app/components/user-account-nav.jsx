"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import { GiHamburgerMenu } from "react-icons/gi";

export default function UserAccountNav({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center focus:outline-none">
        <UserAvatar
          user={{ name: user?.name || null, image: user?.image || null }}
          className="h-8 w-8 mr-3 rounded-full border-2 border-tealmain shadow-sm bg-graydarker object-cover"
        />
        <GiHamburgerMenu className="h-5 w-5 text-tealmain md:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[220px] bg-graydarker text-graylight shadow-xl border-none rounded-lg p-2"
      >
        <div className="flex items-center gap-2 pb-2 border-b border-gray-700 mb-2">
          <div className="flex flex-col overflow-hidden">
            {user?.name && <span className="font-bold text-tealmain truncate">{user.name}</span>}
            {user?.email && (
              <span className="text-sm text-gray-400 truncate w-[180px]">{user.email}</span>
            )}
          </div>
        </div>
        {/* Only show these on small screens */}
        <DropdownMenuItem asChild className="md:hidden hover:bg-tealmain/10">
          <Link href="/dashboard" className="w-full text-graylight hover:text-tealmain">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="md:hidden hover:bg-tealmain/10">
          <Link href="/communities" className="w-full text-graylight hover:text-tealmain">Communities</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:bg-tealmain/10">
          <Link href="/dashboard/posts" className="w-full text-graylight hover:text-tealmain">My Posts</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:bg-tealmain/10">
          <Link href="/dashboard/settings" className="w-full text-graylight hover:text-tealmain">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 border-gray-700" />
        <DropdownMenuItem
          className="cursor-pointer w-full text-left hover:bg-tealmain/10 hover:text-tealaccent focus:outline-none"
          onSelect={event => {
            event.preventDefault();
            signOut({ callbackUrl: `${window.location.origin}/auth` });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
