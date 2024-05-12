import LeftSidebar from "@/components/shared/LeftSidebar";
import NavBar from "@/components/shared/navbar/NavBar";
import RightSidebar from "@/components/shared/RightSidebar";
import { Toaster } from "@/components/ui/sonner";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative">
      <div className="container mx-auto p-0">
        <NavBar />
        <div className="flex">
          <LeftSidebar />
          <section className="min-h-screen flex flex-col flex-1 ml-0 sm:ml-[83px] md:ml-[83px] lg:ml-[266px] p-5 overflow-x-auto">
            <div className="w-full mx-auto max-w-5xl">{children}</div>
          </section>
          <RightSidebar />
        </div>
        <Toaster richColors={true} position="top-center" duration={2000} />
      </div>
    </main>
  );
};

export default Layout;
