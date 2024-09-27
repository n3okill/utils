import { multiReplace } from "../string/multiReplace";
import * as NodeCrypto from "crypto";

/**
 * Generate random base64 key
 * @param length Length of the key to be generated
 * @returns Generated key in string format
 */
export function generateBase64RandomKey(length: number = 32): string {
    return multiReplace(NodeCrypto.randomBytes(length).toString("base64").substr(0, length), ["+", "/"], ["_", "-"]);
}
