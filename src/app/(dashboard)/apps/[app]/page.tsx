import type { Metadata } from "next";
import type React from "react";
import styles from "./App.module.css";
import { appData } from "./appsInfo";

export const metadata: Metadata = {
  title: "app",
};

type AppItemProps = {
  params: {
    app: string;
  };
};

const AppItem: React.FC<AppItemProps> = ({
  params,
}: {
  params: { app: string };
}) => {
  const appContent = appData[params.app];
  return (
    <>
      <h2 className={styles.appTitle}>{appContent.title}</h2>
      <p className={styles.appParagraph}>{appContent.description}</p>
      <ul className={styles.appFeatures}>
        {appContent.features.map((feature) => (
          <li key={feature.split(" ")[0]} className={styles.appFeature}>
            {feature}
          </li>
        ))}
      </ul>
      <h3 className={styles.testimonialsTitle}>What Our Users Say</h3>
      <ul className={styles.testimonialsList}>
        {appContent.testimonials.map((testimonial) => (
          <li
            key={testimonial.feedback.split(" ")[0]}
            className={styles.testimonialItem}
          >
            <p className={styles.testimonialFeedback}>
              "{testimonial.feedback}"
            </p>
            <p className={styles.testimonialName}>- {testimonial.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AppItem;
