/* global NodeJS */

import { TypedArrayTypes } from "./_types";
import { kindOf } from "./kindOf";

/**
 * Check if argument is TypedArray
 * @param arg
 * @returns {boolean}
 */
export function isTypedArray(arg: unknown): arg is NodeJS.TypedArray {
    return TypedArrayTypes.map((x) => x.toLowerCase()).indexOf(kindOf(arg).toLowerCase()) !== -1;
}
