import * as Type from "./type.js";
import * as NodePath from "path";
import * as ArrayUtil from "./array_util.js";

/**
 * @internal
 */
const EncodeHtmlRules: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&#34;",
    "'": "&#39;",
};

/**
 * Transforms argument into string
 * @param arg
 */
export function toString(arg: unknown): string {
    return Type.isString(arg)
        ? arg
        : Type.isNullOrUndefined(arg)
          ? ""
          : Type.isSymbol(arg)
            ? Symbol.prototype.toString.call(arg)
            : (arg as string) + "" === "0" && 1 / (arg as number) === -Infinity
              ? "-0"
              : (arg as string) + "";
}

/**
 * Check if string is empty
 * @param arg
 */
export function isEmpty(arg: string): boolean {
    return !toString(arg).length;
}

/**
 * Check if string is empty triming withspaces
 * @param arg
 */
export function isEmptyOrWithSpace(arg: string): boolean {
    return !trim(toString(arg)).length;
}

/**
 * Repeat a given string a number of times
 * @param str String that will be repeated
 * @param n Number of times to repeat the given string
 * @return The given string repeated n times
 */
export function repeat(str: string, n: number): string {
    let result = "";
    if (n < 1) {
        return "";
    }
    while (n > 0) {
        //Examples of bitwise operators can be seen at
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
        if (n & 1) {
            result += str;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (n >>= 1), (str += str);
    }
    return result;
}

/**
 * Escape RegExp
 * @param  s
 */
export function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Escape html string
 * @param arg
 */
export function escapeHtml(arg: string | undefined | null): string {
    return Type.isNullOrUndefined(arg)
        ? ""
        : // eslint-disable-next-line security/detect-object-injection
          arg.replace(/[&<>'"]/g, (c: string): string => EncodeHtmlRules[c] || c);
}

/**
 * Remove given characters from the left side of the string
 * @param s String to remove the characters from
 * @param chars The characters to remove if not defined removes empty spaces.
 * @returns Trimmed string
 */
export function trimLeft(s: string | null | undefined, chars: string[] = []): string {
    // eslint-disable-next-line security/detect-non-literal-regexp
    return toString(s).replace(chars.length ? new RegExp(`^[${escapeRegExp(chars.join(""))}]+`, "g") : /^\s+/g, "");
}

/**
 * Remove given characters from right side of the string
 * @param s String to remove the characters from
 * @param chars Characters to remove, if not defined removes empty spaces
 * @returns Trimmed string
 */
export function trimRight(s: string | null | undefined, chars: string[] = []): string {
    // eslint-disable-next-line security/detect-non-literal-regexp
    return toString(s).replace(chars.length ? new RegExp(`[${escapeRegExp(chars.join(""))}]+$`, "g") : /\s+$/g, "");
}

/**
 * Remove given characters from left and right side of the string
 * @param str String to remove characters from
 * @param chars The characters to remove, if not defined removes empty spaces
 * @returns Trimmed string
 */
export function trim(str: string | null | undefined, chars?: string[]): string {
    return trimLeft(trimRight(str, chars), chars);
}

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
    const rep: Array<string | Replacefunction> = ArrayUtil.toArray(replace);
    let s = toString(str);
    if (rep.length !== 1 && rep.length !== search.length) {
        throw new TypeError("Unequal number of search and replace terms.");
    }
    for (let i = 0; i < search.length; i++) {
        const replacement = rep[rep.length !== 1 ? i : 0];
        // eslint-disable-next-line security/detect-object-injection
        if (Type.isString(search[i])) {
            // eslint-disable-next-line security/detect-non-literal-regexp, security/detect-object-injection
            s = s.replace(new RegExp(escapeRegExp(search[i] as string), "g"), replacement as string);
        } else {
            // eslint-disable-next-line security/detect-object-injection
            s = s.replace(search[i], replacement as Replacefunction);
        }
    }
    return s;
}

/**
 * Replace items in string based on given object
 * Ex: multiReplaceNamed("Hello %World%!",{"%World%":"Joe"}) => Hello Joe!
 * @param  str String to be replaced
 * @param  params Object with items to replace
 * @returns  String with items replaced
 */
export function multiReplaceNamed(str: string, params: { [key: string]: unknown }): string {
    let s = toString(str);
    for (const key of Object.keys(params)) {
        // eslint-disable-next-line security/detect-non-literal-regexp
        const reg = new RegExp(`${key}`, "g");
        // eslint-disable-next-line security/detect-object-injection
        s = s.replace(reg, params[key] as string);
    }
    return s;
}

/**
 * Replace items in string based on given object
 * Ex: formatMessage("Hello {World}!",{"World":"Joe"}) => Hello Joe!
 * @param  str String to be replaced
 * @param  params Object with items to replace
 * @returns  String with items replaced
 */
export function formatMessage(str: string, params: { [key: string]: unknown }): string {
    let s = toString(str);
    for (const key of Object.keys(params)) {
        // eslint-disable-next-line security/detect-non-literal-regexp
        const reg = new RegExp(`{${key}}`, "g");
        // eslint-disable-next-line security/detect-object-injection
        s = s.replace(reg, params[key] as string);
    }
    return s;
}

/**
 * Pads the current string with another string (repeated, if needed) so that the resulting string reaches the given length
 * The padding is applied form the end (right) of the string
 * @param  str string to be padded
 * @param  length Final size of the string
 * @param  padString String to be added to the string
 * @returns  Padded string
 */
export function padEnd(str: string, length: number, padString: string = " "): string {
    return pad(str, length, padString, false);
}

/**
 * Pads the current string with another string (repeated, if needed) so that the resulting string reaches the given length
 * The padding is applied form the start (left) of the string
 * @param  str string to be padded
 * @param  length Final size of the string
 * @param  padString String to be added to the string
 * @returns  Padded string
 */
export function padStart(str: string, length: number, padString: string = " "): string {
    return pad(str, length, padString, true);
}

/**
 * Pads the current string with another string (repeated, if needed) so that the resulting string reaches the given length
 * The padding is applied form the start (left) if "start" is true or the end (right) if is false
 * @param  str
 * @param  str string to be padded
 * @param  length Final size of the string
 * @param  padString String to be added to the string
 * @param  start Pad from the start of the string or from the end
 * @returns  Padded string
 */
export function pad(str: string, length: number, padString = " ", start = true): string {
    length = length >> 0;
    if (str.length > length) {
        return str;
    } else {
        length = length - str.length;
        if (length > padString.length) {
            padString += padString.repeat(length / padString.length);
        }
        if (start) {
            return str + padString.slice(0, length);
        } else {
            return padString.slice(0, length) + str;
        }
    }
}

/**
 * Returns the XOR result of two strings.
 * If the two strings are of different lengths, the shorter one will be padded to the length of the longer one.
 * @param  token1
 * @param  token2
 * @return  the XOR result
 */
export function xorTokens(token1: string, token2: string): string {
    let xor = "";
    if (token1.length > token2.length) {
        token2 = padEnd(token2, token1.length, token2);
    } else if (token1.length < token2.length) {
        token1 = padEnd(token1, token2.length, token1.length === 0 ? " " : token1);
    }
    for (let i = 0; i < token1.length && i < token2.length; i++) {
        xor += String.fromCharCode(token1.charCodeAt(i) ^ token2.charCodeAt(i));
    }
    return xor;
}

/**
 * Converts a CamelCase name into space-separated words.
 * For example, 'PostTag' will be converted to 'Post Tag'.
 * @param  name the string to be converted
 * @param  ucwords whether to capitalize the first letter in each word
 * @return  the resulting words
 */
export function titleCase(name: string, ucwords: boolean = true): string {
    let str = toString(name);

    str = str.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
    return ucwords
        ? str.replace(/([ -_.]|^)(.)/g, function (allMatches, firstMatch, secondMatch: string): string {
              return (firstMatch ? " " : "") + secondMatch.toUpperCase();
          })
        : str;
}

/**
 * Transforms an object into an array of strings
 * @param  obj Object to be transformed into array of strings
 * @param  separator Separator to be used in string, default to node "path" sep
 * @returns
 */
export function objectToPathStrings(obj: { [key: string]: unknown }, separator: string = NodePath.sep): string[] {
    const res: string[] = [];

    function reduce(path: string, input: { [key: string]: unknown }): void {
        Object.keys(input).forEach((key: string): void => {
            const p = path ? path + separator + key : key;
            // eslint-disable-next-line security/detect-object-injection
            if (Type.isObject(input[key]) && Object.keys(input[key]).length > 0) {
                // eslint-disable-next-line security/detect-object-injection
                reduce(p, input[key] as { [key: string]: unknown });
            } else {
                res.push(p);
            }
        });
    }

    reduce("", obj);

    return res;
}

/**
 * Transforms an array of strings into an object
 * @param  str Array of strings to be transformed
 * @param  separator Separator used in string, default to node "path" sep
 * @returns
 */
export function stringsPathToObject(str: string[], separator: string = NodePath.sep): { [key: string]: unknown } {
    const res: Record<string, unknown> = {};

    str.forEach((s: string): void => {
        const parts = s.split(separator);
        let o: { [key: string]: unknown } = res;
        parts.forEach((p: string): void => {
            // eslint-disable-next-line security/detect-object-injection
            o[p] = o[p] !== undefined ? o[p] : {};
            // eslint-disable-next-line security/detect-object-injection
            o = o[p] as { [key: string]: unknown };
        });
    });

    return res;
}

/**
 * Options for string expand
 */
export interface IExpandOpts {
    open?: string;
    close?: string;
    separator?: string;
}

/**
 * Return an expanded string based on input string and options
 * @param input
 * @param options {IExpandOpts}
 * @returns
 *
 * Examples:
 *
 * expand("{1..3}") => ["1","2","3"]
 * expand("{a..c}") => ["a","b","c"]
 * expand("a{b..d}g{1..3}z") => ["abg1z", "abg2z", "abg3z", "acg1z", "acg2z", "acg3z", "adg1z", "adg2z", "adg3z"]
 * expand("{a,b{1..3},c}") => ["a", "b1", "b2", "b3", "c"]
 * expand("{{A..Z},{a..z}}") => ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
 * expand("a{d,c,b}e") => ["ade", "ace", "abe"]
 * expand("a{1..2}b{2..3}c") => ["a1b2c", "a1b3c", "a2b2c", "a2b3c"]
 * expand("{3..-2}") => ["3", "2", "1", "0", "-1", "-2"]
 *
 * For more examples check the tests
 */
export function expand(
    input: string,
    options: IExpandOpts = {
        open: "{",
        close: "}",
        separator: ",",
    },
): string[] {
    if (!isBalanced(input, options.open, options.close)) {
        return [];
    }

    const matches = balancedData(input, options.open, options.close); //(balancedData(input, options.open, options.close) ?? []) as BalancedData[];
    if (matches.length === 0) {
        return [input];
    } else {
        let str = input;
        matches.forEach((match: BalancedData): void => {
            if (match.pre.charAt(match.pre.length - 1) !== "$") {
                if (match.body.indexOf(",") === -1) {
                    str = str.replace(
                        `${options.open as string}${match.body}${options.close as string}`,
                        (): string => {
                            let toInsert = "";
                            if (Type.isNumericSequence(match.body) || Type.isAlphaSequence(match.body)) {
                                toInsert = ArrayUtil.rangeFromString(match.body).join(options.separator);
                            } else {
                                toInsert = match.body;
                            }
                            return /\.\./.test(match.body)
                                ? `${options.open as string}${toInsert}${options.close as string}`
                                : toInsert;
                        },
                    );
                }
            }
        });
        if (str.indexOf(options.open as string) === -1 && str.indexOf(options.close as string) === -1) {
            return [str];
        }

        const normalizeNestedOptions = function (str: string): string | string[] {
            const matches = balancedData(str, options.open as string, options.close as string); //(balancedData(str, options.open as string, options.close as string) ?? []) as BalancedData[];
            if (matches.length === 0) {
                if (str.indexOf(",") !== -1) {
                    return str.split(",");
                } else {
                    return str;
                }
            } else {
                matches.forEach((match: BalancedData): void => {
                    let result = normalizeNestedOptions(match.body);
                    if (Type.isString(result)) {
                        str = str.replace(match.body, result);
                    } else if (Type.isArray(result)) {
                        const pre = match.pre.split(",");
                        const p: string = pre.pop() as string;
                        result = result.map((val: string): string => p + val);
                        str = str.replace(
                            `${p}${options.open as string}${match.body}${options.close as string}`,
                            result.join(","),
                        );
                    }
                });
            }
            return str;
        };

        let matches2 = balancedData(str, options.open as string, options.close as string); //(balancedData(str, options.open as string, options.close as string) ?? []) as BalancedData[];
        matches2.forEach((m: BalancedData): void => {
            str = str.replace(m.body, normalizeNestedOptions(m.body) as string);
        });
        let result = [str];
        matches2 = balancedData(str, options.open as string, options.close as string); //(balancedData(str, options.open as string, options.close as string) ?? []) as BalancedData[];
        matches2.forEach((m: BalancedData): void => {
            const tempResult: string[] = [];
            result.forEach((s: string): void => {
                if (m.pre.charAt(m.pre.length - 1) === "$") {
                    tempResult.push(s);
                } else {
                    m.body.split(",").forEach((a: string): void => {
                        tempResult.push(
                            s.replace(`${options.open as string}${m.body}${options.close as string}`, (): string => {
                                return /\.\./.test(m.body)
                                    ? `${options.open as string}${m.body}${options.close as string}`
                                    : a;
                            }),
                        );
                    });
                }
            });
            result = tempResult;
        });

        return result;
    }
}

/**
 * Interface that defines the properties of a chunk of balanced data in a string
 */
export interface BalancedData {
    start: number;
    end: number;
    body: string;
    pre: string;
    post: string;
}

/**
 * @internal
 * @param input
 * @param open
 * @param close
 * @returns
 */
function getBalanced(input: string, open = "{", close = "}"): boolean | number[][] {
    const openLength = open.length;
    const closeLength = close.length;
    if (!balancedCounter(input, open, close)) {
        return false;
    }
    const opens: number[] = [];
    const closes: number[] = [];
    const matches: number[][] = [];
    let openI = input.indexOf(open);
    while (openI !== -1) {
        opens.push(openI);
        openI = input.indexOf(open, openI + openLength);
    }
    while (opens.length) {
        const openI = opens.pop();
        let closeI = input.indexOf(close, (openI as number) + openLength);
        while (closes.indexOf(closeI) !== -1) {
            closeI = input.indexOf(close, closeI + closeLength);
        }
        if (closeI === -1) {
            return false;
        }
        closes.push(closeI);
        matches.push([openI as number, closeI]);
    }

    return matches.reverse();
}

/**
 * Return 'false' if input string is unbalanced, otherwise returns an array mapping the chunks of 'open' and 'close' locations
 * @param input
 * @param open
 * @param close
 * @returns {boolean | BalancedData[]}
 */
export function balancedData(input: string, open: string = "{", close: string = "}"): /*boolean |*/ BalancedData[] {
    const b = balanced(input, open, close);
    if (Type.isArray(b)) {
        return b.map((a: number[]): BalancedData => {
            return {
                start: a[0],
                end: a[1],
                body: input.slice(a[0] + open.length, a[1]),
                pre: input.slice(0, a[0]),
                post: input.slice(a[1] + close.length),
            };
        });
    }
    return []; //false;
}

/**
 * Returns 'false' if input string is unbalanced and an array of an array of numbers defining the begging and end of 'open' and 'close' strings
 * @param input
 * @param open
 * @param close
 * @returns {boolean | number[][]}
 */
export function balanced(input: string, open: string = "{", close: string = "}"): boolean | number[][] {
    return getBalanced(input, open, close);
}

/**
 * Check if the number of occurrences of the 'open' string are the same of ths 'close' string in the input string
 * @param input
 * @param open
 * @param close
 * @returns
 */
export function balancedCounter(input: string, open = "{", close = "}"): boolean {
    //Can't use regexp.exec because of the "g" flag
    // eslint-disable-next-line security/detect-non-literal-regexp
    const openNumber = (input.match(new RegExp(escapeRegExp(open), "g")) || []).length;
    // eslint-disable-next-line security/detect-non-literal-regexp
    const closeNumber = (input.match(new RegExp(escapeRegExp(close), "g")) || []).length;
    return openNumber === closeNumber;
}

/**
 * Check for a balanced use of 'open' and 'close' strings
 *
 * Examples:
 *
 *  input: "{hello} world"
 *  open: "{"
 *  close: "}"
 *  result: true
 *
 *
 *  input: "hello} world"
 *  open: "{"
 *  close: "}"
 *  result: false
 * @param input
 * @param open
 * @param close
 * @returns
 */
export function isBalanced(input: string, open: string = "{", close: string = "}"): boolean {
    return getBalanced(input, open, close) !== false;
}
