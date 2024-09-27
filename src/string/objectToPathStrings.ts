import * as NodePath from "path";
import { isObject } from "../type/isObject";

/**
 * Transforms an object into an array of strings
 * @param  obj Object to be transformed into array of strings
 * @param  separator Separator to be used in string, default to node "path" sep
 * @returns
 */
export function objectToPathStrings(obj: { [key: string]: unknown }, separator: string = NodePath.sep): string[] {
    const res: string[] = [];

    function reduce(path: string, input: { [key: string]: unknown }): void {
        Object.keys(input).forEach((key: string): void => {
            const p = path ? path + separator + key : key;
            // eslint-disable-next-line security/detect-object-injection
            if (isObject(input[key]) && Object.keys(input[key]).length > 0) {
                // eslint-disable-next-line security/detect-object-injection
                reduce(p, input[key] as { [key: string]: unknown });
            } else {
                res.push(p);
            }
        });
    }

    reduce("", obj);

    return res;
}
