import { toString } from "../string/toString";

/**
 * Check if argument is a sequence based on given regexp
 * @param arg
 * @param {RegExp} regex
 * @returns {boolean}
 */
export function isSequence(arg: unknown, regex: RegExp): boolean {
    return regex.test(toString(arg));
}
