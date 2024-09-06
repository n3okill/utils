/**
 * Return a number value from a string or a number
 * @param {number | string} arg
 * @returns {number}
 */
export function toNumeric(arg: number | string): number {
    return parseInt(arg as string, 10) == arg ? parseInt(arg as string, 10) : (arg as string).charCodeAt(0);
}
