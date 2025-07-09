"use client";
import React, { Suspense } from "react";
import { Button } from "@nextui-org/react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import { useResetPasswordMutation } from "@/src/redux/feature/auth/auth.api";

const ResetPasswordForm = () => {
  const [handleResetPassword] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract token and id (email) from URL params
  const token = searchParams.get("token");
  const email = searchParams.get("id"); // id is treated as the email

  const onSubmit: SubmitHandler<any> = async (formData) => {
    const toastId = toast.loading("Updating password...");

    if (!token || !email) {
      toast.error("Invalid or expired reset link.", { id: toastId });

      return;
    }

    try {
      const payload = {
        email,
        newPassword: formData.password,
      };

      // Call the resetPassword API mutation
      await handleResetPassword({
        ...payload,
        token,
      }).unwrap();

      toast.success("Password updated successfully!", { id: toastId });
      router.push("/login");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update password. Please try again.",
        { id: toastId },
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-center text-3xl font-bold text-[#fd6506] mb-6">
          Reset Password
        </h2>

        <EForm onSubmit={onSubmit}>
          {/* New Password Input */}
          <div className="mb-4">
            <EInput
              required
              label="New Password"
              name="password"
              placeholder="Enter new password"
              type="password"
            />
          </div>

          {/* Confirm New Password Input */}
          <div className="mb-6">
            <EInput
              required
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Re-enter new password"
              type="password"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <Button
              className="w-full bg-[#fd6506] hover:bg-[#e94e00] text-white"
              type="submit"
            >
              Reset Password
            </Button>
          </div>

          {/* Redirect to Login */}
          <div className="text-center text-sm">
            <span>Remember your password?</span>
            <a className="text-[#fd6506] hover:underline ml-1" href="/login">
              Login
            </a>
          </div>
        </EForm>
      </div>
    </div>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPassword;
