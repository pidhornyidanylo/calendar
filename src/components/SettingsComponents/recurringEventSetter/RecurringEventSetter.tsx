"use client";
import React, { useState } from "react";
import SettingsButton from "../settingsButton/SettingsButton";
import GenericModal from "@/components/reusable/GenericModal/GenericModal";
import RecurringForm from "../recurringForm/RecurringForm";

const RecurringEventSetter = () => {
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  return (
    <>
      <SettingsButton
        onClickHandler={() => setShowRecurringModal(!showRecurringModal)}
        textContent="Set Recurring Events"
      />
      <GenericModal
        open={showRecurringModal}
        setOpen={() => setShowRecurringModal(!showRecurringModal)}
      >
        <RecurringForm
          handleCloseModal={() => setShowRecurringModal(!showRecurringModal)}
        />
      </GenericModal>
    </>
  );
};

export default RecurringEventSetter;
