import { padEnd } from "./padEnd";

/**
 * Returns the XOR result of two strings.
 * If the two strings are of different lengths, the shorter one will be padded to the length of the longer one.
 * @param  token1
 * @param  token2
 * @return  the XOR result
 */
export function xorTokens(token1: string, token2: string): string {
    let xor = "";
    if (token1.length > token2.length) {
        token2 = padEnd(token2, token1.length, token2);
    } else if (token1.length < token2.length) {
        token1 = padEnd(token1, token2.length, token1.length === 0 ? " " : token1);
    }
    for (let i = 0; i < token1.length && i < token2.length; i++) {
        xor += String.fromCharCode(token1.charCodeAt(i) ^ token2.charCodeAt(i));
    }
    return xor;
}
