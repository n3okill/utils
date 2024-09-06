/**
 * Return unique elements from an array
 * @param arr
 */
export function unique<T>(arr: Array<T>): Array<T> {
    const target: Array<T> = [];
    const arrLength = arr.length;
    for (let i = 0; i < arrLength; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const elem = arr[i];
        if (target.indexOf(elem) === -1) {
            target.push(elem);
        }
    }
    return target;
}
