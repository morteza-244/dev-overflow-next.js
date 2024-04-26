import z from "zod";
export const questionFormSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(20),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
export type TQuestionFormData = z.infer<typeof questionFormSchema>;