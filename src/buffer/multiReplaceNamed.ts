import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";
import { multiReplaceNamed as multiReplaceNamedString } from "../string/multiReplaceNamed";

/**
 * Replace items in buffer based on given object
 * Ex: multiReplaceNamed(Buffer.from("Hello %World%!"),{"%World%":"Joe"}) => Hello Joe!
 * @param str Buffer to be replaced
 * @param params Object with items to replace
 * @returns Buffer with items replaced
 */
export function multiReplaceNamed(str: Buffer, params: { [key: string]: unknown }): Buffer {
    const encoding = detectEncoding(str);
    return Buffer.from(multiReplaceNamedString(toString(str, encoding), params), encoding);
}
