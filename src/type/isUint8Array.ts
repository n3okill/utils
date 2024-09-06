import { isKind } from "./isKind";

/**
 * Check if argument is Uint8Array
 * @param arg
 * @returns {boolean}
 */
export function isUint8Array(arg: unknown): arg is Uint8Array {
    return isKind(arg, "Uint8Array");
}
