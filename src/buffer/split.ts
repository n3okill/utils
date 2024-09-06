import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";

/**
 * Split a buffer into an array of buffer's based on given separator
 * @param str
 * @param separator
 */
export function split(str: Buffer, separator: string): Buffer[] {
    const encoding = detectEncoding(str);
    return toString(str, encoding)
        .split(separator)
        .map((s) => Buffer.from(s, encoding));
}
