import { versionCompare } from "./versionCompare";

/**
 * Compares actual node version with input version
 * @param v1
 * @returns
 */
export function versionGTE(v1: string, v2: string): boolean {
    return versionCompare(v1, v2) > -1;
}
