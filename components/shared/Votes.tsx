"use client";
import { downVoteAnswer, upVoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downVoteQuestion,
  upVoteQuestion,
} from "@/lib/actions/question.action";
import { saveQuestion } from "@/lib/actions/user.action";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type TAction = "DOWN_VOTE" | "UP_VOTE";
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
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    viewQuestion({
      userId: userId ? JSON.parse(userId) : undefined,
      questionId: JSON.parse(itemId),
    });
  }, [userId, itemId, pathname, router]);

  const handleSave = async () => {
    await saveQuestion({
      path: pathname,
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
    });
  };
  const handleVote = async (action: TAction) => {
    if (!userId) return;
    if (action === "UP_VOTE") {
      if (type === "Question") {
        await upVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      }
    }
    if (action === "DOWN_VOTE") {
      if (type === "Question") {
        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      }
    }
  };

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
            onClick={() => handleVote("UP_VOTE")}
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
            onClick={() => handleVote("DOWN_VOTE")}
          />
          <div className="flex-center min-w-6 rounded-md bg-slate-200 dark:bg-muted">
            <p className="text-sm">{formatAndDivideNumber(downVotes)}</p>
          </div>
        </div>
      </div>
      {type === "Question" && (
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
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
