import { Button } from "@mui/joy";
import React from "react";

type SettingsButtonPropsType = {
  onClickHandler?: () => void;
  textContent: string;
};

const SettingsButton = ({
  onClickHandler,
  textContent,
}: SettingsButtonPropsType) => {
  return (
    <Button
      color="neutral"
      size="lg"
      variant="outlined"
      sx={{
        fontSize: "1em",
        fontWeight: 400,
        marginTop: "15px",
        backgroundColor: "var(--main-white)",
        color: "var(--main-text)",
        "&:hover": {
          backgroundColor: "var(--main-white)",
          color: "var(--main-text)",
          borderColor: "inherit",
          boxShadow: "none",
        },
      }}
      onClick={onClickHandler}
    >
      {textContent}
    </Button>
  );
};

export default SettingsButton;
