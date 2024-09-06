import { isFunction } from "./isFunction.js";
import { isNullOrUndefined } from "./isNullOrUndefined.js";

/**
 * Check if argument is Iterable
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIterable(arg: unknown): arg is Iterable<any> {
    return !isNullOrUndefined(arg) && isFunction((arg as never)[Symbol.iterator]);
}
