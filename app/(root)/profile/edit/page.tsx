import ProfileForm from "@/components/forms/ProfileForm";
import { getUserById, getUserInfo } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { user } = await getUserInfo({
    userId: params.id,
  });

  return {
    title: `Edit Profile - ${user.username} | Dev Overflow`,
    description: `Edit your profile on Dev Overflow. Update your profile information, including ${
      user.bio || ""
    }`,
    keywords: [
      "Dev Overflow",
      "edit profile",
      "user profile",
      user.username,
      "Next.js",
      "Stack Overflow",
      "development",
      "programming",
    ],
    authors: {
      name: "Morteza Sadeghi",
      url: "https://dev-overflow-next-js.vercel.app/",
    },
    robots: "index, follow",
  };
}

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
        <ProfileForm
          currentUser={JSON.stringify(currentUser)}
          userId={userId}
        />
      </div>
    </>
  );
};

export default EditProfile;
