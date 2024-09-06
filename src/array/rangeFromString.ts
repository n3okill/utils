import { NumberUtil } from "..";
import { isAlphaSequence } from "../type/isAlphaSequence";
import { isNumericSequence } from "../type/isNumericSequence";
import { rangeString } from "./_internal";

/**
 * Return an array with a range from a string
 * @param str string with the form '1..6..2' or 'a..f'
 * @returns returns an array of strings
 */
export function rangeFromString(str: string): Array<number | string> {
    const parts = str.split(/\.\./);
    const increment = parts.length === 3 ? Math.abs(NumberUtil.toNumeric(parts[2])) : 1;
    if (!isNumericSequence(str) && !isAlphaSequence(str)) {
        throw new TypeError("Sequence is invalid.");
    }
    return rangeString(parts[0], parts[1], increment);
}