import { trim } from "./trim";
import { toString } from "./toString";

/**
 * Check if string is empty triming withspaces
 * @param arg
 */
export function isEmptyOrWithSpace(arg: string): boolean {
    return !trim(toString(arg)).length;
}
