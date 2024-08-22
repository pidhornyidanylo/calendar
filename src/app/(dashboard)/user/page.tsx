import CopyIcon from "@/components/UserComponents/copyIcon/CopyIcon";
import LogoutButton from "@/components/UserComponents/logoutButton/LogoutButton";
import Spinner from "@/components/reusable/Spinner/Spinner";
import { getRandomAvatar } from "@/utils/randomAvatar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import styles from "./User.module.css";

export const metadata: Metadata = {
  title: "User",
};

const allowedDomains: string[] = [];

const isAllowedDomain = (url: string) => {
  try {
    const hostname = new URL(url).hostname;
    return allowedDomains.includes(hostname);
  } catch (error) {
    return false;
  }
};

const User = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const avatarUrl =
    user?.picture && isAllowedDomain(user.picture)
      ? user.picture
      : getRandomAvatar();

  if (user) {
    return (
      <>
        <h2 className={styles.userTitle}>User Information</h2>
        <p className={styles.userParagraph}>
          Here are the details associated with your account.
        </p>
        <div className={styles.userSection}>
          <div className={styles.userData}>
            <div className={styles.avatarContainer}>
              <Image src={avatarUrl} alt={"avatar"} width={200} height={200} />
            </div>
            <div className={styles.userInfo}>
              <p>
                <strong>Given Name:</strong> {user?.given_name}
                <CopyIcon field={user?.given_name as string} />
              </p>
              <p>
                <strong>Family Name:</strong> {user?.family_name}
                <CopyIcon field={user?.family_name as string} />
              </p>
              {user?.email && (
                <>
                  <p>
                    <strong>Email:</strong> {`${user?.email.slice(0, 14)}...`}
                    <CopyIcon field={user?.email as string} />
                  </p>
                </>
              )}
              <p>
                <strong>ID:</strong> {`${user?.id.slice(0, 18)}...`}
                <CopyIcon field={user?.id as string} />
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </>
    );
  }
  return <Spinner />;
};

export default User;
