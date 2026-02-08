"use client";
import toast from "react-hot-toast";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Link from "next/link";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import { useCreateCategoryMutation } from "@/src/redux/feature/admin/admin.categoryapi";

const AddCategory = () => {
  const [handleCreateCategory] = useCreateCategoryMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const onSubmit: SubmitHandler<FieldValues> = async (categoryInfo) => {
    const formData = new FormData();
    const payload = {
      name: categoryInfo.name,
      description: categoryInfo.description,
    };

    formData.append("data", JSON.stringify(payload));

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await handleCreateCategory(formData).unwrap();

      if (response.success === true) {
        toast.success(`${categoryInfo.name} has been created successfully!`);
      } else {
        toast.error(response.message || "An error occurred.");
      }
    } catch (error: any) {
  toast.error(
    error?.data?.message || error?.error || "Something went wrong"
  );
}
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className=" p-2 md:p-4">
      <span className="block my-3 md:my-2">
        {" "}
        <span className="text-lg">Dashboard</span> / Create category
      </span>
      <div className=" bg-white shadow-lg rounded-lg  p-3 md:p-3 lg:p-4">
        <div className="flex  items-center justify-between">
          <h2 className="text-sm md:text-md lg:text-xl font-bold text-gray-800 ">
            Create Category
          </h2>
          <Link href={"/admin/dashboard/category-list"}>
            <Button
              className="bg-primary-color  text-white rounded-sm"
              size="md"
            >
              {" "}
              Manage Category
            </Button>
          </Link>
        </div>
        <Divider className="my-4" />

        <EForm onSubmit={onSubmit}>
          <div
            aria-label="Upload image"
            className="flex items-center mb-5 justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
            role="button"
            style={{ width: "100%", height: "200px" }}
            tabIndex={0}
            onClick={handleUploadClick}
            onKeyDown={(event) => {
              if (["Enter", " "].includes(event.key)) {
                handleUploadClick();
              }
            }}
          >
            <input
              ref={inputRef}
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleFileChange}
            />

            {imagePreview ? (
              <Image
                alt="preview"
                className="max-w-full max-h-full object-cover"
                height={400}
                src={imagePreview}
                width={400}
              />
            ) : (
              <div className="text-center text-gray-500">
                <p>Drop your image here or click to browse</p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <EInput
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#fd6506] focus:outline-none"
              label="Name"
              name="name"
              type="text"
              variant="bordered"
            />
            <EInput
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#fd6506] focus:outline-none"
              label="Description"
              name="description"
              variant="bordered"
            />
          </div>
          <div className="flex justify-start mt-5">
            <Button
              className="bg-[#fd6506] text-white py-2 px-6 rounded-lg hover:bg-[#f84f01] transition-all rounded-none"
              type="submit"
              variant="flat"
            >
              Create Category
            </Button>
          </div>
        </EForm>
      </div>
    </div>
  );
};

export default AddCategory;
