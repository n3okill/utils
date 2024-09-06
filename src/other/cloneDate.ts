import { _checkTransform, TransformFunctionType } from "../_internal";

/**
 * Clone date value
 * @param {Date} arg Date to clone
 * @returns {Date} New cloned Date object
 */
export function cloneDate(origin: Date, transform?: (value: Date) => Date): Date {
    return _checkTransform(new Date(origin.getTime()), transform as TransformFunctionType);
}
