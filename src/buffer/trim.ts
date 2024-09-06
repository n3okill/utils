import { trimLeft } from "./trimLeft";
import { trimRight } from "./trimRight";

/**
 * Remove given characters from left and right side of the string
 * @param str Buffer to remove characters from
 * @param chars The characters to remove, if not defined removes empty spaces
 * @returns Trimmed Buffer
 */
export function trim(str: Buffer, chars: Array<string | Buffer> = []): Buffer {
    return trimLeft(trimRight(str, chars), chars);
}
