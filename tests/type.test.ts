import { describe, test, expect } from "@jest/globals";
import * as Type from "../src/type";
import * as fs from "fs";

describe("Utilities", (): void => {
    describe("> Type", (): void => {
        describe("> kindOf", (): void => {
            //TODO: tests for isBlob
            test("should get the kind of value", (): void => {
                const kindOf = Type.kindOf;
                expect(kindOf("")).toBe("String");
                expect(kindOf("foo")).toBe("String");
                expect(kindOf(new String("lorem"))).toBe("String");
                expect(kindOf(String(123))).toBe("String");

                expect(kindOf(0)).toBe("Number");
                expect(kindOf(123)).toBe("Number");
                expect(kindOf(new Number(123))).toBe("Number");
                expect(kindOf(Number("123"))).toBe("Number");

                expect(kindOf(true)).toBe("Boolean");
                expect(kindOf(false)).toBe("Boolean");
                expect(kindOf(new Boolean(false))).toBe("Boolean");
                expect(kindOf(new Boolean(true))).toBe("Boolean");
                expect(kindOf(Boolean(0))).toBe("Boolean");
                expect(kindOf(Boolean(1))).toBe("Boolean");

                expect(kindOf([1, "foo"])).toBe("Array");
                expect(kindOf(new Array(3))).toBe("Array");

                expect(kindOf(function (): void {})).toBe("Function");
                expect(kindOf((): void => {})).toBe("Function");
                // eslint-disable-next-line @typescript-eslint/no-implied-eval
                expect(kindOf(new Function("return 1;"))).toBe("Function");

                expect(kindOf(/\w+/)).toBe("RegExp");
                expect(kindOf(new RegExp("\\w+", "g"))).toBe("RegExp");

                expect(kindOf(new Date())).toBe("Date");

                expect(kindOf(null)).toBe("null");

                expect(kindOf(undefined)).toBe("undefined");
            });
        });
        describe("> isKind", (): void => {
            test("should check kind of value", (): void => {
                expect(Type.is(true, true)).toBeTruthy();
                const isKind = Type.isKind;
                expect(isKind([1, "foo"], "Array")).toBeTruthy();
                expect(isKind(false, "Boolean")).toBeTruthy();
                expect(isKind(true, "Boolean")).toBeTruthy();
                expect(isKind(new Date(), "Date")).toBeTruthy();
                expect(isKind(function (): void {}, "Function")).toBeTruthy();
                expect(isKind(null, "Null")).toBeTruthy();
                expect(isKind(123, "Number")).toBeTruthy();
                expect(isKind({}, "Object")).toBeTruthy();
                expect(isKind(/\w+/, "RegExp")).toBeTruthy();
                expect(isKind("", "String")).toBeTruthy();
                expect(isKind(undefined, "Undefined")).toBeTruthy();
                expect(Type.isKindEqual("hello", "world")).toBeTruthy();
            });
        });
        describe("isAsyncFunction", (): void => {
            test("should detect if value is an async function", (): void => {
                const isAsyncFunction = Type.isAsyncFunction;
                expect(isAsyncFunction((): void => {})).toBeFalsy();
                expect(isAsyncFunction(async (): Promise<void> => {})).toBeTruthy();
                expect(isAsyncFunction(() => Promise.resolve())).toBeTruthy();
                expect(isAsyncFunction("")).toBeFalsy();
                expect(isAsyncFunction(123)).toBeFalsy();
                expect(isAsyncFunction(null)).toBeFalsy();
                expect(isAsyncFunction({})).toBeFalsy();
                expect(isAsyncFunction([])).toBeFalsy();
                expect(isAsyncFunction(fs.promises.access)).toBeTruthy();
            });
        });
        describe("isArray", (): void => {
            test("should detect if value is a Array", (): void => {
                const isArray = Type.isArray;
                expect(isArray([1, "foo"])).toBeTruthy();
                expect(isArray(new Array(3))).toBeTruthy();
                expect(isArray("")).toBeFalsy();
                expect(isArray(123)).toBeFalsy();
                expect(isArray(null)).toBeFalsy();
                expect(isArray({})).toBeFalsy();
            });
        });
        describe("isBoolean", (): void => {
            test("should detect if value is a Boolean", (): void => {
                const isBoolean = Type.isBoolean;
                expect(isBoolean(true)).toBeTruthy();
                expect(isBoolean(false)).toBeTruthy();
                expect(isBoolean(new Boolean(false))).toBeTruthy();
                expect(isBoolean(new Boolean(true))).toBeTruthy();
                expect(isBoolean(Boolean(0))).toBeTruthy();
                expect(isBoolean(Boolean(1))).toBeTruthy();
                expect(isBoolean("")).toBeFalsy();
                expect(isBoolean(123)).toBeFalsy();
                expect(isBoolean(null)).toBeFalsy();
                expect(isBoolean({})).toBeFalsy();
            });
        });
        describe("isDate", (): void => {
            test("should detect if value is a Date", (): void => {
                const isDate = Type.isDate;
                expect(isDate(new Date())).toBeTruthy();
                expect(isDate("")).toBeFalsy();
                expect(isDate(123)).toBeFalsy();
                expect(isDate(null)).toBeFalsy();
                expect(isDate({})).toBeFalsy();
                expect(isDate([])).toBeFalsy();
            });
        });
        describe("isEmailFormat", (): void => {
            const isEmailFormat = Type.isEmailFormat;
            const valid = [
                "prettyandsimple@example.com",
                "very.common@example.com",
                "disposable.style.email.with+symbol@example.com",
                "other.email-with-dash@example.com",
                "fully-qualified-domain@example.com",
                "user.name+tag+sorting@example.com",
                "x@example.com",
                "example-indeed@strange-example.com",
                "example@s.solutions",
                "local@sld.newTLD",
                "the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-four-characters.and-this-address-is-254-characters-exactly.so-it-should-be-valid.and-im-going-to-add-some-more-words-here.to-increase-the-lenght-blah-blah-blah-blah-bla.org",
                "the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-three-characters-so-it-is-valid-blah-blah.com",
                "local@sub.domains.com",
                "digit-only-domain@123.com",
                "digit-only-domain-with-subdomain@sub.123.com",
                "foo@bar.com",
                "x@x.au",
                "foo@bar.com.au",
                "foo+bar@bar.com",
                "test+ext@gmail.com",
                "some.name.midd.leNa.me.+extension@GoogleMail.com",
                "sld-starts-with-dashsh@-sld.com",
                "sld-ends-with-dash@sld-.com",
                "the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-four-characters.and-this-address-is-255-characters-exactly.so-it-should-be-invalid.and-im-going-to-add-some-more-words-here.to-increase-the-lenght-blah-blah-blah-blah-bl.org",
                "the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-four-characters-so-it-is-invalid-blah-blah.com",
                "the-local-part-is-invalid-if-it-is-longer-than-sixty-four-characters@sld.net",
            ];
            const invalid = [
                "@missing-local.org",
                "invalid",
                "missing-at-sign.net",
                "invalidemail@",
                "invalid.com",
                "@invalid.com",
                'invalid-characters-in-sld@! "#$%(),/;<>_[]`|.org',
                "! #$%`|@invalid-characters-in-local.org",
                `"()<>[]:,;@\\\\\\"!#$%&'-/=?^_\`{}| ~.a"@example.org`,
                `"very.(),:;<>[]\\".VERY.\\"very@\\\\ \\"very\\".unusual"@strange.example.com`,
                "(),:;`|@more-invalid-characters-in-local.org",
                "#!$%&'*+-/=?^_`{}|~@example.org",
                "<>@[]\\`|@even-more-invalid-characters-in-local.org",
                '"foobar"@example.com',
                '"foo\\@bar"@example.com',
                ".local-starts-with-dot@sld.com",
                "IP-and-port@127.0.0.1:25",
                "backticks`are`legit@test.com",
                "dot-on-dot-in-domainname@te..st.de",
                "dot-first-in-domain@.test.de",
                "admin@mailserver1",
                "foo@bar.com.",
                "foo@bar.co.uk.",
                "local-ends-with-dot.@sld.com",
                "invalid-ip@127.0.0.1.26",
                "missing-sld@.com",
                "missing-tld@sld.",
                "missing-dot-before-tld@com",
                "another-invalid-ip@127.0.0.256",
                "mg@ns.i",
                "trailing-dots@test.de.",
                "z@co.c",
                "two..consecutive-dots@sld.com",
                'partially."quoted"@sld.com',
                "unbracketed-IP@127.0.0.1",
                "user@localserver",
                "user@[2001:db8:1ff::a0b:dbd0]",
                "test1@invalid.co m",
                "test2@invalid.co m",
                "test3@invalid.co m",
                "test4@invalid.co m",
                "test5@invalid.co m",
                "test6@invalid.co m",
                "test7@invalid.co m",
                "test8@invalid.co m",
                "test9@invalid.co m",
                "test10@invalid.co m",
                "test11@invalid.co m",
                "test12@invalid.co　m",
                "test13@invalid.co　m",
                "ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com",
                "somename@ｇｍａｉｌ.com",
            ];
            test("valid supported", (): void => {
                const result: Record<string, boolean> = {};
                for (const email of valid) {
                    if (!isEmailFormat(email)) {
                        // eslint-disable-next-line security/detect-object-injection
                        result[email] = false;
                    }
                }
                expect(result).toEqual({});
            });
            test("invalid supported", (): void => {
                const result: Record<string, boolean> = {};
                for (const email of invalid) {
                    if (isEmailFormat(email)) {
                        // eslint-disable-next-line security/detect-object-injection
                        result[email] = false;
                    }
                }
                expect(result).toEqual({});
            });
        });
        describe("isEmpty", (): void => {
            const isEmpty = Type.isEmpty;
            test("should work on strings", (): void => {
                expect(isEmpty("")).toBeTruthy();
                expect(isEmpty("foo")).toBeFalsy();
            });
            test("should work on arrays", (): void => {
                expect(isEmpty([])).toBeTruthy();
                expect(isEmpty([1])).toBeFalsy();
                expect(isEmpty([1, 2])).toBeFalsy();
            });
            test("should work on objects", (): void => {
                expect(isEmpty({})).toBeTruthy();
                expect(isEmpty({ a: 1 })).toBeFalsy();
                expect(isEmpty({ a: 1, b: 2 })).toBeFalsy();
            });
            test("should return false for any value that isn't a collection", (): void => {
                expect(isEmpty(null)).toBeTruthy();
                expect(isEmpty(undefined)).toBeTruthy();
                expect(isEmpty(0)).toBeFalsy();
                expect(isEmpty(123)).toBeFalsy();
                expect(isEmpty(-3)).toBeFalsy();
                expect(isEmpty(NaN)).toBeFalsy();
                expect(isEmpty(Infinity)).toBeFalsy();
                expect(isEmpty(-Infinity)).toBeFalsy();
                expect(isEmpty(false)).toBeFalsy();
                expect(isEmpty(true)).toBeFalsy();
                const fn = (): void => {};
                const fn2 = (): void => {};
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                (fn2 as any).bar = "ipsum";
                expect(isEmpty(fn)).toBeTruthy();
                expect(isEmpty(fn2)).toBeTruthy();
            });
        });
        describe("isFunction", (): void => {
            test("should detect if value is a function", (): void => {
                const isFunction = Type.isFunction;
                expect(isFunction((): void => {})).toBeTruthy();
                // eslint-disable-next-line @typescript-eslint/no-implied-eval
                expect(isFunction(new Function("return 1;"))).toBeTruthy();
                expect(isFunction("")).toBeFalsy();
                expect(isFunction(123)).toBeFalsy();
                expect(isFunction(null)).toBeFalsy();
                expect(isFunction({})).toBeFalsy();
                expect(isFunction([])).toBeFalsy();
                expect(
                    Type.isFunctionType(function () {
                        //empty
                    })
                ).toBeTruthy();
            });
        });
        describe("isInteger", (): void => {
            const isInteger = Type.isInteger;
            test("should return false if value isn't an integer", (): void => {
                expect(isInteger(false)).toBeFalsy();
                expect(isInteger(true)).toBeFalsy();
                expect(isInteger("foo")).toBeFalsy();
                expect(isInteger("123")).toBeFalsy();
                expect(isInteger("123.45")).toBeFalsy();
                expect(isInteger(123.45)).toBeFalsy();
                expect(isInteger(-0.45)).toBeFalsy();
                expect(isInteger(new Number(-0.45))).toBeFalsy();
                expect(isInteger(new Date())).toBeFalsy();
                expect(isInteger(/foo/)).toBeFalsy();
                expect(isInteger({})).toBeFalsy();
                expect(
                    isInteger({
                        valueOf: function (): number {
                            return 123;
                        },
                    })
                ).toBeFalsy();
                expect(isInteger(Infinity)).toBeFalsy();
                expect(isInteger(-Infinity)).toBeFalsy();
            });
            test("should return true if value is an integer", (): void => {
                expect(isInteger(0)).toBeTruthy();
                expect(isInteger(1)).toBeTruthy();
                expect(isInteger(123)).toBeTruthy();
                expect(isInteger(-123)).toBeTruthy();
                expect(isInteger(new Number(-123))).toBeTruthy();
            });
            test("should work even with large numbers", (): void => {
                expect(isInteger(Math.pow(2, 45) + 0.05)).toBeFalsy();
                expect(isInteger(Math.pow(2, 45) - 0.05)).toBeFalsy();
                expect(isInteger(Math.pow(2, 45))).toBeTruthy();
                expect(isInteger(-Math.pow(2, 45))).toBeTruthy();
            });
        });
        describe("isIterable", (): void => {
            test("false", (): void => {
                expect(Type.isIterable(true)).toBeFalsy();
                expect(Type.isIterable(1)).toBeFalsy();
                expect(Type.isIterable({})).toBeFalsy();
            });
            test("true", (): void => {
                expect(Type.isIterable([])).toBeTruthy();
                expect(Type.isIterable("")).toBeTruthy();
                expect(Type.isIterable(new Map())).toBeTruthy();
                expect(Type.isIterable(new Set())).toBeTruthy();
            });
        });
        describe("isNull", (): void => {
            test("should detect if value is a Null", (): void => {
                const isNull = Type.isNull;
                expect(isNull(null)).toBeTruthy();
                expect(isNull("")).toBeFalsy();
                expect(isNull(123)).toBeFalsy();
                expect(isNull([])).toBeFalsy();
                expect(isNull({})).toBeFalsy();
            });
        });
        describe("isNumber", (): void => {
            test("should detect if value is a Number", (): void => {
                const isNumber = Type.isNumber;
                expect(isNumber(0)).toBeTruthy();
                expect(isNumber(123)).toBeTruthy();
                expect(isNumber(new Number(123))).toBeTruthy();
                expect(isNumber(Number("123"))).toBeTruthy();
                expect(isNumber("")).toBeFalsy();
                expect(isNumber(false)).toBeFalsy();
                expect(isNumber(null)).toBeFalsy();
                expect(isNumber({})).toBeFalsy();
            });
        });
        describe("isNumeric", (): void => {
            test("should detect if value is numeric type", (): void => {
                const isNumeric = Type.isNumeric;
                expect(isNumeric(0)).toBeTruthy();
                expect(isNumeric(null)).toBeFalsy();
                expect(isNumeric(123)).toBeTruthy();
                expect(isNumeric(true)).toBeFalsy();
                expect(isNumeric("1")).toBeTruthy();
                expect(isNumeric("a")).toBeFalsy();
            });
        });
        describe("isObject", (): void => {
            test("should detect if value is an object", (): void => {
                const isObject = Type.isObject;
                expect(isObject({})).toBe(true);
                expect(
                    isObject(
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        new (function (): void {
                            return;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } as any)()
                    )
                ).toBe(true);
                expect(isObject("")).toBe(false);
                expect(isObject(123)).toBe(false);
                expect(isObject(null)).toBe(false);
                expect(isObject([])).toBe(false);
            });
        });
        describe("isPlainObject", (): void => {
            const isPlainObject = Type.isPlainObject;
            test("should return true when plain object", (): void => {
                expect(isPlainObject({})).toBe(true);
                expect(isPlainObject({ test: true })).toBe(true);
                expect(isPlainObject(new Object())).toBe(true);
            });
            test("should return false when not an object", (): void => {
                expect(isPlainObject(true)).toBe(false);
                expect(isPlainObject(null)).toBe(false);
                expect(isPlainObject(/test/)).toBe(false);
                expect(isPlainObject(function (): void {})).toBe(false);
                expect(isPlainObject(1)).toBe(false);
                expect(isPlainObject([1])).toBe(false);
                expect(isPlainObject(new Number(1))).toBe(false);
            });
            test("should return false when created with constructor function", (): void => {
                function Test(this: FunctionConstructor): void {
                    //eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                    (this as any).test = true;
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                Test.prototype.isTest = true;
                expect(isPlainObject(new (Test as FunctionConstructor)())).toBe(false);
            });
        });
        describe("isPrimitive", (): void => {
            const isPrimitive = Type.isPrimitive;
            test("should return true when primitive value", (): void => {
                expect(isPrimitive(null)).toBe(true);
                expect(isPrimitive(undefined)).toBe(true);
                expect(isPrimitive(1)).toBe(true);
                expect(isPrimitive("foo")).toBe(true);
                expect(isPrimitive(true)).toBe(true);
                expect(isPrimitive(false)).toBe(true);
                expect(isPrimitive(NaN)).toBe(true);
                expect(isPrimitive(Infinity)).toBe(true);
            });
            test("should return false when not primitive value", (): void => {
                expect(isPrimitive({})).toBe(false);
                expect(isPrimitive([])).toBe(false);
                expect(isPrimitive(/./)).toBe(false);
                expect(isPrimitive(function (): void {})).toBe(false);
                expect(
                    isPrimitive(
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        new (function (): void {
                            return;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } as any)()
                    )
                ).toBe(false);
                expect(isPrimitive(new Number())).toBe(true);
                expect(isPrimitive(new String())).toBe(true);
                expect(isPrimitive(new Boolean())).toBe(true);
                expect(isPrimitive(new Date())).toBe(false);
                expect(isPrimitive(new Error())).toBe(false);
            });
        });
        describe("isRegExp", (): void => {
            test("should detect if value is a RegExp", (): void => {
                const isRegExp = Type.isRegExp;
                expect(isRegExp(/\w+/)).toBe(true);
                expect(isRegExp(new RegExp("\\w+", "g"))).toBe(true);
                expect(isRegExp("")).toBe(false);
                expect(isRegExp(123)).toBe(false);
                expect(isRegExp(null)).toBe(false);
                expect(isRegExp({})).toBe(false);
                expect(isRegExp([])).toBe(false);
            });
        });
        describe("isString", (): void => {
            test("should detect if value is a string", (): void => {
                const isString = Type.isString;
                expect(isString("foo")).toBe(true);
                expect(isString(new String("lorem"))).toBe(true);
                expect(isString(String(123))).toBe(true);
                expect(isString(null)).toBe(false);
                expect(isString(12)).toBe(false);
                expect(isString(false)).toBe(false);
            });
            test("isUrlRelative", (): void => {
                expect(Type.isUrlRelative("http://www.example.com")).toBeFalsy();
            });
        });
        describe("isTypedArray", (): void => {
            test("Int8Array", (): void => {
                expect(Type.isInt8Array(new Int8Array())).toBeTruthy();
            });
            test("isUint8Array", (): void => {
                expect(Type.isUint8Array(new Uint8Array())).toBeTruthy();
            });
            test("isUint8ClampedArray", (): void => {
                expect(Type.isUint8ClampedArray(new Uint8ClampedArray())).toBeTruthy();
            });
            test("isInt16Array", (): void => {
                expect(Type.isInt16Array(new Int16Array())).toBeTruthy();
            });
            test("isUint16Array", (): void => {
                expect(Type.isUint16Array(new Uint16Array())).toBeTruthy();
            });
            test("isInt32Array", (): void => {
                expect(Type.isInt32Array(new Int32Array())).toBeTruthy();
            });
            test("isUint32Array", (): void => {
                expect(Type.isUint32Array(new Uint32Array())).toBeTruthy();
            });
            test("isFloat32Array", (): void => {
                expect(Type.isFloat32Array(new Float32Array())).toBeTruthy();
            });
            test("isFloat64Array", (): void => {
                expect(Type.isFloat64Array(new Float64Array())).toBeTruthy();
            });
        });
        describe("isUndefined", (): void => {
            test("should detect if value is undefined", (): void => {
                const isUndefined = Type.isUndefined;
                expect(isUndefined(undefined)).toBe(true);
                expect(isUndefined()).toBe(true);
                expect(isUndefined("")).toBe(false);
                expect(isUndefined(123)).toBe(false);
                expect(isUndefined(null)).toBe(false);
                expect(isUndefined({})).toBe(false);
                expect(isUndefined([])).toBe(false);
            });
        });
        describe("getEnumType", (): void => {
            test("array", (): void => {
                expect(Type.getEnumType([])).toBe(Type.EnumTypes.Array);
            });
        });
        describe("getContentType", (): void => {
            test("mp3", (): void => {
                expect(Type.getContentType(".mp3")).toBe("audio/mpeg");
            });
        });
    });
});
