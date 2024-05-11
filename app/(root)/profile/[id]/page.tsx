import AnswerTab from "@/components/shared/AnswerTab";
import ProfileLink from "@/components/shared/ProfileLink";
import QuestionTab from "@/components/shared/QuestionTab";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";
import { TUrlParams } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CalendarDays, Link as LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserProfile = async ({ params, searchParams }: TUrlParams) => {
  const { userId } = auth();
  const {user, badgeCounts, totalQuestions, totalAnswers} = await getUserInfo({
    userId: params.id,
  });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover w-32 h-32"
          />

          <div className="mt-3">
            <h2 className="text-[16px] sm:text-[20px] font-bold text-dark100_light900">
              {user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.portfolioWebsite && (
                <ProfileLink
                  icon={<LinkIcon size={20} />}
                  href={user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {user.location && (
                <ProfileLink
                  icon={<MapPin size={20} />}
                  title={user.location}
                />
              )}

              <ProfileLink
                icon={<CalendarDays size={20} />}
                title={getJoinedDate(user.joinedAt)}
              />
            </div>

            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {userId === user.clerkId && (
              <Link href="/profile/edit">
                <Button
                  size={"sm"}
                  variant={"secondary"}
                  className="active:scale-95 transition-transform"
                >
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={badgeCounts}
        reputation={user.reputation}
      />

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
            <QuestionTab
              userId={user._id}
              clerkId={userId}
              searchParams={searchParams}
            />
          </TabsContent>
          <TabsContent value="answers">
            <AnswerTab
              userId={user._id}
              clerkId={userId}
              searchParams={searchParams}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default UserProfile;
