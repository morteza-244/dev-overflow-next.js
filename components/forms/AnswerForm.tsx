"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createAnswer } from "@/lib/actions/answer.action";
import { answerSchema, TAnswerFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SubmitLoading from "../shared/SubmitLoading";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";

interface AnswerFormProps {
  authorId: string;
  questionId: string;
}

const AnswerForm = ({ authorId, questionId }: AnswerFormProps) => {
  const pathname = usePathname();
  const editorRef = useRef(null);
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<TAnswerFormData>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = async (data: TAnswerFormData) => {
    try {
      setIsSubmitting(true);
      await createAnswer({
        author: JSON.parse(authorId),
        content: data.answer,
        path: pathname,
        question: JSON.parse(questionId),
      });
    } catch (error) {
      setErrorMessage("Your answer was not sent");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="text-dark500_light700 paragraph-semibold">
          Write your answer here
        </h4>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <Button size={"sm"} variant={"secondary"} className="text-primary-500">
          <Sparkles size={20} className="mr-2" />
          Generate an AI Answer
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR__API_KEY}
                    onInit={(_evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
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
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              size={"sm"}
              className="primary-gradient"
            >
              {isSubmitting ? <SubmitLoading label="Sending" /> : "Send Answer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
