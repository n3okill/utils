import { versionCompare } from "./versionCompare";

/**
 * Compares actual node version with input version
 * @param v1
 * @returns
 */
export function nodeVersionLTE(v1: string): boolean {
    return versionCompare(process.versions.node, v1) < 1;
}
