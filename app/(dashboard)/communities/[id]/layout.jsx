import CommunityInfo from "./components/CommunityInfo";
import { Eczar } from "next/font/google";
const eczar = Eczar({
  weight: "600",
  style: "normal",
  subsets: ["devanagari"],
});
import { notFound } from "next/navigation";
import { Suspense } from "react";
import prisma from "app/libs/prismadb";
import LoadingInfoCard from "./components/LoadingInfoCard";

const layout = async ({ params, children }) => {
  const community = await prisma.community.findFirst({
    where: { name: params.id },
  });
  if (!community) return notFound();

  return (
    <div className="flex flex-col">
      {/* Banner with a semi-transparent dark overlay for legibility */}
      <div className="relative h-48 w-full z-1 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/Banner_4.jpg")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none" />
        <h1
          style={{ fontStyle: "italic", letterSpacing: "0.1em" }}
          className={`relative text-white text-center text-7xl tracking-wider font-semibold italic drop-shadow-xl ${eczar.className}`}
        >
          {params.id}
        </h1>
      </div>
      <div className="container w-screen items-center md:items-start md:mt-5 md:gap-10 flex flex-col-reverse md:flex-row">
        <div className="md:mt-0 w-screen">{children}</div>
        <div className="md:top-20 md:h-full md:sticky">
          <Suspense fallback={<LoadingInfoCard />}>
            <CommunityInfo params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default layout;
