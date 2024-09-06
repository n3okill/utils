import { isKind } from "./isKind";

/**
 * Check if argument is RegExp
 * @param arg
 * @returns {boolean}
 */
export function isRegExp(arg: unknown): arg is RegExp {
    return isKind(arg, "RegExp");
}
