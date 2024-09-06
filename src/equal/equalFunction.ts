import { equalPrimitive } from "./equalPrimitive";

/**
 * Check if two functions are equal.
 * @param {T} a - T, b: U
 * @param {U} b - U is the type of the second parameter.
 * @returns A boolean value.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function equalFunction<T extends Function, U extends T>(a: T, b: U): boolean {
    return equalPrimitive(a.toString(), b.toString());
}
