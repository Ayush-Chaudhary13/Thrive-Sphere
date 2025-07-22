"use client";
import { useState, useTransition } from "react";
import CommentForm from "./CommentForm";
import Reply from "./Reply";
import { deleteComment } from "app/actions/actions";
import { formatTimeToNow } from "app/libs/utils";

const Comment = ({ comment, user, key }) => {
  const [replyForm, setReplyForm] = useState(false);
  const [settings, setSettings] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <article className="p-4 text-base relative bg-white rounded-xl border border-gray-200 shadow-sm">
        <footer className="flex justify-between items-center mb-2 relative">
          <div className="flex items-center">
            <span className="inline-flex items-center mr-3 text-sm text-black">
              <img
                className="mr-2 w-7 h-7 rounded-full"
                src={comment.author.image}
                alt={comment.author.name || "user"}
              />
              {comment.author.name}
            </span>
            <span className="text-xs text-gray-600 ml-2">
              <time dateTime={comment.createdAt}>
                {formatTimeToNow(new Date(comment.createdAt))}
              </time>
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setSettings(!settings)}
              aria-expanded={settings}
              aria-controls={`dropdownComment${key}`}
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
            {settings && (
              <div
                id={`dropdownComment${key}`}
                className="absolute right-0 z-10 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg"
              >
                <ul className="py-1 text-sm text-black" aria-labelledby="dropdownMenuIconHorizontalButton">
                  <li>
                    {comment.authorId === user.id && (
                      <button
                        onClick={() => startTransition(async () => {
                          await deleteComment(comment.postId, comment.id, comment.replies);
                        })}
                        className="block py-2 px-4 w-full text-left hover:bg-gray-100 hover:text-rose-500 rounded transition"
                      >
                        {isPending ? "Removing..." : "Remove"}
                      </button>
                    )}
                  </li>
                  <li>
                    <button
                      className="block py-2 px-4 w-full text-left hover:bg-gray-100 hover:text-tealmain rounded transition"
                    >
                      Report
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </footer>
        <p className="text-gray-800 mb-2">{comment.text}</p>
        <div className="flex mt-2 space-x-4">
          <button
            onClick={() => setReplyForm(!replyForm)}
            type="button"
            className="flex items-center text-xs text-gray-700 hover:text-tealmain transition"
          >
            <svg
              aria-hidden="true"
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Reply
          </button>
          {replyForm && (
            <CommentForm
              postId={comment.postId}
              user={user}
              replyToId={comment.id}
            />
          )}
        </div>
      </article>
      {/* Render replies under the parent comment */}
      {comment.replies.map((reply, idx) => (
        <Reply key={idx} reply={reply} user={user} />
      ))}
      <hr className="border-gray-200 my-4" />
    </>
  );
};

export default Comment;
