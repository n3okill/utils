import { pad } from "./pad";

/**
 * Pads the current Buffer with a string (repeated, if needed) so that the resulting Buffer reaches the given length
 * The padding is applied form the start (left) of the Buffer
 * @param str Buffer to be padded
 * @param length Final size of the Buffer
 * @param padString String to be added to the Buffer
 * @returns Padded Buffer
 */
export function padStart(str: Buffer, length: number, padString: string = " "): Buffer {
    return pad(str, length, padString, true);
}
