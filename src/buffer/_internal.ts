import { toString } from "./toString";

/**
 * @internal
 */
export function _toString(arg: string | Buffer): string {
    if (Buffer.isBuffer(arg)) {
        return toString(arg);
    }
    return arg;
}
