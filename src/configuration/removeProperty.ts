import { isString } from "../type/isString";
import { getNameParts } from "./_internal";

/**
 * Remove a property from the object
 * @param obj The object where to remove the property
 * @param {string | Array<string>} name The name of the property can be on the form "a.b.c[1].d"
 * @returns {any} The value of the removed property if defined
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeProperty(obj: any, name: string | Array<string>): any {
    if (isString(name) && obj && Object.prototype.hasOwnProperty.call(obj, name)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
        const value = obj[name];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
        delete obj[name];
        return value;
    }

    const parts: Array<string> = getNameParts(isString(name) ? name.split(".") : name);
    const last: string = parts.pop() as string;
    while (obj && parts.length) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        obj = obj[parts.shift() as string];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, security/detect-object-injection
    const value = obj[last];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
    delete obj[last];
    return value;
}
