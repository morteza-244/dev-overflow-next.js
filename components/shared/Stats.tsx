import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { formatAndDivideNumber } from "@/lib/utils";
import { TBadgeCounts } from "@/types";
import Image from "next/image";

interface StatsProps {
  totalAnswers: number;
  totalQuestions: number;
  badges: TBadgeCounts;
  reputation?: number;
}

const Stats = ({
  totalAnswers,
  totalQuestions,
  badges,
  reputation,
}: StatsProps) => {
  return (
    <div className="space-y-5">
      <div className="hidden xs:block">
        <h3 className="text-dark200_light900 font-bold my-4">
          Stats - ({reputation})
        </h3>
        <StatsList
          totalAnswers={totalAnswers}
          totalQuestions={totalQuestions}
          badges={badges}
        />
      </div>
      <Drawer>
        <DrawerTrigger>
          <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-3 py-2 text-sm font-medium ring-offset-background active:scale-95 transition-transform block xs:hidden">
            Show Stats
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-80 p-5 mx-auto">
            <h3 className="text-dark200_light900 font-bold my-4">
              Stats - ({reputation})
            </h3>
            <StatsList
              totalAnswers={totalAnswers}
              totalQuestions={totalQuestions}
              badges={badges}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

interface StatProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, title, value }: StatProps) => {
  return (
    <div className="flex justify-evenly lg:flex-col p-3 flex-wrap gap-4 items-center bg-slate-100 dark:bg-muted rounded-md">
      <Image src={imgUrl} alt={title} width={30} height={30} />
      <div>
        <div className="text-center">
          <p className="dark:text-slate-400 font-bold">{value}</p>
          <p className="text-[14px]">{title}</p>
        </div>
      </div>
    </div>
  );
};

const StatsList = ({ totalAnswers, totalQuestions, badges }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="flex justify-evenly lg:flex-col p-3 flex-wrap gap-4 items-center bg-slate-100 dark:bg-muted rounded-md">
        <div className="text-center">
          <p className="dark:text-slate-400 font-bold">
            {formatAndDivideNumber(totalQuestions)}
          </p>
          <p className="text-[14px]">Questions</p>
        </div>
        <div className="text-center">
          <p className="dark:text-slate-400 font-bold">
            {formatAndDivideNumber(totalAnswers)}
          </p>
          <p className="text-[14px]">Answers</p>
        </div>
      </div>
      <StatsCard
        imgUrl="/assets/icons/gold-medal.svg"
        title="Gold Badges"
        value={badges.GOLD}
      />
      <StatsCard
        imgUrl="/assets/icons/silver-medal.svg"
        title="Silver Badges"
        value={badges.SILVER}
      />
      <StatsCard
        imgUrl="/assets/icons/bronze-medal.svg"
        title="Bronze Badges"
        value={badges.BRONZE}
      />
    </div>
  );
};

export default Stats;
