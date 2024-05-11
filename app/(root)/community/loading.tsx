import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  const tags = [1, 2, 3];
  const userList = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="space-y-6">
      <h1 className="h1-bold">All Users</h1>
      <div className="flex sm:items-center flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <section className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4">
        {userList.map((skeleton) => (
          <div key={skeleton} className="shadow-md dark:shadow-none dark:bg-[#0F1117] rounded-lg">
            <article className="w-full space-y-5 p-4">
              <div className="flex flex-row xs:flex-col items-center gap-3">
                <Skeleton className="rounded-full w-16 xs:w-20 h-16 xs:h-20" />
                <div className="flex flex-col gap-2 xs:items-center justify-center">
                  <Skeleton className="h-3 w-44" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {tags.map((skeleton) => (
                    <Skeleton key={skeleton} className="w-20 h-8" />
                  ))}
                </div>
              </div>
            </article>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Loading;
