"use client";
import GenericResize from "@/utils/GenericResize";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { apps, avatar, help, home, more, settings } from "../HeaderIcons.index";
import styles from "./HeaderMenu.module.css";

const HeaderMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showTablet, setShowTablet] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!e.target.closest("[data-menu]")) {
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
        </>
      )}
    </>
  );
};

export default HeaderMenu;
