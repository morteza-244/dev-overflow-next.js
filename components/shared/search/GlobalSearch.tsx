import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <Search className="absolute top-2 left-1" color="#64748b" />
      <Input
        type="text"
        placeholder="Search globally..."
        className="h-10 pl-8 bg-slate-200 dark:bg-muted"
      />
    </div>
  );
};

export default GlobalSearch;
