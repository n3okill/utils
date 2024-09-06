import { isString } from "../type/isString";
import { getNameParts } from "./_internal";

/**
 * Check if the object has the property
 * @param obj The object to search for the property
 * @param name The name of the property can be on the form "a.b.c[1].d"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasProperty(obj: any, name: string | Array<string>): boolean {
    if (isString(name) && obj && Object.prototype.hasOwnProperty.call(obj, name)) {
        return true;
    }
    const parts: Array<string> = getNameParts(isString(name) ? name.split(".") : name);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let o = obj;
    while (o && parts.length) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        o = o[parts.shift()!];
    }
    return parts.length === 0;
}