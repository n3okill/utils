import { clone } from "../mixers/clone";

/**
 * Clone Set
 * @param {Set} source
 * @param {Function} transform
 * @returns {Set}
 */
export function cloneSet<T extends Set<U>, U>(source: T, transform?: (value: U) => U): T {
    return clone(source as never, false, transform as <U>(value: U) => U) as unknown as T;
}
