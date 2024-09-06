import { TransformFunctionType } from "../_internal";
import { clone } from "../mixers/clone";

/**
 * Clone Object
 * @param arg Object to clone
 * @returns New cloned Object
 */
export function cloneObject<T>(source: T, deep: boolean = false, transform?: (value: T) => T): T {
    return clone(source, deep, transform as TransformFunctionType);
}
