import { TObject, TObjectKey, isObject } from "./type.js";
import { _transformFunctionType } from "./_internal.js";
import * as Mixers from "./mixers.js";

/**
 * Check if an object is empty
 * @param  arg
 * @returns {boolean}
 */
export function isEmpty(arg: TObject): boolean {
    return isObject(arg) && !Object.keys(arg).length;
}

/**
 * Clone Object
 * @param arg Object to clone
 * @returns New cloned Object
 */
export function cloneObject<T>(source: T, deep: boolean = false, transform?: (value: T) => T): T {
    return Mixers.clone(source, deep, transform as _transformFunctionType);
}

/**
 * Deep Clone Object
 * @param arg Object to clone
 * @returns New deep cloned Object
 */
export function deepCloneObject<T>(source: T, transform?: (value: T) => T): T {
    return cloneObject(source, true, transform);
}

/**
 * Transforms Map into Object
 * @param map Map to transform
 * @returns The object resultant from the Map
 */
export function fromMap(map: Map<unknown, unknown>): TObject {
    const obj: TObject = {};
    for (const [key, val] of map) {
        obj[key as string] = val;
    }
    return obj;
}

/**
 * Transform object to Map
 * @param obj The object to transform
 * @returns Map from the object
 */
export function toMap(obj: TObject = {}): Map<unknown, unknown> {
    const map = new Map<unknown, unknown>();
    const o: TObject = obj;
    Object.keys(o).forEach((key: TObjectKey): void => {
        map.set(key, o[key as string]);
    });
    return map;
}
