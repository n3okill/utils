import { isNullOrUndefined } from "./isNullOrUndefined";
import { isKind } from "./isKind";

/**
 * Check if argument is Object
 * @param arg
 * @returns {boolean}
 */
export function isObject(arg: unknown): arg is object {
    return !isNullOrUndefined(arg) && isKind(arg, "object");
}
