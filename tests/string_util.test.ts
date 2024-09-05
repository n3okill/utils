import { describe, test, expect } from "@jest/globals";
import * as StringUtil from "../src/string_util";

describe("Utilities", (): void => {
    describe("> String", (): void => {
        describe("> toString", (): void => {
            //TODO: isEmpty, isEmptyOrWithspace
            test("should return string unchanged", (): void => {
                expect(StringUtil.toString("")).toBe("");
                expect(StringUtil.toString("test")).toBe("test");
            });
            test("should return number as string", (): void => {
                expect(StringUtil.toString(0)).toBe("0");
                expect(StringUtil.toString(10)).toBe("10");
            });
            test("should return boolean as string", (): void => {
                expect(StringUtil.toString(false)).toBe("false");
                expect(StringUtil.toString(true)).toBe("true");
            });
            test("should treat nullish values as empty strings", (): void => {
                // eslint-disable-next-line no-sparse-arrays
                [, null, undefined].forEach((v): void => expect(StringUtil.toString(v)).toBe(""));
            });
            test("should preserve sign of `0`", (): void => {
                const values = [0, Object(0), -0, Object(-0)],
                    expected = ["0", "0", "-0", "-0"];
                // eslint-disable-next-line security/detect-object-injection
                values.forEach((v, i): void => expect(StringUtil.toString(v)).toBe(expected[i]));
            });
            test("should not error on symbols", (): void => {
                expect(StringUtil.toString(Symbol("a"))).toBe("Symbol(a)");
            });
            test("should return the `toString` result of the wrapped value", (): void => {
                expect(StringUtil.toString([1, 2, 3])).toBe("1,2,3");
            });
        });
        describe("repeat", (): void => {
            test("should repeat a string", (): void => {
                expect(StringUtil.repeat("a", 5)).toBe("aaaaa");
            });
        });
        describe("> trimLeft", (): void => {
            test("should remove whitespaces from begin of string", (): void => {
                const str = "   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ";
                expect(StringUtil.trimLeft(str)).toBe("lorem  ipsum    \t \t  \t\t  ");
            });
            test("should remove specified chars from begin of string", (): void => {
                 
                const str = "-+-*test*-+-";
                const chars = ["-", "+", "*", "\\"];
                expect(StringUtil.trimLeft(str, chars)).toBe("test*-+-");
            });
            test("should treat null as empty string", (): void => {
                expect(StringUtil.trimLeft(null)).toBe("");
            });
            test("should treat undefined as empty string", (): void => {
                expect(StringUtil.trimLeft(void 0)).toBe("");
            });
        });
        describe("> trimRight", (): void => {
            test("should remove whitespaces from end of string", (): void => {
                const str = "   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ";
                expect(StringUtil.trimRight(str)).toBe("   \t \t \t\t     lorem  ipsum");
            });
            test("should remove specified chars from end of string", (): void => {
                 
                const str = "-+-*test*-+-";
                const chars = ["-", "+", "*", "\\"];
                expect(StringUtil.trimRight(str, chars)).toBe("-+-*test");
            });
            test("should treat null as empty string", (): void => {
                expect(StringUtil.trimRight(null)).toBe("");
            });
            test("should treat undefined as empty string", (): void => {
                expect(StringUtil.trimRight(void 0)).toBe("");
            });
        });
        describe("> trim", (): void => {
            test("should remove whitespaces from begin and end of string", (): void => {
                const str = "   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ";
                expect(StringUtil.trim(str)).toBe("lorem  ipsum");
            });
            test("should remove specified chars from begin and end of string", (): void => {
                const str = "-+-*test*-+-";
                const chars = ["-", "+", "*"];
                expect(StringUtil.trim(str, chars)).toBe("test");
            });
            test("should treat null as empty string", (): void => {
                expect(StringUtil.trim(null)).toBe("");
            });
            test("should treat undefined as empty string", (): void => {
                expect(StringUtil.trim(void 0)).toBe("");
            });
        });
        describe("> multiReplace", (): void => {
            test("should replace single string", (): void => {
                expect(StringUtil.multiReplace("test foo", ["foo"], "result")).toBe("test result");
            });
            test("should replace multiple searches with single string", (): void => {
                expect(StringUtil.multiReplace("test one two one", ["one", "two"], "n")).toBe("test n n n");
            });
            test("should replace multiple searches with multiple strings", (): void => {
                expect(StringUtil.multiReplace("test one two", ["one", "two"], ["1", "2"])).toBe("test 1 2");
            });
            test("should replace with regexp", (): void => {
                expect(StringUtil.multiReplace("test 1 2", [/\d+/g], "n")).toBe("test n n");
            });
            test("should replace with function replacer", (): void => {
                function replaceNum(m: string): string {
                    return (+m * +m) as unknown as string;
                }

                function replaceLetter(m: string): string {
                    return m.charCodeAt(0) as unknown as string;
                }

                expect(StringUtil.multiReplace("1 2 3 a", [/\d+/g, /[a-z]/g], [replaceNum, replaceLetter])).toBe(
                    "1 4 9 97"
                );
            });
            test("should treat null as empty string", (): void => {
                expect(StringUtil.multiReplace(null, ["a"], "b")).toBe("");
            });
            test("should treat undefined as empty string", (): void => {
                expect(StringUtil.multiReplace(void 0, ["a"], "b")).toBe("");
            });
            test("should replace all elements without breaking", (): void => {
                 
                expect(StringUtil.multiReplace(".abc.2.1", ["."], ["."])).toBe(".abc.2.1");
            });
        });
        describe("> objectToPathStrings", (): void => {
            test("simple object", (): void => {
                expect(StringUtil.objectToPathStrings({ a: { b: {} } }, "/")).toEqual(["a/b"]);
            });
            test("complex object", (): void => {
                expect(
                    StringUtil.objectToPathStrings(
                        {
                            a: {
                                b: { c: {}, d: {} },
                                e: {},
                            },
                        },
                        "/"
                    )
                ).toEqual(["a/b/c", "a/b/d", "a/e"]);
            });
        });
        describe("> stringsPathToObject", (): void => {
            test("simple path", (): void => {
                expect(StringUtil.stringsPathToObject(["a/b"], "/")).toEqual({ a: { b: {} } });
            });
            test("complex path", (): void => {
                expect(StringUtil.stringsPathToObject(["a/b/c", "a/b/d", "a/e"], "/")).toEqual({
                    a: {
                        b: { c: {}, d: {} },
                        e: {},
                    },
                });
            });
        });
        describe("> BalancedCounter", (): void => {
            test("empty", (): void => {
                expect(StringUtil.balancedCounter("")).toBeTruthy();
            });
            test("simple", (): void => {
                expect(StringUtil.balancedCounter("a{b}")).toBeTruthy();
                expect(StringUtil.balancedCounter("a{b")).toBeFalsy();
            });
            test("complex", (): void => {
                expect(StringUtil.balancedCounter("a{b{c}}")).toBeTruthy();
                expect(StringUtil.balancedCounter("a{b{c{d}}")).toBeFalsy();
            });
        });
        describe("> Balanced", (): void => {
            test("empty", (): void => {
                expect(StringUtil.balanced("")).toEqual([]);
            });
            test("simple", (): void => {
                expect(StringUtil.balanced("ab")).toEqual([]);
                expect(StringUtil.balanced("a{b")).toBeFalsy();
                expect(StringUtil.balanced("a}{b")).toBeFalsy();
                expect(StringUtil.balanced("a}{{b}")).toBeFalsy();
                expect(StringUtil.balanced("a{b}")).toEqual([[1, 3]]);
            });
            test("complex", (): void => {
                expect(StringUtil.balanced("a{b{c}")).toBeFalsy();
                expect(StringUtil.balanced("a{b{c}}")).toEqual([
                    [1, 6],
                    [3, 5],
                ]);
                expect(StringUtil.balanced("a{b{c{d}}}")).toEqual([
                    [1, 9],
                    [3, 8],
                    [5, 7],
                ]);
            });
            test("complex, different options", (): void => {
                expect(StringUtil.balanced("a<%b<%c<%d%>%>%>", "<%", "%>")).toEqual([
                    [1, 14],
                    [4, 12],
                    [7, 10],
                ]);
            });
        });
        describe("> IsBalanced", (): void => {
            test("empty", (): void => {
                expect(StringUtil.isBalanced("")).toBeTruthy();
            });
            test("simple", (): void => {
                expect(StringUtil.isBalanced("a{b")).toBeFalsy();
                expect(StringUtil.isBalanced("a}{b")).toBeFalsy();
                expect(StringUtil.isBalanced("a}{{b}")).toBeFalsy();
                expect(StringUtil.isBalanced("a{b}")).toBeTruthy();
            });
            test("complex", (): void => {
                expect(StringUtil.isBalanced("a{b{c}")).toBeFalsy();
                expect(StringUtil.isBalanced("a{b{c}}")).toBeTruthy();
                expect(StringUtil.isBalanced("a{b{c{d}}}")).toBeTruthy();
            });
            test("complex, different options", (): void => {
                expect(StringUtil.isBalanced("a<%b<%c<%d%>%>%>", "<%", "%>")).toBeTruthy();
            });
            test("other", (): void => {
                expect(StringUtil.isBalanced("pre{in{nest}}post")).toBeTruthy();
                expect(StringUtil.isBalanced("{{{{{{{{{in}post")).toBeFalsy();
                expect(StringUtil.isBalanced("pre{body{in}post")).toBeFalsy();
                expect(StringUtil.isBalanced("pre{in}po}st")).toBeFalsy();
                expect(StringUtil.isBalanced("pre}{in{nest}}post")).toBeFalsy();
                expect(StringUtil.isBalanced("pre{body}between{body2}post")).toBeTruthy();
                expect(StringUtil.isBalanced("nope")).toBeTruthy();
                expect(StringUtil.isBalanced("pre<b>in<b>nest</b></b>post", "<b>", "</b>")).toBeTruthy();
                expect(StringUtil.isBalanced("pre</b><b>in<b>nest</b></b>post", "<b>", "</b>")).toBeFalsy();
                expect(StringUtil.isBalanced("pre{{{in}}}post", "{{", "}}")).toBeTruthy();
                expect(StringUtil.isBalanced("pre{{{in}}}post", "{{{", "}}")).toBeTruthy();
                expect(StringUtil.isBalanced("pre{{first}in{second}post")).toBeFalsy();
                expect(StringUtil.isBalanced("pre<?>post", "<?", "?>")).toBeFalsy();
            });
        });
        describe("> Expand", (): void => {
            test("empty", (): void => {
                expect(StringUtil.expand("")).toEqual([""]);
            });
            test("simple", (): void => {
                expect(StringUtil.expand("a{b}c")).toEqual(["abc"]);
            });
            test("empty option", (): void => {
                expect(StringUtil.expand("-v{,,,,}")).toEqual(["-v", "-v", "-v", "-v", "-v"]);
            });
            test("increment", (): void => {
                expect(StringUtil.expand("{1..3}")).toEqual(["1", "2", "3"]);
                expect(StringUtil.expand("{3..1}")).toEqual(["3", "2", "1"]);
                expect(StringUtil.expand("{10..8}")).toEqual(["10", "9", "8"]);
                expect(StringUtil.expand("{10..08}")).toEqual(["10", "09", "08"]);
                expect(StringUtil.expand("{a..c}")).toEqual(["a", "b", "c"]);
                expect(StringUtil.expand("{c..a}")).toEqual(["c", "b", "a"]);
                expect(StringUtil.expand("{4..0..2}")).toEqual(["4", "2", "0"]);
                expect(StringUtil.expand("{4..0..-2}")).toEqual(["4", "2", "0"]);
                expect(StringUtil.expand("{e..a..2}")).toEqual(["e", "c", "a"]);
                expect(StringUtil.expand("a{b..d}g{1..3}z")).toEqual([
                    "abg1z",
                    "abg2z",
                    "abg3z",
                    "acg1z",
                    "acg2z",
                    "acg3z",
                    "adg1z",
                    "adg2z",
                    "adg3z",
                ]);
            });
            test("nested", (): void => {
                expect(StringUtil.expand("ppp{,config,oe{,conf}}")).toEqual(["ppp", "pppconfig", "pppoe", "pppoeconf"]);
                expect(StringUtil.expand("{a,b{1..3},c}")).toEqual(["a", "b1", "b2", "b3", "c"]);
                expect(StringUtil.expand("{{A..Z},{a..z}}")).toEqual(
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
                );
            });
            test("order", (): void => {
                expect(StringUtil.expand("a{d,c,b}e")).toEqual(["ade", "ace", "abe"]);
            });
            test("pad", (): void => {
                expect(StringUtil.expand("{9..11}")).toEqual(["9", "10", "11"]);
                expect(StringUtil.expand("{09..11}")).toEqual(["09", "10", "11"]);
            });
            test("x and y of same type", (): void => {
                expect(StringUtil.expand("{a..9}")).toEqual(["{a..9}"]);
            });
            test("numeric sequences", (): void => {
                expect(StringUtil.expand("a{1..2}b{2..3}c")).toEqual(["a1b2c", "a1b3c", "a2b2c", "a2b3c"]);
                expect(StringUtil.expand("{1..2}{4..5}")).toEqual(["14", "15", "24", "25"]);
            });
            test("numeric sequences with step count", (): void => {
                expect(StringUtil.expand("{0..8..2}")).toEqual(["0", "2", "4", "6", "8"]);
                expect(StringUtil.expand("{1..8..2}")).toEqual(["1", "3", "5", "7"]);
            });
            test("numeric sequence with negative x / y", (): void => {
                expect(StringUtil.expand("{3..-2}")).toEqual(["3", "2", "1", "0", "-1", "-2"]);
            });
            test("alphabetic sequences", (): void => {
                expect(StringUtil.expand("1{a..b}2{c..d}")).toEqual(["1a2c", "1a2d", "1b2c", "1b2d"]);
            });
            test("alphabetic sequences with step count", (): void => {
                expect(StringUtil.expand("{a..k..2}")).toEqual(["a", "c", "e", "g", "i", "k"]);
                expect(StringUtil.expand("{b..k..2}")).toEqual(["b", "d", "f", "h", "j"]);
            });
            test("ignores ${", (): void => {
                expect(StringUtil.expand("${1..3}")).toEqual(["${1..3}"]);
                expect(StringUtil.expand("${a,b}${c,d}")).toEqual(["${a,b}${c,d}"]);
                expect(StringUtil.expand("x${a,b}x${c,d}x")).toEqual(["x${a,b}x${c,d}x"]);
            });
        });
    });
});
