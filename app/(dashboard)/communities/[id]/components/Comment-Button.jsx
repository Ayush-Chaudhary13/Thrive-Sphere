"use client";
import React from "react";
import { BsFillChatRightFill } from "react-icons/bs";

const CommentButton = ({ number }) => {
  return (
    <button
      className="
        flex items-center space-x-2
        text-gray-400
        hover:text-tealmain
        transition-colors
        font-medium
        focus:outline-none focus-visible:ring-2 focus-visible:ring-tealmain
      "
      type="button"
    >
      <BsFillChatRightFill size={20} />
      <span className="font-semibold">{number}</span>
      <span className="hidden md:block">comments</span>
    </button>
  );
};

export default CommentButton;
