import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { TQuestion } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import ActionsButton from "../shared/ActionsButton";
import Metric from "../shared/Metric";
import RenderTag from "../shared/RenderTag";

interface QuestionCardProps {
  question: TQuestion;
  clerkId?: string | null;
}

const QuestionCard = ({ question, clerkId }: QuestionCardProps) => {
  const { createdAt, _id, title, tags, author, upVotes, answers, views } =
    question;

  const showActionsButton = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper p-5 rounded-lg space-y-3">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="text-[14px] text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} tag={tag} />
        ))}
      </div>
      <div className="flex-between w-full flex-wrap gap-2.5">
        <Metric
          imgUrl={author.picture}
          alt="avatar"
          value={author.name}
          href={`/profile/${author._id}`}
          isAuthor
          title={` - asked ${getTimestamp(createdAt)}`}
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upVotes"
          value={formatAndDivideNumber(upVotes.length)}
          title={"Votes"}
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(answers.length)}
          title={"Answers"}
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(views)}
          title={"Views"}
        />
      </div>
      <SignedIn>
        {showActionsButton && <ActionsButton type="QUESTION" itemId={_id} />}
      </SignedIn>
    </div>
  );
};

export default QuestionCard;
