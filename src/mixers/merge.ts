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
    let target: any;
    do {
        target = args.shift();
    } while (!target && args.length);
    args.forEach((obj) => {
        if (!isNullOrUndefined(obj)) {
            Object.keys(obj).forEach((key: string): void => {
                // eslint-disable-next-line security/detect-object-injection
                if(isObject((obj as any)[key]) && isObject(target[key])) {
                    // eslint-disable-next-line security/detect-object-injection
                    target[key] = merge(target[key], (obj as any)[key]);
                } else {
                    // eslint-disable-next-line security/detect-object-injection
                    target[key] = clone((obj as any)[key], true);
                }
            });
        }
    });
    return target as Spread<A>;
}