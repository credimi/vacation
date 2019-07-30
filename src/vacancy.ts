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

export const getLastWorkDayOfMonth = (
  year: number,
  month: number,
  options?: Options
) => {
  let date = new Date(Date.UTC(year, month, 0));

  while (isVacancy(date, { ...options, withLastWorkDayOfMonth: false })) {
    date = minusDay(date);
  }

  return date.toISOString().split("T")[0];
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

  if (withLastWorkDayOfMonth) {
    const last = getLastWorkDayOfMonth(date.getFullYear(), date.getMonth() + 1);
    if (date.toISOString().split("T")[0] === last) {
      return true;
    }
  }

  return false;
};
