import prisma from "app/libs/prismadb";
import { getCurrentUser } from "app/libs/session";
import { redirect } from "next/navigation";
import CreatePostForm from "./CreatePostForm";

const page = async ({ params }) => {
  const user = await getCurrentUser();
  const community_name = params.id;

  const subscription = await prisma.subscription.findFirst({
    where: {
      community: { name: community_name },
      user: { id: user.id },
    },
  });

  const isSubscribed = !!subscription;

  if (!isSubscribed) {
    redirect(`/communities/${community_name}`);
  }

  if (!subscription) {
    // Optionally, show a loading spinner if hydration/loading state matters
    return <div className="text-foreground text-lg">Loading...</div>;
  }

  return (
    <CreatePostForm
      communityId={subscription.communityId}
      community_name={community_name}
    />
  );
};

export default page;
