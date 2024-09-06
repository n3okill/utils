import { isKind } from "./isKind";

/**
 * Check if argument is function
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(arg: unknown): arg is Function {
    return isKind(arg, "function");
}
