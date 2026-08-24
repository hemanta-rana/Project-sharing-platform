import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-black/80 py-12 ">
      <div className="wrapper flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-white">
          Project Sharing Platform
        </h2>
        <div className="flex items-center justify-center gap-3 text-primary-foreground/60">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link href="https://www.instagram.com/admish_mgr/" className="">
            <div className="text-white border-2 w-9 h-9 rounded-full flex items-center justify-center">
              <Image
                src="/instagram.svg"
                alt="logo"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </div>
          </Link>
          <Link href="/">
            <div className="text-white border-2 w-9 h-9 rounded-full flex items-center justify-center">
              <Image
                src="/facebook.svg"
                alt="logo"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </div>
          </Link>

          <Link href="https://github.com/hemanta-rana">
            <div className="text-white border-2 w-9 h-9 rounded-full flex items-center justify-center">
              <Image
                src="/github.svg"
                alt="logo"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
