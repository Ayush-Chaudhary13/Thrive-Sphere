"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "app/libs/utils"
import { userNameSchema } from "app/libs/validations/user"
import { buttonVariants } from "app/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card"
import Input from "app/components/Input"             // Ensure import matches your layout
import { Label } from "app/components/ui/label"
import { toast } from "app/components/ui/use-toast"
import { Icons } from "app/components/icons"

export function UserNameForm({ user, className, ...props }) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState(false)

  async function onSubmit(data) {
    setIsSaving(true)
    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name }),
    })
    setIsSaving(false)
    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      })
    }
    toast({
      description: "Your name has been updated.",
    })
    router.refresh()
  }

  return (
    <form
      className={cn("flex justify-center", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card className="w-full max-w-md rounded-xl bg-graydarker border border-graydark shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-tealmain">Your Name</CardTitle>
          <CardDescription className="text-gray-400">
            Please enter your full name or a display name you are comfortable with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm text-graylight">Name</Label>
            <Input
              id="name"
              register={register}
              errors={errors}
              required
              label={null}
              className="w-full"
            />
            {errors?.name && (
              <p className="px-1 text-xs text-rose-500 mt-1">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(
              buttonVariants({ 
                className: "bg-tealmain hover:bg-tealaccent text-graydarker font-semibold rounded-md transition-shadow shadow" 
              }),
              "w-full flex justify-center py-2",
              isSaving && "opacity-80"
            )}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}
