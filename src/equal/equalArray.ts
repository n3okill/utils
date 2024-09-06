import { equal } from "./equal";

/**
 * "Check if two arrays are equal."
 *
 * The function is generic, meaning that it can be applied to any type of array
 * @param {T} a - T is the type of the array.
 * @param {U} b - U is the type of the array that we're comparing against.
 * @returns `true`
 */
export function equalArray<T extends Array<unknown>, U extends T>(a: T, b: U): boolean {
    if (a.length !== b.length) {
        return false;
    }
    if (a.length === 0) {
        return true;
    }
    let i = a.length;
    do {
        // eslint-disable-next-line security/detect-object-injection
        if (!equal(a[i], b[i])) {
            return false;
        }
    } while (i-- >= 0);
    return true;
}
