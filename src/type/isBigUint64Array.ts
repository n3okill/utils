import { isKind } from "./isKind";

export function isBigUint64Array(arg: unknown): arg is BigUint64Array {
    return isKind(arg, "BigUint64Array");
}
