/**
 * @file date2string - A JavaScript implementation of the PHP date_format function.
 * @author Marc-Oliver Stühmer <stuehmer@codefoo.org>
 * @license MIT
 * @copyright 2019 Marc-Oliver Stühmer
 */

((global) => {
    /**
     * Determine whether the given year is a leap year.<br />
     * If no year is given, the current year is used.
     *
     * @param {number} [year]  The year to test (4 digit format)
     *
     * @return {boolean}  Is the year a leap year?
     */
    const isLeapYear = (year = new Date().getFullYear()) =>
        year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;

    /**
     * Determine the number of days of the given month in the given year.<br />
     * If no month/year is given, the current month/year is used.<br />
     * <b>NOTE:</b> The months are counted from 0 to 11, i.e. January = 0, February = 1 etc.
     *
     * @param {number} [month]  The month to determine the number of days of
     * @param {number} [year]   The month's year (4 digit format)
     *
     * @return {number}  The calculated number of days
     */
    const getDaysOfMonth = (month = new Date().getMonth(), year = new Date().getFullYear()) =>
        month == 1
            ? isLeapYear(year) ? 29 : 28
            : month == 3 || month == 5 || month == 8 || month == 10
                ? 30 : 31;

    /**
     * Format a date according to the given format string.<br />
     * The accepted format characters are the same as for the "date" function in PHP.<br />
     * The weekday and month names can be translated by setting the array properties "wdays" and "months" of date2string.
     * Note that the weekdays array must begin with Sunday.<br />
     * Use <b>\\</b> to escape letters from being interpreted (see example).<br />
     * <br /><br />
     * <table style="border: 1px solid #AAAAAA;">
     * <tr valign="middle" style="color: #FFFFFF; background-color: #AAAAAA;">
     *     <th>Format character</th>
     *     <th>Description</th>
     *     <th>Example returned values</th>
     * </tr>
     * <tr valign="top" style="background-color: #DDDDDD;">
     *     <td></td>
     *     <td align="center"><b><i>Day</i></b></td>
     *     <td></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>d</i></td>
     *     <td>Day of the month, 2 digits with leading zeros</td>
     *     <td><i>01</i> to <i>31</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>D</i></td>
     *     <td>A textual representation of a day, three letters</td>
     *     <td><i>Mon</i> through <i>Sun</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>j</i></td>
     *     <td>Day of the month without leading zeros</td>
     *     <td><i>1</i> to <i>31</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>l</i> (lowercase&nbsp;'L')</td>
     *     <td>A full textual representation of the day of the week</td>
     *     <td><i>Sunday</i> through <i>Saturday</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>N</i></td>
     *     <td>ISO-8601 numeric representation of the day of the week</td>
     *     <td><i>1</i> (for Monday) through <i>7</i> (for Sunday)</td>
     * </tr>
     * <tr valign="top">
     *     <td><i>S</i></td>
     *     <td>English ordinal suffix for the day of the month, 2 characters</td>
     *     <td><i>st</i>, <i>nd</i>, <i>rd</i> or <i>th</i>. Works well with <i>j</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>w</i></td>
     *     <td>Numeric representation of the day of the week</td>
     *     <td><i>0</i> (for Sunday) through <i>6</i> (for Saturday)</td>
     * </tr>
     * <tr valign="top">
     *     <td><i>z</i></td>
     *     <td>The day of the year (starting from 0)</td>
     *     <td><i>0</i> through <i>365</i></td>
     * </tr>
     * <tr valign="top" style="background-color: #DDDDDD;">
     *     <td></td>
     *     <td align="center"><b><i>Week</i></b></td>
     *     <td></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>W</i></td>
     *     <td>ISO-8601 week number of year, weeks starting on Monday</td>
     *     <td>Example: <i>42</i> (the 42nd week in the year)</td>
     * </tr>
     * <tr valign="top" style="background-color: #DDDDDD;">
     *     <td></td>
     *     <td align="center"><b><i>Month</i></b></td>
     *     <td></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>F</i></td>
     *     <td>A full textual representation of a month, such as January or March</td>
     *     <td><i>January</i> through <i>December</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>m</i></td>
     *     <td>Numeric representation of a month, with leading zeros</td>
     *     <td><i>01</i> through <i>12</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>M</i></td>
     *     <td>A short textual representation of a month, three letters</td>
     *     <td><i>Jan</i> through <i>Dec</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>n</i></td>
     *     <td>Numeric representation of a month, without leading zeros</td>
     *     <td><i>1</i> through <i>12</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>t</i></td>
     *     <td>Number of days in the given month</td>
     *     <td><i>28</i> through <i>31</i></td>
     * </tr>
     * <tr valign="top" style="background-color: #DDDDDD;">
     *     <td></td>
     *     <td align="center"><b><i>Year</i></b></td>
     *     <td></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>L</i></td>
     *     <td>Whether it's a leap year</td>
     *     <td><i>1</i> if it is a leap year, <i>0</i> otherwise.</td>
     * </tr>
     * <tr valign="top">
     *     <td><i>o</i></td>
     *     <td>
     *         ISO-8601 week-numbering year. This has the same value as
     *         <i>Y</i>, except that if the ISO week number
     *         (<i>W</i>) belongs to the previous or next year, that year
     *         is used instead.
     *     </td>
     *     <td>Examples: <i>1999</i> or <i>2003</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>Y</i></td>
     *     <td>A full numeric representation of a year, 4 digits</td>
     *     <td>Examples: <i>1999</i> or <i>2003</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>y</i></td>
     *     <td>A two digit representation of a year</td>
     *     <td>Examples: <i>99</i> or <i>03</i></td>
     * </tr>
     * <tr valign="top" style="background-color: #DDDDDD;">
     *     <td></td>
     *     <td align="center"><b><i>Time</i></b></td>
     *     <td></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>a</i></td>
     *     <td>Lowercase Ante meridiem and Post meridiem</td>
     *     <td><i>am</i> or <i>pm</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>A</i></td>
     *     <td>Uppercase Ante meridiem and Post meridiem</td>
     *     <td><i>AM</i> or <i>PM</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>B</i></td>
     *     <td>Swatch Internet time</td>
     *     <td><i>000</i> through <i>999</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>g</i></td>
     *     <td>12-hour format of an hour without leading zeros</td>
     *     <td><i>1</i> through <i>12</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>G</i></td>
     *     <td>24-hour format of an hour without leading zeros</td>
     *     <td><i>0</i> through <i>23</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>h</i></td>
     *     <td>12-hour format of an hour with leading zeros</td>
     *     <td><i>01</i> through <i>12</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>H</i></td>
     *     <td>24-hour format of an hour with leading zeros</td>
     *     <td><i>00</i> through <i>23</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>i</i></td>
     *     <td>Minutes with leading zeros</td>
     *     <td><i>00</i> to <i>59</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>s</i></td>
     *     <td>Seconds, with leading zeros</td>
     *     <td><i>00</i> through <i>59</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>u</i></td>
     *     <td>Microseconds (the last 3 digits are always 000)</td>
     *     <td>Example: <i>654000</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>v</i></td>
     *     <td>Milliseconds</td>
     *     <td>Example: <i>654</i></td>
     * </tr>
     * <tr valign="top" style="background-color: #DDDDDD;">
     *     <td></td>
     *     <td align="center"><b><i>Timezone</i></b></td>
     *     <td></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>e</i></td>
     *     <td>Timezone identifier</td>
     *     <td>Examples: <i>Europe/Berlin</i> or <i>Atlantic/Azores</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>I</i> (capital&nbsp;'i')</td>
     *     <td>Whether or not the date is in daylight saving time</td>
     *     <td><i>1</i> if daylight saving time, <i>0</i> otherwise.</td>
     * </tr>
     * <tr valign="top">
     *     <td><i>O</i></td>
     *     <td>Difference to Greenwich time (GMT) in hours</td>
     *     <td>Example: <i>+0200</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>P</i></td>
     *     <td>Difference to Greenwich time (GMT) with colon between hours and minutes</td>
     *     <td>Example: <i>+02:00</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>T</i></td>
     *     <td>Timezone abbreviation</td>
     *     <td>Examples: <i>AST, GMT+2</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>Z</i></td>
     *     <td>
     *         Timezone offset in seconds. The offset for timezones west of UTC is always
     *         negative, and for those east of UTC always positive.
     *     </td>
     *     <td><i>-43200</i> through <i>50400</i></td>
     * </tr>
     * <tr valign="top" style="background-color: #DDDDDD;">
     *     <td></td>
     *     <td align="center"><b><i>Full Date/Time</i></b></td>
     *     <td></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>c</i></td>
     *     <td>ISO-8601 date</td>
     *     <td>Example: <i>2004-02-12T15:19:21+00:00</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>r</i></td>
     *     <td>RFC 2822 formatted date</td>
     *     <td>Example: <i>Thu, 21 Dec 2000 16:01:07 +0200</i></td>
     * </tr>
     * <tr valign="top">
     *     <td><i>U</i></td>
     *     <td>Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)</td>
     *     <td>Example: <i>1276782742</i></td>
     * </tr>
     * </table>
     *
     * @function
     *
     * @example
     * console.log(date2string(new Date(), 'Y-m-d H:i:s'));
     * // 2018-07-09 15:33:24
     *
     * console.log(date2string(new Date(), '\\T\\o\\d\\a\\y \\i\\s l, \\t\\h\\e jS \\o\\f F Y. \\T\\h\\e \\c\\u\\r\\r\\e\\n\\t \\t\\i\\m\\e \\i\\s h:i:s A.'));
     * // Today is Friday, the 31st of August 2018. The current time is 09:46:02 PM.
     *
     * date2string.wdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
     * date2string.months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
     * console.log(date2string(new Date(), 'l, j. M \'y'));
     * // Montag, 4. Okt '19
     *
     * @param {Date}   date    The Date object to get the date/time from
     * @param {string} format  The format string
     *
     * @return {string}  The formatted date/time
     */
    const date2string = (() => {
        let wday, day;

        const zeropad = (num, digits = 2) => digits - (num + '').length <= 0 ? num : zeropad('0' + num, digits);

        const code = {
            // Day
            d : (d) => zeropad(d.getDate()),
            D : (d) => date2string.wdays[d.getDay()].substr(0, 3),
            j : (d) => d.getDate(),
            l : (d) => date2string.wdays[d.getDay()],
            N : (d) => (wday = d.getDay()) === 0 ? 7 : wday,
            S : (d) => (day = d.getDate()) == 1 || day == 21 || day == 31 ? 'st'
                    : (day == 2 || day == 22 ? 'nd'
                        : (day == 3 || day == 23 ? 'rd' : 'th')),
            w : (d) => d.getDay(),
            z : (d) => {
                const year = d.getYear();
                let days = 0;
                for (let m = 0, mon = d.getMonth(); m < mon; m++) {
                    days += getDaysOfMonth(m, year);
                }
                return days + d.getDate() - 1;
            },

            // Week
            W : (d) => {
                const getDay1 = (year) => code.N(new Date(year, 0, 1)) - 1;
                const year = d.getFullYear();
                const day1 = getDay1(year);
                let week;
                const days = day1 > 3 ? code.z(d) - (7 - day1) : code.z(d) + day1;
                if (days < 0) {
                    week = day1 == 4 || getDay1(year - 1) == 3 ? 53 : 52;
                } else {
                    week = Math.floor(days / 7) + 1;
                    if (days > 360 && week > 52) {
                        week = day1 == 3 || getDay1(year + 1) == 4 ? 53 : 1;
                    }
                }
                return zeropad(week);
            },

            // Month
            F : (d) => date2string.months[d.getMonth()],
            m : (d) => zeropad(d.getMonth() + 1),
            M : (d) => date2string.months[d.getMonth()].substr(0, 3),
            n : (d) => d.getMonth() + 1,
            t : (d) => getDaysOfMonth(d.getMonth(), d.getFullYear()),

            // Year
            L : (d) => isLeapYear(d.getFullYear()) ? 1 : 0,
            o : (d) => {
                let year = d.getFullYear();
                const week = +code.W(d);
                return (week == 1 && d.getMonth() == 11) ? ++year :
                    (week >= 52 && d.getMonth() === 0) ? --year : year;
            },
            Y : (d) => d.getFullYear(),
            y : (d) => (d.getFullYear() + '').substr(2, 2),

            // Time
            a : (d) => d.getHours() < 12 ? 'am' : 'pm',
            A : (d) => d.getHours() < 12 ? 'AM' : 'PM',
            B : (d) => {
                let b = Math.floor((d.getUTCHours() * 60 * 60 + d.getUTCMinutes() * 60
                        + d.getUTCSeconds() + 3600) / 86.4);
                if (b > 999) {
                    b -= 1000;
                }
                return zeropad(b, 3);
            },
            g : (d) => d.getHours() % 12 || 12,
            G : (d) => d.getHours(),
            h : (d) => zeropad(d.getHours() % 12 || 12),
            H : (d) => zeropad(d.getHours()),
            i : (d) => zeropad(d.getMinutes()),
            s : (d) => zeropad(d.getSeconds()),
            u : (d) => code.v(d) + '000',
            v : (d) => zeropad(d.getMilliseconds(), 3),

            // Timezone
            e : (d) => (typeof Intl != 'undefined' && Intl.DateTimeFormat().resolvedOptions().timeZone)
                    ? Intl.DateTimeFormat().resolvedOptions().timeZone : code.T(d),
            I : (d) => {
                const off6 = -new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
                const off0 = -new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
                if (off6 == off0) {
                    return 0;
                }
                if (off6 > off0) {
                    return -d.getTimezoneOffset() == off6 ? 1 : 0;
                }
                return -d.getTimezoneOffset() == off0 ? 1 : 0;
            },
            O : (d) => code.P(d).replace(/\:/, ''),
            P : (d) => {
                let offset = d.getTimezoneOffset() / 60;
                const pos = offset <= 0;
                offset = Math.abs(offset);
                const hour = Math.floor(offset);
                const min = (offset - hour) * 60;
                return (pos ? '+' : '-') + zeropad(hour) + ':' + zeropad(min);
            },
            T : (d) => {
                try {
                    // Environments supporting "timeZoneName" will throw a RangeError here
                    d.toLocaleTimeString('en-US', { timeZoneName : 'test' });
                } catch (e) {
                    if (e.name == 'RangeError'
                        // Check for buggy IE11
                        && d.toLocaleTimeString('en-US', { timeZoneName : 'short' })
                            != d.toLocaleTimeString('en-US', { timeZoneName : 'long' })
                    ) {
                        return d.toLocaleTimeString('en-US', { timeZoneName : 'short' }).split(' ').pop();
                    }
                }
                // Fallback for IE
                let offset = d.getTimezoneOffset() / 60;
                const pos = offset <= 0;
                offset = Math.abs(offset);
                const hour = Math.floor(offset);
                const min = zeropad((offset - hour) * 60);
                return offset == 0 ? 'UTC' : 'GMT' + (pos ? '+' : '-') + hour + (min != '00' ? ':' + min : '');
            },
            Z : (d) => -d.getTimezoneOffset() * 60,

            // Full Date/Time
            c : (d) => date2string(d, 'Y-m-d\\TH:i:sP'),
            r : (d) => date2string(d, 'D, d M Y H:i:s O'),
            U : (d) => Math.floor(d.getTime() / 1000)
        };

        return (date, format) => format.replace(/\\?(.)/g, (match, c) => code.hasOwnProperty(match) ? code[match](date) : c);
    })();

    if (!date2string.wdays) {
        date2string.wdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }
    if (!date2string.months) {
        date2string.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    if (typeof define == 'function' && define.amd) {
        define(() => date2string);
    } else if (typeof module == 'object' && module.exports) {
        module.exports = date2string;
    } else {
        global.date2string = date2string;
    }
})(this);
