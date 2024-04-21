import NavBar from "@/components/shared/navbar/NavBar";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative bg-light-850 dark:bg-dark-100">
      <NavBar />
      <div className="flex">
        RightSidebar
        <section className="min-h-screen flex flex-col-flex-1 px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="w-full mx-auto max-w-5xl">{children}</div>
        </section>
        LefSidebar
      </div>
    </main>
  );
};

export default Layout;
