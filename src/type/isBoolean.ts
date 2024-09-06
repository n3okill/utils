import { isKind } from "./isKind";

/**
 * Check if argument is Boolean
 * @param arg
 * @returns {boolean}
 */
export function isBoolean(arg: unknown): arg is boolean {
    return isKind(arg, "boolean");
}
