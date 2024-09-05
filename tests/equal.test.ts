import { describe, test, expect } from "@jest/globals";
import * as Equal from "../src/equal";
import { Primitive } from "../src/type";

describe("Utilities", (): void => {
    describe("> Equal", (): void => {
        describe("> primitive", () => {
            const symbol = Symbol("hello");
            const symbol2 = Symbol("world");
            const tests: Array<[Primitive, Primitive, boolean]> = [
                ["", "", true],
                [NaN, NaN, true],
                [0, 0, true],
                [+0, 0, true],
                [-0, 0, true],
                [+0, -0, true],
                [0n, 0n, true],
                [undefined, undefined, true],
                [null, null, true],
                [undefined, null, false],
                [true, false, false],
                [symbol, symbol, true],
                [symbol, symbol2, false],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equalPrimitive(a, b)).toBe(expected);
            });
        });
        describe("> array", () => {
            const symbol = Symbol("symbol");

            const tests: [unknown[], unknown[], boolean][] = [
                [[], [], true],
                [Array([]), Array([]), true],
                [Array([]), [[]], true],
                [Array(1), [[]], false],
                [Array(2), [[], []], false],
                [new Array([]), Array([]), true],
                [new Array(0), [], true],
                [[""], ["", "t"], false],
                [[[[[[[]]]]]], [[[[[[]]]]]], true],
                [[[[[[[]]]]]], [[[[[[true]]]]]], false],
                // number pattern
                [[1], [1], true],
                [[1, 2], [1], false],
                [[1, 2], [1, 2], true],
                [[1, 2, 3, 4], [1, 2, 3, 4], true],
                [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], true],
                [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 9, 8], false],
                [[1, [2]], [1, [2]], true],
                [[1, [2]], [1, [2]], true],
                [[1, [2, [3, [4, [5, [6, [7, [8, [9]]]]]]]]], [1, [2, [3, [4, [5, [6, [7, [8, [9]]]]]]]]], true],
                [[1, [2, [3, [4, [5, [6, [7, [8, [9]]]]]]]]], [1, [2, [3, [4, [5, [6, [6, [8, [9]]]]]]]]], false],
                [
                    [1, [2, [3, [4, [5, [6, [7, [8, [10, 9, 8]]]]]]]]],
                    [1, [2, [3, [4, [5, [6, [6, [8, [10, 9, 7]]]]]]]]],
                    false,
                ],
                [[1], [0], false],
                // string pattern
                [[""], [""], true],
                [["", "", "", ""], ["", "", "", ""], true],
                [["", "", "", ""], ["", "", "", "x"], false],
                [["a", ["b", ["c", ["d", ["e", ["f", "g"]]]]]], ["a", ["b", ["c", ["d", ["e", ["f", "g"]]]]]], true],
                // undefined pattern
                [[undefined], [undefined], true],
                [[undefined, undefined], [undefined], false],
                [Array(6).fill(undefined), [undefined, undefined, undefined, undefined, undefined, undefined], true],
                [Array(6).fill(undefined), [undefined, undefined, undefined, undefined, undefined], false],
                // null pattern
                [[null], [null], true],
                [Array(4), [null, null, null, null], false],
                [[[Array(4)]], [[[null, null, null, null]]], false],
                // symbol pattern
                [Array(4).fill(symbol), [symbol, symbol, symbol, symbol], true],
                [Array(4).fill(symbol), [symbol, symbol, Symbol("symbol"), symbol], false],
                [[Symbol("")], [Symbol("")], false],
                // boolean pattern
                [[true], [true], true],
                [[false], [false], true],
                [[false, true], [false, false], false],
                [Array(4).fill(true), [true, true, true, true], true],
                // object pattern
                [[{}], [{}], true],
                [[{}, {}, {}, {}], [{}, {}, {}, {}], true],
                [
                    [
                        {},
                        {
                            a: 1,
                        },
                        {
                            b: "",
                        },
                        {
                            c: [
                                {
                                    d: undefined,
                                },
                                {
                                    e: [],
                                },
                            ],
                        },
                    ],
                    [
                        {},
                        {
                            a: 1,
                        },
                        {
                            b: "",
                        },
                        {
                            c: [
                                {
                                    d: undefined,
                                },
                                {
                                    e: [],
                                },
                            ],
                        },
                    ],
                    true,
                ],

                [[[]], [[]], true],
                [[[1, null]], [[1, null]], true],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equalArray(a, b)).toBe(expected);
            });
        });
        describe("> object", () => {
            const symbol = Symbol("hello");
            const symbol2 = Symbol("world");

            const tests: [{ [k in PropertyKey]: unknown }, { [k in PropertyKey]: unknown }, boolean][] = [
                [{}, {}, true],
                [{ "": "" }, { "": "" }, true],
                [{ "": undefined }, { "": undefined }, true],
                [{ "": null }, { "": null }, true],
                [{ "": null, hoge: undefined }, { "": null }, false],
                [{ "": "" }, {}, false],
                [{ 1: "" }, {}, false],
                [{ 1: "" }, { 1: "" }, true],
                [{ 1: "" }, { 1: true }, false],
                [{ 1: true }, { 1: true, 2: false }, false],
                [{ a: { b: { c: {} } } }, { a: { b: { c: {} } } }, true],
                [
                     
                    { a: { b: { c: { d: () => {}, e: 0, f: [] } } } },
                     
                    { a: { b: { c: { d: () => {}, e: 0, f: [] } } } },
                    true,
                ],
                [{ [symbol]: true }, { [symbol]: true }, true],
                [{ [symbol]: true }, { [symbol]: false }, false],
                [{ [symbol]: true }, { [symbol2]: true }, false],
                [{ [symbol]: true, [symbol2]: 1 }, { [symbol]: true, [symbol2]: 1 }, true],
                [{ [symbol]: true, 1: "hello" }, { [symbol]: true, 1: "hello" }, true],
                [{ [symbol]: true, 1: "hello" }, { [symbol]: true, 1: "world" }, false],
                [
                    { [symbol]: true, 1: "hello", [symbol2]: "world" },
                    { [symbol]: true, 1: "hello", [symbol2]: "world" },
                    true,
                ],
                [
                    { [symbol]: true, 1: "hello", [symbol2]: "world" },
                    { [symbol]: true, 1: "hello", [Symbol("world")]: "world" },
                    false,
                ],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equalObject(a, b)).toBe(expected);
            });
        });
        describe("> instance", () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
            const tests: [Function, unknown, unknown, boolean][] = [
                [Error, Error(), Error(), true],
                [Error, TypeError(), TypeError(), true],
                [TypeError, TypeError(), TypeError(), true],
                [TypeError, TypeError(), RangeError(), false],
                [RangeError, TypeError(), RangeError(), false],
                [SyntaxError, TypeError(), RangeError(), false],
                [URIError, TypeError(), RangeError(), false],
                [URIError, URIError(), URIError(), true],
                //[AggregateError, AggregateError(""), AggregateError(""), true],
                //[AggregateError, AggregateError(""), Error(), false],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, c, expected) => {
                expect(Equal.equalInstance(a, b, c)).toBe(expected);
            });
        });
        describe("> typed array", () => {
            const tests: [NodeJS.TypedArray, NodeJS.TypedArray, boolean][] = [
                [new Int8Array(), new Int8Array(), true],
                [new Int8Array([21, 31]), new Int8Array([21, 31]), true],
                [new Uint8Array(), new Uint8Array(), true],
                [new Uint8Array([21, 31]), new Uint8Array([21, 31]), true],
                [new Uint8ClampedArray(), new Uint8ClampedArray(), true],
                [new Uint8ClampedArray([21, 31]), new Uint8ClampedArray([21, 31]), true],
                [new Int16Array(), new Int16Array(), true],
                [new Int16Array([21, 31]), new Int16Array([21, 31]), true],
                [new Uint16Array(), new Uint16Array(), true],
                [new Uint16Array([21, 31]), new Uint16Array([21, 31]), true],
                [new Int32Array(), new Int32Array(), true],
                [new Int32Array([21, 31]), new Int32Array([21, 31]), true],
                [new Uint32Array(), new Uint32Array(), true],
                [new Uint32Array([21, 31]), new Uint32Array([21, 31]), true],
                [new Float32Array(), new Float32Array(), true],
                [new Float32Array([21, 31]), new Float32Array([21, 31]), true],
                [new Float64Array(), new Float64Array(), true],
                [new Float64Array([21, 31]), new Float64Array([21, 31]), true],
                [new BigInt64Array(), new BigInt64Array(), true],
                [new BigInt64Array([21n, 31n]), new BigInt64Array([21n, 31n]), true],
                [new BigUint64Array(), new BigUint64Array(), true],
                [new BigUint64Array([0n, 31n]), new BigUint64Array([0n, 31n]), true],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equalTypedArray(a, b)).toBe(expected);
            });
        });
        describe("> regexp", () => {
            const tests: [RegExp, RegExp, boolean][] = [
                [/s/, /s/, true],
                [/s/, /t/, false],
                [/a/gi, /a/gi, true],
                [/a/gim, /a/gim, true],
                [/a/gi, /a/i, false],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equalRegExp(a, b)).toBe(expected);
            });
        });
        describe("> set", () => {
            const symbol = Symbol("hello");
            const tests: [Set<unknown>, Set<unknown>, boolean][] = [
                [new Set(), new Set(), true],
                [new Set([]), new Set([]), true],
                [new Set([1]), new Set([1]), true],
                [new Set([1, 2]), new Set([1]), false],
                [new Set([1]), new Set([1, 2]), false],
                [new Set([1, 2, 3]), new Set([1, 2, 3]), true],
                [new Set([1, 1, 1]), new Set([1, 1, 1]), true],
                [new Set([1, 3, 2]), new Set([1, 2, 3]), false],
                [new Set([null, undefined, 0, "", 1n, true]), new Set([null, undefined, 0, "", 1n, true]), true],
                [new Set([symbol]), new Set([symbol]), true],
                [new Set([symbol]), new Set([Symbol("hello")]), false],
                [new Set([[], {}]), new Set([[], {}]), true],
                [
                    new Set([[], {}, new Date(0), /s/, new Map(), Error("e"), () => true]),
                    new Set([[], {}, new Date(0), /s/, new Map(), Error("e"), () => true]),
                    true,
                ],
                [
                    new Set([[], {}, new Date(0), /s/, new Map(), Error("e"), () => true]),
                    new Set([[], {}, new Date(0), /s/, new Map(), Error("f"), () => true]),
                    false,
                ],
                [
                    new Set([[1, [], { a: "hello" }], { b: null, c: {} }]),
                    new Set([[1, [], { a: "hello" }], { b: null, c: {} }]),
                    true,
                ],
                [new Set([new Map([[new Set(), new Map()]])]), new Set([new Map([[new Set(), new Map()]])]), true],
                [new Set([{}]), new Set([{}]), true],
                [new Set([{}, {}]), new Set([{}]), false],
                [new Set([new Map(), new Set()]), new Set([new Map(), new Set()]), true],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equalSet(a, b)).toBe(expected);
            });
        });
        describe("> date", () => {
            const tests: [Date, Date, boolean][] = [
                [new Date(0), new Date(0), true],
                [new Date(0), new Date("1999/1/1"), false],
                [new Date("1999/1/1 00:00:01"), new Date("1999/1/1"), false],
                [new Date(1), new Date(0), false],
                [new Date(0), new Date(1), false],
                [new Date("a"), new Date("a"), true],
                [new Date("a"), new Date("b"), true],
                [new Date("1000/1/1"), new Date("1000/1/1"), true],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equalDate(a, b)).toBe(expected);
            });
        });
        describe("> function", () => {
            const a = () => 1;
            const b = () => 1;
            const c = () => 2;
            function d() {
                return 2;
            }
            class Foo {}
            class Bar {}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
            const tests: [Function, Function, boolean][] = [
                [() => {}, () => {}, true],
                [() => true, () => true, true],
                [a, b, true],
                [a, c, false],
                [c, d, false],
                [Foo, Foo, true],
                [Foo, Bar, false],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equalFunction(a, b)).toBe(expected);
            });
        });
        describe("> map", () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const tests: [Map<any, any>, Map<any, any>, boolean][] = [
                [new Map(), new Map(), true],
                [
                    new Map([
                        ["", ""],
                        ["hoge", "hoge"],
                    ]),
                    new Map(),
                    false,
                ],
                [
                    new Map([
                        ["", ""],
                        ["hoge", "hoge"],
                    ]),
                    new Map([
                        ["hoge", "hoge"],
                        ["", ""],
                    ]),
                    true,
                ],
                [new Map([[undefined, ""]]), new Map([[undefined, ""]]), true],
                [
                    new Map([
                        [undefined, ""],
                        [null, "a"],
                    ]),
                    new Map([[undefined, ""]]),
                    false,
                ],
                [
                    new Map([
                        [undefined, ""],
                        [null, "a"],
                    ]),
                    new Map([
                        [undefined, ""],
                        [null, "a"],
                    ]),
                    true,
                ],
                [
                    new Map([
                        [null, "a"],
                        [undefined, ""],
                    ]),
                    new Map([
                        [undefined, ""],
                        [null, "a"],
                    ]),
                    true,
                ],
                [new Map([[{}, "a"]]), new Map([[{}, "a"]]), true],
                [new Map([[[], "a"]]), new Map([[[], "a"]]), true],
                [
                    new Map([
                        [undefined, ""],
                        [null, "a"],
                        [1, "1"],
                    ]),
                    new Map([
                        [undefined, ""],
                        [null, "a"],
                        [1, "1"],
                    ]),
                    true,
                ],
                [
                    new Map([
                        [
                            null,
                            {
                                null: "",
                            },
                        ],
                    ]),
                    new Map([
                        [
                            null,
                            {
                                null: "",
                            },
                        ],
                    ]),
                    true,
                ],
                [
                    new Map([
                        [
                            null,
                            {
                                null: {},
                                1: [],
                                "": 2,
                            },
                        ],
                    ]),
                    new Map([
                        [
                            null,
                            {
                                null: {},
                                1: [],
                                "": 2,
                            },
                        ],
                    ]),
                    true,
                ],
                [
                    new Map([
                        [
                            null,
                            {
                                null: {
                                    "": "",
                                    a: undefined,
                                    b: null,
                                    c: [],
                                    d: {},
                                },
                                1: ["", 1, undefined, null, [], {}],
                            },
                        ],
                    ]),
                    new Map([
                        [
                            null,
                            {
                                null: {
                                    "": "",
                                    a: undefined,
                                    b: null,
                                    c: [],
                                    d: {},
                                },
                                1: ["", 1, undefined, null, [], {}],
                            },
                        ],
                    ]),
                    true,
                ],
                [new Map(), new Map([["", ""]]), false],
                [new Map([["", ""]]), new Map(), false],
                [new Map([["", ""]]), new Map([["", ""]]), true],
                [new Map().set("a", ""), new Map().set("", ""), false],
                [new Map().set("", []), new Map().set("", []), true],
                [new Map().set("", 1), new Map().set("", 1), true],
                [new Map().set("", undefined), new Map().set("", undefined), true],
                [new Map().set("a", undefined), new Map().set("a", undefined), true],
                [new Map().set("", null), new Map().set("", null), true],
                [new Map().set("", 0), new Map().set("", 0), true],
                [new Map().set("", 1), new Map().set("", 1), true],
                [new Map().set("", {}), new Map().set("", {}), true],
                [new Map().set("", new Map()), new Map().set("", new Map()), true],
                [new Map([[[], []]]), new Map([[[], []]]), true],
                [
                    new Map([[{ a: "", b: "huga", c: [], d: 1, e: new Date(0), f: new Map() }, ""]]),
                    new Map([[{ a: "", b: "huga", c: [], d: 1, e: new Date(0), f: new Map() }, ""]]),
                    true,
                ],
                [
                    new Map([[{ a: "", b: "huga", c: [], d: 1, e: new Date(0), f: new Map() }, "a"]]),
                    new Map([[{ a: "", b: "huga", c: [], d: 1, e: new Date(0), f: new Map() }, "b"]]),
                    false,
                ],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equalMap(a, b)).toBe(expected);
            });
        });
        describe("> error", () => {
            class CustomError extends Error {}

            const tests: [Error, Error, boolean][] = [
                [new Error("hoge"), new Error("hoge"), true],
                [new Error("hoge"), new Error("hogehoge"), false],
                [new Error("xxx"), new TypeError("xxx"), false],
                [new TypeError("xxx"), new TypeError("xxx"), true],
                [new EvalError("xxx"), new TypeError("xxx"), false],
                [new RangeError("xxx"), new TypeError("xxx"), false],
                [new ReferenceError("xxx"), new TypeError("xxx"), false],
                [new SyntaxError("xxx"), new TypeError("xxx"), false],
                [new URIError("xxx"), new TypeError("xxx"), false],
                [new CustomError("xxx"), new CustomError("xxx"), true],
                [new CustomError("yyy"), new CustomError("xxx"), false],
                [new CustomError("xxx"), new Error("xxx"), false],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equalError(a, b)).toBe(expected);
            });
        });
        describe("> equal", () => {
            const symbol = Symbol("hello");
            const tests: [unknown, unknown, boolean][] = [
                [1, 1, true],
                [1, Number(1), true],
                [1, new Number(1), false],
                [0, 0, true],
                [0, Number(0), true],
                [-0, -0, true],
                [+0, +0, true],
                [-0, +0, true],
                [+0, -0, true],
                [0, +0, true],
                [0, -0, true],
                [-1, -1, true],
                [-1, 1, false],
                [NaN, NaN, true],
                [NaN, -NaN, true],
                [NaN, Number.NaN, true],
                [NaN, Number(NaN), true],
                [0, 1, false],
                [Infinity, Infinity, true],
                [-Infinity, -Infinity, true],
                [-Infinity, Infinity, false],
                [Infinity, Number.POSITIVE_INFINITY, true],
                [-Infinity, Number.NEGATIVE_INFINITY, true],
                [Number.MAX_VALUE, Number.MAX_VALUE, true],
                [Number.MIN_VALUE, Number.MIN_VALUE, true],
                [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, true],
                [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, true],
                [Number.EPSILON, Number.EPSILON, true],
                [0n, 0n, true],
                [-0n, 0n, true],
                [1n, 1n, true],
                [-1n, -1n, true],
                [-0n, -0n, true],
                [BigInt(0n), 0n, true],
                [BigInt(1n), 1n, true],
                [BigInt(-1n), -1n, true],
                [BigInt(-0n), -0n, true],
                [new Number(1), 1, false],
                [new Number(1), Number(1), false],
                // string
                ["", "", true],
                ["hello", "hello", true],
                [String(""), "", true],
                [String("hello"), String("hello"), true],
                [String(""), String(""), true],
                // undefined
                [undefined, undefined, true],
                [undefined, null, false],
                [undefined, 1, false],
                [undefined, {}, false],
                [undefined, [], false],
                // null
                [null, null, true],
                [null, {}, false],
                [null, [], false],
                // boolean
                [true, true, true],
                [true, false, false],
                [true, false, false],
                [Boolean(true), true, true],
                [Boolean(true), Boolean(true), true],
                [Boolean(false), false, true],
                [Boolean(false), true, false],
                // symbol
                [symbol, symbol, true],
                [Symbol("hello"), Symbol("hello"), false],
                // array
                [[], [], true],
                [[1], [1], true],
                [[1], [1, 2], false],
                [[new Date()], [new Date()], true],

                // object
                [{}, {}, true],
                [{ "": "" }, { "": "" }, true],
                [{ "": undefined }, { "": undefined }, true],
                [{ "": null }, { "": null }, true],
                [{ "": null, hoge: undefined }, { "": null }, false],
                [{ "": "" }, {}, false],
                [{ 1: "" }, {}, false],
                [{ 1: "" }, { 1: "" }, true],
                [{ 1: "" }, { 1: true }, false],
                [{ symbol: true }, { symbol: true }, true],
                [{ symbol: true }, { symbol: false }, false],
                [{ symbol: true, 1: "hello" }, { symbol: true, 1: "hello" }, true],
                [{ symbol: true, 1: "hello" }, { symbol: true, 1: "hello" }, true],

                // date
                [new Date(0), {}, false],
                [{}, new Date(0), false],

                [new Map(), new Map(), true],
                [new Map([[1, 2]]), new Map([[1, 2]]), true],
                [new Map([[{}, 2]]), new Map([[{}, 2]]), true],
                [
                    new Map([
                        [{}, 1],
                        [[], 2],
                    ]),
                    new Map([
                        [[], 2],
                        [{}, 1],
                    ]),
                    true,
                ],
                [
                    new Map([
                        [{}, 2],
                        [[], 1],
                    ]),
                    new Map([
                        [[], 2],
                        [{}, 1],
                    ]),
                    false,
                ],
                [new Map().set(new Map(), new Map()), new Map().set(new Map(), new Map()), true],
                [new Set(), new Set(), true],
                [new Set(), new Set([]), true],
                [new Int8Array(), new Int8Array(), true],
                [new Uint8Array(), new Uint8Array(), true],
                [new Uint8ClampedArray(), new Uint8ClampedArray(), true],
                [new Int16Array(), new Int16Array(), true],
                [new Uint16Array(), new Uint16Array(), true],
                [new Int32Array(), new Int32Array(), true],
                [new Uint32Array(), new Uint32Array(), true],
                [new Float32Array(), new Float32Array(), true],
                [new Float64Array(), new Float64Array(), true],
                [new BigInt64Array(), new BigInt64Array(), true],
                [new BigUint64Array(), new BigUint64Array(), true],
            ];
            test.each(tests)(`'%s'- '%s' = '%s'`, (a, b, expected) => {
                expect(Equal.equal(a, b)).toBe(expected);
            });
        });
    });
});
