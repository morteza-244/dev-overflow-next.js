"use client";
import { bouncy } from "ldrs";
import { useTheme } from "next-themes";

const ResultLoading = () => {
  const { theme } = useTheme();
  bouncy.register();
  return (
    <div className="text-center space-y-2">
      <l-bouncy
        size="35"
        speed="1.75"
        color={theme === "dark" ? "white" : "black"}
      />
      <p className="text-text-dark200_light800 body-regular">Browsing the entire database</p>
    </div>
  );
};

export default ResultLoading;
