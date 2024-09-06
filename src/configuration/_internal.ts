import { isEmpty } from "../type/isEmpty";

/**
 * @internal
 * @ignore
 * @param {Array<string>} names
 * @returns {Array<string>}
 */
export function getNameParts(names: Array<string>): Array<string> {
    const parts: Array<string> = [];
    names.forEach((part: string): number | void =>
        part.indexOf(".") === -1 && !isEmpty(part)
            ? part
                  .replace(/\[(\d+)]/g, ".$1")
                  .split(".")
                  .forEach((v: string): number | "" => (v ? parts.push(v) : ""))
            : parts.push(part),
    );
    return parts;
}