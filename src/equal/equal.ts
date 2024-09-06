import { _filterFunction, constructorName } from "./_internal";

/**
 * "Given two objects of the same type, return true if they are equal."
 *
 * The function is generic, meaning it can be used with any type
 * @param {T} a - The first object to compare.
 * @param {U} b - U extends T
 * @returns A boolean value.
 */
export function equal<T, U extends T>(a: T, b: U): boolean {
    if (constructorName(a) !== constructorName(b)) {
        return false;
    }
    return _filterFunction(a, b);
}
