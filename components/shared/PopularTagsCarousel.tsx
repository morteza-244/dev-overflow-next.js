import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPopularTags } from "@/lib/actions/tag.action";
import Link from "next/link";

const PopularTagsCarousel = async () => {
  const popularTags = await getPopularTags();

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      orientation="vertical"
      className="col-span-1"
    >
      <h1 className="mb-3 font-bold text-[18px]">Popular Tags</h1>
      <CarouselContent className="h-[200px] gap-5 py-5 grid grid-cols-2">
        {popularTags.map((tag) => (
          <CarouselItem className="bg-slate-100 h-20 dark:bg-dark-200 shadow-md dark:shadow-none rounded-md space-y-2 py-2 px-3">
            <Link href={`/tags/${tag._id}`}>
              <h2 className="font-bold text-[17px]">{tag.name}</h2>
            </Link>
            <p className="text-sm">Questions: {tag.numberOfQuestions}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="-top-2 right-[55px] absolute space-x-10">
        <CarouselPrevious className="top-0 right-0" />
        <CarouselNext className="top-0 right-0" />
      </div>
    </Carousel>
  );
};

export default PopularTagsCarousel;
