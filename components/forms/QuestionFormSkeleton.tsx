import { Skeleton } from "@/components/ui/skeleton";

interface QuestionFormSkeletonProps {
  type: "CREATE" | "EDIT";
}

const QuestionFormSkeleton = ({ type }: QuestionFormSkeletonProps) => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">
        {type === "CREATE" ? "Ask a Question" : "Edit Question"}
      </h1>
      <div className="mt-7">
        <div className="space-y-8">
          <div className="flex flex-col gap-3 w-full">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="h-10" />
            <Skeleton className="w-72 h-3" />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="h-[350px]" />
            <Skeleton className="w-72 h-3" />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="h-10" />
            <div className="flex gap-3 items-center">
              {type === "EDIT" &&
                [1, 2, 3].map((skeleton) => (
                  <Skeleton key={skeleton} className="h-8 w-24" />
                ))}
            </div>
            <Skeleton className="w-72 h-3" />
          </div>
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
};

export default QuestionFormSkeleton;
