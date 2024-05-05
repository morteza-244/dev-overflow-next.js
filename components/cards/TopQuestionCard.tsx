import { getTimestamp } from "@/lib/utils";
import { TQuestion } from "@/types";
import { CarouselItem } from "../ui/carousel";
import Link from 'next/link';
import Image from 'next/image'
interface TopQuestionCardProps {
  question: TQuestion;
}

const TopQuestionCard = ({ question }: TopQuestionCardProps) => {
  return (
    <CarouselItem className="basis-1/2 bg-slate-100 dark:bg-dark-200 shadow-md dark:shadow-none rounded-md space-y-2 py-2 px-4">
      <span className="text-[14px] text-dark500_light700 line-clamp-1 flex sm:hidden">
        {getTimestamp(question.createdAt)}
      </span>
      <Link
        href={`/question/${question._id}`}
        className="line-clamp-1 text-[15px] text-dark200_light900 font-semibold"
      >
        {question.title}
      </Link>
      <div className="flex items-center gap-1 text-[13px]">
        <Image
          src={question.author.picture}
          alt={"user profile"}
          width={20}
          height={20}
          className={"object-cover w-5 h-5 rounded-full"}
        />
        <p>{question.author.name}</p>
        <p>
          • asked
          {getTimestamp(question.createdAt)}
        </p>
      </div>
    </CarouselItem>
  );
};

export default TopQuestionCard;
