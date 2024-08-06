export interface SubTask {
	time: string;
	task: string;
	addInfo: string;
}

interface DateDetails {
	year: number;
	month: number;
	day: number;
}

export interface TaskItemType {
	id: number;
	date: DateDetails;
	tasks: SubTask[];
}
