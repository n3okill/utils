import { isKind } from "./isKind";

/**
 * Check if argument is Int16Array
 * @param arg
 * @returns {boolean}
 */
export function isInt16Array(arg: unknown): arg is Int16Array {
    return isKind(arg, "Int16Array");
}
