"use client";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Select, selectClasses } from "@mui/joy";
import Option from "@mui/joy/Option";
import type React from "react";
import { useState } from "react";

const TimeZoneSelect: React.FC = () => {
	const [timezone, setTimezone] = useState<string | null>("UTC");

	const handleTimezoneChange = (
		event: React.SyntheticEvent | null,
		newValue: string | null,
	) => {
		setTimezone(newValue);
	};

	return (
		<>
			<h3>Adjust Timezone</h3>
			<p>Choose your preferred timezone for displaying events.</p>
			<Select
				onChange={handleTimezoneChange}
				value={timezone}
				placeholder="Select a timezone..."
				indicator={<KeyboardArrowDown />}
				sx={{
					marginTop: "15px",
					maxWidth: 300,
					padding: "10px 15px",
					backgroundColor: "var(--main-white)",
					color: "var(--main-text)",
					"&:hover": {
						backgroundColor: "var(--main-white)",
						color: "var(--main-text)",
					},
					[`& .${selectClasses.indicator}`]: {
						transition: "0.2s",
						color: "var(--main-text)",
						[`&.${selectClasses.expanded}`]: {
							transform: "rotate(-180deg)",
						},
					},
				}}
			>
				<Option value="UTC">UTC</Option>
				<Option value="America/New_York">America/New York</Option>
				<Option value="Europe/London">Europe/London</Option>
				<Option value="Asia/Tokyo">Asia/Tokyo</Option>
			</Select>
		</>
	);
};

export default TimeZoneSelect;
