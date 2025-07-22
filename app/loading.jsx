'use client';

import { CircleLoader } from "react-spinners";

const Loader = () => {
  return ( 
    <div
      className="
        h-[100vh]
        w-full
        flex
        flex-col
        justify-center
        items-center
        bg-background
        text-foreground
      "
    >
      <CircleLoader
        size={100}
        color="#36d7b7"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
