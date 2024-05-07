import LeftSidebar from "@/components/shared/LeftSidebar";
import NavBar from "@/components/shared/navbar/NavBar";
import RightSidebar from "@/components/shared/RightSidebar";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative bg-light-850 dark:bg-dark-100">
      <NavBar />
      <div className="flex">
        <LeftSidebar />
        <section className="min-h-screen flex flex-col flex-1 px-5 pb-5 pt-36 overflow-x-auto">
          <div className="w-full mx-auto max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default Layout;
