import { constructorName } from "./_internal";
import { equalInstance } from "./equalInstance";

/**
 * If the two errors are of the same type, and have the same message, then they are equal
 * @param {T} a - The first error to compare.
 * @param {U} b - The error to compare against.
 * @returns The result of the function call.
 */
export function equalError<T extends Error, U extends T>(a: T, b: U): boolean {
    if (a.message !== b.message) {
        return false;
    }
    const errorConstructors = [EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError];
    if (errorConstructors.some((constructor) => equalInstance(constructor, a, b))) {
        return true;
    }
    return constructorName(a) === constructorName(b);
}
