"use client";

import { uploadImage } from "@/actions/upload";
import Image from "next/image";
import { useState } from "react";

export function ImageUploader() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("loading=>", loading);
  return (
    <form
      action={async (e) => {
        setLoading((prev) => !prev);
        console.log("setLoading=>", loading);
        const link = await uploadImage(e);
        setLoading(false);
        setImage(link);
      }}
      className="space-y-4 p-4 bg-white  w-72 mx-auto rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="image"
          className="flex flex-col items-center  justify-center  min-h-32 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          {image ? (
            <Image
              src={image}
              height={60}
              width={200}
              alt="Uploaded"
              className="mt-2 w-full rounded-lg border border-gray-300 min-h-32"
            />
          ) : (
            <span className="text-sm text-gray-600">
              Click to select an images
            </span>
          )}
          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            required
          />
        </label>
      </div>

      <input
        type="submit"
        value={loading ? "Uploading..." : "Upload"}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      />
    </form>
  );
}