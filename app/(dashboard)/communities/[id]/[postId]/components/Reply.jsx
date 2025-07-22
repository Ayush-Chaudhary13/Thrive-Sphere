"use client";
import React, { useState, useTransition } from "react";
import { formatTimeToNow } from "app/libs/utils";
import { deleteComment } from "app/actions/actions";

const Reply = ({ reply, user }) => {
  const [rsettings, rsetSettings] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <article className="relative child-comment p-5 ml-6 lg:ml-12 text-base bg-white border border-gray-200 rounded-xl shadow-sm">
      <footer className="flex justify-between items-center mb-2 relative">
        <div className="flex items-center">
          <span className="inline-flex items-center mr-3 text-sm text-black">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={reply.author.image}
              alt="replier"
            />
            {reply.author.name}
          </span>
          <span className="text-xs text-gray-600 ml-2">
            <time dateTime={reply.createdAt} title={reply.createdAt}>
              {formatTimeToNow(new Date(reply.createdAt))}
            </time>
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => rsetSettings(!rsettings)}
            aria-expanded={rsettings}
            aria-controls={`dropdownReply${reply.id}`}
            className="inline-flex items-center p-2 text-gray-700 hover:text-tealmain hover:bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-tealmain/60"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
          {rsettings && (
            <div
              id={`dropdownReply${reply.id}`}
              className="absolute right-0 z-10 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg"
            >
              <ul className="py-1 text-sm text-black">
                <li>
                  {reply.authorId === user.id && (
                    <button
                      onClick={() => startTransition(async () => {
                        await deleteComment(reply.postId, reply.id, null);
                      })}
                      className="block w-full text-left py-2 px-4 hover:bg-gray-100 hover:text-rose-500 rounded transition"
                    >
                      {isPending ? "Removing..." : "Remove"}
                    </button>
                  )}
                </li>
                <li>
                  <button
                    className="block w-full text-left py-2 px-4 hover:bg-gray-100 hover:text-tealmain rounded transition"
                  >
                    Report
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </footer>
      <p className="text-gray-800">{reply.text}</p>
    </article>
  );
};

export default Reply;
