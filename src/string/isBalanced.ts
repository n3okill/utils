import { getBalanced } from "./getBalanced";

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
export function isBalanced(input: string, open: string = "{", close: string = "}"): boolean {
    return getBalanced(input, open, close) !== false;
}
