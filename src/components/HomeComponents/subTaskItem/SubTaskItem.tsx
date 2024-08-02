import Image from "next/image";
import React, { useState } from "react";
import arrowDown from "../../../../public/icons/expand_more.svg";
import type { SubTask } from "../taskItem/TaskItem.types";
import styles from "./SubTaskItem.module.css";

const SubTaskItem = ({ subTask }: { subTask: SubTask }) => {
	const [expandSubTask, setExpandSubTask] = useState(false);
	return (
		<div className={styles.subTask}>
			<div className={styles.subTaskMain}>
				<span className={styles.subTaskTimeSquare} />
				<span className={styles.subTaskTime}>{subTask.time}</span>
				<span className={styles.subTaskInner}>{subTask.task}</span>
				<button
					type="button"
					onClick={() => setExpandSubTask(!expandSubTask)}
					className={styles.subTaskExpand}
				>
					<Image src={arrowDown} alt={"arrow-down"} />
				</button>
			</div>
			<p className={`${styles.addInfo} ${expandSubTask ? styles.visible : ""}`}>
				{subTask.addInfo}
			</p>
		</div>
	);
};

export default SubTaskItem;
