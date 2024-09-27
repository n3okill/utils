import { isNumber } from "../type/isNumber";
import { isString } from "../type/isString";
import { rangeNumber, rangeString } from "./_internal";

/**
 * Return an array with a range of string or number values
 * @param start First value of the range
 * @param end Last value of range
 * @param step Stepping between values
 * @returns Array with the range based on entered values
 */
export function range(start: number | string, end: number | string, step: number = 1): Array<number | string> {
    if (isString(start) && isString(end)) {
        return rangeString(start, end, step);
    } else if (isNumber(start) && isNumber(end)) {
        return rangeNumber(start, end, step);
    } else {
        return [];
    }
}
