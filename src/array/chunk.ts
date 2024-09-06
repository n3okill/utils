import { isNumber } from "../type/isNumber";
import { toArray } from "./toArray";

/**
 * Return an array with original array divided in chunks
 * @param arr Original array
 * @param size Size of each chunk
 * @returns An array containing the chunks of the source array
 */
export function chunk<T>(arr: T | Array<T>, size: number): Array<Array<T>> {
    const source: Array<T> = toArray(arr);
    const target: Array<Array<T>> = [];
    if (!isNumber(size) || size < 1) {
        throw new TypeError("'size' argument must be a number bigger than '0'");
    }
    const length = source.length;
    for (let i = 0; i < length; i += size) {
        const a = i + size <= length ? i + size : length;
        target.push(source.slice(i, a));
    }
    return target;
}