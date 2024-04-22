"use client";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();
  
  return (
    <section className="background-light900_dark200 sticky left-0 top-0 flex flex-col h-screen justify-between overflow-y-auto dark:border-gray-700 dark:border-r p-5 pt-32 shadow-md dark:shadow-none max-sm:hidden lg:w-[266px] custom-scrollbar">
      <div className="flex flex-1 flex-col gap-2">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              key={link.route}
              href={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-md text-white"
                  : "text-dark300_light900"
              } flex-start py-3 sm:px-3 lg:px-4 gap-4 bg-transparent text-sm sm:text-[16px]`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={isActive ? "" : "invert-colors"}
              />
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col w-full gap-3 mt-3">
          <Link href="/sign-in">
            <Button
              variant={"secondary"}
              size={"sm"}
              className="w-full px-4 dark:text-primary-500"
            >
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Login</span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              variant={"secondary"}
              size={"sm"}
              className="w-full px-4 dark:text-primary-500"
            >
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
