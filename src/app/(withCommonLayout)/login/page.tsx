"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { SubmitHandler } from "react-hook-form";
import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import {
  useForgetPasswordMutation,
  useGetCurrentUserQuery,
  useLoginMutation,
} from "@/src/redux/feature/auth/auth.api";
import { verifyToken } from "@/src/utils/verifyToke";
import { TUser, setUser } from "@/src/redux/feature/auth/auth.slice";
import { useAppDispatch } from "@/src/redux/hook";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { loginHandler } from "@/src/services/auth";

// Define role type for stricter type checking
type Role = "user" | "admin" | "vendor";

// Default credentials for each role
const roleCredentials: Record<Role, { email: string; password: string }> = {
  user: { email: "user@gmail.com", password: "12345" },
  admin: { email: "bani@gmail.com", password: "1234" },
  vendor: { email: "vendor@gmail.com", password: "1234" },
};

const Login = () => {
  const [login] = useLoginMutation();
  const [handleForgetPassAndSendEmail] = useForgetPasswordMutation();
  const { data: handleGetUser } = useGetCurrentUserQuery(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const navigate = usePathname();

  const [selectedRole, setSelectedRole] = useState<Role>("user");
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: roleCredentials[selectedRole].email,
    password: roleCredentials[selectedRole].password,
  });

  // Handle role selection and update credentials
  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    setCredentials(roleCredentials[role]);
  };

  const onSubmit: SubmitHandler<any> = async (formData) => {
    const toastId = toast.loading("Logging in...");
    const userData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await loginHandler(userData);
      console.log("login res", res);

      const user = verifyToken(res.data.accessToken) as {
        email: string;
        role: string;
        iat: number;
        exp: number;
      };

      dispatch(setUser({ user, token: res.data.accessToken }));

      toast.success("Logged in successfully!", { id: toastId });

      if (user.role === "vendor") {
        if (navigate === "/login") {
          if (handleGetUser?.data?.data?.shop == null) {
            router.push(`/${user.role}/dashboard/create-shop`);
          }
          router.push(`/${user.role}/dashboard`);
        }
      } else if (user.role === "user") {
        if (navigate === "/login") {
          router.push(`/${user.role}/dashboard`);
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        id: toastId,
      });
    }
  };

  const handleForgotPassword = async () => {
    const emailInput = (
      document.querySelector('input[name="email"]') as HTMLInputElement
    )?.value;

    if (!emailInput) {
      toast.error("Please enter your email address first.");
      return;
    }

    const toastId = toast.loading("Sending reset password email...");

    try {
      await handleForgetPassAndSendEmail({ email: emailInput }).unwrap();
      toast.success("Reset password email sent successfully!", {
        id: toastId,
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to send reset password email.",
        { id: toastId }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-center text-3xl font-bold text-[#fd6506] mb-6">
          Login
        </h2>

        {/* Role Selection Tabs */}
        <div className="flex justify-between mb-6 border-b">
          <button
            className={`w-1/3 text-center py-2 ${selectedRole === "user" ? "font-bold text-[#fd6506]" : "text-gray-600"}`}
            onClick={() => handleRoleChange("user")}
          >
            User
          </button>
          <button
            className={`w-1/3 text-center py-2 ${selectedRole === "admin" ? "font-bold text-[#fd6506]" : "text-gray-600"}`}
            onClick={() => handleRoleChange("admin")}
          >
            Admin
          </button>
          <button
            className={`w-1/3 text-center py-2 ${selectedRole === "vendor" ? "font-bold text-[#fd6506]" : "text-gray-600"}`}
            onClick={() => handleRoleChange("vendor")}
          >
            Vendor
          </button>
        </div>

        {/* Display credentials for selected role */}
        <div className="mb-6 text-center text-xs">
          <p className="font-semibold">Credentials for {selectedRole}:</p>
          <p>
            Email: <span className="font-mono">{credentials.email}</span>
          </p>
          <p>
            Password: <span className="font-mono">{credentials.password}</span>
          </p>
        </div>

        <EForm onSubmit={onSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <EInput
              label="Email"
              name="email"
              required
              type="email"
              defaultValue={credentials.email}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <EInput
              label="Password"
              name="password"
              required
              type="password"
              defaultValue={credentials.password}
            />
          </div>

          {/* Submit Button */}
          <div className="mb-6 flex justify-between items-center">
            <Button
              className="w-full bg-[#fd6506] hover:bg-[#e94e00] text-white"
              type="submit"
            >
              Login
            </Button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center text-sm mb-4">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[#fd6506] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Signup Redirect */}
          <div className="text-center text-sm">
            <span>Don&apos;t have an account?</span>
            <a href="/signup" className="text-[#fd6506] hover:underline ml-1">
              Sign Up
            </a>
          </div>
        </EForm>
      </div>
    </div>
  );
};

export default Login;
