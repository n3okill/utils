import { _checkTransform, TransformFunctionType } from "../_internal";

/**
 * Clone Error
 * @param {Error} arg Error to clone
 * @returns {Error} New cloned Error object
 */
export function cloneError(origin: Error, transform?: (value: Error) => Error): Error {
    return _checkTransform(
        Reflect.construct(origin.constructor, [origin.message]) as Error,
        transform as TransformFunctionType
    );
}
