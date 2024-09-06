import { uniqueFilter } from "./uniqueFilter";
import { combine } from "./combine";
import { is } from "../type/is";
import { isFunction } from "../type/isFunction";

/**
 * Combine multiple arrays into a single with unique items based on filter
 * @param arrays Arrays to be combined
 * @param filter The filter function to be applied to arrays, default `Type.is`, `(obj1, obj2)=>boolean`
 * @returns {Array<T>} The combined array
 */
export function combineUniqueFilter<T>(...arrays: Array<Array<T> | T>): Array<T> {
    let comparator = is;
    if (isFunction(arrays[arrays.length - 1])) {
        comparator = arrays.pop() as (arg1: unknown, arg2: unknown) => boolean;
    }
    return uniqueFilter<T>(combine(...arrays), comparator);
}
