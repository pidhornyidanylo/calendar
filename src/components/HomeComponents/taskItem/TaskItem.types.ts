import type { SubTaskItemType } from "../subTaskItem/SubTaskItem.types";

type TaskItemDateType = {
	year: number;
	month: number;
	day: number;
};

export type TaskItemType = {
	date: TaskItemDateType;
	dateIdentifier: string;
	tasks: SubTaskItemType[];
	_id: string;
	__v: number;
};

export type TaskItemProps = {
	task: TaskItemType;
};
