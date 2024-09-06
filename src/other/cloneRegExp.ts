import { _checkTransform, TransformFunctionType } from "../_internal";

/**
 * Clone RegExp
 * @param {RegExp} arg RegExp to clone
 * @returns {RegExp} New cloned RegExp
 */
export function cloneRegExp(arg: RegExp, transform?: (value: RegExp) => RegExp): RegExp {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const reg = new RegExp(arg.source, arg.flags || (/[gimuy]*$/.exec(arg.toString()) as RegExpExecArray)[0]);
    if ("lastIndex" in arg) {
        reg.lastIndex = arg.lastIndex;
    }
    return _checkTransform(reg, transform as TransformFunctionType);
}
