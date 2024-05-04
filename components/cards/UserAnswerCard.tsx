import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { TAnswer } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import ActionsButton from "../shared/ActionsButton";
import Metric from "../shared/Metric";
import { Button } from "../ui/button";

interface UserAnswerCardProps {
  answer: TAnswer;
  clerkId?: string | null;
}

const UserAnswerCard = ({ answer, clerkId }: UserAnswerCardProps) => {
  const { _id, createdAt, author, upVotes, question } = answer;
  const showActionsButton = clerkId && clerkId === author.clerkId;

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
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="like icon"
          value={formatAndDivideNumber(upVotes.length)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <div className="flex gap-3 justify-end w-full">
          <SignedIn>
            {showActionsButton && <ActionsButton type="ANSWER" itemId={_id} />}
          </SignedIn>
          <Link href={`/question/${question._id}/#${_id}`}>
            <Button
              className="active:scale-95 transition-transform"
              size={"sm"}
              variant={"secondary"}
            >
              Show Answer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserAnswerCard;
