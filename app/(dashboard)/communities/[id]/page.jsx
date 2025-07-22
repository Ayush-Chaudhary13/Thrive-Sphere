import prisma from "app/libs/prismadb";
import PostList from "./components/PostList";
import { Suspense } from "react";

const page = async ({ params }) => {
  const community = await prisma.community.findFirst({
    where: { name: params.id },
  });

  return (
    <Suspense
      fallback={
        <div className="text-xl text-foreground font-bold h-[75vh] flex items-center justify-center text-center">
          Create posts and <br className="sm:hidden" />
          share with community
        </div>
      }
    >
      <PostList community={community} />
    </Suspense>
  );
};

export default page;
