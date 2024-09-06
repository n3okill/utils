import { Primitive } from "../type/_types";

/**
 * Check if two values are equal, or if they are both the same primitive type.
 * @param {T} a - Type.Primitive
 * @param {U} b - Type.Primitive
 * @returns A boolean value.
 */
export function equalPrimitive<T extends Primitive, U extends T>(a: T, b: U): boolean {
    return Object.is(a, b) || a === b;
}
