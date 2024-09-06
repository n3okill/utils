import { detectEncoding } from "./detectEncoding";
import { toString } from "./toString";
import { xorTokens as xorTokensString } from "../string/xorTokens";

/**
 * Returns the XOR result of two Buffer's.
 * If the two Buffer's are of different lengths, the shorter one will be padded to the length of the longer one.
 * @param token1
 * @param token2
 * @return the XOR result
 */
export function xorTokens(token1: Buffer, token2: Buffer): Buffer {
    const encoding = detectEncoding(token1);
    return Buffer.from(
        xorTokensString(toString(token1, encoding), toString(token2, detectEncoding(token2))),
        encoding,
    );
}