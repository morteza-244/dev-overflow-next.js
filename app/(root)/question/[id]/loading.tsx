import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-6">
      <AnswerDetailSkeleton />
      <div className="flex-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-7" />
          <h3>Answers</h3>
        </div>
        <Skeleton className="h-9 w-28" />
      </div>
      <AnswerCardSkeleton />
      <AnswerFormSkeleton />
    </div>
  );
};

export default Loading;

const AnswerDetailSkeleton = () => {
  return (
    <>
      <div className="flex justify-start items-center w-full flex-col">
        <div className="w-full flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center justify-start gap-1">
            <Skeleton className="w-7 h-7 rounded-full" />
            <Skeleton className="w-40 h-3" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="w-40 h-4" />
          </div>
        </div>
        <Skeleton className="w-full h-5 mt-3.5" />
      </div>
      <div className="flex flex-wrap gap-4">
        <Skeleton className="w-40 h-3" />
        <Skeleton className="w-28 h-3" />
        <Skeleton className="w-28 h-3" />
      </div>
      <Skeleton className="h-[370px]" />
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3].map((skeleton) => (
          <Skeleton key={skeleton} className="w-20 h-8" />
        ))}
      </div>
    </>
  );
};

const AnswerCardSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2].map((skeleton) => (
        <article key={skeleton} className="card-wrapper rounded-md p-4">
          <div className="flex-between mb-4">
            <div className="w-full flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <div className="flex flex-1 items-start sm:items-center gap-1">
                <Skeleton className="w-7 h-7 rounded-full" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <Skeleton className="w-36 sm:w-40 h-3" />
                  <Skeleton className="w-36 h-3 sm:hidden" />
                </div>
              </div>
              <div>
                <Skeleton className="w-32 h-4" />
              </div>
            </div>
          </div>
          <Skeleton className="h-[370px]" />
        </article>
      ))}
      <div className="w-full flex items-center flex-wrap gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
};

const AnswerFormSkeleton = () => {
  return (
    <>
      <h4 className="text-dark500_light700 paragraph-semibold">
        Write your answer here
      </h4>
      <Skeleton className="h-[350px]" />
      <div className="flex justify-end">
        <Skeleton className="h-10 w-28" />
      </div>
    </>
  );
};
