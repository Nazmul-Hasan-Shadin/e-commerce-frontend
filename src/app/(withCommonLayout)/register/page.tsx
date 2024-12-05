"use client";
import React from "react";
import EInput from "@/src/components/form/EInput"; // Assuming EInput is located at this path
import { Button } from "@nextui-org/react";
import { SubmitHandler } from "react-hook-form";
import EForm from "@/src/components/form/EForm"; // Assuming EForm is located at this path
import { useFormContext } from "react-hook-form";

const Register = () => {
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Registration data", data);
    // Handle form submission here, e.g., send data to the server for registration
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-center text-3xl font-bold text-[#fd6506] mb-6">
          Register
        </h2>

        <EForm onSubmit={onSubmit}>
          <div className="mb-4">
            <EInput name="email" label="Email" type="email" required />
          </div>

          <div className="mb-4">
            <EInput name="password" label="Password" type="password" required />
          </div>

          <div className="mb-4">
            <EInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              required
            />
          </div>

          <div className="mb-6 flex justify-between items-center">
            <Button
              type="submit"
              className="w-full bg-[#fd6506] hover:bg-[#e94e00] text-white"
            >
              Register
            </Button>
          </div>

          <div className="text-center text-sm">
            <span>Already have an account?</span>
            <a href="/login" className="text-[#fd6506] hover:underline ml-1">
              Login
            </a>
          </div>
        </EForm>
      </div>
    </div>
  );
};

export default Register;
