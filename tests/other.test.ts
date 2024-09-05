import { describe, test, expect } from "@jest/globals";
import * as Other from "../src/other";

describe("Utilities", (): void => {
    describe("> Other", (): void => {
        describe("cloneBuffer()", (): void => {
            test("buffer", (): void => {
                const src = Buffer.from("this is a test buffer");
                const result = Other.cloneBuffer(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
            });
            test("transform", (): void => {
                const src = Buffer.from("this is a test buffer");
                const ret = Buffer.from("hi!");
                const result = Other.cloneBuffer(src, () => ret);
                expect(result).not.toBe(src);
                expect(result).toBe(ret);
            });
        });
        describe("cloneDate()", (): void => {
            test("date", (): void => {
                const src = new Date();
                const result = Other.cloneDate(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                expect(!!src.getUTCDate && !!src.toUTCString).toBeTruthy();
                expect(!!result.getUTCDate && !!result.toUTCString).toBeTruthy();
                expect(src.getTime()).toBe(result.getTime());
            });
            test("transform", (): void => {
                const src = new Date();
                const ret = new Date(2000, 1, 1);
                const result = Other.cloneDate(src, () => ret);
                expect(result).not.toBe(src);
                expect(result).toEqual(ret);
                expect(!!src.getUTCDate && !!src.toUTCString).toBeTruthy();
                expect(!!result.getUTCDate && !!result.toUTCString).toBeTruthy();
                expect(result.getTime()).not.toBe(src.getTime());
                expect(result.getTime()).toBe(ret.getTime());
            });
        });
        describe("cloneError()", (): void => {
            test("error", (): void => {
                const src = new Error("Boom!!!");
                const result = Other.cloneError(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                expect(result).toBeInstanceOf(Error);
                expect(result.message).toBe(src.message);
            });
            test("transform", (): void => {
                const src = new Error("Boom!!!");
                const ret = new Error("Hi!");
                const result = Other.cloneError(src, () => ret);
                expect(result).not.toBe(src);
                expect(result).toBe(ret);
                expect(result).toBeInstanceOf(Error);
                expect(result.message).toBe(ret.message);
            });
        });
        // eslint-disable-next-line jest/no-commented-out-tests
        /*describe("cloneFunction()", () => {
            test.skip("cloneFunction");
         });*/
        describe("cloneMap()", (): void => {
            test("map", (): void => {
                const src = new Map<unknown, unknown>();
                // simple key/value
                src.set("foo", "bar");
                // circular object key/property
                src.set(src, src);
                src.set("bar", "baz");
                src.set("circle", src);
                const result = Other.cloneMap(src);
                expect(result).not.toBe(src);
                expect(result.get("foo")).toBe("bar");
                expect(result.get(src)).toBe(src);
                expect(result.get("bar")).toBe("baz");
                expect(result.get("circle")).toBe(src);
            });
            test("transform", (): void => {
                const src = new Map<unknown, unknown>();
                // simple key/value
                src.set("foo", "bar");
                // circular object key/property
                src.set(src, src);
                src.set("bar", "baz");
                src.set("circle", src);
                const result = Other.cloneMap(src, (val, key) => (key === "bar" ? "Hi!" : val));
                expect(result).not.toBe(src);
                expect(result.get("foo")).toBe("bar");
                expect(result.get(src)).toBe(src);
                expect(result.get("bar")).toBe("Hi!");
                expect(result.get("circle")).toBe(src);
            });
        });
        describe("deepCloneMap()", (): void => {
            test("map", (): void => {
                const src = new Map<unknown, unknown>();
                // simple key/value
                src.set("foo", "bar");
                // circular object key/property
                src.set(src, src);
                src.set("bar", "baz");
                src.set("circle", src);
                const result = Other.deepCloneMap(src);
                expect(result).not.toBe(src);
                expect(result.get("foo")).toBe("bar");
                expect(result.get(src)).toBe(result);
                expect(result.get("bar")).toBe("baz");
                expect(result.get("circle")).toBe(result);
            });
            test("transform", (): void => {
                const src = new Map<unknown, unknown>();
                // simple key/value
                src.set("foo", "bar");
                // circular object key/property
                src.set(src, src);
                src.set("bar", "baz");
                src.set("circle", src);
                const result = Other.deepCloneMap(src, (val, key) => (key === "bar" ? "Hi!" : val));
                expect(result).not.toBe(src);
                expect(result.get("foo")).toBe("bar");
                expect(result.get(src)).toBe(result);
                expect(result.get("bar")).toBe("Hi!");
                expect(result.get("circle")).toBe(result);
            });
        });
        describe("clonePrimitive()", (): void => {
            test("number", (): void => {
                expect(Other.clonePrimitive(0)).toBe(0);
                expect(Other.clonePrimitive(1)).toBe(1);
                expect(Other.clonePrimitive(-10000)).toBe(-10000);
                expect(Other.clonePrimitive(3.1415927)).toBe(3.1415927);
                expect(Other.clonePrimitive(-3.1415927)).toBe(-3.1415927);
            });
            test("string", (): void => {
                expect(Other.clonePrimitive("foo")).toBe("foo");
                expect(Other.clonePrimitive("")).toBe("");
            });
            test("boolean", (): void => {
                expect(Other.clonePrimitive(true)).toBe(true);
                expect(Other.clonePrimitive(false)).toBe(false);
            });
            test("transform", (): void => {
                expect(Other.clonePrimitive(0, () => 1)).toBe(1);
                expect(Other.clonePrimitive("", () => "Hi!")).toBe("Hi!");
                expect(Other.clonePrimitive(true, () => false)).toBe(false);
            });
        });
        describe("clonePromise()", (): void => {
            test("promise", async (): Promise<void> => {
                expect.assertions(9);

                // Resolving to a value
                expect(await Other.clonePromise(Promise.resolve("foo"))).toBe("foo");

                // Rejecting to a value
                await expect(Other.clonePromise(Promise.reject(new Error("bar")))).rejects.toEqual(new Error("bar"));

                // Resolving to a promise
                expect(await Other.clonePromise(Promise.resolve(Promise.resolve("baz")))).toBe("baz");

                // Resolving to a circular value
                const circle: Partial<{ circle: unknown }> = {};
                circle.circle = circle;
                const result = await Other.clonePromise(Promise.resolve(circle));
                expect(result).not.toBe(circle);
                expect(result).toHaveProperty("circle", circle);

                type TPromise<T> = Promise<T> & {
                    circle: Promise<T>;
                    prop: string;
                };

                const promise = Promise.resolve("ok") as TPromise<string>;
                promise.circle = promise;
                promise.prop = "value";
                const clonedPromise = Other.clonePromise(promise) as TPromise<string>;
                expect(clonedPromise).not.toBe(promise);
                expect(clonedPromise.prop).toBe("value");
                //don't deep clone
                expect(clonedPromise.circle).toBe(promise);
                expect(await clonedPromise).toBe("ok");
            });
            test("promise transform", (): Promise<unknown> => {
                const circle: Record<string, unknown> = {};
                const triangle: string = "hi";
                const p1 = Promise.resolve(circle);
                const clone = Other.clonePromise(p1, () => triangle as unknown as Record<string, unknown>);
                return clone.then((val): void => {
                    expect(val).not.toBe(circle);
                    expect(val).toBe(triangle);
                });
            });
        });
        describe("deepClonePromise()", (): void => {
            test("deepClonePromise", (): Promise<unknown> => {
                const circle = {
                    forms: {
                        oval: "oval",
                    },
                };
                return Other.deepClonePromise(Promise.resolve(circle)).then((val) => {
                    expect(val.forms).not.toBe(circle.forms);
                });
            });
            test("deepClonePromise transform", (): Promise<unknown> => {
                const circle = {
                    forms: {
                        oval: "oval",
                    },
                };

                return Other.deepClonePromise(Promise.resolve(circle), (value: unknown, key?: unknown): unknown =>
                    key === "oval" ? "triangle" : value,
                ).then((val) => {
                    expect((val as typeof circle).forms.oval).toBe("triangle");
                });
            });
        });
        describe("cloneRegExp()", (): void => {
            test("regexp", (): void => {
                const src = /test/gim;
                const result = Other.cloneRegExp(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
                expect(result.source).toBe("test");
                expect(result.ignoreCase).toBeTruthy();
                expect(result.multiline).toBeTruthy();
                expect(result.global).toBeTruthy();
                const a = /abc123/gi;
                const b = Other.cloneRegExp(a);
                expect(b).toEqual(a);

                const c = /a/g;
                expect(c.lastIndex).toBe(0);

                c.exec("123a456a");
                expect(c.lastIndex).toBe(4);

                const d = Other.cloneRegExp(c);
                expect(d.global).toBeTruthy();
                expect(d.lastIndex).toBe(4);
            });
            test("transform", (): void => {
                const src = /test/gim;
                const result = Other.cloneRegExp(src, () => /Hi!/im);
                expect(result).not.toEqual(src);
                expect(result.source).toBe("Hi!");
                expect(result.ignoreCase).toBeTruthy();
                expect(result.multiline).toBeTruthy();
                expect(result.global).toBeFalsy();
            });
        });
        describe("cloneSet()", (): void => {
            test("set", (): void => {
                const src = new Set<unknown>();
                src.add("foo");
                src.add(src);

                const result = Other.cloneSet(src);
                expect(result).not.toBe(src);
                expect(result.has("foo")).toBeTruthy();
                //don't deep clone
                expect(result.has(src)).toBeTruthy();
                expect(result.has(result)).toBeFalsy();
            });
            test("transform", (): void => {
                const src = new Set<unknown>();
                src.add("foo");
                src.add(src);

                const result = Other.cloneSet(src, (val) => (val === "foo" ? "bar" : val));
                expect(result).not.toBe(src);
                expect(result.has("foo")).toBeFalsy();
                expect(result.has("bar")).toBeTruthy();
                //don't deep clone
                expect(result.has(src)).toBeTruthy();
                expect(result.has(result)).toBeFalsy();
            });
        });
        describe("deepCloneSet()", (): void => {
            test("set", (): void => {
                const src = new Set<unknown>();
                src.add("foo");
                src.add(src);

                const result = Other.deepCloneSet(src);
                expect(result).not.toBe(src);
                expect(result.has("foo")).toBeTruthy();
                //deep clone
                expect(result.has(result)).toBeTruthy();
                expect(result.has(src)).toBeFalsy();
            });
            test("transform", (): void => {
                const src = new Set<unknown>();
                src.add("foo");
                src.add(src);

                const result = Other.deepCloneSet(src, (val) => (val === "foo" ? "bar" : val));
                expect(result).not.toBe(src);
                expect(result.has("foo")).toBeFalsy();
                expect(result.has("bar")).toBeTruthy();
                //deep clone
                expect(result.has(result)).toBeTruthy();
                expect(result.has(src)).toBeFalsy();
            });
        });

        describe("cloneSymbol()", (): void => {
            test("objects with symbols", (): void => {
                const src = Symbol("foo");
                const result = Other.cloneSymbol(src);
                expect(result).not.toBe(src);
                expect(result.toString()).toBe(src.toString());
            });
        });
        describe("cloneTypedArray()", (): void => {
            test("typed arrays", (): void => {
                const src = new Uint8Array([1, 2, 3]);
                const result = Other.cloneTypedArray(src);
                expect(result).not.toBe(src);
                expect(result).toEqual(src);
            });
        });
    });
});
