import * as Type from "./type.js";
import * as Mixers from "./mixers.js";
import * as NumberUtil from "./number_util.js";
import { _transformFunctionType } from "./_internal.js";

/**
 * @internal
 * @param {Array<Array<T> | T>} arr
 * @param {Array<T>} result
 * @returns {Array<T>}
 * @private
 */
function _flat<T>(arr: (Array<T> | T)[], result: Array<T>): Array<T> {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const current: T | Array<T> = arr[i];
        Array.isArray(current) ? _flat(current, result) : result.push(current);
    }
    return result;
}

/**
 * Return an array with original array divided in chunks
 * @param arr Original array
 * @param size Size of each chunk
 * @returns An array containing the chunks of the source array
 */
export function chunk<T>(arr: T | Array<T>, size: number): Array<Array<T>> {
    const source: Array<T> = toArray(arr);
    const target: Array<Array<T>> = [];
    if (!Type.isNumber(size) || size < 1) {
        throw new TypeError("'size' argument must be a number bigger than '0'");
    }
    const length = source.length;
    for (let i = 0; i < length; i += size) {
        const a = i + size <= length ? i + size : length;
        target.push(source.slice(i, a));
    }
    return target;
}

/**
 * Clone given array into new array
 * @param source Original array to be cloned
 * @param deep deep If true will deep clone the array, default: `false`
 * @param transform Function to transform the objects in the array
 * @returns The cloned array
 */
export function cloneArray<T>(source: Array<T>, deep: boolean = false, transform?: (value: T) => T): Array<T> {
    return Mixers.clone(source as never, deep, transform as _transformFunctionType);
}

/**
 * Deep Clone given array into new array
 * @param source Original array to be cloned
 * @param transform Function to transform the objects in the array
 * @returns The cloned array
 */
export function deepCloneArray<T>(source: Array<T>, transform?: (value: T) => T): Array<T> {
    return cloneArray(source, true, transform);
}

/**
 * Combine multiple arrays into a single one
 * @param arrays The arrays to be combined
 * @returns Combined array
 */
export function combine<T>(...arrays: Array<Array<T> | T>): Array<T> {
    const target: Array<T> = [];
    for (const arr of arrays) {
        if (Array.isArray(arr)) {
            for (const a of arr) {
                target.push(a);
            }
        } else {
            target.push(arr);
        }
    }
    return target;
}

/**
 * Combine multiple arrays into a single one with unique items
 * @param arrays Array to be combined
 * @returns The combined array with inly unique items
 */
export function combineUnique<T>(...arrays: Array<Array<T> | T>): Array<T> {
    return unique(combine(...arrays));
}

/**
 * Combine multiple arrays into a single with unique items based on filter
 * @param arrays Arrays to be combined
 * @param filter The filter function to be applied to arrays, default `Type.is`, `(obj1, obj2)=>boolean`
 * @returns {Array<T>} The combined array
 */
export function combineUniqueFilter<T>(...arrays: Array<Array<T> | T | unknown>): Array<T> {
    let comparator = Type.is;
    if (Type.isFunction(arrays[arrays.length - 1])) {
        comparator = arrays.pop() as (arg1: unknown, arg2: unknown) => boolean;
    }
    return uniqueFilter<T>(combine(...arrays) as Array<T>, comparator);
}

/**
 * Check if array contains the item
 * @param arr The array to search
 * @param item The item to be searched
 * @returns Return `true` if the array contains the item
 */
export function contains<T>(arr: Array<T> = [], item: T): boolean {
    return arr.indexOf(item) !== -1;
}

/**
 * Delete the item at the given array index
 * @param arr Array where index will be removed
 * @param index The index to remove
 * @returns Array with index removed
 */
export function delIndex<T>(arr: Array<T>, index: number): Array<T> {
    const length = arr.length;
    if (index < length && index > 0) {
        for (let i = index + 1; i < length; i++) {
            // eslint-disable-next-line security/detect-object-injection
            arr[i - 1] = arr[i];
        }
        arr.pop();
    }
    return arr;
}

/**
 * Delete all instances of the given item from the array
 * @param arr Array where item will be removed from
 * @param elem The item to remove
 * @param number Number of times that item should be removed (default: `-1` - remove all instances of item)
 * @returns The array with item removed
 */
