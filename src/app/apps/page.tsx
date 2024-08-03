import React from "react";
import Image from "next/image";
import {
  meditation,
  recipe,
  fitness,
  travel,
  budget,
  learning,
  news,
  photo,
} from "./Apps.icons";
import styles from "./Apps.module.css";

const apps = [
  {
    name: "Meditation Master",
    description: "A guided meditation app to help you relax and focus.",
    category: "Health & Wellness",
    image: meditation,
  },
  {
    name: "Recipe Finder",
    description: "Discover and save recipes from around the world.",
    category: "Food & Drink",
    image: recipe,
  },
  {
    name: "Fitness Tracker",
    description: "Track your workouts and monitor your fitness progress.",
    category: "Health & Fitness",
    image: fitness,
  },
  {
    name: "Travel Guide",
    description: "Get recommendations and travel tips for your next adventure.",
    category: "Travel",
    image: travel,
  },
  {
    name: "Budget Planner",
    description: "Manage your finances and plan your budget effectively.",
    category: "Finance",
    image: budget,
  },
  {
    name: "Learning Hub",
    description:
      "Explore a wide range of online courses and educational resources.",
    category: "Education",
    image: learning,
  },
  {
    name: "News Digest",
    description:
      "Stay updated with the latest news and headlines from around the world.",
    category: "News",
    image: news,
  },
  {
    name: "Photo Editor Pro",
    description: "Enhance and edit your photos with professional tools.",
    category: "Photography",
    image: photo,
  },
];
const Apps = () => {
  return (
    <>
      <h2 className={styles.appsTitle}>Discover Other Useful Apps</h2>
      <p className={styles.appsParagraph}>
        Explore a variety of our apps that can enhance your life quality and
        experience. Below are some popular options you might find useful.
      </p>
      <ul className={styles.appsList}>
        {apps.map((app) => (
          <li key={app.name} className={styles.appsListItem}>
            <div>
              <Image
                width={50}
                height={50}
                src={app.image}
                alt={app.name}
              ></Image>
            </div>
            <div>
              <h3 className={styles.appName}>{app.name}</h3>
              <p className={styles.appDescription}>{app.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Apps;
