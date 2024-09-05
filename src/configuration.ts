import * as Type from "./type.js";

/**
 * @internal
 * @ignore
 * @param {Array<string>} names
 * @returns {Array<string>}
 */
function getNameParts(names: Array<string>): Array<string> {
    const parts: Array<string> = [];
    names.forEach((part: string): number | void =>
        part.indexOf(".") === -1 && !Type.isEmpty(part)
            ? part
                  .replace(/\[(\d+)]/g, ".$1")
                  .split(".")
                  .forEach((v: string): number | "" => (v ? parts.push(v) : ""))
            : parts.push(part)
    );
    return parts;
}

/**
 * Return true if a property in the given object is not undefined
 * @param obj Object where to search for the property
 * @param name The name of the property can be on the form "a.b.c[1].d"
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPropertyDefined(obj: any, name: string): boolean {
    return !Type.isUndefined(getProperty(obj, name));
}

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

/**
 * Check if the object has the property
 * @param obj The object to search for the property
 * @param name The name of the property can be on the form "a.b.c[1].d"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasProperty(obj: any, name: string | Array<string>): boolean {
    if (Type.isString(name) && obj && Object.prototype.hasOwnProperty.call(obj, name)) {
        return true;
    }
    const parts: Array<string> = getNameParts(Type.isString(name) ? name.split(".") : name);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let o = obj;
    while (o && parts.length) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        o = o[parts.shift()!];
    }
    return parts.length === 0;
}

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
    if (Type.isString(name) && o && Object.prototype.hasOwnProperty.call(o, name)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
        return o[name];
    }
    const parts: Array<string> = getNameParts(Type.isString(name) ? name.split(".") : name);
    while (o && parts.length) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        o = o[parts.shift()!];
    }
    return parts.length === 0 ? o : defaultValue !== undefined ? defaultValue : undefined;
}

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
    replace: boolean = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let o = obj;
    const parts: Array<string> = getNameParts(Type.isString(name) ? name.split(".") : name);
    const length: number = parts.length;
    if (parts.length > 1) {
        parts.reduce((prev: string, curr: string): string => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
            o[prev] =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
                !Type.isUndefined(o[prev]) ? o[prev] : parseInt(curr).toString() === curr ? [] : {};
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
            Type.isArray(o[parts[length - 1]]))
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        o[parts[length - 1]] = value;
    }
    return obj;
}

/**
 * Remove a property from the object
 * @param obj The object where to remove the property
 * @param {string | Array<string>} name The name of the property can be on the form "a.b.c[1].d"
 * @returns {any} The value of the removed property if defined
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeProperty(obj: any, name: string | Array<string>): any {
    if (Type.isString(name) && obj && Object.prototype.hasOwnProperty.call(obj, name)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
        const value = obj[name];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, security/detect-object-injection
        delete obj[name];
        return value;
    }

    const parts: Array<string> = getNameParts(Type.isString(name) ? name.split(".") : name);
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
