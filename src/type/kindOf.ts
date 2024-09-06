/**
 * Return a string with the type of the object
 * @param arg
 * @returns {string}
 */
export function kindOf(arg: unknown): string {
    return arg === null
        ? "null"
        : arg === undefined
            ? "undefined"
            : (/^\[object (.*)]$/.exec(Object.prototype.toString.call(arg)) as RegExpExecArray)[1];
}
