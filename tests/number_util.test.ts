import * as NumberUtil from "../src/number_util";

describe("en_util", (): void => {
    describe("NumberUtil", (): void => {
        describe("ToNumeric", (): void => {
            test("should return a numeric type", (): void => {
                expect(NumberUtil.toNumeric(0)).toBe(0);
                expect(NumberUtil.toNumeric("0")).toBe(0);
                expect(NumberUtil.toNumeric(100)).toBe(100);
                expect(NumberUtil.toNumeric("100")).toBe(100);
                expect(NumberUtil.toNumeric("a")).toBe(97);
            });
        });
        describe("VersionCompare", (): void => {
            test("1.0.0 < 1.0.1", (): void => {
                expect(NumberUtil.versionCompare("1.0.0", "1.0.1")).toBe(-1);
                expect(NumberUtil.versionLTE("1.0.0", "1.0.1")).toBeTruthy();
            });
            test("2.10.0 > 2.0.1", (): void => {
                expect(NumberUtil.versionCompare("2.10.0", "2.0.1")).toBe(1);
                expect(NumberUtil.versionGTE("2.10.0", "2.0.1")).toBeTruthy();
            });
            test("35.2.5 > 24.3.6", (): void => {
                expect(NumberUtil.versionCompare("35.2.5", "24.3.6")).toBe(1);
                expect(NumberUtil.versionGT("35.2.5", "24.3.6")).toBeTruthy();
            });
            test("3.2.5-3 > 3.2.5", (): void => {
                expect(NumberUtil.versionCompare("3.2.5-3", "3.2.5")).toBe(1);
            });
            test("3.2.5-3 < 3.2.5-5", (): void => {
                expect(NumberUtil.versionCompare("3.2.5-3", "3.2.5-5")).toBe(-1);
                expect(NumberUtil.versionLT("3.2.5-3", "3.2.5-5")).toBeTruthy();
            });
            test("5.2.5-3 < 5.2.5-13", (): void => {
                expect(NumberUtil.versionCompare("5.2.5-3", "5.2.5-13")).toBe(-1);
            });
            test("2014.10.15-alpha.1 < 2014.10.15-beta.1", (): void => {
                expect(NumberUtil.versionCompare("2014.10.15-alpha.1", "2014.10.15-beta.1")).toBe(-1);
            });
            test("2014.10.15-alpha < 2014.10.15-alpha.2", (): void => {
                expect(NumberUtil.versionCompare("2014.10.15-alpha", "2014.10.15-alpha.2")).toBe(-1);
            });
            test("10.100.1-beta.61 > 10.100.1-beta.51", (): void => {
                expect(NumberUtil.versionCompare("10.100.1-beta.61", "10.100.1-beta.51")).toBe(1);
            });
            test("0.0.0 == 0.0.0", (): void => {
                expect(NumberUtil.versionCompare("0.0.0", "0.0.0")).toBe(0);
                expect(NumberUtil.versionEqual("0.0.0", "0.0.0")).toBeTruthy();
            });
            test("9.178.1350-beta.66.0.183.99999 == 9.178.1350-beta.66.0.183.99999", (): void => {
                expect(
                    NumberUtil.versionCompare("9.178.1350-beta.66.0.183.99999", "9.178.1350-beta.66.0.183.99999")
                ).toBe(0);
            });
            test("1.0.0 > 1.0.0-beta.2", (): void => {
                expect(NumberUtil.versionCompare("1.0.0", "1.0.0-beta.2")).toBe(1);
            });
        });
    });
});
