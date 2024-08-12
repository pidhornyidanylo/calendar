import React from "react";
import styles from "./RegisterForm.module.css";
import Link from "next/link";

const RegisterForm = () => {
  return (
    <form className={styles.registerForm}>
      <h3 className={styles.formTitle}>Register 🔐</h3>
      <div className={styles.registerFormItem}>
        <label htmlFor="email">Email</label>
        <input type="email" required placeholder="calendar1user@gmail.com" />
      </div>
      <div className={styles.registerFormItem}>
        <label htmlFor="password">Password</label>
        <input type="password" required placeholder="••••••••••••••••" />
      </div>
      <div className={styles.registerFormItem}>
        <label htmlFor="confirm-password">Confirm password</label>
        <input type="password" required placeholder="••••••••••••••••" />
      </div>
      <button type="submit">Register</button>
      <p>
        Already have an account? <Link href={"/login"}>Login</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
