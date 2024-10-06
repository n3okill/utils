import { isFunction } from "./isFunction";
import { isNullOrUndefined } from "./isNullOrUndefined";

/**
 * Check if argument is Iterable
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIterable(arg: unknown): arg is Iterable<any> {
    return !isNullOrUndefined(arg) && isFunction((arg as never)[Symbol.iterator]);
}
