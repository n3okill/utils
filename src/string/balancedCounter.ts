import { escapeRegExp } from "./escapeRegExp";

/**
 * Check if the number of occurrences of the 'open' string are the same of ths 'close' string in the input string
 * @param input
 * @param open
 * @param close
 * @returns
 */
export function balancedCounter(input: string, open = "{", close = "}"): boolean {
    //Can't use regexp.exec because of the "g" flag
    // eslint-disable-next-line security/detect-non-literal-regexp
    const openNumber = (input.match(new RegExp(escapeRegExp(open), "g")) || []).length;
    // eslint-disable-next-line security/detect-non-literal-regexp
    const closeNumber = (input.match(new RegExp(escapeRegExp(close), "g")) || []).length;
    return openNumber === closeNumber;
}
