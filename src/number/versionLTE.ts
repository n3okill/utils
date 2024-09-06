import { versionCompare } from "./versionCompare";


export function versionLTE(v1: string, v2: string): boolean {
    return versionCompare(v1, v2) < 1;
}
