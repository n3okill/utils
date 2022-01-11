import { isFunction } from "./type.js";

/**
 * @internal
 */
export type _transformFunctionType = (value: unknown, key?: unknown) => unknown;

/**
 * Check if a transformation function should be applied to an object
 * @internal
 * @param value
 * @param transform
 * @param key
 * @returns
 */
export const _checkTransform = (value: unknown, transform?: _transformFunctionType, key?: unknown): unknown => {
    return isFunction(transform) ? (transform as CallableFunction)(value, key) : value;
};
