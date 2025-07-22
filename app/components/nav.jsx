"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "app/libs/utils"
import { Icons } from "app/components/icons"

export function DashboardNav({ items }) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2 text-graylight">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        const isActive = path === item.href

        return item.href && (
          <Link key={index} href={item.disabled ? "/" : item.href}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-graydark text-tealmain" // Active state: subtle dark bg, teal text
                  : "hover:bg-accenthovergray hover:text-tealmain",
                item.disabled
                  ? "cursor-not-allowed opacity-60 pointer-events-none"
                  : "text-graylight"
              )}
            >
              <Icon className={cn("mr-2 h-4 w-4", isActive ? "text-tealaccent" : "text-gray-400 group-hover:text-tealmain")} />
              <span>{item.title}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
