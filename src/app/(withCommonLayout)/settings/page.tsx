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

  // Handler for updating profile information
  const handleProfileSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Profile Updated:", data);
  };

  // Handler for updating the password
  const handlePasswordSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await handleChangePass(data).unwrap();
      if (response.success === true) {
        toast.success("password change successful");
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error.message || "something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Edit Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Edit Profile Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Edit Profile
          </h2>
          <EForm onSubmit={handleProfileSubmit}>
            <div className="space-y-4">
              <EInput
                label="Your Name"
                name="name"
                defaultValue="Ismail Hossain"
              />
              <EInput
                label="Store Name"
                name="storeName"
                defaultValue="Maxima Studio"
              />
              <ESelect
                label="Location"
                name="location"
                defaultValue="United States"
                options={[
                  { key: "us", label: "United States" },
                  { key: "ca", label: "Canada" },
                  { key: "uk", label: "United Kingdom" },
                ]}
              />
              <ESelect
                label="Currency"
                name="currency"
                defaultValue="US Dollar ($)"
                options={[
                  { key: "usd", label: "US Dollar ($)" },
                  { key: "eur", label: "Euro (€)" },
                  { key: "gbp", label: "British Pound (£)" },
                ]}
              />
              <EInput
                label="Email"
                name="email"
                type="email"
                defaultValue="Amjina@gmail.com"
              />
              <EInput
                label="Phone"
                name="phone"
                type="tel"
                defaultValue="01978536547"
              />
              <EInput
                label="Address"
                name="address"
                defaultValue="813 Howard Street, Oswego NY, 13126, USA"
              />
              <button
                type="submit"
                className="w-full bg-[#fd6506] text-white py-2 rounded-md hover:bg-orange-500 transition"
              >
                Save Changes
              </button>
            </div>
          </EForm>
        </div>

        {/*======================== Change Password Section====================== */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Change Password
          </h2>
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
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition"
              >
                Update Password
              </button>
            </div>
          </EForm>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Order Confirmation</span>
            <input type="checkbox" className="toggle-checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Order Status Changed</span>
            <input type="checkbox" className="toggle-checkbox" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Order Delivered</span>
            <input type="checkbox" className="toggle-checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Email Notifications</span>
            <input type="checkbox" className="toggle-checkbox" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
