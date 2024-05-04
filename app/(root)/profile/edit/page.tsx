import ProfileForm from "@/components/forms/ProfileForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

const EditProfile = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const currentUser = await getUserById({
    userId,
  });
  return (
    <>
      <h1 className="text-dark200_light900 h1-bold">Edit Profile</h1>
      <div className="mt-5">
        <ProfileForm currentUser={JSON.stringify(currentUser)} userId={userId} />
      </div>
    </>
  );
};

export default EditProfile;
