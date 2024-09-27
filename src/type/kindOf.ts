import { isNull } from "./isNull";
import { isUndefined } from "./isUndefined";

/**
 * Return a string with the type of the object
 * @param arg
 * @returns {string}
 */
export function kindOf(arg: unknown): string {
    return isNull(arg)
        ? "null"
        : isUndefined(arg)
          ? "undefined"
          : (/^\[object (.*)]$/.exec(Object.prototype.toString.call(arg)) as RegExpExecArray)[1];
}
