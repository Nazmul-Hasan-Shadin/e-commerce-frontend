"use client";

import React, { use, useRef, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import ESelect from "@/src/components/form/ESelect";
import FxTextArea from "@/src/components/form/ETextArea";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/src/redux/feature/vendor/vendor.api";
import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";
import toast from "react-hot-toast";

type Params = Promise<{ id: string }>;

const UpdateProductPage = ({ params }: { params: Params }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const id = use(params).id;
  const { data: categoryList } = useGetAllCategoryQuery(undefined);

  const [handleUpdateProduct] = useUpdateProductMutation();
  const { data: productDataOfSelectedProduct } = useGetProductByIdQuery(id);

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
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (productInfo) => {
    const formData = new FormData();

    // Append text fields
    const data = {
      name: productInfo.name,
      categoryId: productInfo.categoryId,
      discount: Number(productInfo.discount),
      inventoryCount: Number(productInfo.inventoryCount),
      description: productInfo.description,
      price: Number(productInfo.price),
    };

    formData.append("data", JSON.stringify(data));

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await handleUpdateProduct({ id, data }).unwrap();
      if (response.success) {
        toast.success("updated succesful");
      }
    } catch (error: any) {
      toast.error(error.message || "update failed");
    }
  };

  return (
    <div className="w-3/4 mx-auto gap-5">
      <h2 className="text-2xl font-bold mb-5">Update Product Info</h2>
      <Divider />
      <EForm
        onSubmit={onSubmit}
        defaultValues={{
          name: productDataOfSelectedProduct?.data?.name,
          price: productDataOfSelectedProduct?.data?.price,
          category: productDataOfSelectedProduct?.data?.categoryId,
          description: productDataOfSelectedProduct?.data?.description,
          discount: productDataOfSelectedProduct?.data?.discount,
          inventoryCount: productDataOfSelectedProduct?.data?.inventoryCount,
        }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload image"
          className="flex items-center mb-5 justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
          style={{ width: "100%", height: "200px" }}
          onClick={handleUploadClick}
          onKeyPress={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handleUploadClick();
            }
          }}
        >
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            defaultValue={productDataOfSelectedProduct?.data.name}
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
          <EInput
            defaultValue={productDataOfSelectedProduct?.data?.name}
            name="name"
            type="text"
            label="Name"
            variant="bordered"
          />
          <EInput
            defaultValue={productDataOfSelectedProduct?.data?.price}
            name="price"
            type="number"
            label="Price"
            variant="bordered"
          />
          <ESelect
            options={categoryList?.data}
            name="category"
            label="Category"
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
            label="Description"
            variant="bordered"
          />
        </div>

        <div className="flex flex-end">
          <Button className="bg-primary-color text-white ml-auto" type="submit">
            Update Product
          </Button>
        </div>
      </EForm>
    </div>
  );
};

export default UpdateProductPage;
