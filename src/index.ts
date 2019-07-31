import { holidays } from './data/holidays'
import { vacations } from './data/vacations'

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

const checkValidDateStr = (str: string) => {
  const bits = str.split('-')
  if (Number(bits[1]) > 12) return null
  if (Number(bits[2]) > 31) return null
  return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null
}

const checkDateFormat = (date: string) => {
  if (checkValidDateStr(date)) {
    return date
  } else {
    throw new Error(`Invalid date string: ${date}`)
  }
}

const toDateStr = (date: Date | string) => {
  if (typeof date === 'string') {
    return checkDateFormat(date)
  } else {
    return checkDateFormat(date.toISOString().split('T')[0])
  }
}

const toDate = (date: string) => {
  if (checkValidDateStr(date)) {
    const [year, month, day] = date.split('-').map(bit => Number(bit))
    return new Date(Date.UTC(year, month - 1, day))
  } else {
    throw new Error(`Invalid date string: ${date}`)
  }
}

// mispelled on purpose
const isVacancy = (date: string, proposedOptions?: Options): Boolean => {
  checkDateFormat(date)
  const { withWeekends, withVacations, withHolidays } = {
    ...defaultOptions,
    ...proposedOptions,
  }

  if (withVacations && vacations.includes(date)) {
    return true
  }

  if (withHolidays && holidays.includes(date)) {
    return true
  }

  if (
    withWeekends &&
    (toDate(date).getDay() === 6 || toDate(date).getDay() === 0)
  ) {
    return true
  }

  return false
}

const minusDay = (dateStr: string, days: number = 1) => {
  checkDateFormat(dateStr)
  const date = toDate(dateStr)
  return toDateStr(new Date(new Date(date).setDate(date.getDate() - days)))
}

const plusDay = (dateStr: string, days: number = 1) => {
  checkDateFormat(dateStr)
  const date = toDate(dateStr)
  return toDateStr(new Date(new Date(date).setDate(date.getDate() + days)))
}

const getLastWorkDayOfMonth = (
  year: number,
  month: number,
  options?: Omit<Options, 'withLastWorkDayOfMonth'>
) => {
  let date = toDateStr(new Date(Date.UTC(year, month, 0)))

  while (isVacancy(date, options)) {
    date = minusDay(date)
  }

  return date
}

const isVacation = (date: string, options?: Options): Boolean => {
  checkDateFormat(date)
  if (isVacancy(date, options)) {
    return true
  }

  if (options && options.withLastWorkDayOfMonth) {
    const dateInDate = toDate(date)
    const last = getLastWorkDayOfMonth(
      dateInDate.getFullYear(),
      dateInDate.getMonth() + 1,
      options
    )
    if (date === last) {
      return true
    }
  }

  return false
}

const closestWorkingDay = (date: string, options?: Options): String => {
  checkDateFormat(date)
  while (isVacation(date, options)) {
    date = plusDay(date)
  }

  return date
}

export {
  isVacation,
  getLastWorkDayOfMonth,
  closestWorkingDay,
  holidays,
  vacations,
  toDateStr
}
