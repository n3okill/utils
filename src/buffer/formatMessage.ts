import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";
import { formatMessage as formatMessageString } from "../string/formatMessage";

/**
 * Replace items in Buffer based on given object
 * Ex: formatMessage(Buffer.from("Hello {World}!"),{"World":"Joe"}) => Hello Joe!
 * @param str Buffer to be replaced
 * @param params Object with items to replace
 * @returns Buffer with items replaced
 */
export function formatMessage(str: Buffer, params: { [key: string]: unknown }): Buffer {
    const encoding = detectEncoding(str);
    return Buffer.from(formatMessageString(toString(str, encoding), params), encoding);
}
