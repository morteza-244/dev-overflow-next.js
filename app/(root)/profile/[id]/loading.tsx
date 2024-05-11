import QuestionCardSkeleton from "@/components/cards/QuestionCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
const Loading = () => {
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Skeleton className="rounded-full w-32 h-32" />
          <div className="mt-3">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-20 h-4 mt-3" />
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {[1, 2, 3].map((skeleton) => (
                <Skeleton key={skeleton} className="w-20 h-4" />
              ))}
            </div>
            <Skeleton className="xs:w-80 h-4 mt-8" />
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="space-y-5">
        <div className="hidden xs:block">
          <div className="flex gap-2 items-center">
            <h3 className="text-dark200_light900 font-bold my-4">Stats -</h3>
            <Skeleton className="h-6 w-10" />
          </div>
          <StatsList />
        </div>
        <Skeleton className="h-8 w-20 block xs:hidden" />
      </div>
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList>
            <TabsTrigger value="top-posts" className="text-primary-500">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="text-primary-500">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTabSkeleton />
          </TabsContent>
          <TabsContent value="answers">
            <AnswerTabSkeleton />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Loading;

const StatsList = () => {
  const stats = [
    { imageAddress: "/assets/icons/gold-medal.svg", title: "Gold Badges" },
    { imageAddress: "/assets/icons/silver-medal.svg", title: "Silver Badges" },
    { imageAddress: "/assets/icons/bronze-medal.svg", title: "Bronze Badges" },
  ];
  return (
    <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="flex justify-evenly lg:flex-col p-3 flex-wrap gap-4 items-center card-wrapper rounded-md">
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-6 w-10" />
          <p className="text-[14px]">Questions</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-6 w-10" />
          <p className="text-[14px]">Answers</p>
        </div>
      </div>
      {stats.map((item, index) => (
        <StatsCard key={index} item={item} />
      ))}
    </div>
  );
};

const StatsCard = ({ item }: {item: {title: string; imageAddress: string}}) => {
  return (
    <div className="flex justify-evenly lg:flex-col p-3 flex-wrap gap-4 items-center card-wrapper rounded-md">
      <Image src={item.imageAddress} alt={item.title} width={30} height={30} />
      <div>
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="w-10 h-6" />
          <p className="text-[14px]">{item.title}</p>
        </div>
      </div>
    </div>
  );
};

const AnswerCardSkeleton = () => {
  return (
    <div className="card-wrapper p-5 rounded-lg">
      <Skeleton className="h-3 w-16 lg:hidden" />
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row w-full">
        <Skeleton className="h-3 w-full mt-3 lg:mt-0" />
      </div>
      <div className="flex-between mt-3 w-full flex-wrap gap-3">
        <div className="flex gap-2 items-center">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-3 w-40 lg:w-60" />
        </div>
        <Skeleton className="w-16 h-6" />
        <div className="flex-between w-full">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-24 h-8" />
        </div>
      </div>
    </div>
  );
};

const AnswerTabSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-4">
        {[1, 2, 3, 4].map((skeleton) => (
          <AnswerCardSkeleton key={skeleton} />
        ))}
        <div className="w-full flex items-center flex-wrap gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
};

const QuestionTabSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((skeleton) => (
        <QuestionCardSkeleton key={skeleton} />
      ))}
      <div className="w-full flex items-center flex-wrap gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};
