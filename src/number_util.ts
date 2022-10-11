/**
 * Return a number value from a string or a number
 * @param {number | string} arg
 * @returns {number}
 */
export function toNumeric(arg: number | string): number {
    return parseInt(arg as string, 10) == arg ? parseInt(arg as string, 10) : (arg as string).charCodeAt(0);
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

/**
 * Compares actual node version with input version
 * @param v1
 * @returns
 */
export function nodeVersionGTE(v1: string): boolean {
    return versionCompare(process.versions.node, v1) > -1;
}

/**
 * Compares actual node version with input version
 * @param v1
 * @returns
 */
export function versionGTE(v1: string, v2: string): boolean {
    return versionCompare(v1, v2) > -1;
}

/**
 * Compares actual node version with input version
 * @param v1
 * @returns
 */
export function nodeVersionGT(v1: string): boolean {
    return versionCompare(process.versions.node, v1) > 0;
}

export function versionGT(v1: string, v2: string): boolean {
    return versionCompare(v1, v2) > 0;
}

/**
 * Compares actual node version with input version
 * @param v1
 * @returns
 */
export function nodeVersionLTE(v1: string): boolean {
    return versionCompare(process.versions.node, v1) < 1;
}

export function versionLTE(v1: string, v2: string): boolean {
    return versionCompare(v1, v2) < 1;
}

/**
 * Compares actual node version with input version
 * @param v1
 * @returns
 */
export function nodeVersionLT(v1: string): boolean {
    return versionCompare(process.versions.node, v1) < 0;
}

export function versionLT(v1: string, v2: string): boolean {
    return versionCompare(v1, v2) < 0;
}

/**
 * Compares actual node version with input version
 * @param v1
 * @returns
 */
export function nodeVersionEqual(v1: string): boolean {
    return versionCompare(process.versions.node, v1) === 0;
}

export function versionEqual(v1: string, v2: string): boolean {
    return versionCompare(v1, v2) === 0;
}

/**
 * @internal
 * @param arr
 * @returns
 */
function convertToNumber(arr: string[]): (string | number)[] {
    return arr.map((el: string) => {
        return isNaN(el as unknown as number) ? el : parseInt(el, 10);
    });
}

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
