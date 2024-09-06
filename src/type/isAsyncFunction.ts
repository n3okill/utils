import * as util from "util";
import { isFunction } from "./isFunction";

/**
 * Check if argument is AsyncFunction
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAsyncFunction(arg: unknown): arg is Promise<any> {
    const AsyncFunction = (async () => {
        //empty
    }).constructor;
    if (
        (arg instanceof AsyncFunction && AsyncFunction !== Function) ||
        arg instanceof Promise ||
        ("isAsyncFunction" in util.types && util.types.isAsyncFunction(arg))
    ) {
        return true;
    }
    let promise;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        promise = (arg as CallableFunction)();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        //empty
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return promise && isFunction(promise.then) && promise[Symbol.toStringTag] === "Promise";
}