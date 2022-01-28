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

function constructorName(arg: unknown): string {
    return Type.isNullOrUndefined(arg) ? "" : (arg as Record<string, unknown>).constructor.name;
}

export function equal<T, U extends T>(a: T, b: U): boolean {
    if (constructorName(a) !== constructorName(b)) {
        return false;
    }
    return _filterFunction(a, b);
}

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

export function equalDate<T extends Date, U extends T>(a: T, b: U): boolean {
    return equalPrimitive(a.getTime(), b.getTime());
}

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

// eslint-disable-next-line @typescript-eslint/ban-types
export function equalFunction<T extends Function, U extends T>(a: T, b: U): boolean {
    return equalPrimitive(a.toString(), b.toString());
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function equalInstance<T, U extends T>(obj: Function, a: T, b: U): boolean {
    return a instanceof obj && b instanceof obj;
}

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

export function equalPrimitive<T extends Type.Primitive, U extends T>(a: T, b: U): boolean {
    return Object.is(a, b) || a === b;
}

export function equalRegExp<T extends RegExp, U extends T>(a: T, b: U): boolean {
    return equalPrimitive(a.toString(), b.toString());
}

export function equalSet<T extends Set<unknown>, U extends T>(a: T, b: U): boolean {
    return equalArray(Array.from(a), Array.from(b));
}

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
