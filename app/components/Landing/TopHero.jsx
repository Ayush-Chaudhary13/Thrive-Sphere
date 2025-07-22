import Image from "next/image";
import Link from "next/link";

export default function TopHero() {
  return (
    <section
      className="relative min-h-[65vh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-[#23272F] via-[#262F38] to-[#14B8A6] overflow-hidden"
    >
      {/* Subtle background SVG dots or abstract shape */}
      <svg
        className="absolute inset-x-0 top-0 w-full h-40 text-teal-900/20"
        fill="none"
        viewBox="0 0 1440 320"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,64L48,106.7C96,149,192,235,288,245.3C384,256,480,192,576,192C672,192,768,256,864,245.3C960,235,1056,149,1152,117.3C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-8 text-center z-10">
        {/* Logo */}
        <Image
          src="/images/final-logo.png" // Update to your actual logo file
          alt="Thrive Sphere icon"
          width={96}
          height={96}
          className="mx-auto mb-3 drop-shadow-xl rounded-full bg-white/80 p-2"
          priority
        />

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#F3F4F6] drop-shadow-md tracking-tight leading-tight">
          Thrive Together.<br />
          <span className="text-[#14B8A6] font-extrabold">
            A Healthy, Connected You
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-teal-100 text-base md:text-xl font-normal mb-3 mt-2 max-w-xl">
          Join a vibrant community—share experiences, get support and expert insights, and advance your well-being in style.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
          <Link
            href="/auth"
            className="rounded-full bg-[#14B8A6] hover:bg-[#5EEAD4] text-[#23272F] font-bold px-7 py-3 shadow-lg transition"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-teal-500 px-7 py-3 text-[#F3F4F6] font-semibold hover:bg-[#23272f] hover:text-[#14B8A6] transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
