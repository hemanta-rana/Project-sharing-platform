import Link from "next/link";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ArrowRight,
  ChevronsRight,
  CompassIcon,
  HomeIcon,
  LoaderIcon,
  SparkleIcon,
  Squirrel,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import CustomUserButton from "./custom-user-button";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center group">
      <div className=" flex gap-2">
        <div className="size-8 rounded-full flex items-center justify-center bg-primary ">
          <Squirrel className="size-4 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-red-600">i</span>
      </div>
      <span className="text-black font-extrabold">B </span>
      <span className="text-xl text-red-600 font-bold">uilt</span>
      <span className="text-xl font-bold">This</span>
    </Link>
  );
};
export default function Header() {
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper px-12">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-1">
            <Link
              href={"/"}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
            >
              <HomeIcon className="size-4" />
              <span>Home</span>
            </Link>
            <Link
              href={"/explore"}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
            >
              <CompassIcon className=" size-4" />
              <span>Explore</span>
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Suspense
              fallback={
                <div>
                  <LoaderIcon className="size-4 animate-spin" />
                </div>
              }
            >
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton>
                  <button className=" bg-black rounded-full text-white text-sm px-4 py-1 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <>
                  <Button className=" rounded-full px-4 ">
                    <Link href={"/submit"} className="flex gap-2">
                      <span>Submit Project</span>
                      <ChevronsRight className=" size-4" />
                    </Link>
                  </Button>
                </>
                <CustomUserButton />
              </Show>
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
