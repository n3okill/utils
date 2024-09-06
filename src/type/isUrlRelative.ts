/**
 * Returns a value indicating whether a URL is relative.
 * A relative URL does not have host info part.
 * @param {string} url - the URL to be checked
 * @return {boolean} whether the URL is relative
 */
export function isUrlRelative(url: string): boolean {
    return !url.startsWith("//") && url.indexOf("://") === -1;
}
