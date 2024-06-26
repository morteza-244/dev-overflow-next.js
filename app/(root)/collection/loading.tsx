import QuestionCardSkeleton from "@/components/cards/QuestionCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  const savedQuestions = [1, 2, 3, 4, 5, 6];
  return (
    <div className="space-y-6">
      <h1 className="h1-bold">All Users</h1>
      <div className="flex sm:items-center flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <div className="flex flex-col gap-6 w-full">
        {savedQuestions.map((skeleton) => (
          <QuestionCardSkeleton key={skeleton} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
