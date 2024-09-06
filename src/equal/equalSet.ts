import { equalArray } from "./equalArray";

/**
 * Given two sets, return true if they contain the same elements.
 * @param {T} a - The first set.
 * @param {U} b - U is the type of the second set.
 * @returns The result of the equality check.
 */
export function equalSet<T extends Set<unknown>, U extends T>(a: T, b: U): boolean {
    return equalArray(Array.from(a), Array.from(b));
}
