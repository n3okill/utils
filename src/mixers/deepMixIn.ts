import { isPlainObject } from "../type/isPlainObject";
import { Spread } from "./_internal";
import { mixIn } from "./mixIn";

/**
 * Merge given objects into a new one without cloning values
 * @param args Objects to be merged
 * @returns The new merged object
 */
export function deepMixIn<A extends object[]>(...args: [...A]): Spread<A> {
    if (args.length === 0) return {} as Spread<A>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target: any = args.shift();

    for (const obj of args) {
        for (const [key, value] of Object.entries(obj)) {
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                target[key] = value;
                // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
            } else if (isPlainObject(target[key]) && isPlainObject(value)) {
                // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
                deepMixIn(target[key], value);
            } else {
                mixIn(target, obj);
            }
        }
    }
    return target as Spread<A>;
}
