import { isVacancy, getLastWorkDayOfMonth } from "../src/vacancy";

test("Christmas is CHRISTMAS", () => {
  const options = {
    withWeekends: false,
    withVacancy: false
  };
  expect(isVacancy(new Date("2020-12-25"), options)).toBe(true);
  expect(isVacancy(new Date("2020-12-24"), options)).toBe(false);
});

test("Christmas is CHRISTMAS, but not if you don't ask", () => {
  const options = {
    withWeekends: false,
    withVacancy: false,
    withHolidays: false
  };
  expect(isVacancy(new Date("2020-12-25"), options)).toBe(false);
});

test("It's weekend", () => {
  const options = {
    withVacancy: false,
    withHolidays: false
  };
  expect(isVacancy(new Date("2023-07-29"), options)).toBe(true);
  expect(isVacancy(new Date("2023-07-30"), options)).toBe(true);
  expect(isVacancy(new Date("2023-07-28"), options)).toBe(false);
});

test("It's vacancy", () => {
  const options = {
    withWeekends: false,
    withVacancy: true,
    withHolidays: false
  };
  expect(isVacancy(new Date("2019-07-12"), options)).toBe(true);
  expect(isVacancy(new Date("2023-07-11"), options)).toBe(false);
  expect(isVacancy(new Date("2019-12-31"), options)).toBe(true);
});

test("Last working day", () => {
  const options = {
    withLastWorkDayOfMonth: true
  };
  expect(isVacancy(new Date("2019-07-31"), options)).toBe(true);
  expect(isVacancy(new Date("2019-07-30"), options)).toBe(false);
  expect(isVacancy(new Date("2019-12-30"), options)).toBe(true);
  expect(isVacancy(new Date("2019-12-27"), options)).toBe(false);
});

test("Get last working date", () => {
  expect(getLastWorkDayOfMonth(2019, 7)).toBe("2019-07-31");
  expect(getLastWorkDayOfMonth(2019, 12)).toBe("2019-12-30");
});
