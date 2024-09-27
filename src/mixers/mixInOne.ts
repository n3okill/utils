/**
 * Merge source into target
 * @param target The object to merge into
 * @param source The object to merge
 */
export function mixInOne<T>(target: T, source: T): void {
    for (const key of Object.getOwnPropertyNames(source)) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key) as PropertyDescriptor);
    }
}
