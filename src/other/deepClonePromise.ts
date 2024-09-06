import { TransformFunctionType } from "../_internal";
import { clone } from "../mixers/clone";

/**
 * Deep Clone promise
 * @param {Promise} source
 * @param {Function} transform
 * @returns {Promise}
 */
export function deepClonePromise<T>(source: Promise<T>, transform?: (value: T) => T): Promise<T> {
    return clone(source, true, transform as TransformFunctionType);
}
