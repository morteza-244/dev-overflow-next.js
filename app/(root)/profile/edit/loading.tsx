import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  const fields = [1, 2, 3, 4];
  return (
    <>
      <h1 className="text-dark200_light900 h1-bold">Edit Profile</h1>
      <div className="mt-5">
        <div className="space-y-8">
          {fields.map((skeleton) => (
            <div key={skeleton} className="flex flex-col gap-3 w-full">
              <Skeleton className="w-24 h-5" />
              <Skeleton className="h-10" />
            </div>
          ))}
          <div className="flex flex-col gap-3 w-full">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="h-32" />
          </div>
          <div className="flex justify-end">
          <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Loading;
