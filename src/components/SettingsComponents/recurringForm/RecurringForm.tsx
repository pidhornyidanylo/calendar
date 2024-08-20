import { addTask } from "@/lib/actions";
import { useStore } from "@/store";
import { createDateIdentifier, parseDate } from "@/utils/dateUtils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import type React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./RecurringForm.module.css";
import type { RecurringFormStateType } from "./RecurringForm.types";

const ReccuringForm = ({
	handleCloseModal,
}: {
	handleCloseModal: () => void;
}) => {
	const { getUser } = useKindeBrowserClient();
	const user = getUser();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<RecurringFormStateType>({
		defaultValues: {
			recurrenceStartDate: "",
			recurrenceEndDate: "",
			recurrenceFrequency: "daily",
			reccuring: true,
			timeFrom: "00:01",
			timeTo: "23:59",
			taskInfo: "some task",
			allDay: false,
			addInfo: "some task details",
		},
	});

	const allDay = watch("allDay");

	const onSubmit: SubmitHandler<RecurringFormStateType> = async (data) => {
		const parsedStartDate = parseDate(data.recurrenceStartDate);
		const parsedEndDate = parseDate(data.recurrenceEndDate);
		const dateIdentifier = createDateIdentifier(
			true,
			data.recurrenceStartDate,
			parsedStartDate,
		);
		const response = await addTask({
			date: parseDate(data.recurrenceStartDate),
			task: {
				time: {
					timeFrom: data.allDay ? "00:00" : data.timeFrom,
					timeTo: data.allDay ? "00:00" : data.timeTo,
				},
				info: data.taskInfo,
				addInfo: data.addInfo,
				recurring: true,
				recurrenceEndDate: parsedEndDate,
				recurrenceFrequency: data.recurrenceFrequency,
			},
			dateIdentifier: dateIdentifier,
			token: user?.id as string,
		});

		if (response.success) {
			if (handleCloseModal) {
				handleCloseModal();
			}
			toast.success("Task added successfully!");
			setValue("timeFrom", "00:01");
			setValue("timeTo", "23:59");
			setValue("taskInfo", "some task");
			setValue("allDay", false);
			setValue("recurrenceStartDate", "");
			setValue("addInfo", "some task details");
		} else {
			toast.error(response.message as string);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				data-value="form"
				className={`${styles.createForm} ${styles.lg}`}
			>
				<h5 className={styles.taskDetailsTitle}>Task details:</h5>
				<div className={styles.dateContainer}>
					<label htmlFor="recurrenceStartDate">Start: </label>
					<input
						type="date"
						{...register("recurrenceStartDate", { required: true })}
						placeholder="01.01.2025"
					/>
					{errors.recurrenceStartDate && <span>This field is required</span>}
				</div>
				<div className={styles.recurrenceEndDate}>
					<label htmlFor="recurrenceEndDate">End:</label>
					<input type="date" {...register("recurrenceEndDate")} />
				</div>
				<div className={styles.recurrenceOptions}>
					<label htmlFor="recurrenceFrequency">Frequency:</label>
					<select {...register("recurrenceFrequency")}>
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="monthly">Monthly</option>
					</select>
				</div>
				<div
					className={`${styles.timeContainer} ${allDay ? styles.disabled : ""}`}
				>
					<div className={styles.timeItem}>
						<label htmlFor="timeFrom">From: </label>
						<input
							type="time"
							{...register("timeFrom")}
							disabled={allDay}
							step={60}
						/>
					</div>
					<div className={styles.timeItem}>
						<label htmlFor="timeTo">To: </label>
						<input
							type="time"
							{...register("timeTo")}
							disabled={allDay}
							step={60}
						/>
					</div>
				</div>
				<div className={styles.wholeDay}>
					<label htmlFor="all_day">All day</label>
					<input {...register("allDay")} type="checkbox" id="all_day" />
				</div>
				<div className={styles.infoContainer}>
					<div className={styles.taskContainer}>
						<label htmlFor="taskInfo">Task:</label>
						<input type="text" {...register("taskInfo", { required: true })} />
						{errors.taskInfo && <span>This field is required</span>}
					</div>
					<div className={styles.addInfoContainer}>
						<label htmlFor="addInfo">Additional info:</label>
						<textarea {...register("addInfo")} />
					</div>
				</div>
				<button className={styles.submitBtn} type="submit">
					Add recurring task
				</button>
			</form>
		</>
	);
};

export default ReccuringForm;
