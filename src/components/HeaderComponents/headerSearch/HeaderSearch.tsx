"use client";
import { useStore } from "@/store";
import GenericResize from "@/utils/GenericResize";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cross, filter, search } from "../HeaderIcons.index";
import styles from "./HeaderSearch.module.css";
import { useRouter } from "next/navigation";

const HeaderSearch = () => {
  const router = useRouter();
  const [searchInputValue, setInputSearchValue] = useState("");
  const [showAnimate, setShowAnimate] = useState(false);
  const [shortenPlaceholder, setShortenPlaceholder] = useState(false);

  const headerSearchValue = useStore((state) => state.headerSearchValue);
  const setHeaderSearchValue = useStore((state) => state.setHeaderSearchValue);
  const setShowSearchFilters = useStore((state) => state.setShowSearchFilters);

  useEffect(() => {
    if (headerSearchValue.length > 1) {
      router.push("/");
    }
  }, [headerSearchValue]);

  const handleSearchSubmit = () => {
    setHeaderSearchValue(searchInputValue);
    if (!searchInputValue.length) {
      setShowAnimate(!showAnimate);
      setTimeout(() => setShowAnimate(false), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setHeaderSearchValue("");
    }
  };

  return (
    <>
      <GenericResize
        size={425}
        setState={setShortenPlaceholder}
        valueIf={true}
        valueElse={false}
      />
      {headerSearchValue.length < 1 ? (
        <button
          type="submit"
          className={`${showAnimate ? styles.animate : ""}`}
          onClick={handleSearchSubmit}
        >
          <Image className="svgIcon" src={search} alt={"search"} />
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
          <Image className="svgIcon" src={cross} alt={"cross"} />
        </button>
      )}
      <input
        type="text"
        value={searchInputValue}
        onChange={(e) => setInputSearchValue(e.target.value)}
        placeholder={shortenPlaceholder ? "Search" : "Search on Calendar"}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={() => setShowSearchFilters()}>
        <Image className="svgIcon" src={filter} alt={"filter"} />
      </button>
    </>
  );
};

export default HeaderSearch;
