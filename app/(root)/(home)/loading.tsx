import QuestionCardSkeleton from "@/components/cards/QuestionCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
const Loading = () => {
  const homeCardList = [1, 2, 3, 4, 5, 6];
  return (
    <div className="space-y-6">
      <div className="flex justify-between sm:items-center sm:flex-row flex-col-reverse gap-4">
        <h1 className="h1-bold">All Questions</h1>
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="flex sm:items-center flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 xl:hidden">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="mb-3 font-bold text-[18px]">Top Questions</h1>
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-44" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="mb-3 font-bold text-[18px]">Popular Tags</h1>
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-44" />
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {homeCardList.map((skeleton) => (
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
