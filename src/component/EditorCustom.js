"use client";

import React from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import { useSession } from "next-auth/react";

const CustomEditor = ({ form }) => {
  const cloud = useCKEditorCloud({
    version: "46.0.1",
    premium: true,
  });
  const {data : session} = useSession();
  console.log({session})
  if (cloud.status === "error") return <div>Error!</div>;
  if (cloud.status === "loading") return <div>Loading...</div>;

  const {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Alignment,
    BlockQuote,
    Heading,
    Link,
    Font,
    FontColor,
    FontSize,
    FontFamily,
    MediaEmbed,

    // تصویر
    Image,
    ImageToolbar,
    ImageUpload,
    ImageInsert,
    ImageStyle,
    ImageResize,

    // جدول
    Table,
    TableToolbar,
    TableProperties,
    TableCellProperties,
  } = cloud.CKEditor;

class MyUploadAdapter {
  loader;
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    try {
      const file = await this.loader.file;
      const data = new FormData();
      data.append("file", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post-attachment`, {
        method: "POST",
        headers: {
          authorization: session?.accessToken ?? "",
        },
        body: data,
      });

      if (!res.ok) {
        throw new Error(`Upload failed with status ${res.status}`);
      }

      const result = await res.json();
      console.log("upload result:", result);

      // 📌 مسیر رو با احتیاط استخراج می‌کنیم
      const fileAddress = result?.data?.[0]?.address;
      if (!fileAddress) {
        throw new Error("No file address found in response");
      }

      return {
        default: `https://storage.bitimeapp.com/${fileAddress}`,
      };
    } catch (error) {
      console.error("Image upload error:", error);
      // اگر خطا بود، یه reject می‌فرستیم که CKEditor هم بفهمه
      return Promise.reject(error);
    }
  }

  abort() {
    // اگه نیاز بود می‌تونی logic کنسل کردن ریکوئست رو اینجا بزاری
  }
}

  function MyCustomUploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={form.watch("content") || ""} // 🔹 مقدار اولیه
      config={{
        licenseKey:"eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODY0MDYzOTksImp0aSI6Ijg0ZTI4MmFlLWY2ODYtNDVjNC1hYjRlLWJlZTFhNDBmOTBhMSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCIsIkUyUCIsIkUyVyJdLCJ2YyI6IjNjMDdlODUyIn0.yHM7oQHksDz0rRS-W6UdfoKmi-xWcBXSbVfAJdBhjz6ZyMyXKof_QkZ7W54rhCzvfukfEmpnrGYL34PlHOt_SA",
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Alignment,
          Heading,
          Link,
          Font,
          FontColor,
          FontSize,
          FontFamily,
          BlockQuote,
          MediaEmbed,
          Image,
          ImageToolbar,
          ImageUpload,
          ImageInsert,
          ImageStyle,
          ImageResize,
          Table,
          TableToolbar,
          TableProperties,
          TableCellProperties,
        ],
        extraPlugins: [MyCustomUploadPlugin],
        toolbar: [
          "Heading",
          "|",
          "Paragraph",
          "bold",
          "italic",
          "FontColor",
          "FontFamily",
          "FontSize",
          "|",
          "alignment",
          "|",
          "BlockQuote",
          "|",
          "link",
          "insertImage",
          "insertTable",
          "MediaEmbed",
          "|",
          "undo",
          "redo",
        ],
        image: {
          toolbar: [
            "imageStyle:inline",
            "imageStyle:block",
            "imageStyle:side",
            "|",
            "resizeImage",
            "|",
            "imageTextAlternative",
            "imageProperties",
          ],
        },
        fontFamily: {
          options: [
            "Kual, sans-serif",
            "Arial, sans-serif",
            "Times New Roman, serif",
            "YekanBakh, sans-serif",
          ],
          supportAllValues: true,
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "|",
            "tableProperties",
            "tableCellProperties",
          ],
        },
        language: "fa",
      }}
      onChange={(_, editor) => {
        const data = editor.getData();
        form.setValue("content", data); // 🔹 مقدار ذخیره میشه
      }}
    />
  );
};

export default CustomEditor;
