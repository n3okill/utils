import { isKind } from "./isKind";

/**
 * Check if argument is Map
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMap(arg: unknown): arg is Map<any, any> {
    return isKind(arg, "map");
}
