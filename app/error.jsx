'use client'

import { buttonVariants } from "app/components/ui/button"
import { cn } from "app/libs/utils"
import { useEffect } from 'react'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en" className="h-full">
      <body className="bg-background text-foreground flex items-center justify-center min-h-screen flex-col">
        <h2 className="font-bold mb-5 text-2xl">Uh! Something went wrong!</h2>
        <button
          className={cn(buttonVariants({ variant: "default" }))}
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
