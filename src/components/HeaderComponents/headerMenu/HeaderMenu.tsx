"use client";
import GenericResize from "@/components/reusable/GenericResize/GenericResize";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import {
  apps,
  avatar,
  help,
  home,
  logout,
  more,
  settings,
} from "../HeaderIcons.index";
import styles from "./HeaderMenu.module.css";

const HeaderMenu: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showTablet, setShowTablet] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-menu]")) {
        setShowTablet(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <GenericResize
        size={992}
        setState={setShowMenu}
        valueIf={true}
        valueElse={false}
      />
      <GenericResize size={992} setState={setShowTablet} valueIf={false} />
      {showMenu ? (
        <>
          <button
            data-menu="data-menu"
            type="button"
            id="more"
            className={styles.moreBtn}
            onClick={() => setShowTablet(!showTablet)}
          >
            <Image
              data-menu="data-menu"
              className="svgIcon"
              src={more}
              alt="more"
              width={24}
              height={24}
            />
          </button>
          <div
            data-menu="data-menu"
            className={`${styles.headerMenuTablet} ${
              showTablet ? styles.visibleTablet : ""
            }`}
          >
            <Link
              data-menu="data-menu"
              type="button"
              className={styles.headerMenuLink}
              href="/"
            >
              <Image
                data-menu="data-menu"
                src={home}
                alt="home"
                className="svgIcon"
                width={24}
                height={24}
              />
            </Link>
            <Link
              data-menu="data-menu"
              type="button"
              className={styles.headerMenuLink}
              href="/user"
            >
              <Image
                data-menu="data-menu"
                src={avatar}
                alt="avatar"
                className="svgIcon"
                width={24}
                height={24}
              />
            </Link>
            <Link
              data-menu="data-menu"
              type="button"
              className={styles.headerMenuLink}
              href="/apps"
            >
              <Image
                data-menu="data-menu"
                src={apps}
                alt="apps"
                className="svgIcon"
                width={24}
                height={24}
              />
            </Link>
            <Link
              data-menu="data-menu"
              className={styles.headerMenuLink}
              href="/settings"
            >
              <Image
                data-menu="data-menu"
                src={settings}
                alt="settings"
                className="svgIcon"
                width={24}
                height={24}
              />
            </Link>
            <Link
              data-menu="data-menu"
              type="button"
              className={styles.headerMenuLink}
              href="/help"
            >
              <Image
                data-menu="data-menu"
                src={help}
                alt="help"
                className="svgIcon"
                width={24}
                height={24}
              />
            </Link>
            <LogoutLink
              data-menu="data-menu"
              type="button"
              className={styles.headerMenuLink}
            >
              <Image
                data-menu="data-menu"
                src={logout}
                alt="logout"
                className="svgIcon"
                width={24}
                height={24}
              />
            </LogoutLink>
          </div>
        </>
      ) : (
        <>
          <Link type="button" className={styles.headerMenuLink} href="/help">
            <Image
              src={help}
              alt="help"
              className="svgIcon"
              width={24}
              height={24}
            />
          </Link>
          <Link className={styles.headerMenuLink} href="/settings">
            <Image
              src={settings}
              alt="settings"
              className="svgIcon"
              width={24}
              height={24}
            />
          </Link>
          <Link type="button" className={styles.headerMenuLink} href="/apps">
            <Image
              src={apps}
              alt="apps"
              className="svgIcon"
              width={24}
              height={24}
            />
          </Link>
          <Link type="button" className={styles.headerMenuLink} href="/user">
            <Image
              src={avatar}
              alt="avatar"
              className="svgIcon"
              width={24}
              height={24}
            />
          </Link>
          <LogoutLink
            data-menu="data-menu"
            type="button"
            className={styles.headerMenuLink}
          >
            <Image
              data-menu="data-menu"
              src={logout}
              alt="logout"
              className="svgIcon"
              width={24}
              height={24}
            />
          </LogoutLink>
        </>
      )}
    </>
  );
};

export default HeaderMenu;
