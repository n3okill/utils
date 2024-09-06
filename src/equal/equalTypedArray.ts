import { equal } from "./equal";

/**
 * If the two arrays are of the same length, and they have the same number of elements, then the
 * elements of the two arrays are compared. If they are all equal, then the two arrays are equal
 * @param {T} a - The first array to compare.
 * @param {T} b - The array to compare to a.
 */
export function equalTypedArray<T extends NodeJS.TypedArray>(a: T, b: T) {
    if (a.length !== b.length) {
        return false;
    }
    if (a.length === 0) {
        return true;
    }
    for (let i = 0; i < a.length; i++) {
        // eslint-disable-next-line security/detect-object-injection
        if (!equal(a[i], b[i])) {
            return false;
        }
    }
    return true;
}
