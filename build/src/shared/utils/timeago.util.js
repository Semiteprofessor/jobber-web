import { differenceInCalendarDays, format, getISOWeek, isSameDay, subDays } from 'date-fns';
export class TimeAgo {
    static transform(value) {
        if (!value) {
            return '';
        }
        const date = typeof value === 'string' ? new Date(value) : value;
        return this.timeDifference(new Date(), new Date(date));
    }
    static chatMessageTransform(value) {
        if (!value) {
            return '';
        }
        const date = typeof value === 'string' ? new Date(value) : value;
        const yesterday = subDays(new Date(), 1);
        if (isSameDay(date, new Date())) {
            return 'Today';
        }
        else if (isSameDay(date, yesterday)) {
            return 'Yesterday';
        }
        else if (getISOWeek(new Date()) === getISOWeek(date) || getISOWeek(new Date()) - getISOWeek(date) === 1) {
            return format(date, 'EEEE');
        }
        else {
            return format(date, 'd MMMM, yyyy');
        }
    }
    static formatDateToMonthAndYear(value) {
        if (!value) {
            return '';
        }
        const date = new Date(value);
        return format(date, 'MMMM, yyyy');
    }
    static dayMonthYear(value) {
        const date = new Date(value);
        return format(date, 'd MMMM, yyyy');
    }
    static dayWithTime(value) {
        const date = new Date(value);
        return `${format(date, 'd MMM')} at ${format(date, 'HH:mm')}`;
    }
    static timeFormat(value) {
        const date = new Date(value);
        return format(date, 'HH:mm a');
    }
    static compareDates(date1, date2) {
        const firstDate = format(new Date(date1), 'd/MM/yyyy');
        const secondDate = format(new Date(date2), 'd/MM/yyyy');
        if (firstDate > secondDate) {
            return -1;
        }
        else if (firstDate < secondDate) {
            return 1;
        }
        else {
            return 0;
        }
    }
    static dateInDays(date) {
        let result = '';
        const difference = differenceInCalendarDays(new Date(), new Date(date));
        const months = Math.floor(difference / 30);
        if (months <= 0) {
            const weeks = Math.floor(difference / 7);
            result = weeks >= 1 ? `${weeks} week${weeks >= 2 ? 's' : ''}` : `${difference} day${difference >= 2 ? 's' : ''}`;
        }
        else if (months === 1) {
            result = `${months} month`;
        }
        else {
            result = `${months} months`;
        }
        return result;
    }
    static timeDifference(current, date) {
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
        const elapsed = current.valueOf() - date.valueOf();
        if (format(current, 'yyyy') === format(date, 'yyyy')) {
            if (elapsed < msPerMinute) {
                return this.secondsAgo(elapsed);
            }
            else if (elapsed < msPerHour) {
                return this.minutesAgo(elapsed, msPerMinute);
            }
            else if (elapsed < msPerDay) {
                return this.hoursAgo(elapsed, msPerHour);
            }
            else if (elapsed < msPerMonth) {
                return this.monthsAgo(date, elapsed, msPerDay);
            }
            else {
                return format(date, 'MMM d');
            }
        }
        else {
            return format(date, 'MMM d, yyyy');
        }
    }
    static secondsAgo(elapsed) {
        if (Math.round(elapsed / 1000) <= 1) {
            return 'a second ago';
        }
        else {
            return `${Math.round(elapsed / 1000)} seconds ago`;
        }
    }
    static minutesAgo(elapsed, msPerMinute) {
        if (Math.round(elapsed / msPerMinute) <= 1) {
            return 'a minute ago';
        }
        else {
            return `${Math.round(elapsed / msPerMinute)} minutes ago`;
        }
    }
    static hoursAgo(elapsed, msPerHour) {
        if (Math.round(elapsed / msPerHour) <= 1) {
            return 'an hour ago';
        }
        else {
            return `${Math.round(elapsed / msPerHour)} hours ago`;
        }
    }
    static monthsAgo(date, elapsed, msPerDay) {
        if (Math.round(elapsed / msPerDay) <= 7) {
            return format(date, 'eeee');
        }
        else {
            return format(date, 'MMM d');
        }
    }
}
