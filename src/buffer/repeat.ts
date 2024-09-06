import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";
import { repeat as repeatString } from "../string/repeat";

/**
 * Repeat a given string or buffer a number of times
 * @param str String or buffer that will be repeated
 * @param n Number of times to repeat the given string
 * @return The given string or buffer repeated n times
 */
export function repeat(str: string | Buffer, n: number): Buffer {
    if (Buffer.isBuffer(str)) {
        const encoding = detectEncoding(str);
        return Buffer.from(repeatString(toString(str), n), encoding);
    } else {
        return Buffer.from(repeatString(str, n), "utf8");
    }
}