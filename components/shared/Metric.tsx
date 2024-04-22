import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  isAuthor?: boolean;
  textStyles?: string;
  href?: string;
}

const Metric = ({
  alt,
  imgUrl,
  title,
  value,
  href,
  isAuthor,
  textStyles,
}: MetricProps) => {
  const MetricContent = () => {
    return (
      <>
        <Image
          src={imgUrl}
          alt={alt}
          width={16}
          height={16}
          className={`object-contain ${href ? "rounded-full" : ""}`}
        />
        <div className={`${textStyles} flex items-center gap-1`}>
          <span>{formatAndDivideNumber(value as number)}</span>
          <span className={`line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}>
            {title}
          </span>
        </div>
      </>
    );
  };

  if (href) {
    return (
      <Link href={href} className="flex-center flex-wrap gap-1">
        <MetricContent />
      </Link>
    );
  }
  return (
    <div className="flex-center flex-wrap gap-1">
      <MetricContent />
    </div>
  );
};

export default Metric;
