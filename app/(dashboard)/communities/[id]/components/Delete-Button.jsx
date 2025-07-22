"use client";
import React, { useTransition } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deletePost } from "app/actions/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog";
import { Button } from "app/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const DeleteButton = ({ postId, communityName }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-gray-400 hover:text-rose-500 focus-visible:ring-rose-500">
          <AiFillDelete size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[375px] bg-card border border-graydark text-foreground">
        <DialogHeader>
          <DialogTitle className="text-rose-500">Delete</DialogTitle>
          <DialogDescription className="text-gray-400">
            Do you confirm you want to delete the post?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="flex space-x-2 items-center w-full"
            variant="destructive"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                try {
                  await deletePost(postId, communityName);
                  toast.success("Post deleted successfully!");
                  // Redirect to community page after deletion
                  router.push(`/communities/${communityName}`);
                } catch (err) {
                  toast.error("Error deleting post.");
                }
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
