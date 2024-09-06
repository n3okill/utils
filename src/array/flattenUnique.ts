import { unique } from "./unique";
import { flatten } from "./flatten";

/**
 * Return flattened array with unique items
 * @param args Multiple arrays to be flattened
 * @returns The flattened array
 */
export function flattenUnique<T>(...args: Array<Array<T> | T>): Array<T> {
    return unique(flatten(args) as Array<T>);
}
