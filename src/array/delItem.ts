import { delIndex } from "./delIndex";

/**
 * Delete all instances of the given item from the array
 * @param arr Array where item will be removed from
 * @param elem The item to remove
 * @param number Number of times that item should be removed (default: `-1` - remove all instances of item)
 * @returns The array with item removed
 */
export function delItem<T>(arr: Array<T>, elem: T, number: number = -1): Array<T> {
    let length = arr.length;
    for (let i = 0; i < length && (number > 0 || number < 0); i++) {
        // eslint-disable-next-line security/detect-object-injection
        const cur = arr[i];
        if (cur === elem) {
            delIndex(arr, i);
            i--;
            length--;
            number--;
        }
    }
    return arr;
}
