import { getTimestamp } from "@/lib/utils";
import { Tag } from "@/types";
import Link from "next/link";
import Metric from "../shared/Metric";
import RenderTag from "../shared/RenderTag";

interface QuestionCardProps {
  _id: string;
  title: string;
  tags: Tag[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upVotes: string;
  answers: number;
  createdAt: Date;
  views: number;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upVotes,
  answers,
  createdAt,
  views,
}: QuestionCardProps) => {
  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3 5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} tag={tag} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="avatar"
          value={author.name}
          href={`/profile/${author._id}`}
          isAuthor
          title={" - 1 hour ago"}
          textStyles="text-sm"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={upVotes}
          title={"Votes"}
          textStyles="text-sm"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={answers}
          title={"Answers"}
          textStyles="text-sm"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={views}
          title={"Views"}
          textStyles="text-sm"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
