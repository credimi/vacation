import { holidays } from "../data/holidays";
import { vacancies } from "../data/vacancies";

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

export const isVacancy = (date: Date, proposedOptions?: Options): Boolean => {
  const { withWeekends, withVacancy, withHolidays, withLastWorkDayOfMonth } = {
    ...defaultOptions,
    ...proposedOptions
  };

  if (withWeekends && (date.getDay() === 6 || date.getDay() === 0)) {
    return true;
  }

  if (withVacancy && vacancies.includes(date.toISOString().split("T")[0])) {
    return true;
  }

  if (withHolidays && holidays.includes(date.toISOString().split("T")[0])) {
    return true;
  }

  return false;
};
