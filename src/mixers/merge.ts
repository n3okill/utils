/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { isNullOrUndefined } from "../type/isNullOrUndefined";
import { isObject } from "../type/isObject";
import { Spread } from "./_internal";
import { clone } from "./clone";

/**
 * Merge given objects into a new one, cloning the values
 * @param args Objects to be merged
 * @returns The merged and cloned object
 */
export function merge<A extends object[]>(...args: [...A]): Spread<A> {
    const target: any = {};
    for (const obj of args) {
        if (!isNullOrUndefined(obj)) {
            for (const [key, value] of Object.entries(obj)) {
                // eslint-disable-next-line security/detect-object-injection
                if (isObject(value) && isObject(target[key])) {
                    // eslint-disable-next-line security/detect-object-injection
                    target[key] = merge(target[key], value);
                } else {
                    // eslint-disable-next-line security/detect-object-injection
                    target[key] = clone(value, true);
                }
            }
        }
    }
    return target as Spread<A>;
}
