import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";
import { trimLeft as trimLeftString  } from "../string/trimLeft";
import { _toString } from "./_internal";


/**
 * Remove given characters from the left side of the buffer
 * @param s Buffer to remove the characters from
 * @param chars The characters to remove if not defined removes empty spaces.
 * @returns Trimmed Buffer
 */
export function trimLeft(s: Buffer, chars: Array<string | Buffer> = []): Buffer {
    const encoding = detectEncoding(s);
    return Buffer.from(
        trimLeftString(
            toString(s, encoding),
            chars.map((s) => _toString(s)),
        ),
        encoding,
    );
}
