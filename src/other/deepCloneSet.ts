import { TransformFunctionType } from "../_internal";
import { clone } from "../mixers/clone";

/**
 * Deep clone Set
 * @param {Set} source
 * @param {Function} transform
 * @returns {Set}
 */
export function deepCloneSet<U, T extends Set<U>>(source: T, transform?: (value: U) => U): T {
    return clone(source, true, transform as TransformFunctionType);
}
