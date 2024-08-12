"use client";
import React, { FormEvent, useState } from "react";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { loginUser } from "@/lib/actions";
const LoginForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const response = await loginUser(formState);
    
  };

  return (
    <form className={styles.loginForm}>
      <h3 className={styles.formTitle}>Login 🔐</h3>
      <div className={styles.loginFormItem}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={(e) => handleInputChange(e)}
          required
          placeholder="calendar1user@gmail.com"
        />
      </div>
      <div className={styles.loginFormItem}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={(e) => handleInputChange(e)}
          required
          placeholder="••••••••••••••••"
        />
      </div>
      <button type="submit">Login</button>
      <p>
        Don't have an account? <Link href={"/register"}>Register now</Link>
      </p>
    </form>
  );
};

export default LoginForm;
