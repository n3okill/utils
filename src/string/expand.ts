import { rangeFromString } from "../array/rangeFromString";
import { isAlphaSequence } from "../type/isAlphaSequence";
import { isArray } from "../type/isArray";
import { isNumericSequence } from "../type/isNumericSequence";
import { isString } from "../type/isString";
import { BalancedData, balancedData } from "./balancedData";
import { isBalanced } from "./isBalanced";

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
                            if (isNumericSequence(match.body) || isAlphaSequence(match.body)) {
                                toInsert = rangeFromString(match.body).join(options.separator);
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
                    if (isString(result)) {
                        str = str.replace(match.body, result);
                    } else if (isArray(result)) {
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