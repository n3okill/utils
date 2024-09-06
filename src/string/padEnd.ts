import { pad } from "./pad";

/**
 * Pads the current string with another string (repeated, if needed) so that the resulting string reaches the given length
 * The padding is applied form the end (right) of the string
 * @param  str string to be padded
 * @param  length Final size of the string
 * @param  padString String to be added to the string
 * @returns  Padded string
 */
export function padEnd(str: string, length: number, padString: string = " "): string {
    return pad(str, length, padString, false);
}
