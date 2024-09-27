import { isKind } from "./isKind";

export function isBigInt64Array(arg: unknown): arg is BigInt64Array {
    return isKind(arg, "BigInt64Array");
}
