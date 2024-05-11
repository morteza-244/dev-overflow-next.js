import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  const tags = [1, 2, 3, 4, 5, 6];
  return (
    <div className="space-y-6">
      <h1 className="h1-bold">All Tags</h1>
      <div className="flex sm:items-center flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <section className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4">
        {tags.map((skeleton) => (
          <TagCardSkeleton key={skeleton} />
        ))}
      </section>
      <div className="w-full flex items-center flex-wrap gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};

export default Loading;

const TagCardSkeleton = () => {
  return (
    <div className="shadow-md dark:shadow-none dark:bg-[#0F1117] rounded-lg">
      <article className="w-full space-y-5 p-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-32" />
      </article>
    </div>
  );
};
