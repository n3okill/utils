/**
 * Delete the item at the given array index
 * @param arr Array where index will be removed
 * @param index The index to remove
 * @returns Array with index removed
 */
export function delIndex<T>(arr: Array<T>, index: number): Array<T> {
    const length = arr.length;
    if (index < length && index > 0) {
        for (let i = index + 1; i < length; i++) {
            // eslint-disable-next-line security/detect-object-injection
            arr[i - 1] = arr[i];
        }
        arr.pop();
    }
    return arr;
}
