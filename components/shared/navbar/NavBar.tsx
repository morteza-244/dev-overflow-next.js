import GlobalSearch from "@/components/shared/search/GlobalSearch";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import ModeToggle from "./ModeToggle";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-[#ffffff] dark:bg-[#0F1117] sticky left-0 top-0 right-0 z-50 w-full gap-5 py-5 px-5 shadow-md dark:shadow-none">
      <div className="hidden md:block md:w-1/6">
        <Link href={"/"} className="flex items-center gap-1 max-sm:hidden">
          <Image
            src={"/assets/images/site-logo.svg"}
            alt="Dev-Overflow"
            width={23}
            height={23}
          />
          <p className="text-[24px] font-semibold leading-[31.2px] text-[#000000] dark:text-[#FFFFFF] whitespace-nowrap">
            Dev <span className="text-orange-500">Overflow</span>
          </p>
        </Link>
      </div>
      <div className="hidden md:block md:w-3/6 xl:grow">
        <GlobalSearch />
      </div>
      <div className="flex-between sm:flex-row-reverse gap-5 w-full md:w-1/6 md:justify-start">
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
        <div className="flex items-center sm:block">
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
