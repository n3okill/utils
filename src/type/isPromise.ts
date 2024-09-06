import { isKind } from "./isKind";

/**
 * Check if argument is a Promise
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise(arg: unknown): arg is Promise<any> {
    return isKind(arg, "promise");
}
