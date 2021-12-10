import { TObject } from "../src/type";
import * as ObjectUtil from "../src/object_util";
import * as fs from "fs";

describe("Utilities", (): void => {
    describe("> ObjectUtil", (): void => {
        //TODO: tests for isEmpty
        test("toMap", (): void => {
            expect(ObjectUtil.toMap({ a: 1, b: 2, c: 3 })).toEqual(
                new Map<unknown, unknown>([
                    ["a", 1],
                    ["b", 2],
                    ["c", 3],
                ])
            );
            expect(
                ObjectUtil.toMap({
                    1: "a",
                    2: "b",
                    3: "c",
                })
            ).toEqual(
                new Map<unknown, unknown>([
                    ["1", "a"],
                    ["2", "b"],
                    ["3", "c"],
                ])
            );
        });
        test("fromMap", (): void => {
            expect(
                ObjectUtil.fromMap(
                    new Map<unknown, unknown>([
                        ["a", 1],
                        ["b", 2],
                        ["c", 3],
                    ])
                )
            ).toEqual({ a: 1, b: 2, c: 3 });
            expect(
                ObjectUtil.fromMap(
                    new Map<unknown, unknown>([
                        ["1", "a"],
                        ["2", "b"],
                        ["3", "c"],
                    ])
                )
            ).toEqual({ "1": "a", "2": "b", "3": "c" });
        });
        describe("cloneObject()", (): void => {
            test("object", (): void => {
                const src = {};
                const result = ObjectUtil.cloneObject(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                const src1 = { foo: { bar: "baz" } };
                const result1 = ObjectUtil.cloneObject(src1);
                expect(result1).not.toBe(src1);
                expect(result1).toEqual(src1);
                expect(result1.foo).toBe(src1.foo);
                const src2 = { arr1: [{ a: "1234", b: "2345" }], arr2: [{ c: "345", d: "456" }], arr3: [1, 2, 3] };
                Object.defineProperty(src2, "arr3", {
                    enumerable: false,
                });
                const result2 = ObjectUtil.cloneObject(src2);
                expect(result2).toEqual(src2);
                expect(Object.prototype.hasOwnProperty.call(result2, "arr3")).toBeTruthy();
                Object.defineProperty(src2, "arr1", {
                    writable: false,
                });
                const result3 = ObjectUtil.cloneObject(src2);
                expect(result3).toEqual(src2);
                expect(result3.arr1[0]).toBe(src2.arr1[0]);
                expect(Object.prototype.hasOwnProperty.call(result3, "arr1")).toBeTruthy();
            });
            test("objects created with custom constructor", (): void => {
                class TestType {
                    public value: number;
                    public constructor() {
                        this.value = 2;
                    }
                    public get val(): number {
                        return 1;
                    }
                }

                const src = new TestType();
                const result = ObjectUtil.cloneObject(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                expect(Object.getPrototypeOf(result)).toBe(Object.getPrototypeOf(src));
                expect(result.value).toBe(src.value);
                expect(result.val).toBe(src.val);
                expect(result.val).toBe(1);
            });
            test("objects with circular reference", (): void => {
                const c: Array<unknown> &
                    Partial<{ loop: Partial<{ loop: Partial<{ aloop: unknown }> }>; aloop: unknown }> = [
                    1,
                    "foo",
                    { hello: "bar" },
                    function () {
                        //empty
                    },
                    false,
                    [2],
                ];
                const b = [c, 2, 3, 4];
                const a: { b: typeof b; c: typeof c; loop?: unknown; loop2?: unknown } = { b: b, c: c };
                a.loop = a;
                a.loop2 = a;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                (c as any).loop = c;
                c.aloop = a;
                const resultA = ObjectUtil.cloneObject(a);
                expect(resultA).not.toBe(a);
                expect(resultA).toEqual(a);
                //only object is cloned not inner properties check: deepClone
                expect(resultA.c).toBe(a.c);
                expect(resultA.c).toBe(resultA.b[0]);
                expect(resultA.c.loop?.loop?.aloop).toBe(a);
                expect(resultA.c[0]).toBe(a.c[0]);
            });
            test("custom class extend map", (): void => {
                let overridingMethodWasCalled = false;

                class MapExtender extends Map {
                    public defaultFactory: string;

                    public constructor(defaultFactory: string) {
                        super();
                        this.defaultFactory = defaultFactory;
                    }

                    public override get(key: string): unknown {
                        overridingMethodWasCalled = true;
                        if (!this.has(key)) {
                            const value = this.defaultFactory;
                            this.set(key, value);
                            return value;
                        } else {
                            return super.get(key);
                        }
                    }
                }

                const defaultValue = "placeholder";
                const src = new MapExtender(defaultValue);
                const result = ObjectUtil.cloneObject(src);
                expect(result).toBeInstanceOf(MapExtender);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                expect(result.size).toBe(src.size);
                expect(overridingMethodWasCalled).toBeFalsy();
                const value = result.get("nonExistingKey");
                expect(overridingMethodWasCalled).toBeTruthy();
                expect(value).toBe(defaultValue);
                expect(result.size).not.toBe(src.size);
            });
            test("node fs object", (): void => {
                const copy = ObjectUtil.cloneObject(fs);
                expect(copy).not.toBe(fs);
                expect(copy.constants).toBe(fs.constants);
            });
        });
        describe("deepCloneObject()", (): void => {
            test("object", (): void => {
                let src: TObject = {};
                let result = ObjectUtil.deepCloneObject(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                src = { foo: { bar: "baz" } };
                result = ObjectUtil.deepCloneObject(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                expect(result["foo"]).not.toBe(src["foo"]);
                expect(result["foo"]).toEqual(src["foo"]);
                src = { arr1: [{ a: "1234", b: "2345" }], arr2: [{ c: "345", d: "456" }], arr3: [1, 2, 3] };
                Object.defineProperty(src, "arr3", {
                    enumerable: false,
                });
                result = ObjectUtil.deepCloneObject(src);
                expect(result).toEqual(src);
                expect(Object.prototype.hasOwnProperty.call(result, "arr3")).toBeTruthy();
            });
            test("objects created with custom constructor", (): void => {
                class TestType {
                    public value: number;
                    public constructor() {
                        this.value = 2;
                    }
                    public get val(): number {
                        return 1;
                    }
                }

                const src = new TestType();
                const result = ObjectUtil.deepCloneObject(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                expect(Object.getPrototypeOf(result)).toBe(Object.getPrototypeOf(src));
                expect(result.value).toBe(src.value);
                expect(result.val).toBe(src.val);
                expect(result.val).toBe(1);
            });
        });
    });
});
