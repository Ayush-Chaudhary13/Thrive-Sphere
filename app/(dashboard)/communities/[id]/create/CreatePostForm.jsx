"use client";
import axios, { AxiosError } from "axios";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "app/components/ui/button";
import { buttonVariants } from "app/components/ui/button";
import { cn } from "app/libs/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { toast } from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { generateComponents } from "@uploadthing/react";
const { UploadButton } = generateComponents();

const CreatePostForm = ({ community_name, communityId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;
  const [isimageLoading, setIsimageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      var imageurl = null;
      if (image) {
        imageurl = image[0].url;
      }
      const payload = { ...data, communityId, imageurl, community_name };
      setIsLoading(true);

      await axios.post("/api/post", payload);

      setIsLoading(false);
      toast.success("Successfully posted");

      router.push(`/communities/${community_name}`);
      startTransition(() => router.refresh());
      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 422) {
        toast.error("Invalid Title");
      } else {
        toast.error("There was an error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border border-graydark text-foreground">
      <CardHeader>
        <CardTitle>Create post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id="myform">
          <div className="flex flex-col w-full items-start gap-4">
            {image && (
              <img
                src={image[0].url}
                alt="post"
                className="rounded-lg border border-graydark mb-2"
              />
            )}
            <div className="flex flex-col space-y-1.5 w-full">
              <TextareaAutosize
                id="title"
                disabled={isMutating}
                {...register("title", { required: true })}
                placeholder="Title"
                className={cn(
                  "w-full resize-none appearance-none overflow-hidden bg-white text-black caret-black text-5xl font-bold focus:outline-none focus:border-2 focus:border-teal-500 placeholder:text-gray-500 border border-teal-500 rounded-md p-3 transition-colors",
                  errors.title && "border-2 border-rose-500"
                )}
              />
              {errors.title && (
                <span className="text-rose-500 font-medium text-sm mt-1">
                  Title is required
                </span>
              )}
            </div>
            <div className="flex flex-col w-full space-y-1.5">
              <TextareaAutosize
                id="content"
                disabled={isMutating}
                {...register("content", { required: true })}
                placeholder="Description"
                className={cn(
                  "min-w-full min-h-[25vh] appearance-none overflow-hidden bg-white text-black caret-black text-lg focus:outline-none focus:border-2 focus:border-teal-500 placeholder:text-gray-500 border border-teal-500 rounded-md p-3 transition-colors",
                  errors.content && "border-2 border-rose-500"
                )}
              />
              {errors.content && (
                <span className="text-rose-500 font-medium text-sm mt-1">
                  Description is required
                </span>
              )}
            </div>
            <UploadButton
              content={{
                button({ ready }) {
                  if (ready) return <div>Upload Image</div>;
                  return "Getting ready...";
                },
                allowedContent({ ready, fileTypes, isUploading }) {
                  if (!ready) return "Checking what you allow";
                  if (isUploading)
                    return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;
                },
              }}
              appearance={{
                button: `${cn(
                  buttonVariants({ variant: "default" })
                )} whitespace-pre`,
              }}
              endpoint="imageUploader"
              onUploadProgress={() => setIsimageLoading(true)}
              onClientUploadComplete={(res) => {
                setIsimageLoading(false);
                setImage(res);
                toast.success("Upload Completed");
              }}
              onUploadError={(error) => {
                toast.error(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between gap-y-3 sm:gap-0 sm:flex-row ">
        <Button
          variant="destructive"
          onClick={() => router.push(`/communities/${community_name}`)}
          disabled={isMutating || isimageLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="myform"
          size="lg"
          disabled={isMutating || isimageLoading}
        >
          {isMutating ? (
            <ReloadIcon className=" h-4 w-4 animate-spin" />
          ) : (
            "Post"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePostForm;
