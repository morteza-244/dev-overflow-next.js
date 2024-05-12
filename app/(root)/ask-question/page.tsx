import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask a Question | Dev Overflow",
  description:
    "Ask a question on Dev Overflow and get help from the community. Share your coding challenges and receive expert advice and solutions.",
  keywords: [
    "Dev Overflow",
    "ask question",
    "Next.js",
    "Stack Overflow",
    "development",
    "programming",
    "community",
  ],
  authors: {
    name: "Morteza Sadeghi",
    url: "https://dev-overflow-next-js.vercel.app/",
  },
  robots: "index, follow", 
};

const AskQuestion = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const currentUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-7">
        <QuestionForm
          currentUserId={JSON.stringify(currentUser?._id)}
          type={"CREATE"}
        />
      </div>
    </div>
  );
};

export default AskQuestion;
