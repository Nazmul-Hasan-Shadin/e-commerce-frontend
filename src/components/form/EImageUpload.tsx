"use client"; // Add this line if you are using React hooks like useState

import React, { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  // Handle file browse
  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Add Product Photo
      </h2>

      <div
        className="border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input
          accept="image/*"
          className="hidden"
          type="file"
          onChange={handleBrowse}
        />

        {/* Upload icon */}
        <img
          alt="upload icon"
          className="mb-4 w-12 h-12"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Cloud_upload_icon.svg/1024px-Cloud_upload_icon.svg.png"
        />
        <p className="text-lg text-gray-700">Drop your images here, or</p>
        <p className="text-lg text-orange-500 font-semibold">click to browse</p>
        <p className="text-sm text-gray-500">
          1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.
        </p>
      </div>

      {/* Display selected image */}
      {image && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Selected Image:
          </h3>
          <img
            alt="Selected"
            className="mt-2 rounded-lg max-w-full h-auto"
            src={URL.createObjectURL(image)}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
