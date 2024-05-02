import Link from "next/link";
import { ReactNode } from "react";

interface ProfileLinkProps {
  icon: ReactNode;
  title: string;
  href?: string;
}

const ProfileLink = ({ icon, title, href }: ProfileLinkProps) => {
  return (
    <div className="flex-center gap-1">
      <span>{icon}</span>
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="text-blue-500 paragraph-regular"
        >
          {title}
        </Link>
      ) : (
        <p className=" paragraph-regular">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
