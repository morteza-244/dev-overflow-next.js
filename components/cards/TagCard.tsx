import { Button } from "@/components/ui/button";
import { ITag } from "@/database/tag.model";

interface TagCardProps {
  tag: ITag;
}

const TagCard = ({ tag }: TagCardProps) => {
  return (
    <div className="shadow-md dark:shadow-none dark:bg-[#0F1117] rounded-lg">
      <article className="w-full space-y-5 p-4">
        <Button variant="secondary" size={"sm"}>
          {tag.name}
        </Button>
        <p>
          <span className="text-primary-500 font-semibold">
            {tag.questions.length}+{" "}
          </span>
          Question
        </p>
      </article>
    </div>
  );
};

export default TagCard;
