"use client";
import TinyEditor from "@/components/shared/TinyEditor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { answerSchema, TAnswerFormData } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitLoading from "../shared/SubmitLoading";

const AnswerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<TAnswerFormData>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = (data: TAnswerFormData) => {
    console.log(data.answer.length);
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="text-dark500_light700 paragraph-semibold">
          Write your answer here
        </h4>
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
                  <TinyEditor field={field} />
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
