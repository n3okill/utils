import { isKind } from "./isKind";

/**
 * Check if argument is Int32Array
 * @param arg
 * @returns {boolean}
 */
export function isInt32Array(arg: unknown): arg is Int32Array {
    return isKind(arg, "Int32Array");
}
