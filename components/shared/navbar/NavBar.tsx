import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import ModeToggle from "./ModeToggle";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-[#ffffff] dark:bg-[#0F1117] fixed z-50 w-full gap-5 p-6 shadow-lg dark:shadow-none sm:px-12">
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src={"/assets/images/site-logo.svg"}
          alt="Dev-Overflow"
          width={23}
          height={23}
        />
        <p className="text-[24px] font-semibold leading-[31.2px] text-[#000000] dark:text-[#FFFFFF] max-sm:hidden">
          Dev <span className="text-orange-500">Overflow</span>
        </p>
      </Link>
      <div className="flex justify-between items-center gap-5">
        <ModeToggle />
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
      </div>
    </nav>
  );
};

export default NavBar;
