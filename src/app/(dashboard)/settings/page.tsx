import AutoDeleteSelect from "@/components/SettingsComponents/autoDeleteSelect/AutoDeleteSelect";
import CopyCalendarJson from "@/components/SettingsComponents/copyCalendarJson/CopyCalendarJson";
import ModeSelect from "@/components/SettingsComponents/modeSelect/ModeSelect";
import RecurringEventSetter from "@/components/SettingsComponents/recurringEventSetter/RecurringEventSetter";
import SettingsButton from "@/components/SettingsComponents/settingsButton/SettingsButton";
import TimeZoneSelect from "@/components/SettingsComponents/timeZoneSelect/TimeZoneSelect";
import { getAutoDelete, getTasks, getTheme } from "@/lib/data";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import {
  account,
  autoDelete,
  cycle,
  exportIcon,
  mode,
  timezone,
} from "./Settings.icons";
import styles from "./Settings.module.css";

export const metadata: Metadata = {
  title: "settings",
};

const Settings = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const schedule = await getTasks(user?.id as string);
  const fetchAutoDelete = await getAutoDelete(user?.id as string);

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
          <p>Export your calendar in PDF.</p>
          <CopyCalendarJson schedule={JSON.stringify(schedule.tasks)} />
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
          <RecurringEventSetter token={user?.id as string} />
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
            <SettingsButton textContent="Account Settings" />
          </Link>
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
            src={autoDelete}
            alt={"autoDelete"}
          />
        </div>
        <div className={styles.settingsSectionContent}>
          <AutoDeleteSelect
            token={user?.id as string}
            value={
              fetchAutoDelete.autoDelete as
                | "daily"
                | "weekly"
                | "monthly"
                | "yearly"
            }
          />
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
          <ModeSelect token={user?.id as string} />
        </div>
      </div>
    </>
  );
};

export default Settings;
