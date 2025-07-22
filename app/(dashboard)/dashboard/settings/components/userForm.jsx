"use client";
import React, { useTransition, useState } from 'react';
import { buttonVariants } from "app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "app/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import toast from "react-hot-toast";
import { cn } from "app/libs/utils";
import { generateComponents } from "@uploadthing/react";
const { UploadButton } = generateComponents();
import { handleUser } from "app/actions/actions";

const UserForm = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [isimageLoading, setIsimageLoading] = useState(false);
  const [image, setImage] = useState(user.image);

  const onSubmit = async (formData) => {
    try {
      const name = formData.get('name');
      const payload = {
        name: name,
        email: user.email,
        image: image
      };
      startTransition(async () => {
        await handleUser(user.id, payload);
        toast.success("Updated");
      });
    } catch (err) {
      toast.error("Error occurred");
    }
  };

  return (
    <form action={onSubmit} autoComplete="off">
      <Card className="bg-white border border-gray-200 text-black max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription className="text-gray-700">
            Please enter your full name or a display name you are comfortable with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label htmlFor="name" className="text-sm font-semibold mb-1 text-gray-900">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              className="w-full md:w-[300px] bg-white text-black caret-black border-teal-500 focus:border-teal-600 focus:ring-2 focus:ring-teal-500 placeholder:text-gray-500 rounded-md p-2 font-medium transition-colors"
              size={32}
              disabled={isPending}
              placeholder={user.name}
              required
            />
          </div>
        </CardContent>
        <CardContent>
          <CardTitle as="div" className="text-base font-bold mb-2 text-gray-900">Email</CardTitle>
          <div className="grid gap-1 mt-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-900">
              Email
            </Label>
            <Input
              id="email"
              className="w-full md:w-[300px] bg-gray-100 text-gray-700 border-none"
              size={32}
              disabled
              value={user.email}
              readOnly
            />
          </div>
        </CardContent>
        <CardContent className="flex gap-4 items-center">
          <img className='rounded-xl h-12 border border-gray-300' src={image} alt="User avatar" />
          <UploadButton
            content={{
              button({ ready }) {
                if (ready) return <div className='text-black'>Upload Image</div>;
                return "Getting ready...";
              },
              allowedContent({ ready, fileTypes, isUploading }) {
                if (!ready) return "Checking what you allow";
                if (isUploading)
                  return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;
              },
            }}
            appearance={{
              button: "px-4 py-2 rounded-md bg-teal-500 text-white font-semibold whitespace-pre transition hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400",
            }}
            endpoint="imageUploader"
            onUploadProgress={() => setIsimageLoading(true)}
            onClientUploadComplete={(res) => {
              setIsimageLoading(false);
              setImage(res[0].url);
              toast.success("Upload Completed");
            }}
            onUploadError={(error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isPending}
          >
            {isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Save"}
          </button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UserForm;
