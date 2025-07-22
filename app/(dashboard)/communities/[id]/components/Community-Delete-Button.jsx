"use client";
import React, { useState, useTransition } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteCommunity } from "app/actions/actions";
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
import { Input } from "app/components/ui/input";

const DeleteButton = ({ communityName, user }) => {
  const [isPending, startTransition] = useTransition();
  const [confirm, setConfirm] = useState("");

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
            Deleting the community will lead to deletion of all its posts and subscriptions.<br />
            Type <b>confirm</b> to delete the community.
          </DialogDescription>
        </DialogHeader>
        <Input
          className="bg-background text-foreground border border-graydark"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <DialogFooter>
          <Button
            disabled={confirm !== "confirm"}
            variant="destructive"
            className="flex space-x-2 items-center w-full"
            onClick={() =>
              startTransition(async () => {
                await deleteCommunity(communityName, user);
              })
            }
          >
            {isPending ? "Loading" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
