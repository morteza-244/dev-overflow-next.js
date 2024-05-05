"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface LocalSearchBarProps {
  route: string;
  iconPosition: string;
  placeholder: string;
  imgSrc: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  iconPosition,
  imgSrc,
  otherClasses,
  placeholder,
  route,
}: LocalSearchBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.get("q");
  const [searchText, setSearchText] = useState(query || "");

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (searchText) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: searchText,
        });
        router.push(newUrl, {
          scroll: false,
        });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["q"],
          });
          router.push(newUrl, {
            scroll: false,
          });
        }
      }
    }, 500);
    return () => clearTimeout(debounceFn);
  }, [searchText, pathname, router, route, searchParams, query]);
  return (
    <div
      className={`background-light800_darkGradient flex min-h-[42px] grow items-center rounded-md px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={placeholder}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
