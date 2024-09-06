import { TObject } from "../type/_types";

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