export function delItem<T>(arr: Array<T>, elem: T, number: number = -1): Array<T> {
    let length = arr.length;
    for (let i = 0; i < length && (number > 0 || number < 0); i++) {
        // eslint-disable-next-line security/detect-object-injection
        const cur = arr[i];
        if (cur === elem) {
            delIndex(arr, i);
            i--;
            length--;
            number--;
        }
    }
    return arr;
}

/**
 * Return the difference between arrays (all the items that appear only once in the first array)
 * @param arr The first array
 * @param args Other arrays to compare
 * @returns The resulting array with the diff items
 */
export function diff<T>(arr: Array<T>, ...args: Array<Array<T> | T>): Array<T> {
    const target: Array<T> = [];
    const arrLength = arr.length;
    const argsLength = args.length;
    for (let i = 0; i < arrLength; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const elem = arr[i];
        let hasElem = false;
        for (let j = 0; j < argsLength; j++) {
            // eslint-disable-next-line security/detect-object-injection
            const current: Array<T> | T = args[j];
            if (Type.isArrayType(current)) {
                const curLength = current.length;
                for (let c = 0; c < curLength; c++) {
                    // eslint-disable-next-line security/detect-object-injection
                    if (elem === current[c]) {
                        hasElem = true;
                        c = curLength;
                        j = argsLength;
                    }
                }
            }
        }
        if (!hasElem) {
            target.push(elem);
        }
    }
    return target;
}

/**
 * Return flattened array from the given arrays
 * @param args Multiple arrays to be flattened
 * @returns The flattened array
 */
export function flatten<T>(...args: Array<Array<T> | T>): Array<T> {
    return _flat(args, []);
}

/**
 * Return flattened array with unique items
 * @param args Multiple arrays to be flattened
 * @returns The flattened array
 */
export function flattenUnique<T>(...args: Array<Array<T> | T>): Array<T> {
    return unique(flatten(args) as Array<T>);
}

/**
 * Return the intersection between arrays
 * @param args Multiple arrays to intersect
 * @returns The intersection of the multiple arrays
 */
export function intersect<T>(...args: Array<Array<T>>): Array<T> {
    const target: Array<T> = [];
    const arrs = args.filter(Type.isArrayType);
    const arrsLength = arrs.length;
    let shortest = 0;
    let shortestLength = arrs[0].length;
    for (let i = 0; i < arrsLength; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const n = arrs[i].length;
        if (n < shortestLength) {
            shortest = i;
            shortestLength = n;
        }
    }
    // eslint-disable-next-line security/detect-object-injection
    const shortestArr = arrs[shortest];
    const first = arrs[0];

    for (let i = 0; i < first.length; i++) {
        let hasElem = false;
        // eslint-disable-next-line security/detect-object-injection
        const elem = first[i];
        for (let j = 0; j < shortestLength; j++) {
            // eslint-disable-next-line security/detect-object-injection
            if (elem === shortestArr[j]) {
                hasElem = true;
                break;
            }
        }
        if (hasElem) {
            for (let j = 1; j < arrsLength; j++) {
                if (j !== shortest) {
                    hasElem = false;
                    // eslint-disable-next-line security/detect-object-injection
                    const current = arrs[j];
                    const currentLength = current.length;
                    for (let c = 0; c < currentLength; c++) {
                        // eslint-disable-next-line security/detect-object-injection
                        if (elem === current[c]) {
                            hasElem = true;
                            break;
                        }
                    }
                    if (!hasElem) {
                        break;
                    }
                }
            }
            if (hasElem) {
                if (target.indexOf(elem) === -1) {
                    target.push(elem);
                }
            }
        }
    }
    return target;
}

/**
 * Check if array is Empty
 * @param arg Array to check
 * @returns `true` if source array is empty
 */
export function isEmpty(arg: Array<unknown>): boolean {
    return !arg.length;
}

/**
 * Return an array with a range from a string
 * @param str string with the form '1..6..2' or 'a..f'
 * @returns returns an array of strings
 */
export function rangeFromString(str: string): Array<number | string> {
    const parts = str.split(/\.\./);
    const increment = parts.length === 3 ? Math.abs(NumberUtil.toNumeric(parts[2])) : 1;
    if (!Type.isNumericSequence(str) && !Type.isAlphaSequence(str)) {
        throw new TypeError("Sequence is invalid.");
    }
    return rangeString(parts[0], parts[1], increment);
}

