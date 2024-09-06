import { isSequence } from "./isSequence";

/**
 * Check if argument is a numeric sequence of type 1..5 or as defined by regex argument
 * @param arg
 * @param {RegExp} regex
 * @returns {boolean}
 */
export function isNumericSequence(arg: unknown, regex?: RegExp): boolean {
    // eslint-disable-next-line security/detect-unsafe-regex
    return isSequence(arg, regex || /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/);
}
