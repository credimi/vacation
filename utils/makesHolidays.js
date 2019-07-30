const Holidays = require("date-holidays");
const holidays = new Holidays("IT");
const fsPromises = require('fs.promises')

let vacancies = []
for (let year = 2019; year < 2030; year++) {
    vacancies = [...vacancies, ...holidays.getHolidays(year).map(({start}) => 
        start.toISOString().split('T')[0])]
}

fsPromises.writeFile('./data/vacancy.ts', `
export const vacancy: string[] = [${vacancies.map(vacancy => `
    "${vacancy}"`)}
]
`)

