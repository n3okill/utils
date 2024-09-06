import { equalPrimitive } from "./equalPrimitive";

/**
 * "Returns true if the two dates are equal."
 *
 * The function signature is:
 * @param {T} a - T, b: U
 * @param {U} b - U
 * @returns A boolean value.
 */
export function equalDate<T extends Date, U extends T>(a: T, b: U): boolean {
    return equalPrimitive(a.getTime(), b.getTime());
}
