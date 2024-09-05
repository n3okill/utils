/**
 * @project util
 * @filename mixers.js
 * @description test mixer methods of util
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 03-03-2016.
 * @version 0.0.1
 * @since 0.0.1
 */

import { describe, test, expect, beforeEach } from "@jest/globals";
import * as Mixers from "../src/mixers";

describe("Utilities", (): void => {
    describe("> Mixers", (): void => {
        describe("> mixIn", (): void => {
            let a1: { [key: string]: unknown },
                a2: { [key: string]: unknown },
                a3: { [key: string]: unknown },
                a4: { [key: string]: unknown },
                a14: { [key: string]: unknown },
                b1: { [key: string]: unknown },
                b2: { [key: string]: unknown },
                b12: { [key: string]: unknown };

            beforeEach((): void => {
                a1 = { a: 0, b: 1, c: 2 };
                a2 = { d: 3, e: 4 };
                a3 = { f: 5 };
                a4 = { g: 6 };
                a14 = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6 };

                b1 = { a: 1, b: 2, c: 3 };
                b2 = { b: 4, d: 8 };
                b12 = { a: 1, b: 4, c: 3, d: 8 };
            });

            test("should combine objects properties and modify original object", (): void => {
                Mixers.mixIn(a1, a2, a3, a4);
                expect(a1).toEqual(a14);

                const r = Mixers.mixIn(b1, b2);
                expect(r).toEqual(b12);
                expect(r).toMatchObject(b1);
            });

            test("should work with empty objects", (): void => {
                expect(Mixers.mixIn({}, b1, b2, {})).toEqual(b12);
            });

            test("should ignore null/undefined values", (): void => {
                expect(Mixers.mixIn(b1, null, undefined, b2)).toEqual(b12);
            });

            test("should fix don't enum bug on IE", (): void => {
                const a = {
                    hasOwnProperty: "foo",
                };
                const b = {
                    a: 1,
                    b: 2,
                    toString: "dolor",
                    hasOwnProperty: "bar",
                };
                const r = Mixers.mixIn(a, b) as Partial<typeof a & typeof b>;
                expect(r.hasOwnProperty).toBe("bar");
                expect(r.toString).toBe("dolor");
                expect(r.a).toBe(1);
                expect(r.b).toBe(2);
            });
        });
        describe("> DeepMixIn", (): void => {
            test("should mix properties into target", (): void => {
                const target = {
                    foo: true,
                };
                Mixers.deepMixIn(target, { bar: true });
                expect(target).toEqual({
                    foo: true,
                    bar: true,
                });
            });
            test("should mix in multiple objects", (): void => {
                const target = {};
                Mixers.deepMixIn(target, { foo: true }, { bar: true });
                expect(target).toEqual({
                    foo: true,
                    bar: true,
                });
            });
            test("should return target object", (): void => {
                const target = {};
                const result = Mixers.deepMixIn(target, { foo: true });
                expect(result).toEqual(target);
            });
            test("should mix in child objects", (): void => {
                const target = {
                    foo: { bar: "a" },
                };
                Mixers.deepMixIn(target, { foo: { bar: "b" } });
                expect(target.foo.bar).toBe("b");
            });
            test("should keep original child objects", (): void => {
                const foo = { foo: true };
                const target: { foo: Partial<typeof foo & { bar: boolean }> } = { foo: foo };
                Mixers.deepMixIn(target, { foo: { bar: true } });
                expect(target.foo).toEqual(foo);
                expect(target.foo.foo).toBeTruthy();
                expect(target.foo.bar).toBeTruthy();
            });
            test("should keep added child objects", (): void => {
                const foo = { foo: true };
                const target: Partial<typeof foo> = {};
                Mixers.deepMixIn(target, { foo: foo });
                expect(target.foo).toEqual(foo);
            });
            test("should overwrite existing values in target if value is not an object", (): void => {
                const target = {
                    foo: { a: true },
                    bar: [1, 2, 3],
                };
                // important to test against null
                Mixers.deepMixIn(target, { foo: null, bar: 1 });

                expect(target.foo).toBeNull();
                expect(target.bar).toBe(1);
            });
            test("should copy values that are not plain objects by reference", (): void => {
                function Custom() {
                    //empty
                }

                const source = {
                    custom: Custom(),
                    items: [1, 2, 3],
                    regexp: /test/,
                };

                const target: Partial<typeof source> = {
                    items: [5],
                };

                Mixers.deepMixIn(target, source);
                expect(target.custom).toEqual(source.custom);
                expect(target.items).toEqual(source.items);
                expect(target.regexp).toEqual(source.regexp);
            });
        });
        describe("> DeepFillIn", (): void => {
            test("should copy missing properties", (): void => {
                const a = {
                    foo: "bar",
                    lorem: 123,
                    b: {
                        c: "d",
                    },
                };
                const obj = Mixers.deepFillIn({ lorem: "ipsum" }, a);
                expect(obj.foo).toBe("bar");
                expect(obj.lorem).toBe("ipsum");
                expect(obj.b).toEqual(a.b);
            });
            test("should copy nested properties", (): void => {
                const a = {
                    foo: "bar",
                    lorem: 123,
                    b: {
                        e: undefined,
                        c: "d",
                        dolor: {
                            "3": 789,
                        },
                    },
                };
                const b = {
                    e: "f",
                    dolor: {
                        "1": 456,
                    },
                };
                const obj = Mixers.deepFillIn(
                    {
                        lorem: "ipsum",
                        b: b,
                    },
                    a,
                );
                expect(obj.foo).toBe("bar");
                expect(obj.lorem).toBe("ipsum");
                expect(obj.b).toEqual(b);
                expect(obj.b.c).toBe("d");
                expect(obj.b.e).toBe("f");
                expect(obj.b.dolor).toEqual(b.dolor);
                expect(obj.b.dolor).toHaveProperty("1", 456);
                expect(obj.b.dolor).toHaveProperty("3", 789);
            });
            test("should allow multiple default objects", (): void => {
                const a = { lorem: "ipsum", dolor: { sit: "amet" } };
                const b = { foo: "bar", lorem: "dolor", dolor: { sit: 456, it: 78 } };
                const c = { num: 123, foo: null, dolor: { maecennas: "ullamcor" } };
                const obj = Mixers.deepFillIn(a, b, c);
                expect(obj).toEqual({
                    lorem: "ipsum",
                    dolor: {
                        sit: "amet",
                        it: 78,
                        maecennas: "ullamcor",
                    },
                    foo: "bar",
                    num: 123,
                });
            });
            test("should copy values that are not plain objects by reference", (): void => {
                function Custom() {
                    //empty
                }

                const defaults = {
                    custom: Custom(),
                    items: [1, 2, 3],
                };
                const target: Partial<typeof defaults> = {};
                Mixers.deepFillIn(target, defaults);
                expect(target.custom).toEqual(defaults.custom);
                expect(target.items).toEqual(defaults.items);
            });
        });
        describe("> merge", (): void => {
            test("should merge object properties without affecting any object", (): void => {
                const obj1 = { a: 0, b: 1 };
                const obj2 = { c: 2, d: 3 };
                const obj3 = { a: 4, d: 5 };
                const out = { a: 4, b: 1, c: 2, d: 5 };
                expect(Mixers.merge(obj1, obj2, obj3)).toEqual(out);
                expect(out).not.toBe(obj1);
                expect(out).not.toBe(obj2);
                expect(out).not.toBe(obj3);
            });
            test("should do a deep merge", (): void => {
                const obj1 = { a: { b: 1, c: 1, d: { e: 1, f: 1 } } };
                const obj2 = { a: { b: 2, d: { f: "yeah" } } };
                expect(Mixers.merge(obj1, obj2)).toEqual({ a: { b: 2, c: 1, d: { e: 1, f: "yeah" } } });
            });
            test("should not clone objects during merge", (): void => {
                const obj1 = { a: { b: 1 } };
                const obj2 = { a: { c: 2 } };
                const out = Mixers.merge(obj1, obj2);
                expect(out).toEqual({ a: { b: 1, c: 2 } });
                expect(out.a).toBe(obj1.a);
                expect(out.a).not.toBe(obj2.a);
            });
            test("should not deep clone arrays during merge", (): void => {
                const obj1 = { a: [1, 2, [3, 4]] };
                const obj2 = { b: [5, 6] };
                const out = Mixers.merge(obj1, obj2);
                expect(out.a).toEqual([1, 2, [3, 4]]);
                expect(out.a).toBe(obj1.a);
                expect(out.a[2]).toEqual([3, 4]);
                expect(out.a[2]).toBe(obj1.a[2]);
                expect(out.b).toEqual(obj2.b);
            });
        });
    });
});
