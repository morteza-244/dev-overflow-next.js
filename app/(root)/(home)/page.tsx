import QuestionCard from "@/components/cards/QuestionCard";
import FilterSelector from "@/components/shared/FilterSelector";
import NoResult from "@/components/shared/NoResult";
import PaginationButton from "@/components/shared/PaginationButton";
import PopularTagsCarousel from "@/components/shared/PopularTagsCarousel";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import TopQuestionsCarousel from "@/components/shared/TopQuestionsCarousel";
import { Button } from "@/components/ui/button";
import { homePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { TQuestion, TSearchParamsProps } from "@/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | Dev Overflow",
  description:
    "Welcome to Dev Overflow, the community-driven platform for developers to ask, answer, and learn together.",
  keywords: [
    "Dev Overflow",
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

const Home = async ({ searchParams }: TSearchParamsProps) => {
  const { questions, hasMore, totalPages } = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <div className="space-y-6">
      <div className="flex justify-between sm:items-center sm:flex-row flex-col-reverse gap-4">
        <h1 className="h1-bold">All Questions</h1>
        <Link href="/ask-question" className="ms-auto sm:m-0">
          <Button className="primary-gradient" size={"sm"}>
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="flex sm:items-center flex-col sm:flex-row gap-4">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
        />
        <FilterSelector filters={homePageFilters} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:hidden">
        <TopQuestionsCarousel />
        <PopularTagsCarousel />
      </div>
      <div className="flex flex-col gap-6 w-full">
        {!questions.length ? (
          <NoResult
            title="question"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        ) : (
          questions.map((question) => (
            <QuestionCard key={question._id} question={question as TQuestion} />
          ))
        )}
      </div>
      <PaginationButton
        hasMore={hasMore!}
        totalPages={totalPages!}
        pageNumber={searchParams.page ? +searchParams.page : 1}
      />
    </div>
  );
};

export default Home;
