import { TObject } from "../type/_types";
import { isObject } from "../type/isObject";

/**
 * Check if an object is empty
 * @param  arg
 * @returns {boolean}
 */
export function isEmpty(arg: TObject): boolean {
    return isObject(arg) && !Object.keys(arg).length;
}
