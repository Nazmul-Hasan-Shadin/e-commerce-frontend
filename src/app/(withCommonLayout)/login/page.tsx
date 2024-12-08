"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { SubmitHandler } from "react-hook-form";
import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import { useLoginMutation } from "@/src/redux/feature/auth/auth.api";
import { verifyToken } from "@/src/utils/verifyToke";
import { TUser, setUser } from "@/src/redux/feature/auth/auth.slice";
import { useAppDispatch } from "@/src/redux/hook";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const navigate = usePathname();

  const onSubmit: SubmitHandler<any> = async (formData) => {
    const toastId = toast.loading("Logging in...");
    const userData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Attempt login
      const res = await login(userData).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      // Save user data and token in Redux
      dispatch(setUser({ user, token: res.data.accessToken }));

      // Display success toast
      toast.success("Logged in successfully!", { id: toastId });

      // Navigate to dashboard if currently on login page
      if (navigate === "/login") {
        router.push("/dashboard/add-product");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-center text-3xl font-bold text-[#fd6506] mb-6">
          Login
        </h2>

        <EForm onSubmit={onSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <EInput label="Email" name="email" required type="email" />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <EInput label="Password" name="password" required type="password" />
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
