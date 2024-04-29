import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";

interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upVotes: number;
  hasUpVoted: boolean;
  downVotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  downVotes,
  hasDownVoted,
  hasUpVoted,
  itemId,
  type,
  upVotes,
  userId,
  hasSaved,
}: VotesProps) => {
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
          />
          <div className="flex-center min-w-6 rounded-md bg-slate-200 dark:bg-muted">
            <p className="text-sm">{formatAndDivideNumber(upVotes)}</p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
          />
          <div className="flex-center min-w-6 rounded-md bg-slate-200 dark:bg-muted">
            <p className="text-sm">{formatAndDivideNumber(downVotes)}</p>
          </div>
        </div>
      </div>
      <Image
        src={
            hasSaved
            ? "/assets/icons/star-filled.svg"
            : "/assets/icons/star-red.svg"
        }
        width={18}
        height={18}
        alt="star"
        className="cursor-pointer"
      />
    </div>
  );
};

export default Votes;
