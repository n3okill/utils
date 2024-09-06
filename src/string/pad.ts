/**
 * Pads the current string with another string (repeated, if needed) so that the resulting string reaches the given length
 * The padding is applied form the start (left) if "start" is true or the end (right) if is false
 * @param  str
 * @param  str string to be padded
 * @param  length Final size of the string
 * @param  padString String to be added to the string
 * @param  start Pad from the start of the string or from the end
 * @returns  Padded string
 */
export function pad(str: string, length: number, padString = " ", start = true): string {
    length = length >> 0;
    if (str.length > length) {
        return str;
    } else {
        length = length - str.length;
        if (length > padString.length) {
            padString += padString.repeat(length / padString.length);
        }
        if (start) {
            return str + padString.slice(0, length);
        } else {
            return padString.slice(0, length) + str;
        }
    }
}
