import { lineSpinner } from "ldrs";

const SubmitLoading = ({ label }: { label: string }) => {
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
