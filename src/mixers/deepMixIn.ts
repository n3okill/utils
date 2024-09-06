/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { isPlainObject } from "../type/isPlainObject";
import { Spread } from "./_internal";
import { mixIn } from "./mixIn";

/**
 * Merge given objects into a new one without cloning values
 * @param args Objects to be merged
 * @returns The new merged object
 */
export function deepMixIn<A extends object[]>(...args: [...A]): Spread<A> {
    let target: any;
    do {
        target = args.shift();
    } while (!target && args.length);

    args.forEach((obj): void => {
        Object.keys(obj).forEach((key): void => {
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                // eslint-disable-next-line security/detect-object-injection
                target[key] = (obj as any)[key];
                // eslint-disable-next-line security/detect-object-injection
            } else if (isPlainObject(target) && isPlainObject((obj as any)[key])) {
                // eslint-disable-next-line security/detect-object-injection
                deepMixIn(target[key], (obj as any)[key]);
            } else {
                mixIn(target, obj);
            }
        });
    });
    return target as Spread<A>;
}