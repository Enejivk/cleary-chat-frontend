import { uploadFiles } from "../services/Api";

export const handleUploadDocument = async () => {
  // Trigger a hidden file input click
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".pdf,.doc,.docx,.txt";
  input.multiple = false;
  input.onchange = async (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const uploadedDoc = await uploadFiles([file]);
        if (uploadedDoc && uploadedDoc.length > 0) {
        //   setLocalSelectedDocs((prev) => [...prev, uploadedDoc[0].id]);
        }
      } catch (error) {
        console.error("File upload failed:", error);
      }
      console.log("Selected file:", file);
    }
  };
  input.click();
};