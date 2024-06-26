import UserCard from "@/components/cards/UserCard";
import FilterSelector from "@/components/shared/FilterSelector";
import PaginationButton from "@/components/shared/PaginationButton";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { userFilters } from "@/constants/filters";
import { getUsers } from "@/lib/actions/user.action";
import { TSearchParamsProps } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Dev Overflow",
  description:
    "Explore the vibrant community of developers on Dev Overflow. Meet fellow coders, share knowledge, and collaborate on projects.",
  keywords: [
    "Dev Overflow",
    "community",
    "Next.js",
    "Stack Overflow",
    "developers",
    "programming",
    "collaboration",
  ],
  authors: {
    name: "Morteza Sadeghi",
    url: "https://dev-overflow-next-js.vercel.app/",
  },
  robots: "index, follow",
};

const Community = async ({ searchParams }: TSearchParamsProps) => {
  const { users, hasMore, totalPages } = await getUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <div className="space-y-6">
        <h1 className="h1-bold">All Users</h1>
        <div className="flex sm:items-center flex-col sm:flex-row gap-4">
          <LocalSearchBar
            route="/community"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for amazing minds"
          />
          <FilterSelector filters={userFilters} />
        </div>
        <section className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4">
          {!users.length ? (
            <p>No users yet</p>
          ) : (
            users.map((user) => <UserCard key={user._id} user={user} />)
          )}
        </section>
        <PaginationButton
          hasMore={hasMore!}
          totalPages={totalPages!}
          pageNumber={searchParams.page ? +searchParams.page : 1}
        />
      </div>
    </>
  );
};

export default Community;
