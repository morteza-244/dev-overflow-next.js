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
          <div key={skeleton} className="card-wrapper p-5 rounded-lg space-y-3">
            <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
              <div className="w-full space-y-2 lg:space-y-0">
                <Skeleton className="h-3 w-16 lg:hidden" />
                <Skeleton className="h-3" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2].map((skeleton) => (
                <Skeleton key={skeleton} className="w-20 h-8" />
              ))}
            </div>
            <div className="flex-between w-full flex-wrap gap-2.5">
              <div className="flex gap-2 items-center">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-3 w-40 lg:w-72" />
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
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
