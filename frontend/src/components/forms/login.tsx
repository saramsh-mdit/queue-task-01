import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormWrapper from "../../layout/form";
import { LoginUserSchema, LoginUserSchemaT } from "./schemas";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchemaT>({
    resolver: zodResolver(LoginUserSchema),
  });
  const onSubmit: SubmitHandler<LoginUserSchemaT> = (data) => console.log(data);

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
          <input type="password" {...register("password")} />
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
