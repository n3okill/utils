import { balanced } from "./balanced";
import { isArray } from "../type/isArray";


/**
 * Interface that defines the properties of a chunk of balanced data in a string
 */
export interface BalancedData {
    start: number;
    end: number;
    body: string;
    pre: string;
    post: string;
}

/**
 * Return 'false' if input string is unbalanced, otherwise returns an array mapping the chunks of 'open' and 'close' locations
 * @param input
 * @param open
 * @param close
 * @returns {boolean | BalancedData[]}
 */
export function balancedData(input: string, open: string = "{", close: string = "}"): BalancedData[] {
    const b = balanced(input, open, close);
    if (isArray(b)) {
        return b.map((a: number[]): BalancedData => {
            return {
                start: a[0],
                end: a[1],
                body: input.slice(a[0] + open.length, a[1]),
                pre: input.slice(0, a[0]),
                post: input.slice(a[1] + close.length),
            };
        });
    }
    return []; //false;
}
