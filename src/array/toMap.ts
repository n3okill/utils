import { TObject } from "../type/_types";
import { isArray } from "../type/isArray";
import { isMap } from "../type/isMap";
import { isObject } from "../type/isObject";

/**
 * Transforms argument into Map
 * @param arg Argument to be transformed into Map
 * @returns Resulting Map from argument given or undefined if the argument is not Object, Array or Map
 */
export function toMap(
    arg: TObject | Array<[unknown, unknown]> | Map<unknown, unknown>,
): Map<unknown, unknown> | undefined {
    return isMap(arg)
        ? arg
        : isObject(arg)
          ? // eslint-disable-next-line security/detect-object-injection
            new Map(Object.keys(arg).map((k): [unknown, unknown] => [k, (arg as { [key: string]: unknown })[k]]))
          : isArray(arg)
            ? new Map(arg as Array<[unknown, unknown]>)
            : undefined;
}
