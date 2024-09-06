import { cloneArray } from "./cloneArray";

/**
 * Deep Clone given array into new array
 * @param source Original array to be cloned
 * @param transform Function to transform the objects in the array
 * @returns The cloned array
 */
export function deepCloneArray<T>(source: Array<T>, transform?: (value: T) => T): Array<T> {
    return cloneArray(source, true, transform);
}
