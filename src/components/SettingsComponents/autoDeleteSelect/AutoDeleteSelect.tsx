"use client";
import { updateAutoDelete } from "@/lib/actions";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Select, selectClasses } from "@mui/joy";
import Option from "@mui/joy/Option";
import type React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AutoDeleteSelectPropsType,
  HandleChangeType,
} from "./AutoDeleteSelect.types";

const AutoDeleteSelect: React.FC<AutoDeleteSelectPropsType> = ({
  value,
  token,
}: AutoDeleteSelectPropsType) => {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange: HandleChangeType = async (event, newValue) => {
    if (newValue) {
      setSelectedValue(newValue);
      const response = await updateAutoDelete({
        frequency: newValue,
        token: token,
      });
      if (response.success) {
        toast.success(response.message as string);
      } else {
        toast.error(response.message as string);
      }
    }
  };

  return (
    <>
      <h3>Automated Deletion</h3>
      <p>Configure the frequency for automatic deletion of events.</p>
      <Select
        onChange={handleChange}
        placeholder="Select a frequency..."
        indicator={<KeyboardArrowDown />}
        value={selectedValue}
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
        <Option data-testid="daily-option" value="daily">Daily</Option>
        <Option value="weekly">Weekly</Option>
        <Option value="monthly">Monthly</Option>
        <Option value="yearly">Yearly</Option>
      </Select>
    </>
  );
};

export default AutoDeleteSelect;
