"use client";

import Image from "next/image";
import { useState } from "react";

function numberOfPhotos(photoSizeMb: number, hardDriveSizeGb: number): number {
  const photoAmount: number = (hardDriveSizeGb * 1000) / photoSizeMb;

  return Math.floor(photoAmount);
}
numberOfPhotos(1, 1);

export default function Home() {
  const [fileSizeMB, setFileSizeMB] = useState(0);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      //Generate preview images for each image
      const imagePrevURLs = filesArray.map((file) => URL.createObjectURL(file));
      // const imagePrevURL = imagePrevURLs.map((img) => {
      //   return img;
      // });
      setPreviews(imagePrevURLs);
      //Sum total bytes across all selected files
      const totalByte = filesArray.reduce((acc, file) => acc + file.size, 0);
      //Convert bytes to Kilobytes
      const sizeInKB = totalByte / 1024;
      setFileSizeMB(Number(sizeInKB.toFixed(2)));
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-12 text-slate-900">
      <div className="w-full max-w-3xl rounded-2xl bg-slate-200 p-6 shadow-lg ring-1 ring-slate-200 sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-700">
            Photo Storage Checker
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Checks the data storage of any photo
          </h1>
        </div>
        <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-200 overflow-hidden">
          {previews.length > 0 ? (
            previews.map((src, index) => (
              <Image
                src={src}
                alt={`Previews ${index}`}
                key={index}
                width={100}
                height={100}
                className="pointer-events-none"
              />
            ))
          ) : (
            <span className="text-gray-500">Upload Photos</span>
          )}
        </label>
        <div className="grid gap-6 md:grid-cols-2">
          <input
            type="file"
            accept="image"
            multiple
            onChange={handleFileChange}
            className="mt-2 w-full rounded-l border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <div className="flex flex-col">
            <div className="mt-2 min-h-[240px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base leading-7 text-slate-800 shadow-inner">
              <h3>Your file size is {fileSizeMB}KB</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
