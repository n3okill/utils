import { sep as Separator } from "path";
import * as StringUtil from "./string_util.js";

/**
 * Detects buffer enconding
 * This is basic helper that will only detect buffer encoding between `utf8` and `utf16le`
 * @param arg the buffer to detect encoding
 * @returns detected encoding
 */
export function detectEncoding(arg: Buffer): BufferEncoding {
    return arg.lastIndexOf(0) !== -1 ? "utf16le" : "utf8";
}

/**
 * Transforms argument into string
 * @param arg the buffer to transform
 * @param encoding the encoding to be used
 * @returns
 */
export function toString(arg: Buffer, encoding?: BufferEncoding): string {
    if (!encoding) {
        encoding = detectEncoding(arg);
    }
    return arg.toString(encoding);
}

/**
 * @internal
 */
function _toString(arg: string | Buffer): string {
    if (Buffer.isBuffer(arg)) {
        return toString(arg);
    }
    return arg;
}

/**
 * Check if Buffer is empty
 */
export function isEmpty(arg: Buffer): boolean {
    return !toString(arg).length;
}

/**
 * Check if buffer is empty triming withspaces
 */
export function isEmptyOrWithSpace(arg: Buffer): boolean {
    return !toString(trim(arg)).length;
}

/**
 * Repeat a given string or buffer a number of times
 * @param str String or buffer that will be repeated
 * @param n Number of times to repeat the given string
 * @return The given string or buffer repeated n times
 */
export function repeat(str: string | Buffer, n: number): Buffer {
    if (Buffer.isBuffer(str)) {
        const encoding = detectEncoding(str);
        return Buffer.from(StringUtil.repeat(toString(str), n), encoding);
    } else {
        return Buffer.from(StringUtil.repeat(str, n), "utf8");
    }
}

/**
 * Remove given characters from the left side of the buffer
 * @param s Buffer to remove the characters from
 * @param chars The characters to remove if not defined removes empty spaces.
 * @returns Trimmed Buffer
 */
export function trimLeft(s: Buffer, chars: Array<string | Buffer> = []): Buffer {
    const encoding = detectEncoding(s);
    return Buffer.from(
        StringUtil.trimLeft(
            toString(s, encoding),
            chars.map((s) => _toString(s)),
        ),
        encoding,
    );
}

/**
 * Remove given characters from right side of the buffer
 * @param s Buffer to remove the characters from
 * @param chars Characters to remove, if not defined removes empty spaces
 * @returns Trimmed Buffer
 */
export function trimRight(s: Buffer, chars: Array<string | Buffer> = []): Buffer {
    const encoding = detectEncoding(s);
    return Buffer.from(
        StringUtil.trimRight(
            toString(s, encoding),
            chars.map((s) => _toString(s)),
        ),
        encoding,
    );
}

/**
 * Remove given characters from left and right side of the string
 * @param str Buffer to remove characters from
 * @param chars The characters to remove, if not defined removes empty spaces
 * @returns Trimmed Buffer
 */
export function trim(str: Buffer, chars: Array<string | Buffer> = []): Buffer {
    return trimLeft(trimRight(str, chars), chars);
}

/**
 * Replace multiple occurrences in a Buffer
 * @param str
 * @param search `Array<string|RegExp>`
 * @param replace `Array<string | ReplaceFunction> | string | ReplaceFunction`
 * @returns
 */
export function multiReplace(
    str: Buffer,
    search: Array<string | RegExp>,
    replace: Array<string | StringUtil.Replacefunction> | string | StringUtil.Replacefunction,
): Buffer {
    const encoding = detectEncoding(str);
    return Buffer.from(StringUtil.multiReplace(toString(str, encoding), search, replace), encoding);
}

/**
 * Replace items in buffer based on given object
 * Ex: multiReplaceNamed(Buffer.from("Hello %World%!"),{"%World%":"Joe"}) => Hello Joe!
 * @param str Buffer to be replaced
 * @param params Object with items to replace
 * @returns Buffer with items replaced
 */
export function multiReplaceNamed(str: Buffer, params: { [key: string]: unknown }): Buffer {
    const encoding = detectEncoding(str);
    return Buffer.from(StringUtil.multiReplaceNamed(toString(str, encoding), params), encoding);
}

/**
 * Replace items in Buffer based on given object
 * Ex: formatMessage(Buffer.from("Hello {World}!"),{"World":"Joe"}) => Hello Joe!
 * @param str Buffer to be replaced
 * @param params Object with items to replace
 * @returns Buffer with items replaced
 */
export function formatMessage(str: Buffer, params: { [key: string]: unknown }): Buffer {
    const encoding = detectEncoding(str);
    return Buffer.from(StringUtil.formatMessage(toString(str, encoding), params), encoding);
}

/**
 * Pads the current Buffer with a string (repeated, if needed) so that the resulting buffer reaches the given length
 * The padding is applied form the end (right) of the Buffer
 * @param str Buffer to be padded
 * @param length Final size of the Buffer
 * @param padString String to be added to the Buffer
 * @returns Padded Buffer
 */
