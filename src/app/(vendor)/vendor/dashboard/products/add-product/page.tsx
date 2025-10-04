"use client";

import React, { useRef, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import ESelect from "@/src/components/form/ESelect";
import FxTextArea from "@/src/components/form/ETextArea";
import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { useCreateProductMutation } from "@/src/redux/feature/vendor/vendor.api";
import Container from "@/src/components/ui/Container";

const AddProductPage = () => {
  const { isLoading, data: userData } = useGetCurrentUserQuery(undefined);

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

  // console.log(categoryList?.data);

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

    console.log("product isflash", data);

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
    } catch (error) {
      toast.error("Error adding product.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isFlash = [
    { label: "Flash sell", id: true },
    { label: "Not Flash sell", id: false },
  ];

  return (
    <Container>
      <div className="gap-5 bg-[#FFFFFF]  p-3 md:p-4 lg:p-5 mt-3">
        <div className="flex justify-between items-center">
          <h2 className="text-medium md:text-medium lg:text-xl font-bold text-gray-800 ">
            Add Product
          </h2>
          <Link href={"/vendor/dashboard/products"}>
            <Button className="bg-primary-color text-white rounded-sm">
              {" "}
              Manage Product
            </Button>
          </Link>
        </div>
        <Divider className="my-4" />
        <EForm onSubmit={onSubmit}>
          <div
            aria-label="Upload images"
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
              multiple // Allow multiple file selection
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleFileChange}
            />
            {imagePreviews.length > 0 ? (
              <div className="flex gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="w-1/4 h-auto">
                    <Image
                      alt={`Preview ${index}`}
                      className="object-contain"
                      height={100}
                      src={preview}
                      width={100}
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

          <div className="grid grid-cols-1 gap-5">
            <EInput
              label="Name"
              name="name"
              placeholder="Name"
              type="text"
              variant="bordered"
            />
            <EInput
              label="Price"
              name="price"
              placeholder="Price"
              type="number"
              variant="bordered"
            />
            <div className="md:grid-cols-2 grid gap-3">
              <ESelect
                defaultSelectedKeys={[categoryList?.data[0].id]}
                label="Select Category"
                name="category"
                options={categoryList?.data || []}
                size="md"
              />
              <ESelect
                dropDownHeading="Is Flash Sell?"
                label="Select flash or not"
                name="isFlash"
                options={isFlash}
              />
            </div>
            <EInput
              label="Discount"
              name="discount"
              placeholder="Discount"
              type="number"
              variant="bordered"
            />
            <EInput
              label="Inventory Count"
              name="inventoryCount"
              placeholder="Inventory count"
              type="number"
              variant="bordered"
            />
            <FxTextArea
              label="Detailed Description"
              name="description"
              placeholder=" Description of product ..."
              variant="bordered"
            />
          </div>

          <Divider className="my-6" />

          <div className="flex justify-end">
            <Button
              className="bg-primary-color text-white"
              type="submit"
              variant="bordered"
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
