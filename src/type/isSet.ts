import { isKind } from "./isKind";

/**
 * Check if argument is Set
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSet(arg: unknown): arg is Set<any> {
    return isKind(arg, "set");
}
