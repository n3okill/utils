import { equalPrimitive } from "./equalPrimitive";

/**
 * Given two regular expressions, return true if they are equal.
 * @param {T} a - T, b: U
 * @param {U} b - U is the type of the second parameter.
 * @returns `true`
 */
export function equalRegExp<T extends RegExp, U extends T>(a: T, b: U): boolean {
    return equalPrimitive(a.toString(), b.toString());
}
