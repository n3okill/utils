import { kindOf } from "./kindOf";

/**
 * Check if two arguments are of same type
 * @param arg1
 * @param arg2
 * @returns {boolean}
 */
export function isKindEqual(arg1: unknown, arg2: unknown): boolean {
    return kindOf(arg1).toLowerCase() === kindOf(arg2).toLowerCase();
}
