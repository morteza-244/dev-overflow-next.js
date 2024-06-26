"use client";
import SubmitLoading from "@/components/shared/SubmitLoading";
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
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { questionFormSchema, TQuestionFormData } from "@/lib/validations";
import { Tag, TQuestionForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { KeyboardEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface QuestionFormProps {
  currentUserId: string;
  type: TQuestionForm;
  questionDetails?: string;
}

const QuestionForm = ({
  currentUserId,
  type,
  questionDetails,
}: QuestionFormProps) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const pathname = usePathname();
  const editorRef = useRef(null);
  const { theme } = useTheme();
  const question = questionDetails && JSON.parse(questionDetails || "");

  const groupedTags = question?.tags.map((tag: Tag) => tag.name);
  const form = useForm<TQuestionFormData>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: question?.title || "",
      explanation: question?.content || "",
      tags: groupedTags || [],
    },
  });

  const onSubmit = async (data: TQuestionFormData) => {
    try {
      setIsPending(true);
      if (type === "EDIT") {
        await editQuestion({
          title: data.title,
          content: data.explanation,
          path: pathname,
          questionId: question._id,
        });
        toast.success("Your question has been edited successfully");
        router.push(`/question/${question._id}`);
      } else {
        await createQuestion({
          title: data.title,
          content: data.explanation,
          tags: data.tags,
          author: JSON.parse(currentUserId),
          path: pathname,
        });
        toast.success("Your question has been created successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
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
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR__API_KEY}
                  onInit={(_evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={question?.content || ""}
                  init={{
                    height: 350,
                    menubar: false,
                    browser_spellcheck: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo " +
                      "codesample bold italic forecolor alignleft aligncenter" +
                      "alignright alignjustify bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: theme === "dark" ? "oxide-dark" : "oxide",
                    content_css: theme === "dark" ? "dark" : "light",
                  }}
                />
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
                    disabled={type === "EDIT"}
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
                          {type !== "EDIT" && (
                            <X
                              size={15}
                              onClick={() => handleTagRemove(tag, field)}
                              className="cursor-pointer"
                            />
                          )}
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
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            type === "EDIT" ? (
              <SubmitLoading label="Editing..." />
            ) : (
              <SubmitLoading label="Posting..." />
            )
          ) : type === "EDIT" ? (
            "Edit Question"
          ) : (
            "Ask a Question"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
