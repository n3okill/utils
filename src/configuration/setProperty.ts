import { isArray } from "../type/isArray";
import { isString } from "../type/isString";
import { isUndefined } from "../type/isUndefined";
import { getNameParts } from "./_internal";

/**
 * Set a property in an object
 * @param obj The object where to set the property
 * @param {string | Array<string>} name The name of the property can be on the form "a.b.c[1].d"
 * @param value The value to be defined for the property
 * @param {boolean} replace If true will replace the property if it already exists
 * @returns The original object (just for chaining purposes)
 */
export function setProperty(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: any,
    name: string | Array<string>,
    value: unknown,
    replace: boolean = false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let o = obj;
    const parts: Array<string> = getNameParts(isString(name) ? name.split(".") : name);
    const length: number = parts.length;
    if (parts.length > 1) {
        parts.reduce((prev: string, curr: string): string => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
            o[prev] =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
                !isUndefined(o[prev]) ? o[prev] : parseInt(curr).toString() === curr ? [] : {};
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
            o = o[prev];
            return curr;
        });
    }

    if (
        o &&
        ((replace === true && Object.prototype.hasOwnProperty.call(o, parts[length - 1])) ||
            !Object.prototype.hasOwnProperty.call(o, parts[length - 1]) ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            isArray(o[parts[length - 1]]))
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        o[parts[length - 1]] = value;
    }
    return obj;
}
