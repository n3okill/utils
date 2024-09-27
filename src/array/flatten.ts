/**
 * @internal
 * @param {Array<Array<T> | T>} arr
 * @param {Array<T>} result
 * @returns {Array<T>}
 * @private
 */
function _flat<T>(arr: (Array<T> | T)[], result: Array<T>): Array<T> {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const current: T | Array<T> = arr[i];
        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions
        Array.isArray(current) ? _flat(current, result) : result.push(current);
    }
    return result;
}

/**
 * Return flattened array from the given arrays
 * @param args Multiple arrays to be flattened
 * @returns The flattened array
 */
export function flatten<T>(...args: Array<Array<T> | T>): Array<T> {
    return _flat(args, []);
}
