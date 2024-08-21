"use client";
import React, { useState } from "react";
import { Select, selectClasses } from "@mui/joy";
import Option from "@mui/joy/Option";
import { KeyboardArrowDown } from "@mui/icons-material";

const TimeZoneSelect: React.FC = () => {
  const [timezone, setTimezone] = useState<string | null>("UTC");

  const handleTimezoneChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
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
          width: 300,
          padding: "10px 15px",
          [`& .${selectClasses.indicator}`]: {
            transition: "0.2s",
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
