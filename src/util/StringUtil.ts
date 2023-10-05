import dayjs from "dayjs";

/* Format that date should be displayed on the front-end.*/
const DATE_DISPLAY_FORMAT = "DD.MM.YYYY";

export function toDateString(value?: string | Date): string {
    if (!value) return "";
    return dayjs(value).format(DATE_DISPLAY_FORMAT);
}

/* Formats the given date to standard ISO format. Useful for sending to backend. */
export function toISOString(value?: string | Date): string {
    if (!value) return "";
    return dayjs(value, DATE_DISPLAY_FORMAT).toISOString();
}