import dayjs from 'dayjs'
import { FullNameModel } from '../model/full-name.model'
import { StatusCodeModel } from '../model/status-code.model'
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

/* Date format used on the front-end.*/
const DATE_DISPLAY_FORMAT = 'DD.MM.YYYY'

const DATE_ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS'
export function formatDateString(value?: string | Date): string {
    if (!value) return ''
    return dayjs(value).format(DATE_DISPLAY_FORMAT)
}

/* Formats the given date to standard ISO format. Useful for sending to back-end.*/
export function toISOString(value?: string | Date): string {
    if (!value) return ''
    // Date format example: 2019-01-25T02:00:00.000
    return dayjs(value).format(DATE_ISO_FORMAT)
}

export function formatStatusCodeString(value?: StatusCodeModel, withCode?: boolean): string {
    if (!value) return ''
    if (withCode) {
        return `${value.code} - ${value.value}`
    } else {
        return value.value
    }
}

export function isActualNumber(value: any): boolean {
    return /^\d+$/.test(value)
}

export function formatFullName(model: FullNameModel | undefined): string {
    if (!model) return ''
    return `${model?.firstName ?? '-'} ${model?.lastName ?? '-'}`
}
