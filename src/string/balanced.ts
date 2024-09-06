import { getBalanced } from "./getBalanced";

/**
 * Returns 'false' if input string is unbalanced and an array of an array of numbers defining the begging and end of 'open' and 'close' strings
 * @param input
 * @param open
 * @param close
 * @returns {boolean | number[][]}
 */
export function balanced(input: string, open: string = "{", close: string = "}"): boolean | number[][] {
    return getBalanced(input, open, close);
}
