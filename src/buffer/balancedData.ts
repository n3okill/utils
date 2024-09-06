import { toString } from "./toString";
import { detectEncoding } from "./detectEncoding";
import { balancedData as balancedDataString } from "../string/balancedData";

/**
 * Interface that defines the properties of a chunk of balanced data in a string
 */
export interface BalancedDataBuffer {
    start: number;
    end: number;
    body: Buffer;
    pre: Buffer;
    post: Buffer;
}



/**
 * Return a Array<BalancedDataBuffer> mapping the chunks of 'open' and 'close' locations, if input buffer is unbalanced will return empty
 * @param input Buffer
 * @param open string
 * @param close string
 */
export function balancedData(input: Buffer, open: string = "{", close: string = "}"): BalancedDataBuffer[] {
    const encoding = detectEncoding(input);
    return balancedDataString(toString(input, encoding), open, close).map((s) => ({
        start: s.start,
        end: s.end,
        pre: Buffer.from(s.pre, encoding),
        body: Buffer.from(s.body, encoding),
        post: Buffer.from(s.post, encoding),
    }));
}
