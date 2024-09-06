import { isKind } from "./isKind";

/**
 * Check if argument is Symbol
 * @param arg
 * @returns {boolean}
 */
export function isSymbol(arg: unknown): arg is symbol {
    return isKind(arg, "symbol");
}
