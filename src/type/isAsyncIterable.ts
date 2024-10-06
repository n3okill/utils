import { isFunction } from "./isFunction";
import { isNullOrUndefined } from "./isNullOrUndefined";

/**
 * Check if argument is AsyncIterable
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAsyncIterable(arg: unknown): arg is AsyncIterable<any> {
    return !isNullOrUndefined(arg) && isFunction((arg as never)[Symbol.asyncIterator]);
}
