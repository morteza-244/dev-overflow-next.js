import QuestionCardSkeleton from "@/components/cards/QuestionCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  const tagsQuestion = [1, 2, 3, 4, 5, 6];
  return (
    <div className="space-y-6">
      <Skeleton className="w-32 h-6" />
      <Skeleton className="h-10" />
      <div className="flex flex-col gap-6 w-full">
        {tagsQuestion.map((skeleton) => (
          <QuestionCardSkeleton key={skeleton} />
        ))}
      </div>
      <div className="w-full flex items-center flex-wrap gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};

export default Loading;
