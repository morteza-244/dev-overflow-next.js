"use client";

import { Button } from "@/components/ui/button";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { TActions } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SubmitLoading from "./SubmitLoading";

interface ActionsButtonProps {
  type: TActions;
  itemId: string;
}

const ActionsButton = ({ type, itemId }: ActionsButtonProps) => {
  const pathname = usePathname();
  const router = useRouter()
  const [isPending, setIsPending] = useState(false);
  const handleDelete = async () => {
    try {
      setIsPending(true);
      if (type === "QUESTION") {
        await deleteQuestion({
          questionId: itemId,
          path: pathname,
        });
      } else {
        await deleteAnswer({
          answerId: itemId,
          path: pathname,
        });
      }
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = () => {
    router.push(`/question/edit/${itemId}`)
  };
  return (
    <div className="flex items-center justify-end gap-3 w-full">
      {type === "QUESTION" && (
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={handleEdit}
          className="w-full xs:w-auto"
        >
          <Pencil size={17} className="text-gray-500 mr-2" />
          Edit
        </Button>
      )}
      <Button
        size={"sm"}
        variant={"secondary"}
        onClick={handleDelete}
        className="w-full xs:w-auto"
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
