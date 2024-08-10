import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { postRegister } from "../../api/auth";
import FormWrapper from "../../layout/form";
import { RegisterUserSchema, RegisterUserSchemaT } from "./schemas";

const RegisterForm = () => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchemaT>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const submitMutation = useMutation({
    mutationFn: postRegister,
    onSuccess: (response) => {
      toast.success(response.data.message);
      reset();
      navigation("/login");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        toast.error(err.message);
      }
    },
  });

  const onSubmit: SubmitHandler<RegisterUserSchemaT> = (data) => {
    submitMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper title="Register Form">
        <label className="form-item">
          <span className="label">Name:</span>
          <input {...register("name")} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </label>
        <label className="form-item">
          <span className="label">Email:</span>
          <input {...register("email")} />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </label>
        <label className="form-item ">
          <span className="label">Password:</span>
          <div className="relative grid">
            <button
              type="button"
              className="absolute right-2 top-1 py-1 text-xs bg-gray-600 rounded"
              onClick={() => setVisible(!visible)}
            >
              {visible ? "hide" : "show"}
            </button>
            <input
              type={visible ? "text" : "password"}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </label>
        <button type="submit">Register</button>
        <p className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </FormWrapper>
    </form>
  );
};

export default RegisterForm;
