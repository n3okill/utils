import { TObject } from "./_types";
import { isArray } from "./isArray";
import { isBoolean } from "./isBoolean";
import { isBuffer } from "./isBuffer";
import { isMap } from "./isMap";
import { isNullOrUndefined } from "./isNullOrUndefined";
import { isNumber } from "./isNumber";
import { isObject } from "./isObject";
import { isSet } from "./isSet";
import { isString } from "./isString";
import { isEmpty as isEmptyString } from "../string/isEmpty";
import { isEmpty as isEmptyArray } from "../array/isEmpty";
import { isEmpty as isEmptyObject } from "../object/isEmpty";

/**
 * Check if argument is empty
 * @param arg
 * @returns {boolean}
 */
export function isEmpty(arg: unknown): boolean {
    return isNullOrUndefined(arg)
        ? true
        : isString(arg)
          ? isEmptyString(arg)
          : isArray(arg)
            ? isEmptyArray(arg as Array<unknown>)
            : isMap(arg)
              ? !(arg as Map<unknown, unknown>).size
              : isSet(arg)
                ? !(arg as Set<unknown>).size
                : isBuffer(arg)
                  ? !arg.byteLength
                  : isObject(arg)
                    ? isEmptyObject(arg as TObject)
                    : !isBoolean(arg) && !isNumber(arg);
}
