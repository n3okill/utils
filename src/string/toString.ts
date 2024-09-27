import { isNullOrUndefined } from "../type/isNullOrUndefined";
import { isString } from "../type/isString";
import { isSymbol } from "../type/isSymbol";

/**
 * Transforms argument into string
 * @param arg
 */
export function toString(arg: unknown): string {
    return isString(arg)
        ? arg
        : isNullOrUndefined(arg)
          ? ""
          : isSymbol(arg)
            ? Symbol.prototype.toString.call(arg)
            : (arg as string) + "" === "0" && 1 / (arg as number) === -Infinity
              ? "-0"
              : (arg as string) + "";
}
