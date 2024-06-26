"use client";

import { Button } from "@/components/ui/button";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { TActions } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import SubmitLoading from "./SubmitLoading";

interface ActionsButtonProps {
  type: TActions;
  itemId: string;
}

const ActionsButton = ({ type, itemId }: ActionsButtonProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const handleDelete = async () => {
    try {
      setIsPending(true);
      if (type === "QUESTION") {
        await deleteQuestion({
          questionId: itemId,
          path: pathname,
        });
        toast.success("Your question has been successfully removed");
      } else {
        await deleteAnswer({
          answerId: itemId,
          path: pathname,
        });
        toast.success("Your answer has been successfully removed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };
  const handleEdit = () => {
    router.push(`/question/edit/${itemId}`);
  };
  return (
    <div className="flex items-center gap-3 w-full">
      {type === "QUESTION" && (
        <Button size={"sm"} variant={"secondary"} onClick={handleEdit}>
          <Pencil size={17} className="text-gray-500 mr-2" />
          Edit
        </Button>
      )}
      <Button
        size={"sm"}
        variant={"secondary"}
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? (
          <SubmitLoading label="Wait" color="#334155" />
        ) : (
          <>
            <Trash2 size={17} className="text-red-600 mr-2" />
            Delete
          </>
        )}
      </Button>
    </div>
  );
};

export default ActionsButton;
