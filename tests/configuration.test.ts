/**
 * @project util
 * @filename configurations.js
 * @description configurations methods test
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016  Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 04-03-2016.
 * @version 0.0.1
 * @since 0.0.1
 */

import * as Configuration from "../src/configuration";

describe("Utilities", (): void => {
    describe("> Configurations", (): void => {
        describe("> getProperty", (): void => {
            test("should get property values", (): void => {
                expect(Configuration.getProperty({ a: 1 }, "a")).toBe(1);
            });
            test("should get deep property values", (): void => {
                expect(Configuration.getProperty({ a: { b: { c: 3 } } }, "a.b.c")).toBe(3);
            });
            test("should get deep property values with []", (): void => {
                expect(Configuration.getProperty({ a: { b: [{ c: 5 }] } }, "a.b.[0].c")).toBe(5);
            });
            test("should get a key over a path", (): void => {
                const obj = { "a.b.c": 3, a: { b: { c: 4 } } };
                expect(Configuration.getProperty(obj, "a.b.c")).toBe(3);
            });
            test("should not coerce array paths to strings", (): void => {
                const obj = { "a,b,c": 3, a: { b: { c: 4 } } };
                expect(Configuration.getProperty(obj, ["a", "b", "c"])).toBe(4);
            });
            test("should handle empty paths", (): void => {
                expect(Configuration.getProperty({}, "")).toBeUndefined();
                expect(Configuration.getProperty({ "": 3 }, "")).toBe(3);
            });
            test("should handle complex paths in array mode", (): void => {
                const object = { a: { "-1.23": { '["b"]': { c: { "['d']": { "\ne\n": { f: { g: 8 } } } } } } } };
                const path = ["a", "-1.23", '["b"]', "c", "['d']", "\ne\n", "f", "g"];
                expect(Configuration.getProperty(object, path)).toBe(8);
            });
            test("should return `undefined` when `object` is nullish", (): void => {
                expect(Configuration.getProperty(null as never, "constructor")).toBeUndefined();
                expect(Configuration.getProperty(undefined as never, "constructor")).toBeUndefined();
            });
            test("should return `undefined` with deep paths when `object` is nullish", (): void => {
                const values = [null, undefined];
                const path = "constructor.prototype.valueOf";
                values.forEach((value): unknown =>
                    expect(Configuration.getProperty(value as never, path)).toBeUndefined()
                );
            });
            test("should return `undefined` if parts of `path` are missing", (): void => {
                // eslint-disable-next-line no-sparse-arrays
                expect(Configuration.getProperty({ a: [, null] }, "a[1].b.c")).toBeUndefined();
            });
            test("should be able to return `null` values", (): void => {
                const object = { a: { b: null } };
                expect(Configuration.getProperty(object, "a.b")).toBeNull();
            });
            test("should follow `path` over non-plain objects", (): void => {
                const path = "constructor.prototype.a";
                const fn = function abc() {
                    //empty
                };
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                fn.prototype.a = 1;
                const f = new (fn as FunctionConstructor)();
                expect(Configuration.getProperty(f, path)).toBe(1);
            });
            test("should return the default value for `undefined` values", (): void => {
                const object = { a: {} };
                // eslint-disable-next-line no-sparse-arrays
                const values = [, [], {}, "", 0, false, null, undefined, true, new Date(), 1, /x/, "a"];
                values.forEach((val): unknown => expect(Configuration.getProperty(object, "a.b.c", val)).toBe(val));
            });
        });
        describe("> setProperty", (): void => {
            test("should set property values", (): void => {
                expect(Configuration.setProperty({}, "a", 1)).toEqual({ a: 1 });
            });
            test("should set deep property values", (): void => {
                expect(Configuration.setProperty({}, "a.b.c", 3)).toEqual({ a: { b: { c: 3 } } });
            });
            test("should set deep property values with []", (): void => {
                expect(Configuration.setProperty({}, "a.b.[0].c", 5)).toEqual({ a: { b: [{ c: 5 }] } });
            });
            test("should set deep property values with [] not separated", (): void => {
                expect(Configuration.setProperty({ a: { b: [{ c: 5 }] } }, "a.b[1].c", 6)).toEqual({
                    a: { b: [{ c: 5 }, { c: 6 }] },
                });
            });
            test("should set a key over a path", (): void => {
                expect(Configuration.setProperty({}, ["a.b.c"], 3)).toEqual({ "a.b.c": 3 });
            });
            test("should not coerce array paths to strings", (): void => {
                expect(Configuration.setProperty({}, ["a", "b", "c"], 4)).toEqual({ a: { b: { c: 4 } } });
            });
            test("should handle empty paths", (): void => {
                expect(Configuration.setProperty({}, "", null)).toEqual({ "": null });
            });
            test("should handle complex paths in array mode", (): void => {
                const object = { a: { "-1.23": { '["b"]': { c: { "['d']": { "\ne\n": { f: { g: 8 } } } } } } } };
                const path = ["a", "-1.23", '["b"]', "c", "['d']", "\ne\n", "f", "g"];
                expect(Configuration.setProperty({}, path, 8)).toEqual(object);
            });
            test("should handle null and undefined objects", (): void => {
                expect(Configuration.setProperty(null as never, "a", 1)).toBeNull();
                expect(Configuration.setProperty(undefined as never, "constructor", 2)).toBeUndefined();
            });
            test("should set complex properties", (): void => {
                // eslint-disable-next-line no-sparse-arrays
                expect(Configuration.setProperty({ a: [, null] }, "a[3].b.c", 3)).toEqual({
                    // eslint-disable-next-line no-sparse-arrays
                    a: [, null, , { b: { c: 3 } }],
                });
            });
            test("should be able to return `null` values", (): void => {
                const object = { a: { b: null } };
                expect(Configuration.setProperty({}, "a.b", null)).toEqual(object);
            });
            test("should follow `path` over non-plain objects", (): void => {
                const path = "constructor.prototype.a";
                const fn = function abc() {
                    //empty
                };
                const f = new (fn as FunctionConstructor)();
                expect(Configuration.setProperty(f, path, 1)).toEqual(f);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                expect(fn.prototype.a).toBe(1);
            });
        });
    });
});
