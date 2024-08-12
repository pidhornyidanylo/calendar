import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import {
  account,
  cycle,
  exportIcon,
  importIcon,
  mode,
  timezone,
} from "./Settings.icons";
import styles from "./Settings.module.css";
import Link from "next/link";
import TimeZoneSelect from "@/components/SettingsComponents/timeZoneSelect/TimeZoneSelect";
import ModeSelect from "@/components/SettingsComponents/modeSelect/ModeSelect";

export const metadata: Metadata = {
  title: "settings",
};

const Settings: React.FC = () => {
  return (
    <>
      <h2 className={styles.settingsTitle}>Settings</h2>
      <p className={styles.settingsParagraph}>
        Customize your calendar application settings below. Adjust your
        preferences to tailor the app to your needs.
      </p>

      <div className={styles.settingsSection}>
        <div className={styles.settingsSectionImageContainer}>
          <Image
            className="svgIcon"
            width={45}
            height={45}
            src={exportIcon}
            alt={"exportIcon"}
          />
        </div>
        <div className={styles.settingsSectionContent}>
          <h3>Export Calendar</h3>
          <p>Export your calendar in various formats such as .ics or .csv.</p>
          <button type="button" className={styles.settingsButton}>
            Export Calendar
          </button>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <div className={styles.settingsSectionImageContainer}>
          <Image
            className="svgIcon"
            width={45}
            height={45}
            src={cycle}
            alt={"cycle"}
          />
        </div>
        <div className={styles.settingsSectionContent}>
          <h3>Set Recurring Events</h3>
          <p>Specify the frequency and duration of recurring events.</p>
          <button type="button" className={styles.settingsButton}>
            Set Recurring Events
          </button>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <div className={styles.settingsSectionImageContainer}>
          <Image
            className="svgIcon"
            width={45}
            height={45}
            src={account}
            alt={"account"}
          />
        </div>
        <div className={styles.settingsSectionContent}>
          <h3>Account Settings</h3>
          <p>
            Update your personal information, change your password, and manage
            other account settings.
          </p>
          <Link href={"/user"}>
            <button type="button" className={styles.settingsButton}>
              Account Settings
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <div className={styles.settingsSectionImageContainer}>
          <Image
            className="svgIcon"
            width={45}
            height={45}
            src={importIcon}
            alt={"importIcon"}
          />
        </div>
        <div className={styles.settingsSectionContent}>
          <h3>Import Events</h3>
          <p>
            Import events from another calendar by uploading a compatible file
            or connecting your existing calendar account.
          </p>
          <button type="button" className={styles.settingsButton}>
            Import Events
          </button>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <div className={styles.settingsSectionImageContainer}>
          <Image
            className="svgIcon"
            width={45}
            height={45}
            src={timezone}
            alt={"timezone"}
          />
        </div>
        <div className={styles.settingsSectionContent}>
          <TimeZoneSelect />
        </div>
      </div>

      <div className={styles.settingsSection}>
        <div className={styles.settingsSectionImageContainer}>
          <Image
            className="svgIcon"
            width={45}
            height={45}
            src={mode}
            alt={"darkmode"}
          />
        </div>
        <div className={styles.settingsSectionContent}>
          <ModeSelect />
        </div>
      </div>
    </>
  );
};

export default Settings;
