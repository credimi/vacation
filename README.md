# 🏖Vacation 🏖

## We work hard, but sometimes we just don't 🤷‍♀

`@credimi/vacancy` is a small static module that manages the days we are off or we don't process things

### `isVacation(date[, options])`

A function that accepts a date in `YYYY-MM-DD` format and respond with a Boolean
<br />Options: see options below

### `closestWorkingDay(date[, options])`

A function that accepts a date in `YYYY-MM-DD` format and respond with the closest working day.
<br />_N.B._ if the date passed to the function is a working date, you will have your value back.
<br />Options: see options below

### `getLastWorkDayOfMonth(year, month[, options])`

A function that accepts a `year` and a `month` parameter and returns the last working date of the month in `YYYY-MM-DD` format
<br />Options: see options below

### `Options`

```ts
{
  withWeekends?: Boolean = true // includes weekends to the valid vacation days check
  withVacations?: Boolean = true // includes the days from the vacations array the valid vacation days check
  withHolidays?: Boolean = true // includes the holidays from the holidays array to the valid vacation days check
  withLastWorkDayOfMonth?: Boolean = false // includes the last working day of the month to the check
}
```

### Extras

You can directly access to the `holidays` and `vacations` arrays importing the module

### Commands

`build`: builds the package
`test`: yeah sometimes we also do TDD here...
`makesHolidays`: generates holidays array, the data will be saved in `.src/data/holidays.ts`

if you want to adding region to holidays: check the `utils/makesHolidays.js` file
if you want to add or remove custom vacancy days: manually edit the `./src/data/vacations.ts` file
