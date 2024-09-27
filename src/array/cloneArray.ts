import { TransformFunctionType } from "../_internal";
import { clone } from "../mixers/clone";

/**
 * Clone given array into new array
 * @param source Original array to be cloned
 * @param deep deep If true will deep clone the array, default: `false`
 * @param transform Function to transform the objects in the array
 * @returns The cloned array
 */
export function cloneArray<T>(source: Array<T>, deep: boolean = false, transform?: (value: T) => T): Array<T> {
    return clone(source as never, deep, transform as TransformFunctionType);
}
