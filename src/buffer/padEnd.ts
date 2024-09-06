import { pad } from "./pad";

/**
 * Pads the current Buffer with a string (repeated, if needed) so that the resulting buffer reaches the given length
 * The padding is applied form the end (right) of the Buffer
 * @param str Buffer to be padded
 * @param length Final size of the Buffer
 * @param padString String to be added to the Buffer
 * @returns Padded Buffer
 */
export function padEnd(str: Buffer, length: number, padString: string = " "): Buffer {
    return pad(str, length, padString, false);
}