/**
 * @param {number} start
 * @param {number} end
 * @param {number} step
 * @returns {Array<number>}
 * @internal
 */
function rangeNumber(start: number, end: number, step: number = 1): Array<number> {
    const result: Array<number> = [];
    const isReverse = end < start;
    if (isReverse) {
        step *= -1;
    }
    for (let i = start; isReverse ? i >= end : i <= end; i += step) {
        result.push(i);
    }
    return result;
}

/**
 *
 * @param {string} start
 * @param {string} end
 * @param {number} step
 * @returns {Array<string>}
 * @internal
 */
function rangeString(start: string, end: string, step: number = 1): Array<string> {
    const result: Array<string> = [];
    const s = NumberUtil.toNumeric(start);
    const e = NumberUtil.toNumeric(end);
    const isNumeric = Type.isNumeric(start);
    const max = Math.max(start.length, end.length);
    const reg = /^-?0\d/;
    const pad = reg.test(start) || reg.test(end);
    const isReverse = e < s;
    if (isReverse) {
        step *= -1;
    }

    for (let i = s; isReverse ? i >= e : i <= e; i += step) {
        let val: string;
        if (isNumeric) {
            val = String(i);
            if (pad) {
                const need = max - val.length;
                if (need > 0) {
                    const z = new Array(need + 1).join("0");
                    if (i < 0) {
                        val = `-${z}${val.slice(1)}`;
                    } else {
                        val = z + val;
                    }
                }
            }
        } else {
            val = String.fromCharCode(i);
        }
        result.push(val);
    }
    return result;
}

/**
 * Return an array with a range of string or number values
 * @param start First value of the range
 * @param end Last value of range
 * @param step Stepping between values
 * @returns Array with the range based on entered values
 */
export function range(start: number | string, end: number | string, step: number = 1): Array<number | string> {
    if (Type.isString(start) && Type.isString(end)) {
        return rangeString(start, end, step);
    } else if (Type.isNumber(start) && Type.isNumber(end)) {
        return rangeNumber(start, end, step);
    } else {
        return [];
    }
}

/**
 * Transforms given argument into array
 * @param arr Argument to be transformed
 * @returns Array of the given argument
 */
export function toArray<T>(arr: Array<T> | T): Array<T> {
    return Type.isArrayType(arr) ? arr : [arr];
}

/**
 * Transforms argument into Map
 * @param arg Argument to be transformed into Map
 * @returns Resulting Map from argument given or undefined if the argument is not Object, Array or Map
 */
export function toMap(
    arg: Type.TObject | Array<[unknown, unknown]> | Map<unknown, unknown>
): Map<unknown, unknown> | undefined {
    return Type.isMap(arg)
        ? arg
        : Type.isObject(arg)
        ? // eslint-disable-next-line security/detect-object-injection
          new Map(Object.keys(arg).map((k): [unknown, unknown] => [k, (arg as { [key: string]: unknown })[k]]))
        : Type.isArray(arg)
        ? new Map(arg as Array<[unknown, unknown]>)
        : undefined;
}

/**
 * Return unique elements from an array
 * @param arr
 */
export function unique<T>(arr: Array<T>): Array<T> {
    const target: Array<T> = [];
    const arrLength = arr.length;
    for (let i = 0; i < arrLength; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const elem = arr[i];
        if (target.indexOf(elem) === -1) {
            target.push(elem);
        }
    }
    return target;
}

/**
 * Returns a reduced array based on given comparator (if none given, will use `Type.is`)
 * @param arr Array to be reduced
 * @param comparator comparator function to use `(arg1, arg2)=>boolean`
 * @returns
 */
export function uniqueFilter<T>(arr: Array<T>, comparator: (arg1: T, arg2: T) => boolean = Type.is): Array<T> {
    return arr.reduce<Array<T>>((prev: Array<T>, curr: T): [] => {
        const a = prev.filter((itemPrev: T): boolean => comparator(curr, itemPrev));
        if (!a.length) {
            prev.push(curr);
        }
        return prev as [];
    }, []);
}
