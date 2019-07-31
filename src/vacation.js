"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var holidays_1 = require("./data/holidays");
exports.holidays = holidays_1.holidays;
var vacations_1 = require("./data/vacations");
exports.vacations = vacations_1.vacations;
var defaultOptions = {
    withVacations: true,
    withHolidays: true,
    withLastWorkDayOfMonth: false,
    withWeekends: true
};
var checkValidDateStr = function (str) {
    var bits = str.split('-');
    if (Number(bits[1]) > 12)
        return null;
    if (Number(bits[2]) > 31)
        return null;
    return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};
var checkDateFormat = function (date) {
    if (checkValidDateStr(date)) {
        return date;
    }
    else {
        throw new Error("Invalid date string: " + date);
    }
};
var toDateStr = function (date) {
    if (typeof date === 'string') {
        return checkDateFormat(date);
    }
    else {
        return checkDateFormat(date.toISOString().split('T')[0]);
    }
};
exports.toDateStr = toDateStr;
var toDate = function (date) {
    if (checkValidDateStr(date)) {
        var _a = date.split('-').map(function (bit) { return Number(bit); }), year = _a[0], month = _a[1], day = _a[2];
        return new Date(Date.UTC(year, month - 1, day));
    }
    else {
        throw new Error("Invalid date string: " + date);
    }
};
// mispelled on purpose
var isVacancy = function (date, proposedOptions) {
    checkDateFormat(date);
    var _a = __assign({}, defaultOptions, proposedOptions), withWeekends = _a.withWeekends, withVacations = _a.withVacations, withHolidays = _a.withHolidays;
    if (withVacations && vacations_1.vacations.includes(date)) {
        return true;
    }
    if (withHolidays && holidays_1.holidays.includes(date)) {
        return true;
    }
    if (withWeekends &&
        (toDate(date).getDay() === 6 || toDate(date).getDay() === 0)) {
        return true;
    }
    return false;
};
var minusDay = function (dateStr, days) {
    if (days === void 0) { days = 1; }
    checkDateFormat(dateStr);
    var date = toDate(dateStr);
    return toDateStr(new Date(new Date(date).setDate(date.getDate() - days)));
};
var plusDay = function (dateStr, days) {
    if (days === void 0) { days = 1; }
    checkDateFormat(dateStr);
    var date = toDate(dateStr);
    return toDateStr(new Date(new Date(date).setDate(date.getDate() + days)));
};
var getLastWorkDayOfMonth = function (year, month, options) {
    var date = toDateStr(new Date(Date.UTC(year, month, 0)));
    while (isVacancy(date, options)) {
        date = minusDay(date);
    }
    return date;
};
exports.getLastWorkDayOfMonth = getLastWorkDayOfMonth;
var isVacation = function (date, options) {
    checkDateFormat(date);
    if (isVacancy(date, options)) {
        return true;
    }
    if (options && options.withLastWorkDayOfMonth) {
        var dateInDate = toDate(date);
        var last = getLastWorkDayOfMonth(dateInDate.getFullYear(), dateInDate.getMonth() + 1, options);
        if (date === last) {
            return true;
        }
    }
    return false;
};
exports.isVacation = isVacation;
var closestValidDay = function (date, options) {
    checkDateFormat(date);
    while (isVacation(date, options)) {
        date = plusDay(date);
    }
    return date;
};
exports.closestValidDay = closestValidDay;
