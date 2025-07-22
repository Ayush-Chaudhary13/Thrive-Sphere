import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center bg-[#1E252B] border-t border-gray-700 py-5">
      <div className="max-w-xl w-full flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 mb-2">
          <Image src="/images/Logo.png" alt="logo" width={40} height={40} className="rounded-xl" />
          <span className="font-bold text-[#14B8A6] text-lg">Thrive Sphere</span>
        </div>
        <div className="flex gap-4 py-3">
          <Link href="https://github.com/Ayush-Chaudhary13" target="_blank" aria-label="GitHub">
            <FaGithub className="h-6 w-6 text-gray-300 hover:text-[#14B8A6] transition" />
          </Link>
          <Link href="https://www.linkedin.com/in/ayush--chaudhary/" target="_blank" aria-label="LinkedIn">
            <FaLinkedin className="h-6 w-6 text-gray-300 hover:text-[#14B8A6] transition" />
          </Link>
          <Link href="https://twitter.com/yourhandle" target="_blank" aria-label="Twitter">
            <FaTwitter className="h-6 w-6 text-gray-300 hover:text-[#14B8A6] transition" />
          </Link>
          <Link href="https://discord.com/invite/yourinvite" target="_blank" aria-label="Discord">
            <FaDiscord className="h-6 w-6 text-gray-300 hover:text-[#14B8A6] transition" />
          </Link>
        </div>
        <div className="text-gray-400 text-xs text-center">
          &copy; {new Date().getFullYear()} Thrive Sphere &nbsp;|&nbsp;
          <Link href="/terms" className="underline hover:text-[#14B8A6]">Terms</Link> &amp;{" "}
          <Link href="/privacy" className="underline hover:text-[#14B8A6]">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
