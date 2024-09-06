import { trimLeft } from "./trimLeft";
import { trimRight } from "./trimRight";

/**
 * Remove given characters from left and right side of the string
 * @param str String to remove characters from
 * @param chars The characters to remove, if not defined removes empty spaces
 * @returns Trimmed string
 */
export function trim(str: string | null | undefined, chars?: string[]): string {
    return trimLeft(trimRight(str, chars), chars);
}
