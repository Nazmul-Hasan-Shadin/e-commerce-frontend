"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { SubmitHandler } from "react-hook-form";
import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import { useLoginMutation } from "@/src/redux/feature/auth/auth.api";
import { verifyToken } from "@/src/utils/verifyToke";
import { TUser, setUser } from "@/src/redux/feature/auth/auth.slice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/src/redux/hook";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [login, { data, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const toastId = toast.loading("Logining");
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await login(userData).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(user);
      dispatch(setUser({ user, token: res.data.accessToken }));

      toast.success("Logged In", { id: toastId });
      router.push("/");
      console.log(res, "login res");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-center text-3xl font-bold text-[#fd6506] mb-6">
          Login
        </h2>

        <EForm onSubmit={onSubmit}>
          <div className="mb-4">
            <EInput name="email" label="Email" type="email" required />
          </div>

          <div className="mb-6">
            <EInput name="password" label="Password" type="password" required />
          </div>

          <div className="mb-6 flex justify-between items-center">
            <Button
              type="submit"
              className="w-full bg-[#fd6506] hover:bg-[#e94e00] text-white"
            >
              Login
            </Button>
          </div>

          <div className="text-center text-sm">
            <span>Don't have an account?</span>
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
