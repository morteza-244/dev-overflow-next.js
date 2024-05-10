"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GlobalSearchResult from "./GlobalSearchResult";

interface GlobalSearchProps {
  onClose?: (value: boolean) => void;
}

const GlobalSearch = ({ onClose }: GlobalSearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const query = searchParams.get("global");
  const [searchText, setSearchText] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchText("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (searchText) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: searchText,
        });
        router.push(newUrl, {
          scroll: false,
        });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["global", "type"],
          });
          router.push(newUrl, {
            scroll: false,
          });
        }
      }
    }, 500);
    return () => clearTimeout(debounceFn);
  }, [searchText, pathname, router, searchParams, query]);
  return (
    <div className="relative w-full mx-auto lg:max-w-[570px] block" ref={ref}>
      <Search
        className="absolute top-4 left-2 md:top-2 md:left-1"
        color="#64748b"
      />
      <Input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          if (!isOpen) setIsOpen(true);
          if (e.target.value === "" && isOpen) {
            setIsOpen(false);
          }
        }}
        placeholder="Search globally..."
        className="h-14 pl-9 pr-9 md:pr-0 md:h-10 md:pl-8 rounded-t-md rounded-b-none md:rounded-md bg-slate-200 dark:bg-inherit md:dark:bg-muted no-focus placeholder border-b outline-none"
      />
      {isOpen && <GlobalSearchResult onClose={onClose} />}
    </div>
  );
};

export default GlobalSearch;