export function padEnd(str: Buffer, length: number, padString: string = " "): Buffer {
    return pad(str, length, padString, false);
}
/**
 * Pads the current Buffer with a string (repeated, if needed) so that the resulting Buffer reaches the given length
 * The padding is applied form the start (left) of the Buffer
 * @param str Buffer to be padded
 * @param length Final size of the Buffer
 * @param padString String to be added to the Buffer
 * @returns Padded Buffer
 */
export function padStart(str: Buffer, length: number, padString: string = " "): Buffer {
    return pad(str, length, padString, true);
}

/**
 * Pads the current Buffer with string (repeated, if needed) so that the resulting Buffer reaches the given length
 * The padding is applied form the start (left) if "start" is true or the end (right) if is false
 * @param str Buffer to be padded
 * @param length Final size of the Buffer
 * @param padString String to be added to the Buffer
 * @param start Pad from the start of the Buffer or from the end
 * @returns Padded Buffer
 */
export function pad(str: Buffer, length: number, padString = " ", start = true): Buffer {
    const encoding = detectEncoding(str);
    return Buffer.from(StringUtil.pad(toString(str, encoding), length, padString, start), encoding);
}

/**
 * Returns the XOR result of two Buffer's.
 * If the two Buffer's are of different lengths, the shorter one will be padded to the length of the longer one.
 * @param token1
 * @param token2
 * @return the XOR result
 */
export function xorTokens(token1: Buffer, token2: Buffer): Buffer {
    const encoding = detectEncoding(token1);
    return Buffer.from(
        StringUtil.xorTokens(toString(token1, encoding), toString(token2, detectEncoding(token2))),
        encoding,
    );
}

/**
 * Converts a CamelCase name into space-separated words.
 * For example, 'PostTag' will be converted to 'Post Tag'.
 * @param  name the Buffer to be converted
 * @param  ucwords whether to capitalize the first letter in each word
 * @return Buffer with the resulting words
 */
export function titleCase(name: Buffer, ucwords: boolean = true): Buffer {
    const encoding = detectEncoding(name);
    return Buffer.from(StringUtil.titleCase(toString(name, encoding), ucwords), encoding);
}

/**
 * Transforms an object into an array of Buffer's
 * @param  obj Object to be transformed into array of Buffer's
 * @param  separator Separator to be used in Buffer, default to node "path" sep
 */
export function objectToPathBuffer(obj: { [key: string]: unknown }, separator: string = Separator): Buffer[] {
    const result = StringUtil.objectToPathStrings(obj, separator);
    return result.map((s) => Buffer.from(s));
}

/**
 * Transforms an array of Buffers into an object
 * @param str Array of Buffer's to be transformed
 * @param  separator Separator used in Buffer, default to node "path" sep
 */
export function bufferPathToObject(str: Buffer[], separator: string = Separator): { [key: string]: unknown } {
    return StringUtil.stringsPathToObject(
        str.map((s) => toString(s)),
        separator,
    );
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
 * Return an expanded Buffer based on input Buffer and options
 * @param input Buffer
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
    input: Buffer,
    options: IExpandOpts = {
        open: "{",
        close: "}",
        separator: ",",
    },
): Buffer[] {
    const encoding = detectEncoding(input);
    return StringUtil.expand(toString(input, encoding), options).map((s) => Buffer.from(s, encoding));
}

/**
 * Interface that defines the properties of a chunk of balanced data in a string
 */
export interface BalancedDataBuffer {
    start: number;
    end: number;
    body: Buffer;
    pre: Buffer;
    post: Buffer;
}

/**
 * Return a Array<BalancedDataBuffer> mapping the chunks of 'open' and 'close' locations, if input buffer is unbalanced will return empty
 * @param input Buffer
 * @param open string
 * @param close string
 */
export function balancedData(input: Buffer, open: string = "{", close: string = "}"): BalancedDataBuffer[] {
    const encoding = detectEncoding(input);
    return StringUtil.balancedData(toString(input, encoding), open, close).map((s) => ({
        start: s.start,
        end: s.end,
        pre: Buffer.from(s.pre, encoding),
        body: Buffer.from(s.body, encoding),
        post: Buffer.from(s.post, encoding),
    }));
}

/**
 * Return `false` if buffer is unbalanced, or
 * an Array<BalancedDataBuffer> mapping the chunks of 'open' and 'close' locations, if input buffer is unbalanced will return empty
 * @param input
 * @param open
 * @param close
 */
export function balanced(input: Buffer, open: string = "{", close: string = "}"): boolean | number[][] {
    return StringUtil.balanced(toString(input), open, close);
}

/**
 * Check if the number of occurrences of the 'open' string are the same of ths 'close' string in the input string
 * @param input
 * @param open
 * @param close
 * @returns
 */
export function balancedCounter(input: Buffer, open = "{", close = "}"): boolean {
    return StringUtil.balancedCounter(toString(input), open, close);
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
export function isBalanced(input: Buffer, open: string = "{", close: string = "}"): boolean {
    return StringUtil.isBalanced(toString(input), open, close);
}

/**
 * Split a buffer into an array of buffer's based on given separator
 * @param str
 * @param separator
 */
export function split(str: Buffer, separator: string): Buffer[] {
    const encoding = detectEncoding(str);
    return toString(str, encoding)
        .split(separator)
        .map((s) => Buffer.from(s, encoding));
}
