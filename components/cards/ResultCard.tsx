import { TSearchResult } from "@/types";
import Link from "next/link";
import Image from 'next/image'
interface ResultCardProps {
  data: TSearchResult;
  onClose?: (value: boolean) => void;
}

const ResultCard = ({ data, onClose }: ResultCardProps) => {
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

  const onCloseModal = () => {
    if (onClose) onClose(false);
  };
  return (
    <Link
      href={renderLink(data.type, data.id)}
      onClick={onCloseModal}
      className="flex items-start w-full cursor-pointer px-2 sm:px-5 py-2.5 hover:bg-light-700/50 hover:dark:bg-dark-500/100 gap-2 transition-all"
    >
      <Image
        src="/assets/icons/tag.svg"
        alt="tags"
        width={18}
        height={18}
        className="invert-colors mt-1 object-contain"
      />
      <div className="flex flex-col">
        <p className="text-[13px] sm:text-[15px] text-dark200-light800 line-clamp-1">
          {data.title}
        </p>
        <p className="font-semibold text-[14px] sm:text-[16px] text-light400_light500 mt-1 capitalize">
          {data.type}
        </p>
      </div>
    </Link>
  );
};

export default ResultCard;
