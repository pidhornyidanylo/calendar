import { create } from "zustand";
import type { Task } from "./components/SideBarComponents/createForm/form/Form";

type Mode = "light" | "dark";

const getInitialMode = (): Mode => {
  if (typeof window !== "undefined") {
    const savedMode = localStorage.getItem("mode") as Mode;
    if (savedMode) {
      return savedMode;
    }
  }
  return "light";
};

export type State = {
  expandedSideBar: boolean;
  toggleExpandedSideBar: () => void;
  setExpandedSideBar: (value: boolean) => void;

  showCreateForm: boolean;
  toggleShowCreateForm: () => void;
  setShowCreateForm: (value: boolean) => void;

  mutateCreateBtn: boolean;
  toggleMutateCreateBtn: (value: boolean) => void;

  openModal: boolean;
  setOpenModal: (value: boolean) => void;

  dateToCreateTask: { day: number; month: number; year: number } | null;
  setDateToCreateTask: (
    value: { day: number; month: number; year: number } | null
  ) => void;

  task: Task | null;
  setTask: (task: Task) => void;

  headerSearchValue: string;
  setHeaderSearchValue: (value: string) => void;

  showSearchFilters: boolean;
  setShowSearchFilters: () => void;

  updated: boolean;
  updateSchedule: () => void;

  currentMonth: number;
  setCurrentMonth: (monthToSet: number) => void;
  nextMonth: () => void;
  prevMonth: () => void;

  currentYear: number;
  nextYear: () => void;
  prevYear: () => void;

  mode: Mode;
  setMode: (mode: Mode) => void;
  switchMode: () => void;
};

export const useStore = create<State>((set) => ({
  expandedSideBar: false,
  toggleExpandedSideBar: () =>
    set((state) => ({ expandedSideBar: !state.expandedSideBar })),
  setExpandedSideBar: (value: boolean) =>
    set(() => ({ expandedSideBar: value })),

  dateToCreateTask: null,
  setDateToCreateTask: (
    value: { day: number; month: number; year: number } | null
  ) => set(() => ({ dateToCreateTask: value })),

  showCreateForm: false,
  toggleShowCreateForm: () =>
    set((state) => ({
      showCreateForm: !state.showCreateForm,
    })),
  setShowCreateForm: (value: boolean) => set(() => ({ showCreateForm: value })),

  task: null,
  setTask: (task: Task) => set(() => ({ task: task })),

  mutateCreateBtn: false,
  toggleMutateCreateBtn: (value: boolean) =>
    set((state) => ({
      mutateCreateBtn: value,
    })),

  openModal: false,
  setOpenModal: (value: boolean) =>
    set(() => ({
      openModal: value,
    })),

  headerSearchValue: "",
  setHeaderSearchValue: (value: string) =>
    set(() => ({
      headerSearchValue: value,
    })),

  showSearchFilters: false,
  setShowSearchFilters: () =>
    set((state) => ({ showSearchFilters: !state.showSearchFilters })),

  updated: false,
  updateSchedule: () =>
    set((state) => ({
      updated: !state.updated,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
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
  nextYear: () =>
    set((state) => ({
      currentYear: state.currentYear === 11 ? 0 : state.currentYear + 1,
    })),
  prevYear: () =>
    set((state) => ({
      currentYear: state.currentYear === 0 ? 11 : state.currentYear - 1,
    })),

  mode: getInitialMode(),
  setMode: (mode) => set({ mode }),
  switchMode: () =>
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", newMode);
      return { mode: newMode };
    }),
}));
