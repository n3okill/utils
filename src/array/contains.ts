/**
 * Check if array contains the item
 * @param arr The array to search
 * @param item The item to be searched
 * @returns Return `true` if the array contains the item
 */
export function contains<T>(arr: Array<T> = [], item: T): boolean {
    return arr.indexOf(item) !== -1;
}
