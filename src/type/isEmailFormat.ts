/**
 * Simple check if argument is in e-mail format
 * @param {string} arg
 * @param {boolean} matches
 * @returns {boolean | string[] | null}
 *
 * ATTENTION: This function can cause a [Regular Expression Denial of Service (ReDoS)]:https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
 */
export function isEmailFormat(arg: string, matches: boolean = false): boolean | null | string[] {
    return matches
        ? // eslint-disable-next-line security/detect-unsafe-regex
        /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/i.exec(arg)
        : // eslint-disable-next-line security/detect-unsafe-regex
        /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/i.test(arg);
}
