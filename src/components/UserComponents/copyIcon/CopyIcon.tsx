"use client";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import copy from "../../../../public/icons/user/copy.svg";
import styles from "./CopyIcon.module.css";

const CopyIcon = ({ field }: { field: string }) => {
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success(`${text} copied to clipboard!`);
	};
	return (
		<Image
			className={styles.copyIcon}
			onClick={() => copyToClipboard(field ?? "")}
			src={copy}
			alt={"copy"}
		/>
	);
};

export default CopyIcon;
