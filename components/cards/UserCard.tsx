import { ITag } from "@/database/tag.model";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import { Badge } from "../ui/badge";
import { IUser } from "@/database/user.model";

interface UserCardProps {
  user: IUser
}

const UserCard = ({ user }: UserCardProps) => {
  const interactedTags = [
    { _id: "1", name: "JavaScript" },
    { _id: "2", name: "Front-end" },
    { _id: "3", name: "React.js" },
  ];
  return (
    <div className="shadow-md dark:shadow-none dark:bg-[#0F1117] rounded-lg">
      <article className="w-full space-y-5 p-4">
        <div className="flex flex-row xs:flex-col items-center gap-3">
          <Image
            src={user.picture}
            alt="user profile picture"
            width={100}
            height={100}
            className="rounded-full w-16 xs:w-20 h-16 xs:h-20 object-cover"
          />
          <div className="xs:text-center">
            <h3 className="text-[18px] font-bold leading-5 line-clamp-1 text-dark200_light900">
              <Link href={`/profile/${user._id}`}>{user.name}</Link>
            </h3>
            <p className="mt-1 body-regular text-dark500_light500">
              @{user.username}
            </p>
          </div>
        </div>
        <div>
          {!interactedTags.length ? (
            <Badge className="subtle-medium text-light400_light500 background-light800_dark300 rounded-md px-4 border-none py-2 uppercase">
              No tags yet
            </Badge>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} tag={tag as ITag} />
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default UserCard;
