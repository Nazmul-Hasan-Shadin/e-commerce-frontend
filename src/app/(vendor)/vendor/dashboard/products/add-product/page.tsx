"use client";

import React, { useRef, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import ESelect from "@/src/components/form/ESelect";
import FxTextArea from "@/src/components/form/ETextArea";
import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { useCreateProductMutation } from "@/src/redux/feature/vendor/vendor.api";
import toast from "react-hot-toast";
import Image from "next/image";
import Container from "@/src/components/ui/Container";

const AddProductPage = () => {
  const { isLoading, data: userData } = useGetCurrentUserQuery(undefined);
  console.log(userData, "iam currenuserdata");

  const { data: categoryList } = useGetAllCategoryQuery(undefined);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Updated to support multiple files
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Updated to store multiple image previews

  const [handleCreateProduct] = useCreateProductMutation();

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews); // Set previews for each selected file
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (productInfo) => {
    const formData = new FormData();
    const data = {
      name: productInfo?.name,
      shopId: userData?.data.shop?.id,
      isFlash: productInfo.isFlash === "Flash sell" ? true : false,
      price: Number(productInfo?.price),
      categoryId: productInfo?.category,
      discount: Number(productInfo?.discount),
      inventoryCount: Number(productInfo?.inventoryCount),
      description: productInfo?.description,
    };

    formData.append("data", JSON.stringify(data));

    // Append multiple files to formData
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    // for (let [key, values] of formData) {
    //   console.log(key, values);
    // }

    try {
      const response = await handleCreateProduct(formData).unwrap();
      if (response.success) {
        toast.success("Product has been added!");
      }
      console.log("hi");
    } catch (error) {
      toast.error("Error adding product.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="w-3/4 mx-auto gap-5 bg-[#FFFFFF] p-5 mt-3">
        <h2 className="text-2xl font-bold mb-5">Add Product Info</h2>
        <Divider />
        <EForm onSubmit={onSubmit}>
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload images"
            className="flex items-center mb-5 justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
            style={{ width: "100%", height: "200px" }}
            onClick={handleUploadClick}
            onKeyDown={(event) => {
              if (["Enter", " "].includes(event.key)) {
                handleUploadClick();
              }
            }}
          >
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple // Allow multiple file selection
            />
            {imagePreviews.length > 0 ? (
              <div className="flex gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="w-1/4 h-auto">
                    <Image
                      src={preview}
                      alt={`Preview ${index}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>Drop your images here, or click to browse</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <EInput name="name" type="text" label="Name" variant="bordered" />
            <EInput
              name="price"
              type="number"
              label="Price"
              variant="bordered"
            />
            <ESelect
              options={categoryList?.data || []}
              name="category"
              label="Category"
            />
            <ESelect
              dropDownHeading="Is Flash Sell?"
              options={[
                { label: "Flash sell", id: true },
                { label: "Not Flash sell", id: false },
              ]}
              name="isFlash"
              label="Flash Sale"
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
              name="description"
              label="Detailed Description"
              variant="bordered"
            />
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-primary-color text-white"
              variant="bordered"
              type="submit"
            >
              Create Product
            </Button>
          </div>
        </EForm>
      </div>
    </Container>
  );
};

export default AddProductPage;
