import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { TAnswer } from "@/types";
import Link from "next/link";
import Metric from "../shared/Metric";
import { Button } from "../ui/button";

interface UserAnswerCardProps {
  answer: TAnswer;
}

const UserAnswerCard = ({ answer }: UserAnswerCardProps) => {
  const { _id, createdAt, author, upVotes, question } = answer;
  return (
    <div className="card-wrapper p-5 rounded-lg">
      <span className="text-xs xs:text-sm text-dark500_light700 flex sm:hidden">
        {getTimestamp(createdAt)}
      </span>
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
          {question.title}
        </h3>
      </div>
      <div className="flex-between mt-3 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user avatar"
          value={author.name}
          title={` • ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyles="body-medium text-dark500_light700"
          isAuthor
        />
        <div className="flex gap-3 justify-between w-full">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatAndDivideNumber(upVotes.length)}
            title="Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Link href={`/question/${question._id}/#${_id}`}>
            <Button className="active:scale-95 transition-transform" size={"sm"} variant={"secondary"}>
              Show Answer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserAnswerCard;
