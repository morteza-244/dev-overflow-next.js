import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface TinyEditorProps<T extends FieldValues = FieldValues> {
  field: ControllerRenderProps<T>;
  fieldName: keyof T;
}

const TinyEditor = <T extends FieldValues>({
  field,
  fieldName,
}: TinyEditorProps<T>) => {
  const editorRef = useRef(null);
  const { theme } = useTheme();

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR__API_KEY}
      onInit={(_evt, editor) => {
        // @ts-ignore
        editorRef.current = editor;
      }}
      onBlur={field.onBlur}
      onEditorChange={(content) => field.onChange({ [fieldName]: content })}
      init={{
        height: 350,
        menubar: false,
        browser_spellcheck: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "codesample",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
        ],
        toolbar:
          "undo redo " +
          "codesample bold italic forecolor alignleft aligncenter" +
          "alignright alignjustify bullist numlist",
        content_style: "body { font-family:Inter; font-size:16px }",
        skin: theme === "dark" ? "oxide-dark" : "oxide",
        content_css: theme === "dark" ? "dark" : "light",
      }}
    />
  );
};

export default TinyEditor;
