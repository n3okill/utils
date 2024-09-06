import { Replacefunction, multiReplace as multiReplaceString } from "../string/multiReplace";
import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";

/**
 * Replace multiple occurrences in a Buffer
 * @param str
 * @param search `Array<string|RegExp>`
 * @param replace `Array<string | ReplaceFunction> | string | ReplaceFunction`
 * @returns
 */
export function multiReplace(
    str: Buffer,
    search: Array<string | RegExp>,
    replace: Array<string | Replacefunction> | string | Replacefunction
): Buffer {
    const encoding = detectEncoding(str);
    return Buffer.from(multiReplaceString(toString(str, encoding), search, replace), encoding);
}
