export const normalizeDate = (day: number, month: number, year: number) => {
  const padZero = (num: number): string => num.toString().padStart(2, "0");
  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/");
    return new Date(
      `${year}-${padZero(Number(month))}-${padZero(Number(day))}`
    );
  };
  const shortDayName = (date: Date, locale: string): string =>
    date.toLocaleDateString(locale, { weekday: "short" });
  const taskDate = parseDate(`${day}/${month}/${year}`);
  const taskDayName = shortDayName(taskDate, "en-US");
  return taskDayName;
};

export const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return {
    day,
    month,
    year,
  };
};

export const createDateIdentifier = (
  showCalendatInput: boolean,
  formState: {
    timeFrom: string;
    timeTo: string;
    taskInfo: string;
    allDay: boolean;
    date: string;
    addInfo: string;
  },
  dateToCreateTask: { day: number; month: number; year: number } | null
) => {
  return showCalendatInput
    ? String(parseDate(formState.date).day) +
        String(parseDate(formState.date).month) +
        String(parseDate(formState.date).year)
    : String(
        (dateToCreateTask as { day: number; month: number; year: number }).day
      ) +
        String(
          (dateToCreateTask as { day: number; month: number; year: number })
            .month
        ) +
        String(
          (dateToCreateTask as { day: number; month: number; year: number })
            .year
        );
};
