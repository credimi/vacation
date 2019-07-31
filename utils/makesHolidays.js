const Holidays = require("date-holidays");
const holidays = new Holidays("IT");
const fsPromises = require('fs.promises')

let holyarray = []
for (let year = 2019; year < 2030; year++) {
  holyarray = [...holyarray, ...holidays.getHolidays(year).map(({
      end
    }) =>
    end.toISOString().split('T')[0])]
}

fsPromises.writeFile('./src/data/holidays.ts', `
export const holidays: string[] = [${holyarray.map(holiday => `
  '${holiday}'`)}
]
  `)
  .then(() => console.log('Holidays array generated 👍'))
  .catch(e => {
    console.error('error', e)
    process.exit(1);
  })
