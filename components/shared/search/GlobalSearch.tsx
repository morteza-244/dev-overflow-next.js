"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GlobalSearchResult from "./GlobalSearchResult";

const GlobalSearch = () => {
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
    <div className="relative w-full mx-auto max-w-[570px] max-lg:hidden" ref={ref}>
      <Search className="absolute top-2 left-1" color="#64748b" />
      <Input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          if (!isOpen) setIsOpen(true);
          if (e.target.value === "" && isOpen) setIsOpen(false);
        }}
        placeholder="Search globally..."
        className="h-10 pl-8 bg-slate-200 dark:bg-muted"
      />
      {isOpen && <GlobalSearchResult />}
    </div>
  );
};

export default GlobalSearch;
