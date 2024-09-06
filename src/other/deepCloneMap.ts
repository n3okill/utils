import { TransformFunctionType } from "../_internal";
import { clone } from "../mixers/clone";

/**
 * Deep clone Map
 * @param {Map} origin
 * @param {Function} transform
 * @returns {Map}
 */
export function deepCloneMap<K, V>(origin: Map<K, V>, transform?: (value: V, key: K) => V): Map<K, V> {
    return clone(origin, true, transform as TransformFunctionType);
}
