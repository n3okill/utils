import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";
import { pad as padString } from "../string/pad";

/**
 * Pads the current Buffer with string (repeated, if needed) so that the resulting Buffer reaches the given length
 * The padding is applied form the start (left) if "start" is true or the end (right) if is false
 * @param str Buffer to be padded
 * @param length Final size of the Buffer
 * @param addString String to be added to the Buffer
 * @param start Pad from the start of the Buffer or from the end
 * @returns Padded Buffer
 */
export function pad(str: Buffer, length: number, addString = " ", start = true): Buffer {
    const encoding = detectEncoding(str);
    return Buffer.from(padString(toString(str, encoding), length, addString, start), encoding);
}
