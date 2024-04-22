import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface NoResultProps {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: NoResultProps) => {
  return (
    <div className="mt-10 w-full flex-center flex-col">
      <Image
        src={"/assets/images/light-illustration.png"}
        alt="No result illustration"
        width={250}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src={"/assets/images/dark-illustration.png"}
        alt="No result illustration"
        width={250}
        height={200}
        className="hidden object-contain dark:block"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">
        There’s no {title} to show
      </h2>
      <p className="text-dark500_light700 body-regular my-3.5 max-w-md text-center">
        {description}
      </p>
      <Link href={link}>
        <Button size={"sm"}>{linkTitle}</Button>
      </Link>
    </div>
  );
};

export default NoResult;
