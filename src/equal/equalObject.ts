import { equal } from "./equal";

/**
 * It checks if two objects have the same keys and values
 * @param {T} a - The first object to compare.
 * @param {U} b - The object to compare against.
 * @returns The return value is `true` if the two objects are equal, `false` otherwise.
 */
export function equalObject<T extends Record<PropertyKey, unknown>, U extends T>(a: T, b: U): boolean {
    const aEntries = [...Object.getOwnPropertyNames(a), ...Object.getOwnPropertySymbols(a)];
    const bEntries = [...Object.getOwnPropertyNames(b), ...Object.getOwnPropertySymbols(b)];

    if (aEntries.length !== bEntries.length) {
        return false;
    }

    for (let i = 0; i < aEntries.length; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const key = aEntries[i];
        if (bEntries.indexOf(key) === -1) {
            return false;
        }
        // eslint-disable-next-line security/detect-object-injection
        if (!equal(a[key], b[key])) {
            return false;
        }
    }
    return true;
}
