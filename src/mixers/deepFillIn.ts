/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { isPlainObject } from "../type/isPlainObject";
import { Spread } from "./_internal";

/**
 * Fill non-existent properties in the first object with the other objects
 * @param args Objects to fill
 * @returns The first object filled with the new properties
 */
export function deepFillIn<A extends object[]>(...args: [...A]): Spread<A> {
    if (args.length === 0) return {} as Spread<A>;
    const target: any = args.shift();
    for (const obj of args) {
        for (const [key, value] of Object.entries(obj)) {
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                // eslint-disable-next-line security/detect-object-injection
                target[key] = value;
            } else if (isPlainObject(target) && isPlainObject(value)) {
                // eslint-disable-next-line security/detect-object-injection
                deepFillIn(target[key], value);
            }
        }
    }

    /*args.forEach((obj): void => {
        Object.keys(obj).forEach((key): void => {
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                // eslint-disable-next-line security/detect-object-injection
                target[key] = (obj as any)[key];
                // eslint-disable-next-line security/detect-object-injection
            } else if (isPlainObject(target) && isPlainObject((obj as any)[key])) {
                // eslint-disable-next-line security/detect-object-injection
                deepFillIn(target[key], (obj as any)[key]);
            }
        });
    });*/
    return target as Spread<A>;
}
