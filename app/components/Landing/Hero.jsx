import Image from "next/image";
import Link from "next/link";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],          // Adjust subsets if needed
  weight: ["400", "700"],      // Choose the font weights you want
});

export default function Hero() {
  return (
    <section
      className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-24 bg-gradient-to-br from-[#23272F] via-[#262F38] to-[#14B8A6]"
    >
      
      <div className="max-w-2xl mx-auto flex flex-col gap-7 text-center z-10">
        <Image
          src="/images/Logo.png" // Place your new logo here
          alt="Thrive Sphere Logo"
          width={250}
          height={250}
          className="mx-auto mb-3 drop-shadow-xl"
        />
        <h1  className={`${orbitron.className} text-4xl md:text-6xl font-bold text-[#F3F4F6] drop-shadow-lg tracking-[0.1em]`}>
          Thrive Sphere
        </h1>
        <h2 className=" text-[0.98rem] font-semibold tracking-[1em] text-[#32c1be] uppercase">
          blossom together
        </h2>
        <p className="text-teal-200 text-lg md:text-2xl font-medium mb-5">
          Empower Your Health Journey in a Modern Connected Community
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth"
            className="rounded-full bg-[#14B8A6] hover:bg-[#5EEAD4] text-[#23272F] font-bold px-7 py-3 shadow-md transition"
          >
            Join Now
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-teal-400 px-7 py-3 text-[#F3F4F6] font-semibold hover:bg-[#262F38] transition"
          >
            Learn More
          </Link>
        </div>
      </div>
      <Image
        src="/images/modern-abstract-health.svg" // Place a relevant modern SVG/background
        alt="Abstract Visual"
        fill
        style={{
          objectFit: "cover",
          opacity: 0.10,
          pointerEvents: "none",
        }}
        className="z-0"
      />
    </section>
  );
}
