import { TransformFunctionType } from "../_internal";
import { clone } from "../mixers/clone";

/**
 * Clone promise
 * @param {Promise} source
 * @param {Function} transform
 * @returns {Promise}
 */
export function clonePromise<T>(source: Promise<T>, transform?: (value: T) => T): Promise<T> {
    return clone(source, false, transform as TransformFunctionType);
}
