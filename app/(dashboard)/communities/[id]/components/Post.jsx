import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import LikeButton from "./Like-Button";
import CommentButton from "./Comment-Button";
import ShareButton from "./Share-Button";
import Link from "next/link";
import { formatTimeToNow } from "app/libs/utils";

const Post = ({ item, user }) => {
  const voted = item.votes.some(vote => vote.userId === user);

  return (
    <Card className="md:container w-full bg-white border border-gray-200 text-black mb-6">
      <Link href={`/communities/${item.community.name}/${item.id}#post`} className="block">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2 text-gray-700 relative">
            <span>Posted by</span>
            <Avatar className="w-6 h-6">
              <AvatarImage src={item.author.image} alt={item.author.name || "user"} />
              <AvatarFallback>
                {item.author.name ? item.author.name.charAt(0).toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            <span className="text-black font-semibold">{item.author.name}</span>
            <span>{formatTimeToNow(new Date(item.createdAt))}</span>
            <span className='absolute right-0 hidden md:block text-gray-600'>{item.community.name} community</span>
          </div>
          <CardTitle className="text-black">{item.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center">
          {item.image && (
            <img src={item.image} alt="post" className='mb-5 rounded-lg border border-gray-300' />
          )}
          <p className="text-gray-800">{item.content}</p>
        </CardContent>
      </Link>
      <CardFooter className="flex gap-6 items-center w-full mt-2">
        <CardDescription>
          <Link href={`/communities/${item.community.name}/${item.id}/#comment`}>
            <CommentButton number={item?.comments.length} />
          </Link>
        </CardDescription>
        <CardDescription>
          <LikeButton
            voted={voted}
            postId={item.id}
            number={item?.votes.length}
          />
        </CardDescription>
        <CardDescription>
          <ShareButton />
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

export default Post
