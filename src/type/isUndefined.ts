/**
 * Check if argument is Undefined
 * @param arg
 * @returns {boolean}
 */
export function isUndefined(arg?: unknown): arg is undefined {
    return typeof arg === "undefined";
}
