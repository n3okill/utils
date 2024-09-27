import { isUndefined } from "../type/isUndefined";
import { getProperty } from "./getProperty";

/**
 * Return true if a property in the given object is not undefined
 * @param obj Object where to search for the property
 * @param name The name of the property can be on the form "a.b.c[1].d"
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPropertyDefined(obj: any, name: string): boolean {
    return !isUndefined(getProperty(obj, name));
}
