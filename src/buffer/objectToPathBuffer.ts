import { sep as Separator } from "path/posix";
import { objectToPathStrings } from "../string/objectToPathStrings";

/**
 * Transforms an object into an array of Buffer's
 * @param  obj Object to be transformed into array of Buffer's
 * @param  separator Separator to be used in Buffer, default to node "path" sep
 */
export function objectToPathBuffer(obj: { [key: string]: unknown; }, separator: string = Separator): Buffer[] {
    const result = objectToPathStrings(obj, separator);
    return result.map((s) => Buffer.from(s));
}
