import { convertToNumber } from "./convertToNumber";

/**
 * @internal
 * @param flag
 * @param version
 * @returns
 */
function split(flag: boolean, version: string): Array<string> {
    if (flag) {
        const splited = version.split("-");
        const tail = splited[1].split(".");
        const _version = splited[0].split(".");
        return _version.concat(tail);
    }
    return version.split(".");
}

/**
 * Compare versions
 * @param v1
 * @param v2
 * @returns
 */
export function versionCompare(v1: string, v2: string): number {
    const flag1 = v1.indexOf("-") > -1;
    const flag2 = v2.indexOf("-") > -1;
    const arr1 = convertToNumber(split(flag1, v1));
    const arr2 = convertToNumber(split(flag2, v2));
    const length = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < length; i++) {
        // eslint-disable-next-line security/detect-object-injection
        if (i === 3 && (arr1[i] === undefined || arr2[i] === undefined)) {
            // eslint-disable-next-line security/detect-object-injection
            if (arr1[i] === undefined && isNaN(arr2[i] as number)) {
                return 1;
                // eslint-disable-next-line security/detect-object-injection
            } else if (isNaN(arr1[i] as number) && arr2[i] === undefined) {
                return -1;
            }
        }
        // eslint-disable-next-line security/detect-object-injection
        if (arr1[i] === undefined || arr2[i] === undefined) {
            // eslint-disable-next-line security/detect-object-injection
            return arr1[i] === undefined ? -1 : 1;
        }

        // eslint-disable-next-line security/detect-object-injection
        if (arr1[i] > arr2[i]) {
            return 1;
            // eslint-disable-next-line security/detect-object-injection
        } else if (arr1[i] < arr2[i]) {
            return -1;
        }
    }
    return 0;
}
