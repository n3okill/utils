import { isKind } from "./isKind";

/**
 * Check if argument is Uint16Array
 * @param arg
 * @returns {boolean}
 */
export function isUint16Array(arg: unknown): arg is Uint16Array {
    return isKind(arg, "Uint16Array");
}
