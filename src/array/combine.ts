/**
 * Combine multiple arrays into a single one
 * @param arrays The arrays to be combined
 * @returns Combined array
 */

export function combine<T>(...arrays: Array<Array<T> | T>): Array<T> {
    const target: Array<T> = [];
    for (const arr of arrays) {
        if (Array.isArray(arr)) {
            for (const a of arr) {
                target.push(a);
            }
        } else {
            target.push(arr);
        }
    }
    return target;
}
