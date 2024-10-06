import { EnumTypes } from "./_types";
import { isArray } from "./isArray";
import { isAsyncFunction } from "./isAsyncFunction";
import { isBigInt } from "./isBigInt";
import { isBoolean } from "./isBoolean";
import { isBuffer } from "./isBuffer";
import { isDate } from "./isDate";
import { isError } from "./isError";
import { isFunction } from "./isFunction";
import { isMap } from "./isMap";
import { isNull } from "./isNull";
import { isNumber } from "./isNumber";
import { isObject } from "./isObject";
import { isPlainObject } from "./isPlainObject";
import { isPromise } from "./isPromise";
import { isRegExp } from "./isRegExp";
import { isSet } from "./isSet";
import { isString } from "./isString";
import { isSymbol } from "./isSymbol";
import { isTypedArray } from "./isTypedArray";
import { isUndefined } from "./isUndefined";

/**
 * Return the Enum value of the type of the argument
 * @param arg
 * @returns {EnumTypes}
 */
export function getEnumType(arg: unknown): EnumTypes {
    if (isArray(arg)) {
        return EnumTypes.Array;
    } else if (isPromise(arg)) {
        return EnumTypes.Promise;
    } else if (isAsyncFunction(arg)) {
        return EnumTypes.AsyncFunction;
    } else if (isBigInt(arg)) {
        return EnumTypes.BigInt;
    } else if (isBoolean(arg)) {
        return EnumTypes.Boolean;
    } else if (isBuffer(arg)) {
        return EnumTypes.Buffer;
    } else if (isDate(arg)) {
        return EnumTypes.Date;
    } else if (isError(arg)) {
        return EnumTypes.Error;
    } else if (isFunction(arg)) {
        return EnumTypes.Function;
    } else if (isMap(arg)) {
        return EnumTypes.Map;
    } else if (isNull(arg)) {
        return EnumTypes.Null;
    } else if (isNumber(arg)) {
        return EnumTypes.Number;
    } else if (isObject(arg)) {
        return EnumTypes.Object;
    } else if (isPlainObject(arg)) {
        return EnumTypes.PlainObject;
    } else if (isRegExp(arg)) {
        return EnumTypes.RegExp;
    } else if (isSet(arg)) {
        return EnumTypes.Set;
    } else if (isString(arg)) {
        return EnumTypes.String;
    } else if (isSymbol(arg)) {
        return EnumTypes.Symbol;
    } else if (isTypedArray(arg)) {
        return EnumTypes.TypedArray;
    } else if (isUndefined(arg)) {
        return EnumTypes.Undefined;
    } else {
        return EnumTypes.NotDefined;
    }
}
