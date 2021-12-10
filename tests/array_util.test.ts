import * as ArrayUtil from "../src/array_util";

describe("Utilities", (): void => {
    describe("> ArrayUtil", (): void => {
        //TODO: tests for isEmpty
        describe("> Clone", (): void => {
            test("cloneArray()", (): void => {
                const src = [1, 2, 3];
                const result = ArrayUtil.cloneArray(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                const a = [{ foo: "bar" }, "baz"];
                const b = ArrayUtil.cloneArray(a);
                expect(b).toBeInstanceOf(Array);
                expect(b).not.toBe(a);
                expect(b).toEqual(a);
            });
            test("deepCloneArray()", (): void => {
                const src = [1, 2, 3];
                const result = ArrayUtil.deepCloneArray(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                const a = [{ foo: "bar" }, "baz"];
                const b = ArrayUtil.deepCloneArray(a);
                expect(b).toBeInstanceOf(Array);
                expect(b).not.toBe(a);
                expect(b).toEqual(a);
                expect(b[0]).not.toBe(a[0]);
                expect(b[0]).toEqual(a[0]);
            });
        });
        describe("> Chunk", (): void => {
            test("size smaller than array length", (): void => {
                expect(ArrayUtil.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
            });
            test("size larger than array length", (): void => {
                expect(ArrayUtil.chunk([1, 2, 3, 4, 5], 6)).toEqual([[1, 2, 3, 4, 5]]);
            });
            test("work with TypedArray", (): void => {
                if (Int8Array !== undefined) {
                    ArrayUtil.chunk(new Int8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]), 2).forEach(
                        (item: Array<unknown>, idx: number) => {
                            // eslint-disable-next-line jest/no-conditional-expect
                            expect(item).toHaveLength(idx !== 4 ? 2 : 1);
                        }
                    );
                }
            });
            test("throw error when passed in non-number variable", (): void => {
                expect(() => {
                    ArrayUtil.chunk([123], "a" as never);
                }).toThrow("'size' argument must be a number bigger than '0'");
                expect(() => {
                    ArrayUtil.chunk([123], 4);
                }).not.toThrow();
            });
        });
        describe("> Combine", (): void => {
            test("combine simple arguments into array", (): void => {
                expect(ArrayUtil.combine("a", "b", ["c"], "d", ["e"])).toEqual(["a", "b", "c", "d", "e"]);
            });
            test("combine complex arguments nested array", (): void => {
                expect(ArrayUtil.combine("a", "b", ["c", ["d", ["e", "f"], "g"], "h"])).toEqual([
                    "a",
                    "b",
                    "c",
                    ["d", ["e", "f"], "g"],
                    "h",
                ]);
            });
            test("combine multiple simple nested arrays", (): void => {
                expect(ArrayUtil.combine(1, 2, [3, [4, 5], 6, [7, [8]]], [[[9, 10], 11], 12, 13, 14, 15], 16)).toEqual([
                    1,
                    2,
                    3,
                    [4, 5],
                    6,
                    [7, [8]],
                    [[9, 10], 11],
                    12,
                    13,
                    14,
                    15,
                    16,
                ]);
            });
            test("combine multiple complex nested arrays", (): void => {
                expect(
                    ArrayUtil.combine([0, [1], 2, [[3, 4], 5]], 6, 7, [[[[8, 9], 10], 11], 12], 13, 14, 15, 16, [
                        [17],
                        18,
                        [[19], 20],
                    ])
                ).toEqual([0, [1], 2, [[3, 4], 5], 6, 7, [[[8, 9], 10], 11], 12, 13, 14, 15, 16, [17], 18, [[19], 20]]);
            });
            test("combine more complex cases", (): void => {
                expect(ArrayUtil.combine("a" as unknown, [[[[[[["b", [["c"]]]]]], "d", ["e"]]]])).toEqual([
                    "a",
                    [[[[[["b", [["c"]]]]]], "d", ["e"]]],
                ]);
                expect(
                    ArrayUtil.combine(
                        "a",
                        [
                            "b",
                            [
                                "k",
                                [
                                    "a",
                                    [
                                        "b",
                                        ["c"],
                                        [
                                            [
                                                "a",
                                                [
                                                    [
                                                        "a",
                                                        [
                                                            "b",
                                                            [
                                                                "k",
                                                                [
                                                                    "a",
                                                                    ["b", ["c"]],
                                                                    [
                                                                        "a",
                                                                        ["x", ["c"], ["a", ["x", ["k"]]], ["d", ["z"]]],
                                                                    ],
                                                                    ["d", ["m"]],
                                                                ],
                                                                ["d", ["e"]],
                                                            ],
                                                        ],
                                                    ],
                                                    ["d", ["e"]],
                                                ],
                                                [
                                                    "b",
                                                    [
                                                        "k",
                                                        [
                                                            "a",
                                                            ["b", ["c"]],
                                                            ["a", ["x", ["c"], ["a", ["x", ["k"]]], ["d", ["z"]]]],
                                                            ["d", ["m"]],
                                                        ],
                                                        ["d", ["e"]],
                                                    ],
                                                ],
                                            ],
                                            ["d", ["e"]],
                                        ],
                                    ],
                                    [
                                        "a",
                                        [
                                            "x",
                                            ["c"],
                                            [
                                                "a",
                                                ["x", ["k"]],
                                                [
                                                    [
                                                        "a",
                                                        [
                                                            "b",
                                                            [
                                                                "k",
                                                                [
                                                                    "a",
                                                                    ["b", ["c"]],
                                                                    [
                                                                        "a",
                                                                        ["x", ["c"], ["a", ["x", ["k"]]], ["d", ["z"]]],
                                                                    ],
                                                                    ["d", ["m"]],
                                                                ],
                                                                ["d", ["e"]],
                                                            ],
                                                        ],
                                                    ],
                                                    ["d", ["e"]],
                                                ],
                                            ],
                                            ["d", ["z"]],
                                        ],
                                    ],
                                    ["d", ["m"]],
                                ],
                                ["d", ["e"]],
                            ],
                        ],
                        ["d", ["e"]]
                    )
                ).toEqual([
                    "a",
                    "b",
                    [
                        "k",
                        [
                            "a",
                            [
                                "b",
                                ["c"],
                                [
                                    [
                                        "a",
                                        [
                                            [
                                                "a",
                                                [
                                                    "b",
                                                    [
                                                        "k",
                                                        [
                                                            "a",
                                                            ["b", ["c"]],
                                                            ["a", ["x", ["c"], ["a", ["x", ["k"]]], ["d", ["z"]]]],
                                                            ["d", ["m"]],
                                                        ],
                                                        ["d", ["e"]],
                                                    ],
                                                ],
                                            ],
                                            ["d", ["e"]],
                                        ],
                                        [
                                            "b",
                                            [
                                                "k",
                                                [
                                                    "a",
                                                    ["b", ["c"]],
                                                    ["a", ["x", ["c"], ["a", ["x", ["k"]]], ["d", ["z"]]]],
                                                    ["d", ["m"]],
                                                ],
                                                ["d", ["e"]],
                                            ],
                                        ],
                                    ],
                                    ["d", ["e"]],
                                ],
                            ],
                            [
                                "a",
                                [
                                    "x",
                                    ["c"],
                                    [
                                        "a",
                                        ["x", ["k"]],
                                        [
                                            [
                                                "a",
                                                [
                                                    "b",
                                                    [
                                                        "k",
                                                        [
                                                            "a",
                                                            ["b", ["c"]],
                                                            ["a", ["x", ["c"], ["a", ["x", ["k"]]], ["d", ["z"]]]],
                                                            ["d", ["m"]],
                                                        ],
                                                        ["d", ["e"]],
                                                    ],
                                                ],
                                            ],
                                            ["d", ["e"]],
                                        ],
                                    ],
                                    ["d", ["z"]],
                                ],
                            ],
                            ["d", ["m"]],
                        ],
                        ["d", ["e"]],
                    ],
                    "d",
                    ["e"],
                ]);
            });
        });
        describe("> delIndex", (): void => {
            test("remove item at index from array", (): void => {
                expect(ArrayUtil.delIndex(["a", "b", "c", "d"], 2)).toEqual(["a", "b", "d"]);
            });
        });
        describe("> delItem", (): void => {
            test("remove single item from array", (): void => {
                expect(ArrayUtil.delItem(["a", "b", "c", "d"], "b")).toEqual(["a", "c", "d"]);
            });
            test("remove multiple items from array", (): void => {
                expect(ArrayUtil.delItem(["a", "b", "c", "b", "b", "d", "b", "e"], "b")).toEqual(["a", "c", "d", "e"]);
            });
            test("remove multiple items from array with limit", (): void => {
                expect(ArrayUtil.delItem(["a", "b", "c", "b", "b", "d", "b", "e"], "b", 2)).toEqual([
                    "a",
                    "c",
                    "b",
                    "d",
                    "b",
                    "e",
                ]);
            });
        });
        describe("> Diff", (): void => {
            test("should diff array", (): void => {
                expect(ArrayUtil.diff(["a", "b", "c"], ["b", "c", "e"])).toEqual(["a"]);
                expect(ArrayUtil.diff(["x", "b", "c", "e", "y"], ["b", "x", "e"])).toEqual(["c", "y"]);
                expect(ArrayUtil.diff(["x", "x"], ["a", "b", "c"])).toEqual(["x", "x"]);
                expect(ArrayUtil.diff(["x"], ["a", "b", "c"])).toEqual(["x"]);
                expect(ArrayUtil.diff(["x", "b", "b", "b", "c", "e", "y"], ["x", "e"])).toEqual([
                    "b",
                    "b",
                    "b",
                    "c",
                    "y",
                ]);
            });
            test("should remove all occurrences of an element", (): void => {
                expect(ArrayUtil.diff(["a", "b", "b", "b", "b"], ["b"])).toEqual(["a"]);
            });
            test("should not modify the input array", (): void => {
                const arr = ["x", "b", "b", "b", "c", "e", "y"];
                const init = arr.slice();
                ArrayUtil.diff(arr, ["x", "e"]);
                expect(arr).toEqual(init);
            });
            test("should diff elements from multiple arrays", (): void => {
                expect(ArrayUtil.diff(["a", "b", "c"], ["a"], ["b"])).toEqual(["c"]);
            });
            test("should return an empty array if no unique elements are in the first array", (): void => {
                expect(ArrayUtil.diff(["a"], ["a", "b", "c"])).toEqual([]);
            });
            test("should return the first array if the second array is empty", (): void => {
                expect(ArrayUtil.diff(["a", "b", "c"], [])).toEqual(["a", "b", "c"]);
            });
            test("should return the first array if no other args are passed", (): void => {
                expect(ArrayUtil.diff(["a", "b", "c"])).toEqual(["a", "b", "c"]);
            });
            test("should iterate over sparse arguments", (): void => {
                expect(ArrayUtil.diff(["a", "b", "c"], null as unknown, ["a", "b"])).toEqual(["c"]);
            });
        });
        describe("> Flatten", (): void => {
            test("should do nothing on already flat array", (): void => {
                expect(ArrayUtil.flatten(["a", "b", "c", "d", "e"])).toEqual(["a", "b", "c", "d", "e"]);
            });
            test("flatten simple nested array", (): void => {
                expect(ArrayUtil.flatten(["a", "b", ["c"], "d", ["e"]])).toEqual(["a", "b", "c", "d", "e"]);
            });
            test("flatten complex nested array", (): void => {
                expect(ArrayUtil.flatten(["a", "b", ["c", ["d", ["e", "f"], "g"], "h"]])).toEqual([
                    "a",
                    "b",
                    "c",
                    "d",
                    "e",
                    "f",
                    "g",
                    "h",
                ]);
            });
            test("flatten multiple simple nested arrays", (): void => {
                expect(
                    ArrayUtil.flatten([1, 2, [3, [4, 5], 6, [7, [8]]]], [[[[9, 10], 11], 12, 13, 14, 15], 16])
                ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
            });
            test("flatten multiple complex nested arrays", (): void => {
                expect(
                    ArrayUtil.flatten(
                        [[0, [1], 2, [[3, 4], 5]], 6],
                        [7, [[[[8, 9], 10], 11], 12], 13, 14],
                        [15, 16, [[17], 18, [[19], 20]]]
                    )
                ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
            });
            test("flatten more complex cases", (): void => {
                expect(ArrayUtil.flatten(["a", [[[[[[[["b", [["c"]]]]]], "d", ["e"]]]]]])).toEqual([
                    "a",
                    "b",
                    "c",
                    "d",
                    "e",
                ]);
                expect(ArrayUtil.flatten(["a", "b", ["c"], "d", ["e"]])).toEqual(["a", "b", "c", "d", "e"]);
                expect(
                    ArrayUtil.flatten(
                        [
                            "a",
                            [
                                "b",
                                [
                                    "k",
                                    [
                                        "a",
                                        [
                                            "b",
                                            ["c"],
                                            [
                                                [
                                                    "a",
                                                    [
                                                        [
                                                            "a",
                                                            [
                                                                "b",
                                                                [
                                                                    "k",
                                                                    [
                                                                        "a",
                                                                        ["b", ["c"]],
                                                                        [
                                                                            "a",
                                                                            [
                                                                                "x",
                                                                                ["c"],
                                                                                ["a", ["x", ["k"]]],
                                                                                ["d", ["z"]],
                                                                            ],
                                                                        ],
                                                                        ["d", ["m"]],
                                                                    ],
                                                                    ["d", ["e"]],
                                                                ],
                                                            ],
                                                        ],
                                                        ["d", ["e"]],
                                                    ],
                                                    [
                                                        "b",
                                                        [
                                                            "k",
                                                            [
                                                                "a",
                                                                ["b", ["c"]],
                                                                ["a", ["x", ["c"], ["a", ["x", ["k"]]], ["d", ["z"]]]],
                                                                ["d", ["m"]],
                                                            ],
                                                            ["d", ["e"]],
                                                        ],
                                                    ],
                                                ],
                                                ["d", ["e"]],
                                            ],
                                        ],
                                        [
                                            "a",
                                            [
                                                "x",
                                                ["c"],
                                                [
                                                    "a",
                                                    ["x", ["k"]],
                                                    [
                                                        [
                                                            "a",
                                                            [
                                                                "b",
                                                                [
                                                                    "k",
                                                                    [
                                                                        "a",
                                                                        ["b", ["c"]],
                                                                        [
                                                                            "a",
                                                                            [
                                                                                "x",
                                                                                ["c"],
                                                                                ["a", ["x", ["k"]]],
                                                                                ["d", ["z"]],
                                                                            ],
                                                                        ],
                                                                        ["d", ["m"]],
                                                                    ],
                                                                    ["d", ["e"]],
                                                                ],
                                                            ],
                                                        ],
                                                        ["d", ["e"]],
                                                    ],
                                                ],
                                                ["d", ["z"]],
                                            ],
                                        ],
                                        ["d", ["m"]],
                                    ],
                                    ["d", ["e"]],
                                ],
                            ],
                        ],
                        ["d", ["e"]]
                    )
                ).toEqual([
                    "a",
                    "b",
                    "k",
                    "a",
                    "b",
                    "c",
                    "a",
                    "a",
                    "b",
                    "k",
                    "a",
                    "b",
                    "c",
                    "a",
                    "x",
                    "c",
                    "a",
                    "x",
                    "k",
                    "d",
                    "z",
                    "d",
                    "m",
                    "d",
                    "e",
                    "d",
                    "e",
                    "b",
                    "k",
                    "a",
                    "b",
                    "c",
                    "a",
                    "x",
                    "c",
                    "a",
                    "x",
                    "k",
                    "d",
                    "z",
                    "d",
                    "m",
                    "d",
                    "e",
                    "d",
                    "e",
                    "a",
                    "x",
                    "c",
                    "a",
                    "x",
                    "k",
                    "a",
                    "b",
                    "k",
                    "a",
                    "b",
                    "c",
                    "a",
                    "x",
                    "c",
                    "a",
                    "x",
                    "k",
                    "d",
                    "z",
                    "d",
                    "m",
                    "d",
                    "e",
                    "d",
                    "e",
                    "d",
                    "z",
                    "d",
                    "m",
                    "d",
                    "e",
                    "d",
                    "e",
                ]);
            });
        });
        describe("> Intersect", (): void => {
            test("should intersect array", (): void => {
                expect(ArrayUtil.intersect(["a", "b", "c"], ["b", "c", "e"])).toEqual(["b", "c"]);
                expect(ArrayUtil.intersect(["x", "b", "c", "e", "y"], ["b", "x", "e"])).toEqual(["x", "b", "e"]);
                expect(ArrayUtil.intersect(["x", "x"], ["a", "b", "c"])).toEqual([]);
                expect(ArrayUtil.intersect(["x"], ["a", "b", "c"])).toEqual([]);
                expect(ArrayUtil.intersect(["x", "b", "b", "b", "c", "e", "y"], ["x", "e"])).toEqual(["x", "e"]);
            });
            test("should intersect all occurrences of an element", (): void => {
                expect(ArrayUtil.intersect(["a", "b", "b", "b", "b"], ["b"])).toEqual(["b"]);
            });
            test("should not modify the input array", (): void => {
                const arr = ["x", "b", "b", "b", "c", "e", "y"];
                const init = arr.slice();
                ArrayUtil.intersect(arr, ["x", "e"]);
                expect(arr).toEqual(init);
            });
            test("should intersect elements from multiple arrays", (): void => {
                expect(ArrayUtil.intersect(["a", "b", "c"], ["a", "b"], ["b"])).toEqual(["b"]);
            });
            test("should return an empty array if the second array is empty", (): void => {
                expect(ArrayUtil.intersect(["a", "b", "c"], [])).toEqual([]);
            });
            test("should return the first array if no other args are passed", (): void => {
                expect(ArrayUtil.intersect(["a", "b", "c"])).toEqual(["a", "b", "c"]);
            });
            test("should iterate over sparse arguments (ignore non-array)", (): void => {
                expect(ArrayUtil.intersect(["a", "b", "c"], null as never, ["a", "b"])).toEqual(["a", "b"]);
            });
        });
        describe("> Unique", (): void => {
            test("should return an array with unique values", (): void => {
                expect(ArrayUtil.unique(["a", "b", "c", "a", "b", "d"])).toEqual(["a", "b", "c", "d"]);
                expect(ArrayUtil.unique(["a", "b", "c", "a", "b", "a", "b", "c", "b", "f", "a", "b"])).toEqual([
                    "a",
                    "b",
                    "c",
                    "f",
                ]);
                expect(
                    ArrayUtil.unique([
                        "a",
                        "b",
                        "c",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                        "a",
                        "b",
                        "a",
                        "b",
                        "b",
                        "f",
                        "a",
                        "b",
                        "x",
                        "y",
                        "z",
                        "a",
                        "b",
                    ])
                ).toEqual(["a", "b", "c", "f", "x", "y", "z"]);
                expect(
                    ArrayUtil.unique([
                        "foo/bar/baz/quux/fez/test/fixtures",
                        "foo/bar/baz/quux/fez/test/fixtures",
                        "foo/bar/baz/quux/fez/test/fixtures/a.js",
                        "foo/bar/baz/quux/fez/test/fixtures",
                        "foo/bar/baz/quux/fez/test/fixtures",
                        "foo/bar/baz/quux/fez/test/fixtures/b.js",
                        "foo/bar/baz/quux/fez/test/fixtures/b.js",
                        "foo/bar/baz/quux/fez/test/fixtures",
                        "foo/bar/baz/quux/fez/test/fixtures",
                        "foo/bar/baz/quux/fez/test/fixtures/a.js",
                        "foo/bar/baz/quux/fez/test/fixtures/j.js",
                        "foo/bar/baz/quux/fez/test/fixtures/z.js",
                        "foo/bar/baz/quux/fez/test/fixtures/c.js",
                        "foo/bar/baz/quux/fez/test/fixtures/d.js",
                        "foo/bar/baz/quux/fez/test/fixtures",
                        "foo/bar/baz/quux/fez/test/fixtures/a.js",
                        "foo/bar/baz/quux/fez/test/fixtures",
                        "foo/bar/baz/quux/fez/test/fixtures/h.js",
                        "foo/bar/baz/quux/fez/test/fixtures/i.js",
                        "foo/bar/baz/quux/fez/test/fixtures/j.js",
                        "foo/bar/baz/quux/fez/test/fixtures/k.js",
                        "foo/bar/baz/quux/fez/test/fixtures/l.js",
                        "foo/bar/baz/quux/fez/test/fixtures/m.js",
                        "foo/bar/baz/quux/fez/test/fixtures",
                        "foo/bar/baz/quux/fez/test/fixtures/a.js",
                    ])
                ).toEqual([
                    "foo/bar/baz/quux/fez/test/fixtures",
                    "foo/bar/baz/quux/fez/test/fixtures/a.js",
                    "foo/bar/baz/quux/fez/test/fixtures/b.js",
                    "foo/bar/baz/quux/fez/test/fixtures/j.js",
                    "foo/bar/baz/quux/fez/test/fixtures/z.js",
                    "foo/bar/baz/quux/fez/test/fixtures/c.js",
                    "foo/bar/baz/quux/fez/test/fixtures/d.js",
                    "foo/bar/baz/quux/fez/test/fixtures/h.js",
                    "foo/bar/baz/quux/fez/test/fixtures/i.js",
                    "foo/bar/baz/quux/fez/test/fixtures/k.js",
                    "foo/bar/baz/quux/fez/test/fixtures/l.js",
                    "foo/bar/baz/quux/fez/test/fixtures/m.js",
                ]);
            });
            test("should remove duplicates", (): void => {
                const source = ["a", 1, 2, "c", "b", 2, 1, "b", "c"];
                const result = ArrayUtil.unique(source);
                // should not affect original array
                expect(source).toHaveLength(9);
                // duplicates are removed from end of array!
                expect(result).toEqual(["a", 1, 2, "c", "b"]);
            });
            test("should support custom compare function", (): void => {
                const arr = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];
                const result = ArrayUtil.uniqueFilter(arr, (a, b): boolean => {
                    return a.name === b.name;
                });
                // note that it removes duplicates from end of array
                expect(result).toEqual(arr.slice(0, 2));
            });
        });
        describe("> Range", (): void => {
            test("should create a numeric range array", (): void => {
                expect(ArrayUtil.range(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
            });
            test("should create a string range array", (): void => {
                expect(ArrayUtil.range("a", "g")).toEqual(["a", "b", "c", "d", "e", "f", "g"]);
            });
            test("should create a numeric range array with step equal 4", (): void => {
                expect(ArrayUtil.range(0, 21, 4)).toEqual([0, 4, 8, 12, 16, 20]);
            });
            test("should create a numeric string range array with padding", (): void => {
                expect(ArrayUtil.range("01", "05")).toEqual(["01", "02", "03", "04", "05"]);
            });
            test("should create an inverse numeric range array", (): void => {
                expect(ArrayUtil.range(5, 0)).toEqual([5, 4, 3, 2, 1, 0]);
            });
            test("should create an inverse string range array", (): void => {
                expect(ArrayUtil.range("g", "a")).toEqual(["g", "f", "e", "d", "c", "b", "a"]);
            });
            test("should create an inverse numeric range array with step equal 4", (): void => {
                expect(ArrayUtil.range(21, 0, 4)).toEqual([21, 17, 13, 9, 5, 1]);
            });
        });
        describe("> RangeFromString", (): void => {
            test("should create a numeric range array", (): void => {
                expect(ArrayUtil.rangeFromString("0..5")).toEqual(["0", "1", "2", "3", "4", "5"]);
            });
            test("should create a string range array", (): void => {
                expect(ArrayUtil.rangeFromString("a..g")).toEqual(["a", "b", "c", "d", "e", "f", "g"]);
            });
            test("should create a numeric range array with step equal 4", (): void => {
                expect(ArrayUtil.rangeFromString("0..21..4")).toEqual(["0", "4", "8", "12", "16", "20"]);
            });
            test("should create a numeric string range array with padding", (): void => {
                expect(ArrayUtil.rangeFromString("01..05")).toEqual(["01", "02", "03", "04", "05"]);
            });
            test("should create an inverse numeric range array", (): void => {
                expect(ArrayUtil.rangeFromString("5..0")).toEqual(["5", "4", "3", "2", "1", "0"]);
            });
            test("should create an inverse string range array", (): void => {
                expect(ArrayUtil.rangeFromString("g..a")).toEqual(["g", "f", "e", "d", "c", "b", "a"]);
            });
            test("should create an inverse numeric range array with step equal 4", (): void => {
                expect(ArrayUtil.rangeFromString("21..0..4")).toEqual(["21", "17", "13", "9", "5", "1"]);
            });
        });
    });
});
