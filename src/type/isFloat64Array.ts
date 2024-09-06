import { isKind } from "./isKind";

/**
 * Check if argument is Float64Array
 * @param arg
 * @returns {boolean}
 */
export function isFloat64Array(arg: unknown): arg is Float64Array {
    return isKind(arg, "Float64Array");
}
