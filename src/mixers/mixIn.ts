import { isNullOrUndefined } from "../type/isNullOrUndefined";
import { mixInOne } from "./mixInOne";

/**
 * Merge multiple objects into the target
 * @param target The object to merge into
 * @param args The objects to be merged
 * @returns Return the target object with other arguments merged into it
 */
export function mixIn<T>(target: T, ...args: Array<T>): T {
    for (const obj of args) {
        if (!isNullOrUndefined(obj)) {
            mixInOne(target, obj);
        }
    }
    return target;
}
