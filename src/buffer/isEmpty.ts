import { toString } from "./toString";

/**
 * Check if Buffer is empty
 */
export function isEmpty(arg: Buffer): boolean {
    return !toString(arg).length;
}
