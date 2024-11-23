import { Button } from "@/components/ui/button";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { createRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  isImageLoading,
  setIsIamgeLoading,
}) {
  const inputRef = createRef(null);

  const handleImageFileChange = (e) => {
    console.log(e.target.files?.[0]);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const handleRevoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };
  const handleOnDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files?.[0]);

    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const uploadImage = async () => {
    try {
      setIsIamgeLoading(true);
      const data = new FormData();
      data.append("file", imageFile);
      const responce = await axios.post(
        "http://localhost:5001/products/upload-image",
        data
      );

      if (responce.status == 200) {
        setUploadedImageUrl(responce?.data?.result?.url);
      }
      console.log(responce);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsIamgeLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <>
      <div className="w-full mt-4 max-w-md mx-auto">
        <label htmlFor="image" className="text-lg font-semibold mb-2 block">
          Upload Image
        </label>
        <div
          onDragOver={handleOnDragOver}
          onDrop={handleOnDrop}
          className="border-2 border-dashed rounded-lg p-4"
        >
          <input
            onChange={handleImageFileChange}
            ref={inputRef}
            id="image"
            type="file"
            className="hidden"
          />

          {!imageFile ? (
            <label
              className="flex flex-col items-center justify-center h-32 cursor-pointer"
              htmlFor="image"
            >
              <UploadCloudIcon className="w-10 h-10 to-muted-foreground mb-2" />
              <span>Drag & Drop or click to upload image</span>
            </label>
          ) : isImageLoading ? (
            <Skeleton className="w-full h-[20px]" />
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon />
              </div>
              <p className="text-sm font-medium">{imageFile.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className="to-muted-foreground hover:text-foreground"
                onClick={handleRevoveImage}
              >
                <XIcon />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          )}
        </div>
        <button>Upload</button>
      </div>
    </>
  );
}

export default ImageUpload;
