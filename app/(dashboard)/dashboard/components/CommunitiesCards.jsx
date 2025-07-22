import React from "react";
import { BsPeople } from "react-icons/bs";
import { Roboto_Condensed } from "next/font/google";
import Link from "next/link";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700",
});

function CommunityCard({ community }) {
  return (
    <Link
      href={`/communities/${community.name}`}
      className="relative block shadow-xl p-5 rounded-lg h-[18.75rem] w-[20rem] flex flex-col justify-between items-start bg-cover bg-center group transition"
      style={
        community.image
          ? { backgroundImage: `url(${community.image})` }
          : { backgroundColor: "black" }
      }
    >
      {/* Overlay */}
      <div className="absolute inset-0 rounded-lg bg-black bg-opacity-60 group-hover:bg-opacity-75 transition" />
      <div className="relative z-10">
        <p className="text-white font-black uppercase text-xs drop-shadow-md">
          Created By {community.creator.name}
        </p>
        <h1 className={`font-black text-white leading-[1.2] text-[2.5rem] mt-4 drop-shadow-md ${roboto_condensed.className}`}>
          {community.name}
        </h1>
        <div className="mt-3 font-extrabold text-white drop-shadow-md flex items-center space-x-2">
          <BsPeople size={20} />
          <span>{community.subscribers.length} Followers</span>
        </div>
      </div>
    </Link>
  );
}

const CommunitiesCards = ({ communities }) => {
  return (
    <div className="hidden md:flex md:flex-row gap-10 flex-wrap">
      {communities.map((item) => (
        <CommunityCard key={item.id} community={item} />
      ))}
    </div>
  );
};

export default CommunitiesCards;
