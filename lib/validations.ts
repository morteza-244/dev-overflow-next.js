import z from "zod";
export const questionFormSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(20),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
export type TQuestionFormData = z.infer<typeof questionFormSchema>;

export const answerSchema = z.object({
  answer: z.string().min(100, {message: "Answer must be 100 character"}),
});
export type TAnswerFormData = z.infer<typeof answerSchema>;

export const profileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  bio: z.string().min(10).max(150),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50),
})
export type TProfileFormData = z.infer<typeof profileSchema>