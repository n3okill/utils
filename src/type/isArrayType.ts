/* global NodeJS */

import { isArray } from "./isArray.js";
import { isTypedArray } from "./isTypedArray.js";


/**
 * Check if argument is Array or TypedArray
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArrayType(arg: unknown): arg is Array<any> | NodeJS.TypedArray {
    return isArray(arg) || isTypedArray(arg);
}
