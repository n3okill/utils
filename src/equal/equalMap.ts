import { equal } from "./equal";

/**
 * Check if two maps have the same keys and values.
 * @param {T} a - The first map.
 * @param {U} b - The map to compare to a.
 * @returns `true`
 */
export function equalMap<T extends Map<unknown, unknown>, U extends T>(a: T, b: U): boolean {
    if (a.size !== b.size) {
        return false;
    }
    if (a.size === 0) {
        return true;
    }

    for (const [key, value] of a) {
        let found = false;
        for (const [bKey, bValue] of b) {
            if (equal(key, bKey)) {
                found = true;
                if (!equal(value, bValue)) {
                    return false;
                }
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}
