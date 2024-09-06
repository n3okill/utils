import { unique } from "./unique";
import { combine } from "./combine";

/**
 * Combine multiple arrays into a single one with unique items
 * @param arrays Array to be combined
 * @returns The combined array with inly unique items
 */
export function combineUnique<T>(...arrays: Array<Array<T> | T>): Array<T> {
    return unique(combine(...arrays));
}
