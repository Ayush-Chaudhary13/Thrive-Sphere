import prisma from "app/libs/prismadb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import CommentsList from "./components/CommentsList";
import LikeButton from "../components/Like-Button";
import CommentButton from "../components/Comment-Button";
import DeleteButton from "../components/Delete-Button";
import ShareButton from "../components/Share-Button";
import { getCurrentUser } from "app/libs/session";
import { formatTimeToNow } from "app/libs/utils";

const PostPage = async ({ params }) => {
  const user = await getCurrentUser();
  const postId = params.postId;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      votes: true,
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });

  const voted = post.votes.some((vote) => vote.userId === user.id);

  return (
    <Card className="md:container md:w-full bg-white text-black border border-gray-200 shadow-lg" id="post">
      <CardHeader>
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <span>Posted by</span>
          <Avatar className="w-6 h-6">
            <AvatarImage src={post.author.image} alt={post.author.name || "user"} />
            <AvatarFallback>
              {post.author.name ? post.author.name.charAt(0).toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
          <span className="text-black font-semibold">{post.author.name}</span>
          <span className="ml-2 text-xs text-gray-600">
            {formatTimeToNow(new Date(post.createdAt))}
          </span>
        </div>
        <CardTitle className="text-black">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center">
        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="mb-5 rounded-lg border border-gray-200"
          />
        )}
        <p className="text-gray-900">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col w-full">
        <div className="flex gap-6 items-center w-full mb-2">
          <CardDescription>
            <CommentButton number={post?.comments.length} />
          </CardDescription>
          <CardDescription>
            <LikeButton
              voted={voted}
              postId={post.id}
              number={post?.votes.length}
            />
          </CardDescription>
          <CardDescription>
            <ShareButton />
          </CardDescription>
          <CardDescription>
            {post.authorId === user.id && (
              <DeleteButton postId={postId} communityName={params.id} />
            )}
          </CardDescription>
        </div>
        <div className="w-full" id="comment">
          <CommentsList user={user} postId={postId} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostPage;
