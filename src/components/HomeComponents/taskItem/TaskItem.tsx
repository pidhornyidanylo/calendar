import { useStore } from "@/store";
import { normalizeDate } from "@/utils/dateUtils";
import type React from "react";
import { months } from "../../SideBarComponents/calendar/Calendar";
import SubTaskItem from "../subTaskItem/SubTaskItem";
import styles from "./TaskItem.module.css";
import type { Task } from "./TaskItem.types";

const TaskItem = <T extends Task>({ task }: { task: T }): React.JSX.Element => {
	const headerSearchValue = useStore((state) => state.headerSearchValue);

	return (
		<div className={styles.taskItem} key={task.id}>
			<div className={styles.taskDate}>
				<span className={styles.taskDay}>{task.date.day}</span>
				<span className={styles.taskMonth}>
					{months[task.date.month - 1].slice(0, 3)},
					{` ${normalizeDate(task.date.day, task.date.month, task.date.year)}`}
				</span>
				{headerSearchValue && (
					<span className={styles.taskYear}>{task.date.year}</span>
				)}
			</div>
			<div className={styles.taskBody}>
				{task.tasks?.map((subTask) => (
					<SubTaskItem key={subTask.task} subTask={subTask} />
				))}
			</div>
		</div>
	);
};

export default TaskItem;
