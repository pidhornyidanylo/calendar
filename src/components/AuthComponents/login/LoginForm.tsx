"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Logged in successfully!");
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.formTitle}>Login 🔐</h3>

      <div className={styles.loginFormItem}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
          placeholder="calendar1user@gmail.com"
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.loginFormItem}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
          placeholder="••••••••••••••••"
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit">Login</button>

      <p>
        Don't have an account? <Link href={"/register"}>Register now</Link>
      </p>
    </form>
  );
};

export default LoginForm;
