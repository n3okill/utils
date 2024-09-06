import { isPropertyDefined } from "./isPropertyDefined";

/**
 * Throws an error if property is not defined in the given object
 * @param obj Object where to search for the property
 * @param name The name of the property can be on the form "a.b.c[1].d"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPropertyDefinedWithThrow(obj: any, name: string): void {
    if (!isPropertyDefined(obj, name)) {
        throw new TypeError(`'${name}' property is not defined.`);
    }
}
