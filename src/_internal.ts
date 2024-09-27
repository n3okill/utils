/**
 * @internal
 */

import { isFunction } from "./type/isFunction";

export type TransformFunctionType = <T>(value: T, key?: unknown) => T;

/**
 * Check if a transformation function should be applied to an object
 * @internal
 * @param value
 * @param transform
 * @param key
 * @returns
 */
export const _checkTransform = <T>(value: T, transform?: TransformFunctionType, key?: unknown): T => {
    return isFunction(transform) ? ((transform as CallableFunction)(value, key) as T) : value;
};
