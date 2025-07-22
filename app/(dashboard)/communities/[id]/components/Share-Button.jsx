"use client";
import { FaShare } from "react-icons/fa";
import toast from "react-hot-toast";

const ShareButton = () => {
  function copy() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  }

  return (
    <button
      onClick={copy}
      type="button"
      className="
        flex items-center space-x-2
        text-gray-400
        hover:text-tealmain
        transition-colors
        font-medium
        focus:outline-none focus-visible:ring-2 focus-visible:ring-tealmain
      "
    >
      <FaShare size={20} className="mr-2" />
      <span>Share</span>
    </button>
  );
};

export default ShareButton;
