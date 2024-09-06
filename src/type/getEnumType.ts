import { EnumTypes } from "./_types.js";
import { isArray } from "./isArray.js";
import { isAsyncFunction } from "./isAsyncFunction.js";
import { isBigInt } from "./isBigInt.js";
import { isBoolean } from "./isBoolean.js";
import { isBuffer } from "./isBuffer.js";
import { isDate } from "./isDate.js";
import { isError } from "./isError.js";
import { isFunction } from "./isFunction.js";
import { isMap } from "./isMap.js";
import { isNull } from "./isNull.js";
import { isNumber } from "./isNumber.js";
import { isObject } from "./isObject.js";
import { isPlainObject } from "./isPlainObject.js";
import { isPromise } from "./isPromise.js";
import { isRegExp } from "./isRegExp.js";
import { isSet } from "./isSet.js";
import { isString } from "./isString.js";
import { isSymbol } from "./isSymbol.js";
import { isTypedArray } from "./isTypedArray.js";
import { isUndefined } from "./isUndefined.js";


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
