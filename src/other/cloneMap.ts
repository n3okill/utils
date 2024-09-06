import { TransformFunctionType } from "../_internal";
import { clone } from "../mixers/clone";


/**
 * Clone map
 * @param {Map} origin
 * @param {Function} transform
 * @returns {Map}
 */
export function cloneMap<K, V>(origin: Map<K, V>, transform?: (value: V, key: K) => V): Map<K, V> {
    return clone(origin, false, transform as TransformFunctionType);
}
