import { detectEncoding } from "./detectEncoding";

/**
 * Transforms argument into string
 * @param arg the buffer to transform
 * @param encoding the encoding to be used
 * @returns
 */
export function toString(arg: Buffer, encoding?: BufferEncoding): string {
    if (!encoding) {
        encoding = detectEncoding(arg);
    }
    return arg.toString(encoding);
}
