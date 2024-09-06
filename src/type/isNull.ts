/**
 * Check if argument is null
 * @param arg
 * @returns {boolean}
 */
export function isNull(arg: unknown): arg is null {
    return arg === null;
}
