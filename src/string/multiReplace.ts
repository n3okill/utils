import { toArray } from "../array/toArray";
import { isString } from "../type/isString";
import { escapeRegExp } from "./escapeRegExp";
import { toString } from "./toString";

/**
 * Replace existing items in string with new ones
 * @param  str string to replace items
 * @param {(string|RegExp)[]} search Items to be replaced
 * @param {(string|Function)[] | string | Function} replace New items
 * @returns  String with replaced items
 */
export type Replacefunction = (substring: string, ...args: unknown[]) => string;

/**
 * Replace multiple occurrences in a string
 * @param str
 * @param search {Array<string|RegExp>}
 * @param replace {Array<string | ReplaceFunction> | string | ReplaceFunction}
 * @returns
 */
export function multiReplace(
    str: string | null | undefined,
    search: Array<string | RegExp>,
    replace: Array<string | Replacefunction> | string | Replacefunction,
): string {
    const rep: Array<string | Replacefunction> = toArray(replace);
    let s = toString(str);
    if (rep.length !== 1 && rep.length !== search.length) {
        throw new TypeError("Unequal number of search and replace terms.");
    }
    for (let i = 0; i < search.length; i++) {
        const replacement = rep[rep.length !== 1 ? i : 0];
        // eslint-disable-next-line security/detect-object-injection
        if (isString(search[i])) {
            // eslint-disable-next-line security/detect-non-literal-regexp, security/detect-object-injection
            s = s.replace(new RegExp(escapeRegExp(search[i] as string), "g"), replacement as string);
        } else {
            // eslint-disable-next-line security/detect-object-injection
            s = s.replace(search[i], replacement as Replacefunction);
        }
    }
    return s;
}
