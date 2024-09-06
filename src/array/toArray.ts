import { isArrayType } from "../type/isArrayType.js";

/**
 * Transforms given argument into array
 * @param arr Argument to be transformed
 * @returns Array of the given argument
 */
export function toArray<T>(arr: Array<T> | T): Array<T> {
    return isArrayType(arr) ? (arr as Array<T>) : [arr];
}
