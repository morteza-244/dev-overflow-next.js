import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import GlobalSearch from "./GlobalSearch";
const MobileGlobalSearch = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="sm:hidden flex justify-center items-center rounded-full"
        >
          <Search size={20} />
        </Button>
      </DialogTrigger>
        <DialogContent className="w-72 xs:w-96 rounded-md p-4 border-none">
          <div className="h-80 py-2 mt-5">
            <GlobalSearch />
          </div>
        </DialogContent>
    </Dialog>
  );
};

export default MobileGlobalSearch;
