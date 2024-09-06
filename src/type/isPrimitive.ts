import { isBigInt } from "./isBigInt.js";
import { isBoolean } from "./isBoolean.js";
import { isNullOrUndefined } from "./isNullOrUndefined";
import { isNumber } from "./isNumber";
import { isSymbol } from "./isSymbol.js";
import { isString } from "./isString.js";
import { Primitive } from "./_types.js";

/**
 * Check if argument is of primitive type
 * @param arg
 * @returns {boolean}
 */
export function isPrimitive(arg: unknown): arg is Primitive {
    return isBigInt(arg) || isBoolean(arg) || isNumber(arg) || isString(arg) || isSymbol(arg) || isNullOrUndefined(arg); //["string", "number", "boolean"].indexOf(typeof arg) !== -1 ? true : isNullOrUndefined(arg);
}
