"use client";
import GenericModal from "@/components/reusable/GenericModal/GenericModal";
import React, { useState } from "react";
import RecurringForm from "../recurringForm/RecurringForm";
import SettingsButton from "../settingsButton/SettingsButton";

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
