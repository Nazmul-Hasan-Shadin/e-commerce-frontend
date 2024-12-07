"use client";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import ESelect from "@/src/components/form/ESelect";
import FxTextArea from "@/src/components/form/ETextArea";
import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { useCreateProductMutation } from "@/src/redux/feature/vendor/vendor.api";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const AddProductPage = () => {
  const { isError, data: userData } = useGetCurrentUserQuery(undefined);
  const { data: categoryList } = useGetAllCategoryQuery(undefined);
  console.log(userData);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [handleCreateProduct, { data, error }] = useCreateProductMutation();

  // States for file and preview
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file, "iam 1 filel");

      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (productInfo) => {
    const formData = new FormData();

    const data = {
      name: productInfo?.name,
      shopId: userData?.data.shop?.id,
      price: Number(productInfo?.price),
      categoryId: productInfo?.category,
      discount: Number(productInfo?.discount),
      inventoryCount: Number(productInfo?.inventoryCount),
      // vendorId: userData?.data?.id,
      description: productInfo?.description,
    };

    console.log("all data", data);

    formData.append("data", JSON.stringify(data));

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await handleCreateProduct(formData).unwrap();
      if (response.success === true) {
        toast.success("product has added");
      }
      console.log(response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="w-3/4 mx-auto gap-5">
      <h2 className="text-2xl font-bold mb-5">Add Product Info</h2>
      <Divider />
      <EForm onSubmit={onSubmit}>
        <div
          className="flex items-center  mb-5 justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
          style={{ width: "100%", height: "200px" }}
          onClick={handleUploadClick}
        >
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-center text-gray-500">
              <p>Drop your image here, or click to browse</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <EInput name="name" type="text" label="Name" variant="bordered" />

          <EInput name="price" type="number" label="Price" variant="bordered" />
          <ESelect
            options={categoryList?.data}
            name="category"
            label="Category"
          />
          <EInput
            name="description"
            type="text"
            label="Description"
            variant="bordered"
          />
          <EInput
            name="discount"
            type="number"
            label="Discount"
            variant="bordered"
          />
          <EInput
            name="inventoryCount"
            type="number"
            label="Inventory Count"
            variant="bordered"
          />
          <FxTextArea
            name="descripiton"
            label="Description"
            variant="bordered"
          />
        </div>

        <div className="flex flex-end">
          <Button
            className="bg-primary-color text-white ml-auto"
            variant="bordered"
            type="submit"
          >
            Create Product
          </Button>
        </div>
      </EForm>
    </div>
  );
};

export default AddProductPage;
