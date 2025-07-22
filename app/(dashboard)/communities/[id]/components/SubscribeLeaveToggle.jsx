"use client";
import { Button } from "app/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Icons } from "app/components/icons";
import { toast } from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

const SubscribeLeaveToggle = ({ isSubscribed: subInitial, communityId, communityName }) => {
  const router = useRouter();
  const [subscribed, setSubscribed] = useState(subInitial);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;

  const subscribe = async () => {
    try {
      const payload = { communityId };
      setIsLoading(true);

      const { data } = await axios.post("/api/community/subscribe", payload);

      // Toggle UI state if API response is fresh
      if (data) {
        setSubscribed(!subscribed);
      }

      setIsLoading(false);
      toast.success(`Successfully ${!subscribed ? "subscribed" : "unsubscribed"}`);

      startTransition(() => router.refresh());

      return data;
    } catch (err) {
      toast.error("There was an error");
    } finally {
      setIsLoading(false);
    }
  };

  return subscribed ? (
    <Button
      className="font-bold"
      variant="secondary"
      disabled={isMutating}
      onClick={subscribe}
    >
      {isMutating ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.check className="md:mr-2 h-4 w-4" />
      )}
      {isMutating ? "Please wait" : "Unsubscribe"}
    </Button>
  ) : (
    <Button
      className="font-bold w-full"
      disabled={isMutating}
      onClick={subscribe}
      variant="default"
    >
      {isMutating ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      {isMutating ? "Please wait" : "Join"}
    </Button>
  );
};

export default SubscribeLeaveToggle;
