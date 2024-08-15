"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./RegisterForm.module.css";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Handle the registration logic
    console.log(data);
    // Implement your registration logic here
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.formTitle}>Register 🔐</h3>

      <div className={styles.registerFormItem}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
          placeholder="calendar1user@gmail.com"
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.registerFormItem}>
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

      <div className={styles.registerFormItem}>
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          type="password"
          id="confirm-password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === getValues("password") || "Passwords must match",
          })}
          placeholder="••••••••••••••••"
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit">Register</button>

      <p>
        Already have an account? <Link href={"/login"}>Login</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
