/**
 * Check if two objects are instances of the same class.
 * @param {Function} obj - Function - The constructor of the object you want to compare.
 * @param {T} a - T
 * @param {U} b - U extends T
 * @returns true
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function equalInstance<T, U extends T>(obj: Function, a: T, b: U): boolean {
    return a instanceof obj && b instanceof obj;
}
