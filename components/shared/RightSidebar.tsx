import { getTopQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.action";
import { Tag } from "@/types";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

const RightSidebar = async () => {
  const topQuestions = await getTopQuestions();
  const popularTags = await getPopularTags();
  return (
    <aside className="background-light900_dark200 sticky right-0 top-0 flex flex-col h-screen overflow-y-auto dark:border-gray-700 dark:border-r p-5 shadow-md dark:shadow-none max-xl:hidden w-[266px] custom-scrollbar gap-7">
      <div>
        <h3 className="h3-bold">Top Questions</h3>
        <div className="flex flex-col w-full gap-7 mt-7">
          {topQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/ask-question/${question._id}`}
              className="flex-between cursor-pointer gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="chevron-right"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h3 className="h3-bold">Popular Tags</h3>
        <div className="flex flex-col gap-4 mt-7">
          {popularTags.map((tag) => (
            <RenderTag key={tag._id} tag={tag as Tag} showCount={true} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
