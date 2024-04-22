import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  let result = "";

  switch (true) {
    case timeDifference < minute:
      const seconds = Math.floor(timeDifference / 1000);
      result = `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
      break;
    case timeDifference < hour:
      const minutes = Math.floor(timeDifference / minute);
      result = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
      break;
    case timeDifference < day:
      const hours = Math.floor(timeDifference / hour);
      result = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
      break;
    case timeDifference < week:
      const days = Math.floor(timeDifference / day);
      result = `${days} ${days === 1 ? "day" : "days"} ago`;
      break;
    case timeDifference < month:
      const weeks = Math.floor(timeDifference / week);
      result = `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
      break;
    case timeDifference < year:
      const months = Math.floor(timeDifference / month);
      result = `${months} ${months === 1 ? "month" : "months"} ago`;
      break;
    default:
      const years = Math.floor(timeDifference / year);
      result = `${years} ${years === 1 ? "year" : "years"} ago`;
      break;
  }

  return result;
};

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};
