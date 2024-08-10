import { ReactNode } from "react";

type FormWrapper = {
  title?: string;
  children: ReactNode;
};
const FormWrapper = ({ title, children }: FormWrapper) => {
  return (
    <section className="flex flex-col gap-4 p-4 max-w-md mx-auto border border-solid border-gray-200">
      {title && <h3 className="text-center text-2xl font-bold">{title}</h3>}
      <div className="grid gap-4">{children}</div>
    </section>
  );
};

export default FormWrapper;
