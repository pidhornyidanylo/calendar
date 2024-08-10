"use client";
import { useStore } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { cross, filter, search } from "../HeaderIcons.index";
import styles from "./HeaderSearch.module.css";
import GenericResize from "@/components/reusable/GenericResize/GenericResize";

const HeaderSearch: React.FC = () => {
  const router = useRouter();
  const [searchInputValue, setInputSearchValue] = useState("");
  const [showAnimate, setShowAnimate] = useState(false);
  const [shortenPlaceholder, setShortenPlaceholder] = useState(false);

  const headerSearchValue = useStore((state) => state.headerSearchValue);
  const setHeaderSearchValue = useStore((state) => state.setHeaderSearchValue);

  useEffect(() => {
    if (headerSearchValue.length > 1) {
      router.push("/");
    }
  }, [headerSearchValue, router]);

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
      <button type="button">
        <Image className="svgIcon" src={filter} alt={"filter"} />
      </button>
    </>
  );
};

export default HeaderSearch;
