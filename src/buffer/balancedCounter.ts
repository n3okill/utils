import { toString } from "../string/toString";
import { balancedCounter as balancedCounterString } from "../string/balancedCounter";

/**
 * Check if the number of occurrences of the 'open' string are the same of ths 'close' string in the input string
 * @param input
 * @param open
 * @param close
 * @returns
 */
export function balancedCounter(input: Buffer, open = "{", close = "}"): boolean {
    return balancedCounterString(toString(input), open, close);
}