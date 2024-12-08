"use client";
import React, { ReactNode } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

interface IProps {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
  resolver?: any;
}

const EForm = ({ children, onSubmit }: IProps) => {
  const methods = useForm();
  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default EForm;
