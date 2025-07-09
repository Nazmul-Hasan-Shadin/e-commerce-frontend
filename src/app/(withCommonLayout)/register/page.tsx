"use client";
import React from "react";
import { Button } from "@heroui/react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import { useAppDispatch } from "@/src/redux/hook";
import { useRegisterMutation } from "@/src/redux/feature/auth/auth.api";
import EForm from "@/src/components/form/EForm"; // Assuming EForm is located at this path
import EInput from "@/src/components/form/EInput"; // Assuming EInput is located at this path
import ESelect from "@/src/components/form/ESelect";

const Register = () => {
  const [handleRegister, { data, error }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      role: data.role,
      password: data.password,
    };

    console.log(userData);

    try {
      const res = await handleRegister(userData).unwrap();

      toast.success("Account created succesfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-center text-3xl font-bold text-[#fd6506] mb-6">
          Register
        </h2>

        <EForm onSubmit={onSubmit}>
          <div className="mb-4">
            <EInput required label="User Name" name="username" type="text" />
          </div>
          <div className="mb-4">
            <EInput required label="Email" name="email" type="email" />
          </div>

          <div className="mb-4">
            <ESelect
              label=" ROle"
              name="role"
              options={[
                { id: "user", label: "user" },
                { id: "vendor", label: "vendor" },
              ]}
            />
          </div>

          <div className="mb-4">
            <EInput required label="Password" name="password" type="password" />
          </div>

          <div className="mb-4">
            <EInput
              required
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
          </div>

          <div className="mb-6 flex justify-between items-center">
            <Button
              className="w-full bg-[#fd6506] hover:bg-[#e94e00] text-white"
              type="submit"
            >
              Register
            </Button>
          </div>

          <div className="text-center text-sm">
            <span>Already have an account?</span>
            <Link className="text-[#fd6506] hover:underline ml-1" href="/login">
              Login
            </Link>
          </div>
        </EForm>
      </div>
    </div>
  );
};

export default Register;
