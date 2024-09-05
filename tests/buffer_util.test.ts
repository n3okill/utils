import { describe, test, expect } from "@jest/globals";
import * as BufferUtil from "../src/buffer_util";

describe("Utilities", (): void => {
    describe("> Buffer", (): void => {
        describe("> toString", (): void => {
            test("should return string unchanged", (): void => {
                expect(BufferUtil.toString(Buffer.from(""))).toBe("");
                expect(BufferUtil.toString(Buffer.from("test"))).toBe("test");
            });
        });
        describe("> split", (): void => {
            test("should split a buffer", (): void => {
                expect(BufferUtil.split(Buffer.from("hi/there"), "/")).toEqual(
                    ["hi", "there"].map((s) => Buffer.from(s)),
                );
                expect(BufferUtil.split(Buffer.from("a.b.c.d.e"), ".")).toEqual(
                    ["a", "b", "c", "d", "e"].map((s) => Buffer.from(s)),
                );
            });
        });
        describe("repeat", (): void => {
            test("should repeat a string", (): void => {
                expect(BufferUtil.repeat(Buffer.from("a"), 5)).toEqual(Buffer.from("aaaaa"));
            });
        });
        describe("> trimLeft", (): void => {
            test("should remove whitespaces from begin of string", (): void => {
                const str = "   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ";
                expect(BufferUtil.trimLeft(Buffer.from(str))).toEqual(Buffer.from("lorem  ipsum    \t \t  \t\t  "));
            });
            test("should remove specified chars from begin of string", (): void => {
                const str = "-+-*test*-+-";
                const chars = ["-", "+", "*", "\\"];
                expect(BufferUtil.trimLeft(Buffer.from(str), chars)).toEqual(Buffer.from("test*-+-"));
            });
        });
        describe("> trimRight", (): void => {
            test("should remove whitespaces from end of string", (): void => {
                const str = "   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ";
                expect(BufferUtil.trimRight(Buffer.from(str))).toEqual(Buffer.from("   \t \t \t\t     lorem  ipsum"));
            });
            test("should remove specified chars from end of string", (): void => {
                const str = "-+-*test*-+-";
                const chars = ["-", "+", "*", "\\"];
                expect(BufferUtil.trimRight(Buffer.from(str), chars)).toEqual(Buffer.from("-+-*test"));
            });
        });
        describe("> trim", (): void => {
            test("should remove whitespaces from begin and end of string", (): void => {
                const str = "   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ";
                expect(BufferUtil.trim(Buffer.from(str))).toEqual(Buffer.from("lorem  ipsum"));
            });
            test("should remove specified chars from begin and end of string", (): void => {
                const str = "-+-*test*-+-";
                const chars = ["-", "+", "*"];
                expect(BufferUtil.trim(Buffer.from(str), chars)).toEqual(Buffer.from("test"));
            });
        });
        describe("> multiReplace", (): void => {
            test("should replace single string", (): void => {
                expect(BufferUtil.multiReplace(Buffer.from("test foo"), ["foo"], "result")).toEqual(
                    Buffer.from("test result"),
                );
            });
            test("should replace multiple searches with single string", (): void => {
                expect(BufferUtil.multiReplace(Buffer.from("test one two one"), ["one", "two"], "n")).toEqual(
                    Buffer.from("test n n n"),
                );
            });
            test("should replace multiple searches with multiple strings", (): void => {
                expect(BufferUtil.multiReplace(Buffer.from("test one two"), ["one", "two"], ["1", "2"])).toEqual(
                    Buffer.from("test 1 2"),
                );
            });
            test("should replace with regexp", (): void => {
                expect(BufferUtil.multiReplace(Buffer.from("test 1 2"), [/\d+/g], "n")).toEqual(
                    Buffer.from("test n n"),
                );
            });
            test("should replace with function replacer", (): void => {
                function replaceNum(m: string): string {
                    return (+m * +m) as unknown as string;
                }

                function replaceLetter(m: string): string {
                    return m.charCodeAt(0) as unknown as string;
                }

                expect(
                    BufferUtil.multiReplace(Buffer.from("1 2 3 a"), [/\d+/g, /[a-z]/g], [replaceNum, replaceLetter]),
                ).toEqual(Buffer.from("1 4 9 97"));
            });
            test("should replace all elements without breaking", (): void => {
                expect(BufferUtil.multiReplace(Buffer.from(".abc.2.1"), ["."], ["."])).toEqual(Buffer.from(".abc.2.1"));
            });
        });
        describe("> objectToPathStrings", (): void => {
            test("simple object", (): void => {
                expect(BufferUtil.objectToPathBuffer({ a: { b: {} } }, "/")).toEqual(
                    ["a/b"].map((s) => Buffer.from(s)),
                );
            });
            test("complex object", (): void => {
                expect(
                    BufferUtil.objectToPathBuffer(
                        {
                            a: {
                                b: { c: {}, d: {} },
                                e: {},
                            },
                        },
                        "/",
                    ),
                ).toEqual(["a/b/c", "a/b/d", "a/e"].map((s) => Buffer.from(s)));
            });
        });
        describe("> stringsPathToObject", (): void => {
            test("simple path", (): void => {
                expect(BufferUtil.bufferPathToObject([Buffer.from("a/b")], "/")).toEqual({ a: { b: {} } });
            });
            test("complex path", (): void => {
                expect(
                    BufferUtil.bufferPathToObject(
                        [Buffer.from("a/b/c"), Buffer.from("a/b/d"), Buffer.from("a/e")],
                        "/",
                    ),
                ).toEqual({
                    a: {
                        b: { c: {}, d: {} },
                        e: {},
                    },
                });
            });
        });
        describe("> BalancedCounter", (): void => {
            test("empty", (): void => {
                expect(BufferUtil.balancedCounter(Buffer.from(""))).toBeTruthy();
            });
            test("simple", (): void => {
                expect(BufferUtil.balancedCounter(Buffer.from("a{b}"))).toBeTruthy();
                expect(BufferUtil.balancedCounter(Buffer.from("a{b"))).toBeFalsy();
            });
            test("complex", (): void => {
                expect(BufferUtil.balancedCounter(Buffer.from("a{b{c}}"))).toBeTruthy();
                expect(BufferUtil.balancedCounter(Buffer.from("a{b{c{d}}"))).toBeFalsy();
            });
        });
        describe("> Balanced", (): void => {
            test("empty", (): void => {
                expect(BufferUtil.balanced(Buffer.from(""))).toEqual([]);
            });
            test("simple", (): void => {
                expect(BufferUtil.balanced(Buffer.from("ab"))).toEqual([]);
                expect(BufferUtil.balanced(Buffer.from("a{b"))).toBeFalsy();
                expect(BufferUtil.balanced(Buffer.from("a}{b"))).toBeFalsy();
                expect(BufferUtil.balanced(Buffer.from("a}{{b}"))).toBeFalsy();
                expect(BufferUtil.balanced(Buffer.from("a{b}"))).toEqual([[1, 3]]);
            });
            test("complex", (): void => {
                expect(BufferUtil.balanced(Buffer.from("a{b{c}"))).toBeFalsy();
                expect(BufferUtil.balanced(Buffer.from("a{b{c}}"))).toEqual([
                    [1, 6],
                    [3, 5],
                ]);
                expect(BufferUtil.balanced(Buffer.from("a{b{c{d}}}"))).toEqual([
                    [1, 9],
                    [3, 8],
                    [5, 7],
                ]);
            });
            test("complex, different options", (): void => {
                expect(BufferUtil.balanced(Buffer.from("a<%b<%c<%d%>%>%>"), "<%", "%>")).toEqual([
                    [1, 14],
                    [4, 12],
                    [7, 10],
                ]);
            });
        });
        describe("> IsBalanced", (): void => {
            test("empty", (): void => {
                expect(BufferUtil.isBalanced(Buffer.from(""))).toBeTruthy();
            });
            test("simple", (): void => {
                expect(BufferUtil.isBalanced(Buffer.from("a{b"))).toBeFalsy();
                expect(BufferUtil.isBalanced(Buffer.from("a}{b"))).toBeFalsy();
                expect(BufferUtil.isBalanced(Buffer.from("a}{{b}"))).toBeFalsy();
                expect(BufferUtil.isBalanced(Buffer.from("a{b}"))).toBeTruthy();
            });
            test("complex", (): void => {
                expect(BufferUtil.isBalanced(Buffer.from("a{b{c}"))).toBeFalsy();
                expect(BufferUtil.isBalanced(Buffer.from("a{b{c}}"))).toBeTruthy();
                expect(BufferUtil.isBalanced(Buffer.from("a{b{c{d}}}"))).toBeTruthy();
            });
            test("complex, different options", (): void => {
                expect(BufferUtil.isBalanced(Buffer.from("a<%b<%c<%d%>%>%>"), "<%", "%>")).toBeTruthy();
            });
            test("other", (): void => {
                expect(BufferUtil.isBalanced(Buffer.from("pre{in{nest}}post"))).toBeTruthy();
                expect(BufferUtil.isBalanced(Buffer.from("{{{{{{{{{in}post"))).toBeFalsy();
                expect(BufferUtil.isBalanced(Buffer.from("pre{body{in}post"))).toBeFalsy();
                expect(BufferUtil.isBalanced(Buffer.from("pre{in}po}st"))).toBeFalsy();
                expect(BufferUtil.isBalanced(Buffer.from("pre}{in{nest}}post"))).toBeFalsy();
                expect(BufferUtil.isBalanced(Buffer.from("pre{body}between{body2}post"))).toBeTruthy();
                expect(BufferUtil.isBalanced(Buffer.from("nope"))).toBeTruthy();
                expect(BufferUtil.isBalanced(Buffer.from("pre<b>in<b>nest</b></b>post"), "<b>", "</b>")).toBeTruthy();
                expect(
                    BufferUtil.isBalanced(Buffer.from("pre</b><b>in<b>nest</b></b>post"), "<b>", "</b>"),
                ).toBeFalsy();
                expect(BufferUtil.isBalanced(Buffer.from("pre{{{in}}}post"), "{{", "}}")).toBeTruthy();
                expect(BufferUtil.isBalanced(Buffer.from("pre{{{in}}}post"), "{{{", "}}")).toBeTruthy();
                expect(BufferUtil.isBalanced(Buffer.from("pre{{first}in{second}post"))).toBeFalsy();
                expect(BufferUtil.isBalanced(Buffer.from("pre<?>post"), "<?", "?>")).toBeFalsy();
            });
        });
        describe("> Expand", (): void => {
            test("empty", (): void => {
                expect(BufferUtil.expand(Buffer.from(""))).toEqual([""].map((s) => Buffer.from(s)));
            });
            test("simple", (): void => {
                expect(BufferUtil.expand(Buffer.from("a{b}c"))).toEqual(["abc"].map((s) => Buffer.from(s)));
            });
            test("empty option", (): void => {
                expect(BufferUtil.expand(Buffer.from("-v{,,,,}"))).toEqual(
                    ["-v", "-v", "-v", "-v", "-v"].map((s) => Buffer.from(s)),
                );
            });
            test("increment", (): void => {
                expect(BufferUtil.expand(Buffer.from("{1..3}"))).toEqual(["1", "2", "3"].map((s) => Buffer.from(s)));
                expect(BufferUtil.expand(Buffer.from("{3..1}"))).toEqual(["3", "2", "1"].map((s) => Buffer.from(s)));
                expect(BufferUtil.expand(Buffer.from("{10..8}"))).toEqual(["10", "9", "8"].map((s) => Buffer.from(s)));
                expect(BufferUtil.expand(Buffer.from("{10..08}"))).toEqual(
                    ["10", "09", "08"].map((s) => Buffer.from(s)),
                );
                expect(BufferUtil.expand(Buffer.from("{a..c}"))).toEqual(["a", "b", "c"].map((s) => Buffer.from(s)));
                expect(BufferUtil.expand(Buffer.from("{c..a}"))).toEqual(["c", "b", "a"].map((s) => Buffer.from(s)));
                expect(BufferUtil.expand(Buffer.from("{4..0..2}"))).toEqual(["4", "2", "0"].map((s) => Buffer.from(s)));
                expect(BufferUtil.expand(Buffer.from("{4..0..-2}"))).toEqual(
                    ["4", "2", "0"].map((s) => Buffer.from(s)),
                );
                expect(BufferUtil.expand(Buffer.from("{e..a..2}"))).toEqual(["e", "c", "a"].map((s) => Buffer.from(s)));
                expect(BufferUtil.expand(Buffer.from("a{b..d}g{1..3}z"))).toEqual(
                    ["abg1z", "abg2z", "abg3z", "acg1z", "acg2z", "acg3z", "adg1z", "adg2z", "adg3z"].map((s) =>
                        Buffer.from(s),
                    ),
                );
            });
            test("nested", (): void => {
                expect(BufferUtil.expand(Buffer.from("ppp{,config,oe{,conf}}"))).toEqual(
                    ["ppp", "pppconfig", "pppoe", "pppoeconf"].map((s) => Buffer.from(s)),
                );
                expect(BufferUtil.expand(Buffer.from("{a,b{1..3},c}"))).toEqual(
                    ["a", "b1", "b2", "b3", "c"].map((s) => Buffer.from(s)),
                );
                expect(BufferUtil.expand(Buffer.from("{{A..Z},{a..z}}"))).toEqual(
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("").map((s) => Buffer.from(s)),
                );
            });
            test("order", (): void => {
                expect(BufferUtil.expand(Buffer.from("a{d,c,b}e"))).toEqual(
                    ["ade", "ace", "abe"].map((s) => Buffer.from(s)),
                );
            });
            test("pad", (): void => {
                expect(BufferUtil.expand(Buffer.from("{9..11}"))).toEqual(["9", "10", "11"].map((s) => Buffer.from(s)));
                expect(BufferUtil.expand(Buffer.from("{09..11}"))).toEqual(
                    ["09", "10", "11"].map((s) => Buffer.from(s)),
                );
            });
            test("x and y of same type", (): void => {
                expect(BufferUtil.expand(Buffer.from("{a..9}"))).toEqual(["{a..9}"].map((s) => Buffer.from(s)));
            });
            test("numeric sequences", (): void => {
                expect(BufferUtil.expand(Buffer.from("a{1..2}b{2..3}c"))).toEqual(
                    ["a1b2c", "a1b3c", "a2b2c", "a2b3c"].map((s) => Buffer.from(s)),
                );
                expect(BufferUtil.expand(Buffer.from("{1..2}{4..5}"))).toEqual(
                    ["14", "15", "24", "25"].map((s) => Buffer.from(s)),
                );
            });
            test("numeric sequences with step count", (): void => {
                expect(BufferUtil.expand(Buffer.from("{0..8..2}"))).toEqual(
                    ["0", "2", "4", "6", "8"].map((s) => Buffer.from(s)),
                );
                expect(BufferUtil.expand(Buffer.from("{1..8..2}"))).toEqual(
                    ["1", "3", "5", "7"].map((s) => Buffer.from(s)),
                );
            });
            test("numeric sequence with negative x / y", (): void => {
                expect(BufferUtil.expand(Buffer.from("{3..-2}"))).toEqual([
                    Buffer.from("3"),
                    Buffer.from("2"),
                    Buffer.from("1"),
                    Buffer.from("0"),
                    Buffer.from("-1"),
                    Buffer.from("-2"),
                ]);
            });
            test("alphabetic sequences", (): void => {
                expect(BufferUtil.expand(Buffer.from("1{a..b}2{c..d}"))).toEqual([
                    Buffer.from("1a2c"),
                    Buffer.from("1a2d"),
                    Buffer.from("1b2c"),
                    Buffer.from("1b2d"),
                ]);
            });
            test("alphabetic sequences with step count", (): void => {
                expect(BufferUtil.expand(Buffer.from("{a..k..2}"))).toEqual([
                    Buffer.from("a"),
                    Buffer.from("c"),
                    Buffer.from("e"),
                    Buffer.from("g"),
                    Buffer.from("i"),
                    Buffer.from("k"),
                ]);
                expect(BufferUtil.expand(Buffer.from("{b..k..2}"))).toEqual([
                    Buffer.from("b"),
                    Buffer.from("d"),
                    Buffer.from("f"),
                    Buffer.from("h"),
                    Buffer.from("j"),
                ]);
            });
            test("ignores ${", (): void => {
                expect(BufferUtil.expand(Buffer.from("${1..3}"))).toEqual([Buffer.from("${1..3}")]);
                expect(BufferUtil.expand(Buffer.from("${a,b}${c,d}"))).toEqual([Buffer.from("${a,b}${c,d}")]);
                expect(BufferUtil.expand(Buffer.from("x${a,b}x${c,d}x"))).toEqual([Buffer.from("x${a,b}x${c,d}x")]);
            });
        });
    });
});
