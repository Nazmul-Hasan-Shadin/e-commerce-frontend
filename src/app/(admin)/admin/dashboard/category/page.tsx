"use client";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import FxTextArea from "@/src/components/form/ETextArea";
import { useCreateCategoryMutation } from "@/src/redux/feature/admin/admin.categoryapi";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [handleCreateCategory, { data, error }] = useCreateCategoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (categoryInfo) => {
    const payload = {
      name: categoryInfo.name,
      description: categoryInfo.description,
    };

    console.log(payload, "Form Payload");

    try {
      const response = await handleCreateCategory(payload).unwrap();
      if (response.success === true) {
        toast.success(`${categoryInfo.name} has been created successfully!`);
      } else {
        toast.error(response.message || "An error occurred.");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Category</h2>
      <Divider />
      <EForm onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-6 mb-4">
          <EInput
            name="name"
            type="text"
            label="Name"
            variant="bordered"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#fd6506] focus:outline-none"
          />
          <FxTextArea
            name="description"
            label="Description"
            variant="bordered"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#fd6506] focus:outline-none"
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            className="bg-[#fd6506] text-white py-2 px-6 rounded-lg hover:bg-[#f84f01] transition-all"
            variant="flat"
            type="submit"
          >
            Create Category
          </Button>
        </div>
      </EForm>
    </div>
  );
};

export default AddCategory;
