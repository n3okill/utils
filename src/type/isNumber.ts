import { isKind } from "./isKind";

/**
 * Check if argument is Number
 * @param arg
 * @returns {boolean}
 */
export function isNumber(arg: unknown): arg is number {
    return isKind(arg, "number");
}
