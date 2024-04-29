import { IAnswer } from "@/database/answer.model";
import { getTimestamp } from "@/lib/utils";
import Link from "next/link";
import Image from 'next/image'
import ParseHTML from "@/components/shared/ParseHTML";
const AnswerCard = ({ answer }: { answer: IAnswer }) => {
  return (
    <article className="py-10 border-b">
      <div className="flex-between">
        <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
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
              <p className="line-clamp-1 text-sm">
                <span className="max-sm:hidden mx-1">-</span>answered{" "}
                {getTimestamp(answer.createdAt)}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <ParseHTML content={answer.content} />
    </article>
  );
};

export default AnswerCard;
