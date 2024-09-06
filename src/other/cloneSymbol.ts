import { _checkTransform, TransformFunctionType } from "../_internal";

/**
 * Clone a symbol
 * @param {Symbol} origin
 * @param {Function} transform
 * @returns {Symbol}
 */
export function cloneSymbol(origin: symbol, transform?: (value: symbol) => symbol): symbol {
    return _checkTransform(Object(Symbol.prototype.valueOf.call(origin)) as symbol, transform as TransformFunctionType);
}
