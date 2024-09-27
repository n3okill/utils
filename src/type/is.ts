/**
 * Check if to arguments are equal "==="
 * @param arg1
 * @param arg2
 * @returns {boolean}
 */
export function is(arg1: unknown, arg2: unknown): boolean {
    return Object.is ? Object.is(arg1, arg2) : arg1 === arg2;
}
