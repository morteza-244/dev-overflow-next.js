import GlobalSearch from "@/components/shared/search/GlobalSearch";
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import MobileGlobalSearch from "../search/MobileGlobalSearch";
import MobileNav from "./MobileNav";
import ModeToggle from "./ModeToggle";
import { Skeleton } from "@/components/ui/skeleton";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-[#ffffff] dark:bg-[#0F1117] sticky left-0 top-0 right-0 z-50 w-full gap-5 py-5 px-5 shadow-md dark:shadow-none">
      <div className="hidden sm:block sm:w-1/6">
        <Link href={"/"} className="flex items-center gap-1 max-sm:hidden">
          <Image
            src={"/assets/images/site-logo.svg"}
            alt="Dev-Overflow"
            width={23}
            height={23}
          />
          <p className="text-[18px] md:text-[14px] lg:text-[20px] font-semibold leading-[31.2px] text-[#000000] dark:text-[#FFFFFF] whitespace-nowrap">
            Dev <span className="text-orange-500">Overflow</span>
          </p>
        </Link>
      </div>
      <div className="hidden md:block md:grow">
        <GlobalSearch />
      </div>
      <div className="flex-between sm:flex-row-reverse gap-3 w-full sm:w-auto md:w-1/6 md:justify-start">
        <div className="flex gap-2 sm:flex-row-reverse items-center">
          <ClerkLoading>
            <Skeleton className="w-10 h-10 rounded-full" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                  },
                  variables: {
                    colorPrimary: "#ff7000",
                  },
                }}
              />
            </SignedIn>
          </ClerkLoaded>
          <MobileGlobalSearch />
        </div>
        <div className="flex items-center sm:block">
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
