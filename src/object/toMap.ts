import { TObject, TObjectKey } from "../type/_types";

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
