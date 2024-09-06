import { isKind } from "./isKind";


/**
 * Check if argument is an array
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArray(arg: unknown): arg is Array<any> {
    return Array.isArray ? Array.isArray(arg) : isKind(arg, "array");
}
