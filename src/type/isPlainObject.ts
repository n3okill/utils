import { isFunction } from "./isFunction.js";
import { isObject } from "./isObject";

/**
 * Check if argument is a plain object
 * @param arg
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPlainObject(arg: unknown): arg is Record<PropertyKey, any> {
    return (
        !!arg &&
        isObject(arg) &&
        isFunction((arg as FunctionConstructor).constructor) &&
        isObject((arg as ObjectConstructor).constructor.prototype) &&
        Object.prototype.hasOwnProperty.call((arg as ObjectConstructor).constructor.prototype, "isPrototypeOf")
    );
}
