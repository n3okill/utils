import { isString } from "../type/isString";
import { getNameParts } from "./_internal";

/**
 * Return the value of a property in the object
 * @param obj The object to search for the property
 * @param {string | Array<string>} name The name of the property can be on the form "a.b.c[1].d"
 * @param defaultValue Default value to be returned if the property don't exist
 * @returns {any} Value of the property or defaultValue
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProperty(obj: any, name: string | Array<string>, defaultValue?: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let o = obj;
    if (isString(name) && o && Object.prototype.hasOwnProperty.call(o, name)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
        return o[name];
    }
    const parts: Array<string> = getNameParts(isString(name) ? name.split(".") : name);
    while (o && parts.length) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        o = o[parts.shift()!];
    }
    return parts.length === 0 ? o : defaultValue !== undefined ? defaultValue : undefined;
}