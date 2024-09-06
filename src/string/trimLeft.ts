import { escapeRegExp } from "./escapeRegExp";
import { toString } from "./toString";

/**
 * Remove given characters from the left side of the string
 * @param s String to remove the characters from
 * @param chars The characters to remove if not defined removes empty spaces.
 * @returns Trimmed string
 */
export function trimLeft(s: string | null | undefined, chars: string[] = []): string {
    // eslint-disable-next-line security/detect-non-literal-regexp
    return toString(s).replace(chars.length ? new RegExp(`^[${escapeRegExp(chars.join(""))}]+`, "g") : /^\s+/g, "");
}
