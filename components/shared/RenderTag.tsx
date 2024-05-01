import { Badge } from "@/components/ui/badge";
import { Tag } from "@/types";
import Link from "next/link";

interface RenderTagProps {
  tag: Tag;
  showCount?: boolean;
}

const RenderTag = ({ tag, showCount }: RenderTagProps) => {
  return (
    <Link href={`/tags/${tag._id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium text-light400_light500 background-light800_dark300 rounded-md px-4 border-none py-2 uppercase">
        {tag.name}
      </Badge>
      {showCount && <p className="small-medium text-dark500_light700">{10}</p>}
    </Link>
  );
};

export default RenderTag;
