import { sep as Separator } from "path/posix";
import { toString } from "./toString";
import { stringsPathToObject } from "../string/stringsPathToObject";

/**
 * Transforms an array of Buffers into an object
 * @param str Array of Buffer's to be transformed
 * @param  separator Separator used in Buffer, default to node "path" sep
 */
export function bufferPathToObject(str: Buffer[], separator: string = Separator): { [key: string]: unknown; } {
    return stringsPathToObject(
        str.map((s) => toString(s)),
        separator
    );
}
