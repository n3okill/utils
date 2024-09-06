import { isNumber } from "./isNumber";

/**
 * Check if argument is Integer
 * @param arg
 * @returns {boolean}
 */
export function isInteger(arg: unknown): arg is number {
    return isNumber(arg) && arg % 1 === 0;
}
