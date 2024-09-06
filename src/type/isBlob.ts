import { isKind } from "./isKind";

/**
 * Check if argument is a blob
 * @param arg
 * @returns {boolean}
 */
export function isBlob(arg: unknown): arg is Blob {
    return isKind(arg, "blob");
}
