import {
  isVacation,
  getLastWorkDayOfMonth,
  closestWorkingDay,
  toDateStr,
} from '../src/'

test('Christmas is CHRISTMAS', () => {
  const options = {
    withWeekends: false,
    withVacations: false,
  }
  expect(isVacation('2020-12-25', options)).toBe(true)
  expect(isVacation('2020-12-24', options)).toBe(false)
})

test("Christmas is CHRISTMAS, but not if you don't ask", () => {
  const options = {
    withWeekends: false,
    withVacations: false,
    withHolidays: false,
  }
  expect(isVacation('2020-12-25', options)).toBe(false)
})

test("It's weekend", () => {
  const options = {
    withVacations: false,
    withHolidays: false,
  }
  expect(isVacation('2023-07-29', options)).toBe(true)
  expect(isVacation('2023-07-30', options)).toBe(true)
  expect(isVacation('2023-07-28', options)).toBe(false)
  expect(isVacation('2019-08-03', options)).toBe(true)
  expect(isVacation('2019-08-05', options)).toBe(false)
})

test("It's vacation", () => {
  const options = {
    withWeekends: false,
    withHolidays: false,
  }
  expect(isVacation('2019-07-12', options)).toBe(true)
  expect(isVacation('2023-07-11', options)).toBe(false)
  expect(isVacation('2019-12-31', options)).toBe(true)
})

test('Last working day', () => {
  const options = {
    withLastWorkDayOfMonth: true,
  }
  expect(isVacation('2019-07-31', options)).toBe(true)
  expect(isVacation('2019-07-30', options)).toBe(false)
  expect(isVacation('2019-12-30', options)).toBe(true)
  expect(isVacation('2019-12-27', options)).toBe(false)
})

test('Get last working date', () => {
  expect(getLastWorkDayOfMonth(2019, 7)).toBe('2019-07-31')
  expect(getLastWorkDayOfMonth(2019, 12)).toBe('2019-12-30')
})

test('Get closest valid day', () => {
  const options = {
    withLastWorkDayOfMonth: true,
  }
  expect(closestWorkingDay('2019-12-30', options)).toBe('2020-01-02')
  expect(closestWorkingDay('2019-08-01', options)).toBe('2019-08-01')
})
