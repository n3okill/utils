import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";
import { titleCase as titleCaseString } from "../string/titleCase";

/**
 * Converts a CamelCase name into space-separated words.
 * For example, 'PostTag' will be converted to 'Post Tag'.
 * @param  name the Buffer to be converted
 * @param  ucwords whether to capitalize the first letter in each word
 * @return Buffer with the resulting words
 */
export function titleCase(name: Buffer, ucwords: boolean = true): Buffer {
    const encoding = detectEncoding(name);
    return Buffer.from(titleCaseString(toString(name, encoding), ucwords), encoding);
}
