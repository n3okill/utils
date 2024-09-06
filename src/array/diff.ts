import { isArrayType } from "../type/isArrayType";

/**
 * Return the difference between arrays (all the items that appear only once in the first array)
 * @param arr The first array
 * @param args Other arrays to compare
 * @returns The resulting array with the diff items
 */
export function diff<T>(arr: Array<T>, ...args: Array<Array<T> | T>): Array<T> {
    const target: Array<T> = [];
    const arrLength = arr.length;
    const argsLength = args.length;
    for (let i = 0; i < arrLength; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const elem = arr[i];
        let hasElem = false;
        for (let j = 0; j < argsLength; j++) {
            // eslint-disable-next-line security/detect-object-injection
            const current: Array<T> | T = args[j];
            if (isArrayType(current)) {
                const curLength = current.length;
                for (let c = 0; c < curLength; c++) {
                    // eslint-disable-next-line security/detect-object-injection
                    if (elem === current[c]) {
                        hasElem = true;
                        c = curLength;
                        j = argsLength;
                    }
                }
            }
        }
        if (!hasElem) {
            target.push(elem);
        }
    }
    return target;
}
