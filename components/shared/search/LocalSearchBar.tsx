"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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
        value={""}
        onChange={() => {}}
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
