import { _checkTransform, TransformFunctionType } from "../_internal";

/**
 * Clone a primitive value
 * @param {boolean | string | number} origin
 * @param {Function} transform
 * @returns {boolean | string | number}
 */
export function clonePrimitive(
    origin: boolean | string | number,
    transform?: (value: string | number | boolean) => string | number | boolean,
): boolean | string | number {
    return _checkTransform(
        new (origin.constructor as ObjectConstructor)(origin).valueOf() as string | number | boolean,
        transform as TransformFunctionType,
    );
}
