import { isKind } from "./isKind";

/**
 * Check if argument is Uint32Array
 * @param arg
 * @returns {boolean}
 */
export function isUint32Array(arg: unknown): arg is Uint32Array {
    return isKind(arg, "Uint32Array");
}
