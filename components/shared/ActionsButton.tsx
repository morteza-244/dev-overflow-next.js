"use client";

import { Button } from "@/components/ui/button";
import { TActions } from "@/types";
import { Pencil, Trash2 } from "lucide-react";

interface ActionsButtonProps {
  type: TActions;
  itemId: string;
}

const ActionsButton = ({ type }: ActionsButtonProps) => {
  const handleDelete = () => {};
  const handleEdit = () => {};
  return (
    <div className="flex items-center justify-end gap-3 w-full">
      {type === "QUESTION" && (
        <Button size={"sm"} variant={"secondary"} onClick={handleEdit} className="w-full xs:w-auto">
          <Pencil size={17} className="text-gray-500 mr-2" />
          Edit
        </Button>
      )}
      <Button size={"sm"} variant={"secondary"} onClick={handleDelete} className="w-full xs:w-auto">
        <Trash2 size={17} className="text-red-600 mr-2" />
        Delete
      </Button>
    </div>
  );
};

export default ActionsButton;
