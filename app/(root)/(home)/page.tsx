import QuestionCard from "@/components/cards/QuestionCard";
import FilterSelector from "@/components/shared/FilterSelector";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { homePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: 1,
    title:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    tags: [
      { _id: 1, name: "javaScript", totalQuestions: 5 },
      { _id: 2, name: "sql", totalQuestions: 5 },
    ],
    author: {
      _id: "1",
      name: "mosh"
    },
    upVotes: 10,
    views: 100,
    answers: 2,
    createdAt: new Date(),
  },
  {
    _id: 2,
    title:
      "An HTML table where specific cells come from values in a Google Sheet identified by their neighboring cell",
    tags: [
      { _id: 1, name: "javaScript", totalQuestions: 5 },
      { _id: 2, name: "sql", totalQuestions: 5 },
    ],
    author: {
      _id: "2",
      name: "mosh"
    },
    upVotes: 10,
    views: 100,
    answers: 2,
    createdAt: new Date(),
  },
  {
    _id: 3,
    title:
      "JavaScript validation for a form stops the form data from being submitted to mysql database",
    tags: [
      { _id: 1, name: "javaScript", totalQuestions: 5 },
      { _id: 2, name: "sql", totalQuestions: 5 },
    ],
    author: {
      _id: "3",
      name: "mosh"
    },
    upVotes: 10,
    views: 100,
    answers: 2,
    createdAt: new Date(),
  },
];

const Home = () => {
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
            <QuestionCard key={question._id} question={question} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
