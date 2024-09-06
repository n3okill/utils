import { _checkTransform, TransformFunctionType } from "../_internal";
import { TypedArrayConstructor } from "../type/_types";

/**
 * Clone a TypedArray
 * @param {TypedArray} origin
 * @param {Function} transform
 * @returns {TypedArray}
 */
export function cloneTypedArray<T>(origin: NodeJS.TypedArray, transform?: (value: T) => T): NodeJS.TypedArray {
    return _checkTransform(
        new ((origin as unknown as NodeJS.TypedArray).constructor as TypedArrayConstructor)(
            origin.buffer,
            origin.byteOffset,
            origin.length
        ),
        transform as TransformFunctionType
    );
}
