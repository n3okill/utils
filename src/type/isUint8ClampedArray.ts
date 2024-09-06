import { isKind } from "./isKind";

/**
 * Check if argument is Uint8ClampedArray
 * @param arg
 * @returns {boolean}
 */
export function isUint8ClampedArray(arg: unknown): arg is Uint8ClampedArray {
    return isKind(arg, "Uint8ClampedArray");
}
