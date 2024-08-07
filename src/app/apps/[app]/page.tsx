import React from "react";
import styles from "./App.module.css";

const page = ({ params }: { params: { app: string } }) => {
  return (
    <div className={styles.appContainer}>
      <h2 className={styles.appTitle}>{params.app}</h2>
      <p className={styles.appParagraph}>
        Page is currently in development 👩‍💻👨‍💻<br/>Feel free to contact our
        support for {params.app} app infornation.
      </p>
    </div>
  );
};

export default page;