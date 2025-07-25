import { getCurrentUser } from "app/libs/session";
import Post from "./Post";
import prisma from "app/libs/prismadb";

const PostList = async ({ community }) => {
  const user = await getCurrentUser();

  const posts = await prisma.post.findMany({
    where: {
      communityId: community.id,
    },
    include: {
      votes: true,
      comments: true,
      author: true,
      community: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (posts.length === 0) {
    return (
      <div className="text-xl text-foreground font-bold h-[75vh] flex items-center justify-center text-center">
        Create posts and <br className="sm:hidden" /> share with community
      </div>
    );
  }

  return (
    <div>
      <section>
        <ul className="mt-8 flex flex-col items-center justify-center md:mt-auto space-y-6">
          {posts.map((item, idx) => (
            <Post item={item} key={item.id || idx} user={user.id} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PostList;
