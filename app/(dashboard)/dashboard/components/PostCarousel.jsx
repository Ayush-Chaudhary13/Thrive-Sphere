"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { Card, CardSection, Title, Text, useMantineTheme, rem } from "@mantine/core";
import LikeButton from "../../communities/[id]/components/Like-Button";
import ShareButton from "../../communities/[id]/components/Share-Button";
import Loader from "../loading";

function PostCard({ id, image, title, authorName, votes, user, content, community }) {
  const voted = votes.some((vote) => vote.userId === user);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Card
      style={{
        width: mobile ? "100vw" : rem(400),
        height: rem(500),
        background: "#fff",             // Ensures white background
        color: "#111",                  // Fallback text color
      }}
      shadow="sm"
      radius="md"
      withBorder
    >
      <Card.Section className="relative h-1/2 rounded-t-md overflow-hidden">
        {image && (
          <Image
            src={image}
            alt="post image"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        )}
      </Card.Section>
      <div className="flex flex-col justify-between h-1/2 p-4">
        <Link href={`/communities/${community.name}/${id}#post`} passHref>
          <div>
            <Title order={3} className="truncate font-bold text-black">
              {title.length > 30 ? title.substring(0, 30) + "…" : title}
            </Title>
            <Text
              className="mt-2 line-clamp-4 text-gray-800"
              style={{ color: "#222" }}
            >
              {content.length > 100 ? content.substring(0, 100) + "…" : content}
            </Text>
          </div>
        </Link>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-3 items-center">
            <LikeButton voted={voted} postId={id} number={votes.length} />
            <ShareButton />
          </div>
          <Text size="xs" className="font-medium text-gray-700">
            Posted by {authorName.length > 10 ? authorName.substring(0, 10) + "…" : authorName}
          </Text>
        </div>
      </div>
    </Card>
  );
}

export default function PostCarousel({ posts, user }) {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const slides = posts.map((item) => (
    <Carousel.Slide key={item.id}>
      <PostCard {...item} user={user.id} />
    </Carousel.Slide>
  ));

  return (
    <div className="rounded-lg">
      {mobile ? (
        <div className="flex flex-col gap-5 items-center">
          {posts.map((item) => (
            <PostCard {...item} user={user.id} key={item.id} />
          ))}
        </div>
      ) : (
        <Carousel
          slideSize="30%"
          slideGap="xl"
          align="start"
          loop
          withIndicators
          orientation="horizontal"
          slidesToScroll={3}
          breakpoints={[
            { maxWidth: "sm", slideSize: "100%", slidesToScroll: 1, orientation: "vertical" },
          ]}
        >
          {slides}
        </Carousel>
      )}
    </div>
  );
}
