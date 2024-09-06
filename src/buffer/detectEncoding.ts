/**
 * Detects buffer enconding
 * This is basic helper that will only detect buffer encoding between `utf8` and `utf16le`
 * @param arg the buffer to detect encoding
 * @returns detected encoding
 */
export function detectEncoding(arg: Buffer): BufferEncoding {
    return arg.lastIndexOf(0) !== -1 ? "utf16le" : "utf8";
}
