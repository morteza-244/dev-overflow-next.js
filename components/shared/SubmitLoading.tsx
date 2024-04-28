import { lineSpinner } from "ldrs";
import { useTheme } from "next-themes";

const SubmitLoading = ({ label }: { label: string }) => {
  const {theme} = useTheme()
  lineSpinner.register();
  return (
    <>
      <span className="mr-2">{label}</span>
      <l-line-spinner
        size="22"
        stroke="2"
        speed="1"
        color="white"
      ></l-line-spinner>
    </>
  );
};
export default SubmitLoading;
