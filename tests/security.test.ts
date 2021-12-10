import * as Security from "../src/security";

describe("Utilities", (): void => {
    describe("> Security", (): void => {
        test("should generate a random key", (): void => {
            const key = Security.generateBase64RandomKey(32);
            expect(key).toHaveLength(32);
            expect(key).toMatch(/^[A-Za-z0-9_\-+/=]+$/);
        });
        test("should hash and validate data", (): void => {
            const originalData = "anything";
            const key = Security.generateBase64RandomKey(40);
            let hashedData = Security.hashData(originalData, key);
            expect(Security.validateData(hashedData, key)).toBe(originalData);
            hashedData += "0";
            expect(Security.validateData(hashedData, key)).toBeFalsy();
        });
    });
});
