"use client";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import ESelect from "@/src/components/form/ESelect";
import { useChangePasswordMutation } from "@/src/redux/feature/auth/auth.api";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [handleChangePass] = useChangePasswordMutation();

  const handleProfileSubmit: SubmitHandler<FieldValues> = (data) => {};

  const handlePasswordSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await handleChangePass(data).unwrap();
      if (response.success === true) {
        toast.success("Password change successful");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        User Settings
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Profile Info</h2>
        <p className="text-sm text-gray-500 mb-6">
          Change profile picture; it must be under 1MB.
        </p>
        <EForm onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <EInput label="Name" name="name" defaultValue="Abdul Khaled" />
            <EInput label="Upload Profile" name="profile" type="file" />
          </div>
        </EForm>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Contact Info</h2>
        <p className="text-sm text-gray-500 mb-6">
          Change your email address and phone number.
        </p>
        <EForm onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <EInput
              label="Email Address"
              name="email"
              type="email"
              defaultValue="abdul@khaled.com"
            />
            <EInput
              label="Address"
              name="address"
              defaultValue="123 Elm Street, Springfield, IL"
            />
          </div>
        </EForm>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Others</h2>
        <p className="text-sm text-gray-500 mb-6">Change your bio.</p>
        <EForm onSubmit={handleProfileSubmit}>
          <EInput
            label="Bio"
            name="bio"
            type="textarea"
            defaultValue="Passionate about discovering the latest trends in fashion, electronics, and home decor. Abdul Khaled loves sharing honest reviews and recommendations for products that add value to everyday life. A savvy shopper with a knack for finding great deals and unique items. Interests: Gadgets, Lifestyle Products, Sustainable Living, and Minimalist Design."
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-md mt-4 hover:bg-pink-500 transition"
          >
            Save
          </button>
        </EForm>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Change Password
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Update your password for security purposes.
        </p>
        <EForm onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <EInput
              label="Current Password"
              name="oldPassword"
              type="password"
              placeholder="Enter current password"
            />
            <EInput
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
            />
            <button
              type="submit"
              className="w-full bg-[#fd6506] text-white py-2 rounded-md hover:bg-orange-500 transition"
            >
              Update Password
            </button>
          </div>
        </EForm>
      </div>
    </div>
  );
};

export default ProfilePage;
