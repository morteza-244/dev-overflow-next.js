import QuestionCard from "@/components/cards/QuestionCard";
import FilterSelector from "@/components/shared/FilterSelector";
import NoResult from "@/components/shared/NoResult";
import PopularTagsCarousel from "@/components/shared/PopularTagsCarousel";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import TopQuestionsCarousel from "@/components/shared/TopQuestionsCarousel";
import { Button } from "@/components/ui/button";
import { homePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { TQuestion } from "@/types";
import Link from "next/link";

const Home = async () => {
  const data = await getQuestions({});
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:hidden">
        <TopQuestionsCarousel />
        <PopularTagsCarousel />
      </div>
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
      <div className="flex flex-col gap-6 w-full">
        {!data?.questions.length ? (
          <NoResult
            title="question"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        ) : (
          data?.questions.map((question) => (
            <QuestionCard key={question._id} question={question as TQuestion} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
