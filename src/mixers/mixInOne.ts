/**
 * Merge source into target
 * @param target The object to merge into
 * @param source The object to merge
 */
export function mixInOne<T>(target: T, source: T): void {
    return Object.getOwnPropertyNames(source).forEach(
        (property: string): void => Object.defineProperty(
            target,
            property,
            Object.getOwnPropertyDescriptor(source, property) as PropertyDescriptor
        ) as unknown as void
    );
}
