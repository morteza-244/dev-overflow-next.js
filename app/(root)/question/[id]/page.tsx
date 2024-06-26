import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/answer/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { Tag, TParams, TUrlParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateQuestionMetadata({
  params,
}: TParams): Promise<Metadata> {
  const question = await getQuestionById({
    questionId: params.id,
  });

  return {
    title: `${question.title} | Dev Overflow`,
    description: `Explore the question titled "${question.title}" on Dev Overflow.`,
    keywords: [
      "Dev Overflow",
      "question detail",
      question.title,
      "Next.js",
      "Stack Overflow",
      "development",
      "programming",
    ],
    authors: {
      name: "Morteza Sadeghi",
      url: "https://dev-overflow-next-js.vercel.app/",
    },
    robots: "index, follow",
  };
}

const QuestionDetail = async ({ params, searchParams }: TUrlParams) => {
  const { userId: clerkId } = auth();
  const data = await getQuestionById({
    questionId: params.id,
  });

  let currentUser;

  if (clerkId) {
    currentUser = await getUserById({
      userId: clerkId,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-start items-center w-full flex-col">
        <div className="w-full flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${data.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={data.author.picture}
              alt="user profile"
              width={22}
              height={22}
              className="rounded-full w-6 h-6 object-cover"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {data.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(data._id)}
              userId={JSON.stringify(currentUser?._id)}
              upVotes={data.upVotes.length}
              hasUpVoted={data.upVotes.includes(currentUser?._id)}
              downVotes={data.downVotes.length}
              hasDownVoted={data.downVotes.includes(currentUser?._id)}
              hasSaved={currentUser?.saved.includes(data._id)}
            />
          </div>
        </div>
        <h2 className="text-dark200_light900 text-[22px] font-semibold mt-3.5 w-full text-left">
          {data.title}
        </h2>
      </div>
      <div className="flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` - asked ${getTimestamp(data.createdAt)}`}
          title="Asked"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(data.answers.length)}
          title={"Answers"}
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(data.views)}
          title={"Views"}
        />
      </div>
      <ParseHTML content={data.content} />
      <div className="flex gap-2 flex-wrap">
        {data.tags.map((tag: Tag) => (
          <RenderTag key={tag._id} tag={tag} />
        ))}
      </div>
      <AllAnswers
        questionId={data._id}
        totalAnswers={data.answers.length}
        userId={currentUser?._id}
        filter={searchParams.filter}
        page={Number(searchParams.page)}
      />
      <AnswerForm
        questionId={JSON.stringify(data._id)}
        authorId={JSON.stringify(currentUser?._id)}
      />
    </div>
  );
};

export default QuestionDetail;
