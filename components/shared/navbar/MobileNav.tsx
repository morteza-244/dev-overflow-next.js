"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="space-y-1">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        return (
          <SheetClose asChild key={link.route}>
            <Link
              href={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-md text-white"
                  : "text-dark300_light900"
              } flex-start py-3 px-2 gap-4 bg-transparent text-sm sm:text-[16px]`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={isActive ? "" : "invert-colors"}
              />
              <p>{link.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>
            <Link href={"/"} className="flex items-center gap-1">
              <Image
                src={"/assets/images/site-logo.svg"}
                alt="Dev-Overflow"
                width={23}
                height={23}
              />
              <p className="sm:text-[24px] font-semibold leading-[31.2px] text-[#000000] dark:text-[#FFFFFF]">
                Dev <span className="text-primary-500">Overflow</span>
              </p>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="py-4 h-full flex flex-col justify-between">
          <NavContent />
          <SheetFooter>
            <SignedOut>
              <div className="flex flex-col w-full gap-3">
                <SheetClose asChild>
                  <Link href="/sign-in">
                    <Button
                      variant={"secondary"}
                      size={"sm"}
                      className="w-full px-4 dark:text-primary-500"
                    >
                      Login
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/sign-up">
                    <Button
                      variant={"secondary"}
                      size={"sm"}
                      className="w-full px-4 dark:text-primary-500"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
