import { isNullOrUndefined } from "../type/isNullOrUndefined";

/**
 * @internal
 */
const EncodeHtmlRules: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&#34;",
    "'": "&#39;",
};

/**
 * Escape html string
 * @param arg
 */
export function escapeHtml(arg: string | undefined | null): string {
    return isNullOrUndefined(arg)
        ? ""
        : // eslint-disable-next-line security/detect-object-injection
          arg.replace(/[&<>'"]/g, (c: string): string => EncodeHtmlRules[c] || c);
}