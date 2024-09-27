import * as NodePath from "path";
import { isUndefined } from "../type";
/**
 * Transforms an array of strings into an object
 * @param  str Array of strings to be transformed
 * @param  separator Separator used in string, default to node "path" sep
 * @returns
 */
export function stringsPathToObject(str: string[], separator: string = NodePath.sep): { [key: string]: unknown } {
    const res: Record<string, unknown> = {};

    str.forEach((s: string): void => {
        const parts = s.split(separator);
        let o: { [key: string]: unknown } = res;
        parts.forEach((p: string): void => {
            // eslint-disable-next-line security/detect-object-injection
            o[p] = !isUndefined(o[p]) ? o[p] : {};
            // eslint-disable-next-line security/detect-object-injection
            o = o[p] as { [key: string]: unknown };
        });
    });

    return res;
}
