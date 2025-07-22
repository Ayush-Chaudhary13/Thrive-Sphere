"use client"

import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar"
import cn from "classnames"; // If you already use a utility; otherwise see note below

export function UserAvatar({ user, className = "", ...props }) {
  return (
    <Avatar className={className} {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          {/* You can put initials here if you want: {user.name ? user.name.charAt(0) : "?"} */}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
