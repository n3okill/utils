import { cloneObject } from "./cloneObject";

/**
 * Deep Clone Object
 * @param arg Object to clone
 * @returns New deep cloned Object
 */
export function deepCloneObject<T>(source: T, transform?: (value: T) => T): T {
    return cloneObject(source, true, transform);
}
