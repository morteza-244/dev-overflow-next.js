"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createQuestion } from "@/lib/actions/question.action";
import { questionFormSchema, TQuestionFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import TinyEditor from "../shared/TinyEditor";

interface QuestionFormProps {
  currentUserId: string;
}

const QuestionForm = ({ currentUserId }: QuestionFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<TQuestionFormData>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  const onSubmit = async (data: TQuestionFormData) => {
    try {
      await createQuestion({
        title: data.title,
        content: data.explanation,
        tags: data.tags,
        author: JSON.parse(currentUserId),
        path: pathname,
      });
      router.push("/");
    } catch (error) {}
  };

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (event.key === "Enter" && field.name === "tags") {
      event.preventDefault();

      const tagInput = event.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== " ") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Be specific and imagine you are asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed explanation of your problem</FormLabel>
              <FormControl>
                <TinyEditor field={field} />
              </FormControl>
              <FormDescription>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-slate-200 text-slate-600 dark:bg-muted dark:text-slate-400 flex-center gap-1 rounded-md border-none py-2 capitalize active:scale-95 transition-all"
                        >
                          {tag}
                          <X
                            size={15}
                            onClick={() => handleTagRemove(tag, field)}
                            className="cursor-pointer"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription>
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
