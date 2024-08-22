import type { SubTaskItemType } from "@/components/HomeComponents/subTaskItem/SubTaskItem.types";
import type { TaskItemType } from "@/components/HomeComponents/taskItem/TaskItem.types";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import React from "react";
import { styles } from "./PDFDocument.styles";

const PDFDocument = ({ data }: { data: TaskItemType[] }) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<Text style={styles.title}>Calendar Tasks Report</Text>
				{data.map((taskGroup: TaskItemType) => (
					<View style={styles.section} key={taskGroup._id}>
						<Text style={styles.dateTitle}>
							Date:{" "}
							{(taskGroup.date.day as number) < 10
								? `0${taskGroup.date.day}`
								: taskGroup.date.day}
							/
							{(taskGroup.date.month as number) < 10
								? `0${taskGroup.date.month}`
								: taskGroup.date.month}
							/ {taskGroup.date.year}
						</Text>
						<View style={styles.taskList}>
							{taskGroup.tasks.length > 0 ? (
								taskGroup.tasks.map((task: SubTaskItemType) => (
									<View style={styles.taskItem} key={task._id}>
										<Text>
											- {task.info}: {task.addInfo}
										</Text>
										<Text style={styles.taskTime}>
											Time: {task.time.timeFrom} - {task.time.timeTo}
										</Text>
									</View>
								))
							) : (
								<Text>No tasks for this date.</Text>
							)}
						</View>
					</View>
				))}
			</Page>
		</Document>
	);
};

export default PDFDocument;
