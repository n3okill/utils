import { versionCompare } from "./versionCompare";

export function versionLT(v1: string, v2: string): boolean {
    return versionCompare(v1, v2) < 0;
}
