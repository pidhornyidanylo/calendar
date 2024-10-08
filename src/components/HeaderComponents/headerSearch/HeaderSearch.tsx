"use client";
import GenericResize from "@/components/reusable/GenericResize/GenericResize";
import { useStore } from "@/store";
import { Tooltip } from "@mui/joy";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { cross, filter, search } from "../HeaderIcons.index";
import styles from "./HeaderSearch.module.css";

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
        <Tooltip title="Search">
          <button
            type="submit"
            className={`${showAnimate ? styles.animate : ""}`}
            onClick={handleSearchSubmit}
          >
            <Image className="svgIcon" src={search} alt={"search"} />
          </button>
        </Tooltip>
      ) : (
        <Tooltip title="Clear">
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
        </Tooltip>
      )}
      <input
        type="text"
        value={searchInputValue}
        onChange={(e) => setInputSearchValue(e.target.value)}
        placeholder={shortenPlaceholder ? "Search" : "Search on Calendar"}
        onKeyDown={handleKeyDown}
      />
      <Tooltip title="Filter">
        <button type="button">
          <Image className="svgIcon" src={filter} alt={"filter"} />
        </button>
      </Tooltip>
    </>
  );
};

export default HeaderSearch;
