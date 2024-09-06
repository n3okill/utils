import { toString } from "./toString";

/**
 * Check if string is empty
 * @param arg
 */
export function isEmpty(arg: string): boolean {
    return !toString(arg).length;
}
