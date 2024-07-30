"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { apps, avatar, help, more, settings } from "../HeaderIcons.index";
import styles from "./HeaderMenu.module.css";
import Link from "next/link";

const HeaderMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showTablet, setShowTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setShowMenu(true);
        setShowTablet(false);
      } else {
        setShowMenu(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {showMenu ? (
        <>
          <button
            type="button"
            id="more"
            className={styles.moreBtn}
            onClick={() => setShowTablet(!showTablet)}
          >
            <Image src={more} alt="more" width={24} height={24} />
          </button>
          <div
            className={`${styles.headerMenuTablet} ${
              showTablet ? styles.visibleTablet : ""
            }`}
          >
            <Link type="button" className={styles.headerMenuLink} href="/help">
              <Image src={help} alt="help" />
            </Link>
            <Link className={styles.headerMenuLink} href="/settings">
              <Image src={settings} alt="settings" />
            </Link>
            <Link type="button" className={styles.headerMenuLink} href="/apps">
              <Image src={apps} alt="apps" />
            </Link>
            <Link type="button" className={styles.headerMenuLink} href="/user">
              <Image src={avatar} alt="avatar" width={24} height={24} />
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link type="button" className={styles.headerMenuLink} href="/help">
            <Image src={help} alt="help" />
          </Link>
          <Link className={styles.headerMenuLink} href="/settings">
            <Image src={settings} alt="settings" />
          </Link>
          <Link type="button" className={styles.headerMenuLink} href="/apps">
            <Image src={apps} alt="apps" />
          </Link>
          <Link type="button" className={styles.headerMenuLink} href="/user">
            <Image src={avatar} alt="avatar" width={24} height={24} />
          </Link>
        </>
      )}
    </>
  );
};

export default HeaderMenu;
