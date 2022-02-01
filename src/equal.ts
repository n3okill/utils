import * as Type from "./type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EqualFn = (a: any, b: any) => boolean;
type IsType = (a: unknown) => boolean;

const filterFunction: Array<[IsType, EqualFn]> = [
    [Type.isArray, equalArray],
    [Type.isDate, equalDate],
    [Type.isError, equalError],
    [Type.isFunctionType, equalFunction],
    [Type.isMap, equalMap],
    [Type.isObject, equalObject],
    [Type.isPrimitive, equalPrimitive],
    [Type.isRegExp, equalRegExp],
    [Type.isSet, equalSet],
    [Type.isTypedArray, equalTypedArray],
];

function _filterFunction(a: unknown, b: unknown): boolean {
    for (const [_is, _equal] of filterFunction) {
        if (_is(a) && _is(b)) {
            return _equal(a, b);
        }
    }
    return false;
}

/**
 * Returns the name of the constructor of the argument if it is an object, otherwise returns an empty
 * string
 * @param {unknown} arg - unknown
 * @returns The name of the constructor of the argument.
 */
function constructorName(arg: unknown): string {
    return Type.isNullOrUndefined(arg) ? "" : (arg as Record<string, unknown>).constructor.name;
}

/**
 * "Given two objects of the same type, return true if they are equal."
 * 
 * The function is generic, meaning it can be used with any type
 * @param {T} a - The first object to compare.
 * @param {U} b - U extends T
 * @returns A boolean value.
 */
export function equal<T, U extends T>(a: T, b: U): boolean {
    if (constructorName(a) !== constructorName(b)) {
        return false;
    }
    return _filterFunction(a, b);
}

/**
 * "Check if two arrays are equal."
 * 
 * The function is generic, meaning that it can be applied to any type of array
 * @param {T} a - T is the type of the array.
 * @param {U} b - U is the type of the array that we're comparing against.
 * @returns `true`
 */
export function equalArray<T extends Array<unknown>, U extends T>(a: T, b: U): boolean {
    if (a.length !== b.length) {
        return false;
    }
    if (a.length === 0) {
        return true;
    }
    for (let i = 0; i < a.length; i++) {
        if (!equal(a[i], b[i])) {
            return false;
        }
    }
    return true;
}

/**
 * "Returns true if the two dates are equal."
 * 
 * The function signature is:
 * @param {T} a - T, b: U
 * @param {U} b - U
 * @returns A boolean value.
 */
export function equalDate<T extends Date, U extends T>(a: T, b: U): boolean {
    return equalPrimitive(a.getTime(), b.getTime());
}

/**
 * If the two errors are of the same type, and have the same message, then they are equal
 * @param {T} a - The first error to compare.
 * @param {U} b - The error to compare against.
 * @returns The result of the function call.
 */
export function equalError<T extends Error, U extends T>(a: T, b: U): boolean {
    if (a.message !== b.message) {
        return false;
    }
    const errorConstructors = [EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError];
    if (errorConstructors.some((constructor) => equalInstance(constructor, a, b))) {
        return true;
    }
    return constructorName(a) === constructorName(b);
}

/**
 * Check if two functions are equal.
 * @param {T} a - T, b: U
 * @param {U} b - U is the type of the second parameter.
 * @returns A boolean value.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function equalFunction<T extends Function, U extends T>(a: T, b: U): boolean {
    return equalPrimitive(a.toString(), b.toString());
}

/**
 * Check if two objects are instances of the same class.
 * @param {Function} obj - Function - The constructor of the object you want to compare.
 * @param {T} a - T
 * @param {U} b - U extends T
 * @returns true
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function equalInstance<T, U extends T>(obj: Function, a: T, b: U): boolean {
    return a instanceof obj && b instanceof obj;
}

/**
 * Check if two maps have the same keys and values.
 * @param {T} a - The first map.
 * @param {U} b - The map to compare to a.
 * @returns `true`
 */
export function equalMap<T extends Map<unknown, unknown>, U extends T>(a: T, b: U): boolean {
    if (a.size !== b.size) {
        return false;
    }
    if (a.size === 0) {
        return true;
    }

    for (const [key, value] of a) {
        let found = false;
        for (const [bKey, bValue] of b) {
            if (equal(key, bKey)) {
                found = true;
                if (!equal(value, bValue)) {
                    return false;
                }
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}

/**
 * It checks if two objects have the same keys and values
 * @param {T} a - The first object to compare.
 * @param {U} b - The object to compare against.
 * @returns The return value is `true` if the two objects are equal, `false` otherwise.
 */
export function equalObject<T extends Record<PropertyKey, unknown>, U extends T>(a: T, b: U): boolean {
    const aEntries = [...Object.getOwnPropertyNames(a), ...Object.getOwnPropertySymbols(a)];
    const bEntries = [...Object.getOwnPropertyNames(b), ...Object.getOwnPropertySymbols(b)];

    if (aEntries.length !== bEntries.length) {
        return false;
    }

    for (let i = 0; i < aEntries.length; i++) {
        const key = aEntries[i];
        if (bEntries.indexOf(key) === -1) {
            return false;
        }
        if (!equal(a[key], b[key])) {
            return false;
        }
    }
    return true;
}

/**
 * Check if two values are equal, or if they are both the same primitive type.
 * @param {T} a - Type.Primitive
 * @param {U} b - Type.Primitive
 * @returns A boolean value.
 */
export function equalPrimitive<T extends Type.Primitive, U extends T>(a: T, b: U): boolean {
    return Object.is(a, b) || a === b;
}

/**
 * Given two regular expressions, return true if they are equal.
 * @param {T} a - T, b: U
 * @param {U} b - U is the type of the second parameter.
 * @returns `true`
 */
export function equalRegExp<T extends RegExp, U extends T>(a: T, b: U): boolean {
    return equalPrimitive(a.toString(), b.toString());
}

/**
 * Given two sets, return true if they contain the same elements.
 * @param {T} a - The first set.
 * @param {U} b - U is the type of the second set.
 * @returns The result of the equality check.
 */
export function equalSet<T extends Set<unknown>, U extends T>(a: T, b: U): boolean {
    return equalArray(Array.from(a), Array.from(b));
}

/**
 * If the two arrays are of the same length, and they have the same number of elements, then the
 * elements of the two arrays are compared. If they are all equal, then the two arrays are equal
 * @param {T} a - The first array to compare.
 * @param {T} b - The array to compare to a.
 */
export function equalTypedArray<T extends NodeJS.TypedArray>(a: T, b: T) {
    if (a.length !== b.length) {
        return false;
    }
    if (a.length === 0) {
        return true;
    }
    for (let i = 0; i < a.length; i++) {
        if (!equal(a[i],b[i])) {
            return false;
        }
    }
    return true;
}
