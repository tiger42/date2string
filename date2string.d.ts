/**
 * Format a date according to the given format string.
 * The accepted format characters are the same as for the "date" function in PHP.
 *
 * @param {Date}   date    The Date object to get the date/time from
 * @param {string} format  The format string
 *
 * @return {string}  The formatted date/time
 */
declare function date2string(date: Date, format: string): string;

export = date2string;
