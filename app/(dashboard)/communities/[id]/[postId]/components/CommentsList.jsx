import React from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import prisma from "app/libs/prismadb";

// The Comments component fetches and displays all top-level comments for a given post
const Comments = async ({ user, postId }) => {
  let comments = [];

  // Fetch comments with author information, and their direct replies (and author info)
  try {
    comments = await prisma.comment.findMany({
      where: {
        postId: postId,
        replyToId: null,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    // You could optionally show an error state in the UI
  }

  return (
    <section className="bg-white py-8 lg:py-16 w-full">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg lg:text-2xl font-bold text-black">
            Comments ({comments.length})
          </h2>
        </div>
        {/* Only show form if user is logged in */}
        {user ? (
          <CommentForm user={user} postId={postId} replyToId={null} />
        ) : (
          <div className="my-6 text-gray-600 font-medium text-sm">
            Please sign in to comment.
          </div>
        )}

        {/* Comments list or empty state */}
        {comments.length === 0 ? (
          <p className="text-gray-600 font-medium mt-8 text-center">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-8">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Comments;
