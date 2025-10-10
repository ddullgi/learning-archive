"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { uploadFiles } from "actions/storageActions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useDropzone } from "react-dropzone"
import { useCallback, useRef } from "react";

export default function FileDragDropZone() {
  const uploadImageMutation = useMutation({
    mutationFn: uploadFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
    onError: (e) => { console.log(e) }
  });

  const onDrop = useCallback(async (acceptedFiles) => {

    if (acceptedFiles.length > 0) {
      const formData = new FormData();

      acceptedFiles.forEach(file => {
        formData.append("file", file);
      })

      const result = await uploadFiles(formData)
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true })

  return (
    <div
      {...getRootProps()}
      className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center cursor-pointer"
    >
      <input  {...getInputProps()} />
      {
        uploadImageMutation.isPending ? (
          <Spinner />
        ) :
          isDragActive ? (
            <p> 파일을 놓아주세요</p>
          ) : (
            <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
          )
      }

    </div >
  );
}