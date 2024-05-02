import ProfileLink from "@/components/shared/ProfileLink";
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
  const data = await getUserInfo({
    userId: params.id,
  });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={data?.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover w-32 h-32"
          />

          <div className="mt-3">
            <h2 className="text-[16px] sm:text-[20px] font-bold text-dark100_light900">
              {data.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{data.user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {data.user.portfolioWebsite && (
                <ProfileLink
                  icon={<LinkIcon size={20} />}
                  href={data.user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {data.user.location && (
                <ProfileLink
                  icon={<MapPin size={20} />}
                  title={data.user.location}
                />
              )}

              <ProfileLink
                icon={<CalendarDays size={20} />}
                title={getJoinedDate(data.user.joinedAt)}
              />
            </div>

            {data.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {data.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {userId === data.user.clerkId && (
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
        totalQuestions={data.totalQuestions}
        totalAnswers={data.totalAnswers}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList>
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">Top Posts</TabsContent>
          <TabsContent value="answers">Answers</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default UserProfile;
