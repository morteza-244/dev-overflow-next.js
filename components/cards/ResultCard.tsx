import { TSearchResult } from "@/types";
import { Tag } from "lucide-react";
import Link from "next/link";

interface ResultCardProps {
  data: TSearchResult;
}

const ResultCard = ({data}: ResultCardProps) => {
  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };
  return (
    <Link
      href={renderLink(data.type, data.id)}
      className="flex items-start w-full cursor-pointer px-5 py-2.5 hover:bg-light-700/50 hover:dark:bg-dark-500/50 gap-2 transition-all"
    >
      <Tag size={20} />
      <div className="flex flex-col">
        <p className="body-medium text-dark200-light800 line-clamp-1 body-medium">
          {data.title}
        </p>
        <p className="font-bold text-light400_light500 mt-1 capitalize">
          {data.type}
        </p>
      </div>
    </Link>
  );
};

export default ResultCard;
