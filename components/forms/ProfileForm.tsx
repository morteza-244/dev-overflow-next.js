"use client";
import SubmitLoading from "@/components/shared/SubmitLoading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updatedUser } from "@/lib/actions/user.action";
import { profileSchema, TProfileFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProfileFormProps {
  userId: string | null;
  currentUser: string;
}

const ProfileForm = ({ userId, currentUser }: ProfileFormProps) => {
  const user = JSON.parse(currentUser);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<TProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolioWebsite: user.portfolioWebsite || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });
  const onSubmit = async (data: TProfileFormData) => {
    try {
      setIsPending(true);
      await updatedUser({
        clerkId: userId!,
        updateData: {
          name: data.name,
          bio: data.bio,
          location: data.location,
          username: data.username,
          portfolioWebsite: data.portfolioWebsite,
        },
        path: pathname,
      });
      router.back();
      toast.success("Your profile has been updated successfully")
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  {...field}
                  className="background-light800_dark300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your username"
                  {...field}
                  className="background-light800_dark300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Your portfolio URL"
                  {...field}
                  className="background-light800_dark300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Where are you from?"
                  {...field}
                  className="background-light800_dark300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What's special about you?"
                  {...field}
                  className="background-light800_dark300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button type="submit" size={"sm"} disabled={isPending}>
            {isPending ? <SubmitLoading label="Saving" /> : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
