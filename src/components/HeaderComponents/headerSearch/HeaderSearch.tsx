"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useStore } from "@/store";
import { filter, search, cross } from "../HeaderIcons.index";
import styles from "./HeaderSearch.module.css";

const HeaderSearch = () => {
  const headerSearchValue = useStore((state) => state.headerSearchValue);
  const [showAnimate, setShowAnimate] = useState(false);
  const setHeaderSearchValue = useStore((state) => state.setHeaderSearchValue);
  const [searchInputValue, setInputSearchValue] = useState("");

  return (
    <>
      {headerSearchValue.length < 1 ? (
        <button
          type="submit"
          className={`${showAnimate ? styles.animate : ""}`}
          onClick={(e) => {
            setHeaderSearchValue(searchInputValue);
            if (!searchInputValue.length) {
              setShowAnimate(!showAnimate);
              // Reset animation state after it ends to allow re-triggering
              setTimeout(() => setShowAnimate(false), 500); // match the animation duration
            }
          }}
        >
          <Image src={search} alt={"search"} />
        </button>
      ) : (
        <button
          style={{ paddingTop: "2px" }}
          type="button"
          onClick={() => {
            setInputSearchValue("");
            setHeaderSearchValue("");
          }}
        >
          <Image src={cross} alt={"cross"} />
        </button>
      )}
      <input
        type="text"
        value={searchInputValue}
        onChange={(e) => setInputSearchValue(e.target.value)}
        placeholder="Search on Calendar"
      />
      <button type="button">
        <Image src={filter} alt={"filter"} />
      </button>
    </>
  );
};

export default HeaderSearch;
