"use client";
import type React from "react";
import { useState } from "react";
import styles from "./TimeZoneSelect.module.css";

const TimeZoneSelect: React.FC = () => {
  const [timezone, setTimezone] = useState("UTC");

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimezone(event.target.value);
  };
  return (
    <>
      <h3>Adjust Timezone</h3>
      <p>Choose your preferred timezone for displaying events.</p>
      <select
        className={styles.settingsSelect}
        value={timezone}
        onChange={handleTimezoneChange}
      >
        <option value="UTC">UTC</option>
        <option value="America/New_York">America/New York</option>
        <option value="Europe/London">Europe/London</option>
        <option value="Asia/Tokyo">Asia/Tokyo</option>
      </select>
    </>
  );
};

export default TimeZoneSelect;
