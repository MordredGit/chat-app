import React, { ReactNode } from "react";
import { FormProvider as Form } from "react-hook-form";

const FormProvider = ({
  children,
  onSubmit,
  methods,
}: {
  children: ReactNode;
  onSubmit: () => void;
  methods: any;
}) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}> {children} </form>
    </Form>
  );
};

export default FormProvider;
