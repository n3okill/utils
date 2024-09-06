/**
 * Check if argument is Buffer
 * @param arg
 * @returns {boolean}
 */
export function isBuffer(arg: unknown): arg is Buffer {
    return Buffer.isBuffer(arg);
}
