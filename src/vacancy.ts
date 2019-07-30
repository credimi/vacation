import { holidays } from "../data/holidays";
import { vacancies } from "../data/vacancies";

export { holidays, vacancies };

type Options = {
  withVacancy?: Boolean;
  withHolidays?: Boolean;
  withLastWorkDayOfMonth?: Boolean;
  withWeekends?: Boolean;
};

const defaultOptions: Options = {
  withVacancy: true,
  withHolidays: true,
  withLastWorkDayOfMonth: false,
  withWeekends: true
};

const minusDay = (date: Date, days: number = 1) =>
  new Date(new Date(date).setDate(date.getDate() - days));

type GetLastWorkDayOfMonthDOpt = {
  recursive?: Boolean;
  outputFormat?: "string" | "date";
};

export const getLastWorkDayOfMonth = (
  date: Date,
  proposedOptions?: Options,
  funcOpt?: GetLastWorkDayOfMonthDOpt
) => {
  const proposed =
    funcOpt && funcOpt.recursive
      ? date
      : new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));

  const options = {
    ...defaultOptions,
    ...proposedOptions,
    withLastWorkDayOfMonth: false
  };

  if (isVacancy(date, options)) {
    return getLastWorkDayOfMonth(minusDay(date), options, { recursive: true });
  }

  return funcOpt && funcOpt.outputFormat === "date"
    ? proposed
    : proposed.toISOString().split("T")[0];
};

export const isVacancy = (date: Date, proposedOptions?: Options): Boolean => {
  const { withWeekends, withVacancy, withHolidays, withLastWorkDayOfMonth } = {
    ...defaultOptions,
    ...proposedOptions
  };

  if (withWeekends && (date.getDay() === 6 || date.getDay() === 0)) {
    return true;
  }

  const dateString = date.toISOString().split("T")[0];

  if (withVacancy && vacancies.includes(dateString)) {
    return true;
  }

  if (withHolidays && holidays.includes(dateString)) {
    return true;
  }

  if (
    withLastWorkDayOfMonth &&
    date.getTime() ===
      getLastWorkDayOfMonth(date, proposedOptions, {
        outputFormat: "date"
      }).getTime()
  ) {
    return true;
  }

  return false;
};
