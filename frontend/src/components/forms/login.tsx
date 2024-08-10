import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { postLogin } from "../../api/auth";
import { AuthContext } from "../../context/authContext";
import FormWrapper from "../../layout/form";
import { LoginUserSchema, LoginUserSchemaT } from "./schemas";

const LoginForm = () => {
  const [visible, setVisible] = React.useState(false);
  const authContextData = React.useContext(AuthContext);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchemaT>({
    resolver: zodResolver(LoginUserSchema),
  });

  const submitMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (response) => {
      if (response.data.token) {
        // @ts-ignore
        authContextData?.logIn(response.data.token);
        toast.success("Login Successfully");
        reset();
        window.location.href = "/profile";
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        toast.error(err.message);
      }
    },
  });

  const onSubmit: SubmitHandler<LoginUserSchemaT> = (data) => {
    submitMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper title="Login Form">
        <label className="form-item">
          <span className="label">Email:</span>
          <input {...register("email")} />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </label>
        <label className="form-item">
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
        <button type="submit">Login</button>
        <p className="text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </FormWrapper>
    </form>
  );
};

export default LoginForm;
