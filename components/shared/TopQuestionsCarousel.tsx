import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getTopQuestions } from "@/lib/actions/question.action";
import { TQuestion } from "@/types";
import TopQuestionCard from "../cards/TopQuestionCard";
const TopQuestionsCarousel = async () => {
  const topQuestions = await getTopQuestions();

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      orientation="vertical"
      className="sm:w-1/2"
    >
      <h1 className="mb-3">Top Questions</h1>
      <CarouselContent className="h-[200px] gap-5 py-5">
        {topQuestions.map((question) => (
          <TopQuestionCard
            key={question._id}
            question={question as TQuestion}
          />
        ))}
      </CarouselContent>
      <div className="-top-2 right-[55px] absolute space-x-10">
        <CarouselPrevious className="top-0 right-0" />
        <CarouselNext className="top-0 right-0" />
      </div>
    </Carousel>
  );
};

export default TopQuestionsCarousel;
