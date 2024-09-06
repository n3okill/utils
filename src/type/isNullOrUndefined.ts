import { isNull } from "./isNull";
import { isUndefined } from "./isUndefined";

/**
 * Check if argument is null or undefined
 * @param arg
 * @returns {boolean}
 */
export function isNullOrUndefined(arg: unknown): arg is null | undefined {
    return isNull(arg) || isUndefined(arg);
}
