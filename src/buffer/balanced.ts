import {toString} from "../string/toString";
import { balanced as balancedString } from "../string/balanced";

/**
 * Return `false` if buffer is unbalanced, or
 * an Array<BalancedDataBuffer> mapping the chunks of 'open' and 'close' locations, if input buffer is unbalanced will return empty
 * @param input
 * @param open
 * @param close
 */
export function balanced(input: Buffer, open: string = "{", close: string = "}"): boolean | number[][] {
    return balancedString(toString(input), open, close);
}