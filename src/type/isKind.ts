import { kindOf } from "./kindOf";

/**
 * Check if argument is of the kind
 * @param arg
 * @param {string} kind Kind to match the type
 * @returns {boolean}
 */
export function isKind(arg: unknown, kind: string): boolean {
    return kindOf(arg).toLowerCase() === kind.toLowerCase();
}
