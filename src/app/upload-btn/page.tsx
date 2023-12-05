"use client";

import { UploadButton } from "@uploadthing/react";

import { OurFileRouter } from "../api/uploadthing/core";

import { useState } from "react";
import Link from "next/link";

export default function UploadBtn() {
  const [images, setImages] = useState<
    {
      key: string;
      name: string;
      url: string;
    }[]
  >([]);

  const title = images.length ? (
    <>
      <p>Upload Complete!</p>
      <p>{images.length} files</p>
    </>
  ) : null;

  const imgList = (
    <>
      {title}
      {console.log(images)}
      <ul>
        {images.map((img) => (
          <li key={img.key} className="mt-2">
            <Link href={`${img.url}`} target="_blank">
              {img.url}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <UploadButton<OurFileRouter>
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            setImages(res);
            const json = JSON.stringify(res);
            // Do something with the response
            console.log(json);
          }

          //alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        onBeforeUploadBegin={(files) => {
          // Preprocess files before uploading (e.g. rename them)
          return files.map(
            (f) => new File([f], "renamed-" + f.name, { type: f.type })
          );
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
        }}
      />
      {imgList}
    </main>
  );
}
