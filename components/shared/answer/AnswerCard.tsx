import ParseHTML from "@/components/shared/ParseHTML";
import { getTimestamp } from "@/lib/utils";
import { TAnswer } from "@/types";
import { Schema } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import Votes from "../Votes";

interface AnswerCardProps {
  answer: TAnswer;
  userId: Schema.Types.ObjectId;
}

const AnswerCard = ({ answer, userId }: AnswerCardProps) => {
  return (
    <article className="border-b card-wrapper rounded-md p-4">
      <div className="flex-between mb-4">
        <div className="w-full flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${answer.author.clerkId}`}
            className="flex flex-1 items-start sm:items-center gap-1"
          >
            <Image
              src={answer.author.picture}
              alt="user profile"
              width={18}
              height={18}
              className="rounded-full w-5 h-5 object-cover"
            />
            <div className="flex flex-col sm:flex-row sm:items-center">
              <p className="text-sm">{answer.author.name}</p>
              <p className="line-clamp-1 text-xs sm:text-sm">
                <span className="max-sm:hidden mx-1">-</span>answered{" "}
                {getTimestamp(answer.createdAt)}
              </p>
            </div>
          </Link>
          <div>
            <Votes
              type="Answer"
              itemId={JSON.stringify(answer._id)}
              userId={JSON.stringify(userId)}
              upVotes={answer.upVotes.length}
              hasUpVoted={answer.upVotes.includes(userId)}
              downVotes={answer.downVotes.length}
              hasDownVoted={answer.downVotes.includes(userId)}
            />
          </div>
        </div>
      </div>
      <ParseHTML content={answer.content} />
    </article>
  );
};

export default AnswerCard;
