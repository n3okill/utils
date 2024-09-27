import { isKind } from "./isKind";

/**
 * Check if argument is Int8Array
 * @param arg
 * @returns {boolean}
 */
export function isInt8Array(arg: unknown): arg is Int8Array {
    return isKind(arg, "Int8Array");
}
