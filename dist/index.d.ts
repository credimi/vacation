import { holidays } from './data/holidays';
import { vacations } from './data/vacations';
type Options = {
    withVacations?: boolean;
    withHolidays?: boolean;
    withLastWorkDayOfMonth?: boolean;
    withWeekends?: boolean;
};
declare const toDateStr: (date: Date | string) => string;
declare const getLastWorkDayOfMonth: (year: number, month: number, options?: Omit<Options, 'withLastWorkDayOfMonth'>) => string;
declare const isVacation: (date: string, options?: Options) => boolean;
declare const closestWorkingDay: (date: string, options?: Options) => string;
export { isVacation, getLastWorkDayOfMonth, closestWorkingDay, holidays, vacations, toDateStr, };
