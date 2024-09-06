import * as NodeCrypto from "crypto";

/**
 * Prefixes data with a keyed hash value so that it can later be detected if it is tampered.
 * @param data Data to be protected
 * @param key Secret key to be used for generating hash
 * @param algorithm Hashing algorithm (e.g. "md5", "sha1", "sha256", etc.)
 * @return Data prefixed with the keyed hash
 * @see validateData()
 */
export function hashData(data: string, key: string, algorithm: string = "sha256"): string {
    const hash = NodeCrypto.createHmac(algorithm, key).update(data).digest("base64");
    return hash + data;
}