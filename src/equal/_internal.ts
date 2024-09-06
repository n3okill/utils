import { isArray } from "../type/isArray";
import { isDate } from "../type/isDate";
import { isError } from "../type/isError";
import { isFunctionType } from "../type/isFunctionType";
import { isMap } from "../type/isMap";
import { isNullOrUndefined } from "../type/isNullOrUndefined";
import { isObject } from "../type/isObject";
import { isPrimitive } from "../type/isPrimitive";
import { isRegExp } from "../type/isRegExp";
import { isSet } from "../type/isSet";
import { isTypedArray } from "../type/isTypedArray";
import { equalArray } from "./equalArray";
import { equalDate } from "./equalDate";
import { equalError } from "./equalError";
import { equalFunction } from "./equalFunction";
import { equalMap } from "./equalMap";
import { equalObject } from "./equalObject";
import { equalPrimitive } from "./equalPrimitive";
import { equalRegExp } from "./equalRegExp";
import { equalSet } from "./equalSet";
import { equalTypedArray } from "./equalTypedArray";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EqualFn = (a: any, b: any) => boolean;
type IsType = (a: unknown) => boolean;

export const filterFunction: Array<[IsType, EqualFn]> = [
    [isArray, equalArray],
    [isDate, equalDate],
    [isError, equalError],
    [isFunctionType, equalFunction],
    [isMap, equalMap],
    [isObject, equalObject],
    [isPrimitive, equalPrimitive],
    [isRegExp, equalRegExp],
    [isSet, equalSet],
    [isTypedArray, equalTypedArray],
];


export function _filterFunction(a: unknown, b: unknown): boolean {
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
export function constructorName(arg: unknown): string {
    return isNullOrUndefined(arg) ? "" : (arg as Record<string, unknown>).constructor.name;
}