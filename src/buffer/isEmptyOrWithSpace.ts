import { toString } from "./toString";
import { trim } from "./trim";

/**
 * Check if buffer is empty triming withspaces
 */
export function isEmptyOrWithSpace(arg: Buffer): boolean {
    return !toString(trim(arg)).length;
}
