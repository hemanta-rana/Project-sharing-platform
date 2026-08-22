import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRightIcon, Bubbles, EyeIcon, RocketIcon, UserIcon } from "lucide-react";
import StatsCards from "./Stats-cards";


const LiveBage = () => {
  return (
    <Badge
      variant="secondary"
      className=" h-auto px-4 py-2 text-sm backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
      <span className="text-muted-foreground">
        Join the community of creators and innovators
      </span>
    </Badge>
  );
};

export default function HeroSection() {

    const statsData = [
        {
            icon: RocketIcon,
            value: "100+",
            label: "Projects Launched",
        },
        {
            icon: UserIcon,
            value: "50+",
            label: "Active Creators",
            hasBorder: true,
        },
        {
            icon:EyeIcon,
            value: "10k+",
            label: "Community Members",
            hasBorder: true,
        }
    ];
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20 ">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center text-center lg:py-24 py-12 gap-2">
          <LiveBage />

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
            Share What You&apos;ve Built, Discover What&apos;s Launching{" "}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Showcase what you’ve built, discover innovative projects, connect
            with creators, and turn your ideas into something the world can
            explore.{" "}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              render={<Link href="/submit" />}
              size="lg"
              className="text-base rounded-full px-5 py-5 shadow-lg"
            >
                <Bubbles className="size-5" />
              Share Your Project
            </Button>
            <Button
              render={<Link href="/explore" />}
              size="lg"
              className="text-base rounded-full px-5 py-5 shadow-lg"
              variant="outline"
            >
              Explore Projects
              <ArrowRightIcon className="size-5 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl sm:gap-12 ">
          {
          statsData.map((stat)=>(
             <StatsCards key={stat.label} {...stat}  />
          )
            )
          }
          </div>

         
        </div>
      </div>
    </section>
  );
}
