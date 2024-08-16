import { useStore } from "@/store";
import { normalizeDate } from "@/utils/dateUtils";
import type React from "react";
import { months } from "../../SideBarComponents/calendar/Calendar";
import SubTaskItem from "../subTaskItem/SubTaskItem";
import styles from "./TaskItem.module.css";
import type { TaskItemProps, TaskItemType } from "./TaskItem.types";

const TaskItem: React.FC<TaskItemProps> = ({
	task,
}: {
	task: TaskItemType;
}) => {
	const headerSearchValue = useStore((state) => state.headerSearchValue);
	return (
		<div className={styles.taskItem} key={task._id}>
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
				{task.tasks
					.sort(
						(a, b) =>
							+a.time.timeFrom.slice(0, 2) - +b.time.timeFrom.slice(0, 2),
					)
					.map((subTask) => (
						<SubTaskItem
							key={subTask._id}
							subTask={subTask}
							taskID={task._id}
						/>
					))}
			</div>
		</div>
	);
};

export default TaskItem;
