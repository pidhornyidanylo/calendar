import { create } from "zustand";

export type State = {
	expandedSideBar: boolean;
	toggleExpandedSideBar: () => void;
	setExpandedSideBar: (value: boolean) => void;

	showCreateForm: boolean;
	toggleShowCreateForm: () => void;
	setShowCreateForm: (value: boolean) => void;

	dateToCreateTask: { day: number; month: number; year: number } | null;
	setDateToCreateTask: (
		value: { day: number; month: number; year: number } | null,
	) => void;

	headerSearchValue: string;
	setHeaderSearchValue: (value: string) => void;

	currentMonth: number;
	setCurrentMonth: (monthToSet: number) => void;
	nextMonth: () => void;
	prevMonth: () => void;

	currentYear: number;
	setCurrentYear: (yearToSet: number) => void;
	nextYear: () => void;
	prevYear: () => void;

	showPastEvents: boolean;
	setShowPastEvents: () => void;
};

export const useStore = create<State>((set) => ({
	expandedSideBar: false,
	toggleExpandedSideBar: () =>
		set((state) => ({ expandedSideBar: !state.expandedSideBar })),
	setExpandedSideBar: (value: boolean) =>
		set(() => ({ expandedSideBar: value })),

	dateToCreateTask: null,
	setDateToCreateTask: (
		value: { day: number; month: number; year: number } | null,
	) => set(() => ({ dateToCreateTask: value })),

	showCreateForm: false,
	toggleShowCreateForm: () =>
		set((state) => ({
			showCreateForm: !state.showCreateForm,
		})),
	setShowCreateForm: (value: boolean) => set(() => ({ showCreateForm: value })),

	headerSearchValue: "",
	setHeaderSearchValue: (value: string) =>
		set(() => ({
			headerSearchValue: value,
		})),

	currentMonth: new Date().getMonth(),
	setCurrentMonth: (monthToSet: number) =>
		set(() => ({
			currentMonth: monthToSet,
		})),
	nextMonth: () =>
		set((state) => ({
			currentMonth: state.currentMonth === 11 ? 0 : state.currentMonth + 1,
		})),
	prevMonth: () =>
		set((state) => ({
			currentMonth: state.currentMonth === 0 ? 11 : state.currentMonth - 1,
		})),

	currentYear: new Date().getFullYear(),
	setCurrentYear: (yearToSet: number) =>
		set(() => ({
			currentYear: yearToSet,
		})),
	nextYear: () =>
		set((state) => ({
			currentYear: state.currentYear === 11 ? 0 : state.currentYear + 1,
		})),
	prevYear: () =>
		set((state) => ({
			currentYear: state.currentYear === 0 ? 11 : state.currentYear - 1,
		})),

	showPastEvents: false,
	setShowPastEvents: () =>
		set((state) => ({
			showPastEvents: !state.showPastEvents,
		})),
}));
