"use client";
import { useStore } from "@/store";
import GenericResize from "@/utils/GenericResize";
import Image from "next/image";
import React, { useState } from "react";
import { cross, filter, search } from "../HeaderIcons.index";
import styles from "./HeaderSearch.module.css";

const HeaderSearch = () => {
	const [searchInputValue, setInputSearchValue] = useState("");
	const [showAnimate, setShowAnimate] = useState(false);
	const [shortenPlaceholder, setShortenPlaceholder] = useState(false);

	const headerSearchValue = useStore((state) => state.headerSearchValue);
	const setHeaderSearchValue = useStore((state) => state.setHeaderSearchValue);

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
					onClick={(e) => {
						setHeaderSearchValue(searchInputValue);
						if (!searchInputValue.length) {
							setShowAnimate(!showAnimate);
							setTimeout(() => setShowAnimate(false), 500);
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
				placeholder={shortenPlaceholder ? "Search" : "Search on Calendar"}
			/>
			<button type="button">
				<Image src={filter} alt={"filter"} />
			</button>
		</>
	);
};

export default HeaderSearch;
