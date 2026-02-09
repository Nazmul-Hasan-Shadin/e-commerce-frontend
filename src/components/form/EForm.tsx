"use client";
import React, { ReactNode, useEffect } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
interface fromConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
  resolver?: any;
}

const EForm = ({ children, onSubmit, defaultValues }: IProps) => {
  const formConfig: fromConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);
  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default EForm;
