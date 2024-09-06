import { isKind } from "./isKind";

/**
 * Check if argument is String
 * @param arg
 * @returns {boolean}
 */
export function isString(arg: unknown): arg is string {
    return isKind(arg, "string");
}
