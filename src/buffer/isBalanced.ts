import { toString } from "./toString";
import { isBalanced as isBalancedString } from "../string/isBalanced";

/**
 * Check for a balanced use of 'open' and 'close' strings
 *
 * Examples:
 *
 *  input: "{hello} world"
 *  open: "{"
 *  close: "}"
 *  result: true
 *
 *
 *  input: "hello} world"
 *  open: "{"
 *  close: "}"
 *  result: false
 * @param input
 * @param open
 * @param close
 * @returns
 */
export function isBalanced(input: Buffer, open: string = "{", close: string = "}"): boolean {
    return isBalancedString(toString(input), open, close);
}
