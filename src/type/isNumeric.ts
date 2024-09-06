import { isNumber } from "./isNumber";
import { isString } from "./isString";

/**
 * Check if argument is numeric type, check if is number or a string that can be converted into number
 * @param arg
 * @returns {boolean}
 */
export function isNumeric(arg: unknown): arg is number {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return isNumber(arg) || (isString(arg) && parseInt(arg, 10) == arg);
}
