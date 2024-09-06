import { isArrayType } from "../type/isArrayType";


/**
 * Return the intersection between arrays
 * @param args Multiple arrays to intersect
 * @returns The intersection of the multiple arrays
 */
export function intersect<T>(...args: Array<Array<T>>): Array<T> {
    const target: Array<T> = [];
    const arrs = args.filter(isArrayType);
    const arrsLength = arrs.length;
    let shortest = 0;
    let shortestLength = arrs[0].length;
    for (let i = 0; i < arrsLength; i++) {
        // eslint-disable-next-line security/detect-object-injection
        const n = arrs[i].length;
        if (n < shortestLength) {
            shortest = i;
            shortestLength = n;
        }
    }
    // eslint-disable-next-line security/detect-object-injection
    const shortestArr = arrs[shortest];
    const first = arrs[0];

    for (let i = 0; i < first.length; i++) {
        let hasElem = false;
        // eslint-disable-next-line security/detect-object-injection
        const elem = first[i];
        for (let j = 0; j < shortestLength; j++) {
            // eslint-disable-next-line security/detect-object-injection
            if (elem === shortestArr[j]) {
                hasElem = true;
                break;
            }
        }
        if (hasElem) {
            for (let j = 1; j < arrsLength; j++) {
                if (j !== shortest) {
                    hasElem = false;
                    // eslint-disable-next-line security/detect-object-injection
                    const current = arrs[j];
                    const currentLength = current.length;
                    for (let c = 0; c < currentLength; c++) {
                        // eslint-disable-next-line security/detect-object-injection
                        if (elem === current[c]) {
                            hasElem = true;
                            break;
                        }
                    }
                    if (!hasElem) {
                        break;
                    }
                }
            }
            if (hasElem) {
                if (target.indexOf(elem) === -1) {
                    target.push(elem);
                }
            }
        }
    }
    return target;
}
