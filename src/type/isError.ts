import { isKind } from "./isKind";

/**
 * Check if argument is Error
 * @param arg
 * @returns {boolean}
 */
export function isError(arg: unknown): arg is Error {
    return isKind(arg, "error");
}
