import { holidays } from '../data/holidays'
import { vacations } from '../data/vacations'

type Options = {
  withVacations?: Boolean
  withHolidays?: Boolean
  withLastWorkDayOfMonth?: Boolean
  withWeekends?: Boolean
}

const defaultOptions: Options = {
  withVacations: true,
  withHolidays: true,
  withLastWorkDayOfMonth: false,
  withWeekends: true,
}

// mispelled on purpose
const isVacancy = (date: Date, proposedOptions?: Options): Boolean => {
  const { withWeekends, withVacations, withHolidays } = {
    ...defaultOptions,
    ...proposedOptions,
  }

  if (withWeekends && (date.getDay() === 6 || date.getDay() === 0)) {
    return true
  }

  const dateString = date.toISOString().split('T')[0]

  if (withVacations && vacations.includes(dateString)) {
    return true
  }

  if (withHolidays && holidays.includes(dateString)) {
    return true
  }

  return false
}

const minusDay = (date: Date, days: number = 1) =>
  new Date(new Date(date).setDate(date.getDate() - days))

const plusDay = (date: Date, days: number = 1) =>
  new Date(new Date(date).setDate(date.getDate() + days))

const getLastWorkDayOfMonth = (
  year: number,
  month: number,
  options?: Omit<Options, 'withWeekends'>
) => {
  let date = new Date(Date.UTC(year, month, 0))

  while (isVacancy(date, options)) {
    date = minusDay(date)
  }

  return date.toISOString().split('T')[0]
}

const isVacation = (date: Date, options?: Options): Boolean => {
  if (isVacancy(date, options)) {
    return true
  }

  if (options && options.withLastWorkDayOfMonth) {
    const last = getLastWorkDayOfMonth(
      date.getFullYear(),
      date.getMonth() + 1,
      options
    )
    if (date.toISOString().split('T')[0] === last) {
      return true
    }
  }

  return false
}

const closestValidDay = (date: Date, options?: Options): String => {
  while (isVacation(date, options)) {
    date = plusDay(date)
  }

  return date.toISOString().split('T')[0]
}

export {
  isVacation,
  getLastWorkDayOfMonth,
  closestValidDay,
  holidays,
  vacations,
}
