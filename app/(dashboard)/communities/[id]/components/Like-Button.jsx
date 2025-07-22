"use client";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const LikeButton = ({ number, postId, voted }) => {
  const router = useRouter();
  const [isVoted, setisVoted] = useState(voted);
  const [votes, setVotes] = useState(number);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;

  const handleClick = async () => {
    try {
      const payload = { postId };
      setIsLoading(true);
      if (isVoted) setVotes(v => v - 1);
      else setVotes(v => v + 1);
      setisVoted(v => !v);
      await axios.post("/api/post/like", payload);
      setIsLoading(false);
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error("There was an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setVotes(number);
    setisVoted(voted);
  }, [number, voted]);

  return (
    <button
      disabled={isMutating}
      className={`
        flex items-center space-x-2 transition-colors
        text-gray-400 
        hover:text-tealmain
        focus:outline-none focus-visible:ring-2 focus-visible:ring-tealmain
        disabled:opacity-60
      `}
      onClick={handleClick}
      aria-pressed={isVoted}
    >
      {isVoted
        ? <FcLike size={25} className="mr-2" />
        : <FcLikePlaceholder size={25} className="mr-2" />
      }
      <span className="font-semibold">{votes}</span>
      <span className="hidden md:block">likes</span>
    </button>
  );
};

export default LikeButton;
