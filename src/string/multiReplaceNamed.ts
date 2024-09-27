import { toString } from "./toString";

/**
 * Replace items in string based on given object
 * Ex: multiReplaceNamed("Hello %World%!",{"%World%":"Joe"}) => Hello Joe!
 * @param  str String to be replaced
 * @param  params Object with items to replace
 * @returns  String with items replaced
 */
export function multiReplaceNamed(str: string, params: { [key: string]: unknown }): string {
    let s = toString(str);
    for (const key of Object.keys(params)) {
        // eslint-disable-next-line security/detect-non-literal-regexp
        const reg = new RegExp(`${key}`, "g");
        // eslint-disable-next-line security/detect-object-injection
        s = s.replace(reg, params[key] as string);
    }
    return s;
}
