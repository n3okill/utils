import { isKind } from "./isKind";

/**
 * Check if argument is Date
 * @param arg
 * @returns {boolean}
 */
export function isDate(arg: unknown): arg is Date {
    return isKind(arg, "date");
}
