"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useState } from "react";
import GlobalSearch from "./GlobalSearch";
const MobileGlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(!open);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="md:hidden flex justify-center items-center rounded-full"
        >
          <Search size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-72 xs:w-96 sm:w-full rounded-md p-0">
        <div className="h-[330px] overflow-y-auto">
          <GlobalSearch onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileGlobalSearch;
