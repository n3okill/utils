import { isSequence } from "./isSequence";


/**
 * Check if argument is a alpha sequence of type a..z or as defined by regex argument
 * @param arg
 * @param {RegExp} regex
 * @returns {boolean}
 */
export function isAlphaSequence(arg: unknown, regex?: RegExp): boolean {
    // eslint-disable-next-line security/detect-unsafe-regex
    return isSequence(arg, regex || /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/);
}
