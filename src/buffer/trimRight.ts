import { _toString } from "./_internal";
import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";
import { trimRight as trimRightString } from "../string/trimRight";

/**
 * Remove given characters from right side of the buffer
 * @param s Buffer to remove the characters from
 * @param chars Characters to remove, if not defined removes empty spaces
 * @returns Trimmed Buffer
 */
export function trimRight(s: Buffer, chars: Array<string | Buffer> = []): Buffer {
    const encoding = detectEncoding(s);
    return Buffer.from(
        trimRightString(
            toString(s, encoding),
            chars.map((s) => _toString(s)),
        ),
        encoding,
    );
}
