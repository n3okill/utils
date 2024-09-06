import { isKind } from "./isKind";

/**
 * Check if argument is Float32Array
 * @param arg
 * @returns {boolean}
 */
export function isFloat32Array(arg: unknown): arg is Float32Array {
    return isKind(arg, "Float32Array");
}
