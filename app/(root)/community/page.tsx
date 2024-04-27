import UserCard from "@/components/cards/UserCard";
import FilterSelector from "@/components/shared/FilterSelector";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { userFilters } from "@/constants/filters";
import { getUsers } from "@/lib/actions/user.action";

const Community = async () => {
  const data = await getUsers({});
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
          {!data.users.length ? (
            <p>No users yet</p>
          ) : (
            data.users.map((user) => <UserCard key={user._id} user={user} />)
          )}
        </section>
      </div>
    </>
  );
};

export default Community;
