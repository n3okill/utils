import { versionCompare } from "./versionCompare";

export function versionEqual(v1: string, v2: string): boolean {
    return versionCompare(v1, v2) === 0;
}
