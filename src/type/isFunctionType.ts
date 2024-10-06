import { isAsyncFunction } from "./isAsyncFunction";
import { isFunction } from "./isFunction";

/**
 * Check if argument is Function or AsyncFunction
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-function-type
export function isFunctionType(arg: unknown): arg is Function | Promise<any> {
    return isFunction(arg) || isAsyncFunction(arg);
}
