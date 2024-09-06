import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";
import { expand as expandString } from "../string/expand";


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
    }
): Buffer[] {
    const encoding = detectEncoding(input);
    return expandString(toString(input, encoding), options).map((s) => Buffer.from(s, encoding));
}
