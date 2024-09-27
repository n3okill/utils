import { isKind } from "./isKind";

export function isBigInt(arg: unknown): arg is bigint {
    return isKind(arg, "bigint");
}
