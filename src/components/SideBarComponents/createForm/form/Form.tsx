import { addTask } from "@/lib/actions";
import { useStore } from "@/store";
import { createDateIdentifier, parseDate } from "@/utils/dateUtils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import type React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./Form.module.css";
import type { FormProps, FormStateType } from "./Form.types";

const Form: React.FC<FormProps> = ({ showCalendatInput, handleCloseModal }) => {
	const dateToCreateTask = useStore((state) => state.dateToCreateTask);
	const { getUser } = useKindeBrowserClient();
	const user = getUser();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormStateType>({
		defaultValues: {
			timeFrom: "00:01",
			timeTo: "23:59",
			taskInfo: "some task",
			allDay: false,
			date: "",
			addInfo: "some task details",
		},
	});

	const allDay = watch("allDay");

	const onSubmit: SubmitHandler<FormStateType> = async (data) => {
		const parsedDate = parseDate(data.date);
		const dateIdentifier = createDateIdentifier(
			showCalendatInput,
			data.date,
			dateToCreateTask,
		);
		const response = await addTask({
			date: showCalendatInput
				? parsedDate
				: (dateToCreateTask as { day: number; month: number; year: number }),
			task: {
				time: {
					timeFrom: data.allDay ? "00:00" : data.timeFrom,
					timeTo: data.allDay ? "00:00" : data.timeTo,
				},
				info: data.taskInfo,
				addInfo: data.addInfo,
				recurring: false,
				recurrenceEndDate: null,
				recurrenceFrequency: null,
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
			setValue("date", "");
			setValue("addInfo", "some task details");
		} else {
			toast.error(response.message as string);
		}
	};

	return (
		<>
			{!showCalendatInput && (
				<h4 className={styles.formDate}>
					Date:{" "}
					{(dateToCreateTask?.day as number) < 10
						? `0${dateToCreateTask?.day}`
						: dateToCreateTask?.day}{" "}
					/{" "}
					{(dateToCreateTask?.month as number) < 10
						? `0${dateToCreateTask?.month as number}`
						: (dateToCreateTask?.month as number)}{" "}
					/ {dateToCreateTask?.year}
				</h4>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				data-value="form"
				className={`${styles.createForm} ${showCalendatInput ? styles.lg : ""}`}
			>
				<h5 className={styles.taskDetailsTitle}>Task details:</h5>
				{showCalendatInput && (
					<div className={styles.dateContainer}>
						<label htmlFor="date">Date: </label>
						<input
							type="date"
							{...register("date", { required: showCalendatInput })}
							placeholder={`${
								dateToCreateTask ? dateToCreateTask : "01.01.2025"
							}`}
						/>
						{errors.date && <span>This field is required</span>}
					</div>
				)}
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
					Add task
				</button>
			</form>
		</>
	);
};

export default Form;
