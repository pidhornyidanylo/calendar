"use client";
import Spinner from "@/components/reusable/Spinner/Spinner";
import { useStore } from "@/store";
import type React from "react";
import { useEffect, useState } from "react";
import type { SubTaskItemType } from "../subTaskItem/SubTaskItem.types";
import TaskItem from "../taskItem/TaskItem";
import type { TaskItemType } from "../taskItem/TaskItem.types";

type HomeScheduleProps = {
	data: string;
};

const HomeSchedule: React.FC<HomeScheduleProps> = ({ data }) => {
	const [schedule, setSchedule] = useState<TaskItemType[]>([]);
	const [loading, setLoading] = useState(true);
	const showPastEvents = useStore((state) => state.showPastEvents);
	const headerSearchValue = useStore((state) => state.headerSearchValue);
	const currentMonthForFiltering = useStore((state) => state.currentMonth);
	const currentYearForFiltering = useStore((state) => state.currentYear);

	useEffect(() => {
		const tasks: TaskItemType[] = JSON.parse(data);

		const today = new Date();
		const todayDay = today.getDate();
		const todayMonth = today.getMonth() + 1;

		const filteredTasks = tasks.filter((task: TaskItemType) => {
			const isCurrentOrFuture =
				task.date.month > todayMonth ||
				(task.date.month === todayMonth && task.date.day >= todayDay);
			return showPastEvents || isCurrentOrFuture;
		});

		const sortedTasks = filteredTasks.sort(
			(a: TaskItemType, b: TaskItemType) => {
				if (a.date.month !== b.date.month) return a.date.month - b.date.month;
				return a.date.day - b.date.day;
			},
		);

		setSchedule(sortedTasks);
		setLoading(false);
	}, [data, showPastEvents]);

	const filteredTasks = headerSearchValue
		? schedule.filter((task: TaskItemType) =>
				task.tasks.some((subTask: SubTaskItemType) =>
					subTask.info.toLowerCase().includes(headerSearchValue.toLowerCase()),
				),
			)
		: schedule.filter((task: TaskItemType) => {
				const monthDifference = task.date.month - currentMonthForFiltering + 1;
				return (
					monthDifference < 5 &&
					monthDifference > 1 &&
					task.date.year === currentYearForFiltering
				);
			});

	const extraTasks =
		currentMonthForFiltering === 10 || currentMonthForFiltering === 11
			? schedule.filter(
					(task: TaskItemType) =>
						task.date.year === currentYearForFiltering + 1 &&
						task.date.month <= currentMonthForFiltering - 9,
				)
			: [];

	if (loading) {
		return (
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignContent: "center",
					justifyContent: "center",
				}}
			>
				<Spinner />
			</div>
		);
	}

	return (
		<div>
			{filteredTasks.map((task: TaskItemType) => (
				<TaskItem key={task._id} task={task} />
			))}
			{extraTasks.map((task: TaskItemType) => (
				<TaskItem key={task._id} task={task} />
			))}
		</div>
	);
};

export default HomeSchedule;
